import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { VersiculoLink } from '../../lib/bibliaLink';
import NotaBoton from './NotaBoton';
import CampoTexto from './CampoTexto';
import CampoLinea from './CampoLinea';
import Diapositivas from '../common/Diapositivas';
import '../../styles/bosquejo-editor.css';
import '../../styles/be-premium.css';
import '../../styles/diapositivas.css';

/* ═══════════════════════════════════════════════════════════════
   NOTACIÓN HOMILÉTICA
   Nivel 0 → I, II, III   |   Nivel 1 → A, B, C   |   Nivel 2 → 1, 2, 3
   La numeración no decora: se recalcula sola según el orden real,
   así que insertar o mover un punto reorganiza todo automáticamente.
   ═══════════════════════════════════════════════════════════════ */
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NOMBRE_NIVEL = ['Punto', 'Subpunto', 'Punto'];
const MAX_NIVEL = 2; // I → A → 1

function marcador(nivel, indice) {
  if (nivel === 0) return ROMANOS[indice] || String(indice + 1);
  if (nivel === 1) return LETRAS[indice] || String(indice + 1);
  return String(indice + 1);
}

const PROPOSITOS = [
  'Evangelístico', 'Edificativo', 'Doctrinal', 'Motivacional / Exhortación',
  'Correctivo', 'Consolador', 'Profético', 'Devocional',
];

/** Desplegable con los propósitos homiléticos más comunes, con una
 * opción "Otro…" que abre un campo libre para lo que no esté en la lista. */
function CampoProposito({ value, onChange }) {
  const esPersonalizado = !!value && !PROPOSITOS.includes(value);
  const [modoOtro, setModoOtro] = useState(esPersonalizado);

  if (modoOtro) {
    return (
      <div className="be-proposito-otro">
        <CampoLinea
          className="be-proposito-libre"
          placeholder="Escribe el propósito…"
          value={value}
          onChange={onChange}
          autoFocus
        />
        <button type="button" className="be-proposito-volver" onClick={() => { setModoOtro(false); onChange(''); }} title="Volver a la lista">✕</button>
      </div>
    );
  }

  return (
    <select
      className="be-input be-proposito"
      value={value || ''}
      onChange={(e) => {
        if (e.target.value === '__otro__') { setModoOtro(true); onChange(''); }
        else onChange(e.target.value);
      }}
    >
      <option value="">Propósito (opcional)</option>
      {PROPOSITOS.map((p) => <option key={p} value={p}>{p}</option>)}
      <option value="__otro__">Otro…</option>
    </select>
  );
}

const nuevoPunto = () => ({
  id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  titulo: '',
  descripcion: '',
  versos: '',
  notas: '',
  subpuntos: [],
});

const arrayMove = (lista, desde, hasta) => {
  const copia = [...lista];
  const [item] = copia.splice(desde, 1);
  copia.splice(hasta, 0, item);
  return copia;
};

/* ── Utilidades de árbol (inmutables, por ruta) ───────────────── */
function mapEnRuta(puntos, ruta, fn) {
  if (ruta.length === 0) return fn(puntos);
  const [i, ...resto] = ruta;
  return puntos.map((p, idx) =>
    idx !== i ? p : { ...p, subpuntos: mapEnRuta(p.subpuntos || [], resto, fn) }
  );
}

function actualizarPunto(puntos, ruta, campo, valor) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  return mapEnRuta(puntos, padre, (lista) =>
    lista.map((p, idx) => (idx === i ? { ...p, [campo]: valor } : p))
  );
}

const agregarPuntoObj = (puntos, rutaPadre, nuevo) =>
  mapEnRuta(puntos, rutaPadre, (lista) => [...lista, nuevo]);

function insertarAntesObj(puntos, ruta, nuevo) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  return mapEnRuta(puntos, padre, (lista) => {
    const copia = [...lista];
    copia.splice(i, 0, nuevo);
    return copia;
  });
}

function eliminarPunto(puntos, ruta) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  return mapEnRuta(puntos, padre, (lista) => lista.filter((_, idx) => idx !== i));
}

function moverArriba(puntos, ruta) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  if (i === 0) return puntos;
  return mapEnRuta(puntos, padre, (lista) => arrayMove(lista, i, i - 1));
}

function moverAbajo(puntos, ruta) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  return mapEnRuta(puntos, padre, (lista) =>
    i >= lista.length - 1 ? lista : arrayMove(lista, i, i + 1)
  );
}

/** Normaliza datos viejos: puntos planos sin id, sin subpuntos. */
function normalizar(puntos) {
  if (!Array.isArray(puntos) || puntos.length === 0) return [];
  return puntos.map((p) => ({
    id: p.id || `p_${Math.random().toString(36).slice(2, 9)}`,
    titulo: p.titulo || '',
    descripcion: p.descripcion ?? p.desarrollo ?? '',
    versos: p.versos || '',
    notas: p.notas || '',
    subpuntos: normalizarHijos(p.subpuntos),
  }));
}
const normalizarHijos = (subs) =>
  !Array.isArray(subs) || subs.length === 0 ? [] : normalizar(subs);

/** Recorre puntos y subpuntos armando una diapositiva por cada uno,
 * con su ruta en el árbol para que las acciones sepan a cuál aplicar. */
function recolectarSlidesPuntos(lista, nivel, rutaPadre, slides) {
  const rol = nivel === 0 ? 'punto0' : nivel === 1 ? 'punto1' : 'punto2';
  lista.forEach((p, i) => {
    const ruta = [...rutaPadre, i];
    slides.push({
      id: p.id,
      rol,
      etiqueta: `${NOMBRE_NIVEL[Math.min(nivel, 2)]} ${marcador(nivel, i)}`,
      tipo: 'punto',
      punto: p,
      ruta,
      nivel,
      indice: i,
      total: lista.length,
    });
    if (Array.isArray(p.subpuntos) && p.subpuntos.length > 0) {
      recolectarSlidesPuntos(p.subpuntos, nivel + 1, ruta, slides);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   EDITOR — a diapositivas: una parte del bosquejo a pantalla
   completa a la vez, coloreada por rol. Deslizas o tocas para
   pasar a la siguiente.
   ═══════════════════════════════════════════════════════════════ */
export default function BosquejoEditor({
  datos,
  onChange,
  onGuardar,
  onCancelar,
  guardando = false,
  titulo = 'Nuevo bosquejo',
}) {
  const diapoRef = useRef(null);
  const enfocarIdRef = useRef(null);

  const puntos = useMemo(() => normalizar(datos.puntos), [datos.puntos]);

  const setCampo = useCallback(
    (campo, valor) => onChange({ ...datos, [campo]: valor }),
    [datos, onChange]
  );
  const setSeccion = useCallback(
    (seccion, campo, valor) =>
      onChange({ ...datos, [seccion]: { ...(datos[seccion] || {}), [campo]: valor } }),
    [datos, onChange]
  );
  const setPuntos = useCallback(
    (nuevos) => onChange({ ...datos, puntos: nuevos }),
    [datos, onChange]
  );

  const acciones = useMemo(
    () => ({
      editar: (ruta, campo, valor) => setPuntos(actualizarPunto(puntos, ruta, campo, valor)),
      agregar: (rutaPadre) => {
        const nuevo = nuevoPunto();
        setPuntos(agregarPuntoObj(puntos, rutaPadre, nuevo));
        enfocarIdRef.current = nuevo.id;
      },
      insertarAntes: (ruta) => {
        const nuevo = nuevoPunto();
        setPuntos(insertarAntesObj(puntos, ruta, nuevo));
        enfocarIdRef.current = nuevo.id;
      },
      eliminar: (ruta) => setPuntos(eliminarPunto(puntos, ruta)),
      moverArriba: (ruta) => setPuntos(moverArriba(puntos, ruta)),
      moverAbajo: (ruta) => setPuntos(moverAbajo(puntos, ruta)),
    }),
    [puntos, setPuntos]
  );

  const totalPuntos = useMemo(() => {
    const contar = (lista) => lista.reduce((n, p) => n + 1 + contar(p.subpuntos || []), 0);
    return contar(puntos);
  }, [puntos]);

  const sinTitulo = !datos.titulo?.trim();

  // Arma la lista de diapositivas a partir del estado actual.
  const slides = useMemo(() => {
    const lista = [
      { id: '__portada__', rol: null, etiqueta: 'Portada', tipo: 'portada' },
      { id: '__intro__', rol: 'intro', etiqueta: 'Introducción', tipo: 'intro' },
    ];
    recolectarSlidesPuntos(puntos, 0, [], lista);
    lista.push({ id: '__agregar__', rol: 'punto0', etiqueta: '+ Punto', tipo: 'agregar' });
    lista.push({ id: '__aplicacion__', rol: 'aplicacion', etiqueta: 'Aplicación', tipo: 'aplicacion' });
    lista.push({ id: '__conclusion__', rol: 'conclusion', etiqueta: 'Conclusión', tipo: 'conclusion' });
    return lista;
  }, [puntos]);

  // Después de agregar/insertar un punto, salta a su diapositiva.
  useEffect(() => {
    if (enfocarIdRef.current && slides.some((s) => s.id === enfocarIdRef.current)) {
      diapoRef.current?.irAId(enfocarIdRef.current);
      enfocarIdRef.current = null;
    }
  }, [slides]);

  const renderSlide = (slide) => {
    if (slide.tipo === 'portada') {
      return (
        <>
          <CampoLinea
            className="be-titulo-principal"
            placeholder="Título del bosquejo"
            value={datos.titulo}
            onChange={(v) => setCampo('titulo', v)}
          />
          <div className="be-campo-suelto">
            <CampoLinea
              className="be-cita"
              placeholder="Pasaje base — ej: Apocalipsis 1:1-8"
              value={datos.cita}
              onChange={(v) => setCampo('cita', v)}
            />
            {datos.cita?.trim() && (
              <VersiculoLink cita={datos.cita} className="be-versos-link">abrir en RVR1960 ↗</VersiculoLink>
            )}
          </div>
          <div className="be-campo-suelto">
            <label className="be-subrotulo">Tema</label>
            <CampoLinea
              className="be-tema"
              placeholder="Tema (opcional)"
              value={datos.tema}
              onChange={(v) => setCampo('tema', v)}
            />
          </div>
          <div className="be-campo-suelto">
            <label className="be-subrotulo">Propósito</label>
            <CampoProposito value={datos.proposito} onChange={(v) => setCampo('proposito', v)} />
          </div>
        </>
      );
    }

    if (slide.tipo === 'intro') {
      return (
        <>
          <div className="be-subcampo">
            <label className="be-subrotulo">Gancho</label>
            <CampoTexto
              minRows={3}
              placeholder="Cómo captas la atención al empezar… (opcional)"
              value={datos.introduccion?.gancho || ''}
              onChange={(v) => setSeccion('introduccion', 'gancho', v)}
            />
          </div>
          <div className="be-subcampo">
            <label className="be-subrotulo">Conexión</label>
            <CampoTexto
              minRows={3}
              placeholder="Cómo conectas el gancho con el tema… (opcional)"
              value={datos.introduccion?.conexion || ''}
              onChange={(v) => setSeccion('introduccion', 'conexion', v)}
            />
          </div>
          <NotaBoton nota={datos.introduccion?.notas} onChange={(t) => setSeccion('introduccion', 'notas', t)} />
        </>
      );
    }

    if (slide.tipo === 'punto') {
      const { punto: p, ruta, nivel, indice, total } = slide;
      const puedeAnidar = nivel < MAX_NIVEL;
      return (
        <>
          <div className="dp-punto-encabezado">
            <span className="dp-marcador-grande">{marcador(nivel, indice)}.</span>
            <div className="be-orden-botones">
              <button type="button" className="be-icono" onClick={() => acciones.moverArriba(ruta)} disabled={indice === 0} title="Mover arriba">▲</button>
              <button type="button" className="be-icono" onClick={() => acciones.moverAbajo(ruta)} disabled={indice === total - 1} title="Mover abajo">▼</button>
            </div>
            <button type="button" className="be-icono be-icono-borrar" onClick={() => acciones.eliminar(ruta)} title="Eliminar este punto">✕</button>
          </div>

          <CampoLinea
            className="be-titulo-punto dp-titulo-input"
            placeholder={nivel === 0 ? 'Punto principal' : 'Subpunto'}
            value={p.titulo}
            onChange={(v) => acciones.editar(ruta, 'titulo', v)}
            autoFocus
          />

          <CampoTexto
            minRows={5}
            placeholder="Desarrollo del punto…"
            value={p.descripcion}
            onChange={(v) => acciones.editar(ruta, 'descripcion', v)}
          />

          <div className="be-campo-suelto">
            <label className="be-subrotulo">📖 Versículos de apoyo</label>
            <CampoLinea
              className="be-versos"
              placeholder="ej: Apocalipsis 1:8"
              value={p.versos}
              onChange={(v) => acciones.editar(ruta, 'versos', v)}
            />
            {p.versos?.trim() && (
              <VersiculoLink cita={p.versos} className="be-versos-link">abrir ↗</VersiculoLink>
            )}
          </div>

          <div className="be-notas-bloque">
            <NotaBoton nota={p.notas} onChange={(t) => acciones.editar(ruta, 'notas', t)} />
          </div>

          <div className="be-punto-acciones-pie">
            <button type="button" className="be-agregar-sub" onClick={() => acciones.insertarAntes(ruta)}>
              + Insertar antes
            </button>
            {puedeAnidar && (
              <button type="button" className="be-agregar-sub" onClick={() => acciones.agregar(ruta)}>
                + Subpunto
              </button>
            )}
          </div>
        </>
      );
    }

    if (slide.tipo === 'agregar') {
      return (
        <div className="dp-agregar-centro">
          <button type="button" className="be-btn be-btn-principal" onClick={() => acciones.agregar([])}>
            + Agregar punto principal
          </button>
          <p className="dp-agregar-nota">
            {totalPuntos === 0
              ? 'Este bosquejo todavía no tiene puntos.'
              : `${totalPuntos} ${totalPuntos === 1 ? 'punto' : 'puntos'} hasta ahora.`}
          </p>
        </div>
      );
    }

    if (slide.tipo === 'aplicacion') {
      return (
        <>
          <CampoTexto
            minRows={5}
            placeholder="Qué hace el oyente con esto… (opcional)"
            value={datos.aplicacion?.texto || ''}
            onChange={(v) => setSeccion('aplicacion', 'texto', v)}
          />
          <NotaBoton nota={datos.aplicacion?.notas} onChange={(t) => setSeccion('aplicacion', 'notas', t)} />
        </>
      );
    }

    if (slide.tipo === 'conclusion') {
      return (
        <>
          <div className="be-subcampo">
            <label className="be-subrotulo">Resumen</label>
            <CampoTexto
              minRows={3}
              placeholder="Cómo cierras el mensaje… (opcional)"
              value={datos.conclusion?.resumen || ''}
              onChange={(v) => setSeccion('conclusion', 'resumen', v)}
            />
          </div>
          <div className="be-subcampo">
            <label className="be-subrotulo">Llamado</label>
            <CampoTexto
              minRows={3}
              placeholder="Qué le pides al oyente que haga… (opcional)"
              value={datos.conclusion?.llamado || ''}
              onChange={(v) => setSeccion('conclusion', 'llamado', v)}
            />
          </div>
          <NotaBoton nota={datos.conclusion?.notas} onChange={(t) => setSeccion('conclusion', 'notas', t)} />
        </>
      );
    }

    return null;
  };

  return (
    <div className="be-hoja be-premium" style={{ height: '100dvh', display: 'flex', flexDirection: 'column', maxWidth: 'none', padding: 0 }}>
      <header className="be-encabezado" style={{ padding: '14px 16px', flexShrink: 0 }}>
        <div className="be-encabezado-texto">
          <h1 className="be-encabezado-titulo" style={{ fontSize: '1.3rem' }}>{titulo}</h1>
          <p className="be-encabezado-nota">
            {totalPuntos} {totalPuntos === 1 ? 'punto' : 'puntos'} · desliza para navegar
          </p>
        </div>
        <div className="be-encabezado-acciones">
          {onCancelar && (
            <button type="button" className="be-btn be-btn-plano" onClick={onCancelar}>Volver</button>
          )}
          <button
            type="button"
            className="be-btn be-btn-principal"
            onClick={onGuardar}
            disabled={guardando || sinTitulo}
            title={sinTitulo ? 'Ponle un título primero' : 'Guardar bosquejo'}
          >
            {guardando ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <Diapositivas ref={diapoRef} slides={slides} renderSlide={renderSlide} />
      </div>
    </div>
  );
}
