import React, { useState, useCallback, useMemo } from 'react';
import { VersiculoLink } from '../../lib/bibliaLink';
import NotaBoton from './NotaBoton';
import CampoTexto from './CampoTexto';
import '../../styles/bosquejo-editor.css';

/* ═══════════════════════════════════════════════════════════════
   NOTACIÓN HOMILÉTICA
   Nivel 0 → I, II, III   |   Nivel 1 → A, B, C   |   Nivel 2 → 1, 2, 3
   La numeración no decora: se recalcula sola según el orden real,
   así que insertar o mover un punto reorganiza todo automáticamente.
   ═══════════════════════════════════════════════════════════════ */
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_NIVEL = 2; // I → A → 1

function marcador(nivel, indice) {
  if (nivel === 0) return ROMANOS[indice] || String(indice + 1);
  if (nivel === 1) return LETRAS[indice] || String(indice + 1);
  return String(indice + 1);
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

const agregarPunto = (puntos, rutaPadre) =>
  mapEnRuta(puntos, rutaPadre, (lista) => [...lista, nuevoPunto()]);

function insertarAntes(puntos, ruta) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  return mapEnRuta(puntos, padre, (lista) => {
    const nueva = [...lista];
    nueva.splice(i, 0, nuevoPunto());
    return nueva;
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
  if (!Array.isArray(puntos) || puntos.length === 0) return [nuevoPunto()];
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

/* ── Un punto (recursivo) ────────────────────────────────────── */
function Punto({ punto, indice, total, nivel, ruta, acciones, plegados, togglePlegado }) {
  const subs = punto.subpuntos || [];
  const plegado = plegados.has(punto.id);
  const puedeAnidar = nivel < MAX_NIVEL;

  return (
    <div className={`be-punto be-nivel-${nivel}`}>
      <div className="be-punto-fila">
        <span className="be-marcador" aria-hidden="true">
          {marcador(nivel, indice)}.
        </span>

        <div className="be-punto-cuerpo">
          <div className="be-punto-encabezado">
            <div className="be-orden-botones">
              <button
                type="button"
                className="be-icono"
                onClick={() => acciones.moverArriba(ruta)}
                disabled={indice === 0}
                title="Mover arriba"
                aria-label="Mover este punto arriba"
              >
                ▲
              </button>
              <button
                type="button"
                className="be-icono"
                onClick={() => acciones.moverAbajo(ruta)}
                disabled={indice === total - 1}
                title="Mover abajo"
                aria-label="Mover este punto abajo"
              >
                ▼
              </button>
            </div>

            <input
              className="be-input be-titulo-punto"
              placeholder={nivel === 0 ? 'Punto principal' : 'Subpunto'}
              value={punto.titulo}
              onChange={(e) => acciones.editar(ruta, 'titulo', e.target.value)}
            />

            {subs.length > 0 && (
              <button
                type="button"
                className="be-icono"
                onClick={() => togglePlegado(punto.id)}
                title={plegado ? 'Mostrar subpuntos' : 'Ocultar subpuntos'}
                aria-expanded={!plegado}
              >
                {plegado ? '▸' : '▾'}
              </button>
            )}

            <button
              type="button"
              className="be-icono be-icono-borrar"
              onClick={() => acciones.eliminar(ruta)}
              title="Eliminar este punto"
              aria-label="Eliminar punto"
            >
              ✕
            </button>
          </div>

          <CampoTexto
            placeholder="Desarrollo del punto…"
            value={punto.descripcion}
            onChange={(valor) => acciones.editar(ruta, 'descripcion', valor)}
          />

          <div className="be-versos-fila">
            <span className="be-versos-etiqueta">📖</span>
            <input
              className="be-input be-versos"
              placeholder="Versículos de apoyo — ej: Apocalipsis 1:8"
              value={punto.versos}
              onChange={(e) => acciones.editar(ruta, 'versos', e.target.value)}
            />
            {punto.versos?.trim() && (
              <VersiculoLink cita={punto.versos} className="be-versos-link">
                abrir ↗
              </VersiculoLink>
            )}
          </div>

          <div className="be-notas-bloque">
            <NotaBoton
              nota={punto.notas}
              onChange={(texto) => acciones.editar(ruta, 'notas', texto)}
            />
          </div>

          <div className="be-punto-acciones-pie">
            <button
              type="button"
              className="be-agregar-sub"
              onClick={() => acciones.insertarAntes(ruta)}
            >
              + Insertar antes
            </button>
            {puedeAnidar && (
              <button
                type="button"
                className="be-agregar-sub"
                onClick={() => acciones.agregar(ruta)}
              >
                + Subpunto
              </button>
            )}
          </div>
        </div>
      </div>

      {!plegado && subs.length > 0 && (
        <ListaPuntos
          puntos={subs}
          nivel={nivel + 1}
          rutaPadre={ruta}
          acciones={acciones}
          plegados={plegados}
          togglePlegado={togglePlegado}
        />
      )}
    </div>
  );
}

/* ── Lista de puntos de un mismo nivel (sin arrastre) ─────────── */
function ListaPuntos({ puntos, nivel, rutaPadre, acciones, plegados, togglePlegado }) {
  return (
    <div className={`be-lista be-lista-${nivel}`}>
      {puntos.map((p, i) => (
        <Punto
          key={p.id}
          punto={p}
          indice={i}
          total={puntos.length}
          nivel={nivel}
          ruta={[...rutaPadre, i]}
          acciones={acciones}
          plegados={plegados}
          togglePlegado={togglePlegado}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EDITOR
   ═══════════════════════════════════════════════════════════════ */
export default function BosquejoEditor({
  datos,
  onChange,
  onGuardar,
  onCancelar,
  guardando = false,
  titulo = 'Nuevo bosquejo',
}) {
  const [plegados, setPlegados] = useState(() => new Set());

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
      agregar: (rutaPadre) => setPuntos(agregarPunto(puntos, rutaPadre)),
      insertarAntes: (ruta) => setPuntos(insertarAntes(puntos, ruta)),
      eliminar: (ruta) => setPuntos(eliminarPunto(puntos, ruta)),
      moverArriba: (ruta) => setPuntos(moverArriba(puntos, ruta)),
      moverAbajo: (ruta) => setPuntos(moverAbajo(puntos, ruta)),
    }),
    [puntos, setPuntos]
  );

  const togglePlegado = useCallback((id) => {
    setPlegados((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }, []);

  const totalPuntos = useMemo(() => {
    const contar = (lista) =>
      lista.reduce((n, p) => n + 1 + contar(p.subpuntos || []), 0);
    return contar(puntos);
  }, [puntos]);

  const sinTitulo = !datos.titulo?.trim();

  return (
    <div className="be-hoja">
      <header className="be-encabezado">
        <div className="be-encabezado-texto">
          <h1 className="be-encabezado-titulo">{titulo}</h1>
          <p className="be-encabezado-nota">
            Todo en una sola hoja. Usa ▲▼ para reordenar.
          </p>
        </div>
        <div className="be-encabezado-acciones">
          {onCancelar && (
            <button type="button" className="be-btn be-btn-plano" onClick={onCancelar}>
              Volver
            </button>
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

      <section className="be-seccion be-seccion-titulo">
        <input
          className="be-input be-titulo-principal"
          placeholder="Título del bosquejo"
          value={datos.titulo || ''}
          onChange={(e) => setCampo('titulo', e.target.value)}
          autoFocus
        />
        <div className="be-cita-fila">
          <input
            className="be-input be-cita"
            placeholder="Pasaje base — ej: Apocalipsis 1:1-8"
            value={datos.cita || ''}
            onChange={(e) => setCampo('cita', e.target.value)}
          />
          {datos.cita?.trim() && (
            <VersiculoLink cita={datos.cita} className="be-versos-link">
              abrir en RVR1960 ↗
            </VersiculoLink>
          )}
        </div>
        <div className="be-tema-fila">
          <input
            className="be-input be-tema"
            placeholder="Tema (opcional)"
            value={datos.tema || ''}
            onChange={(e) => setCampo('tema', e.target.value)}
          />
          <input
            className="be-input be-proposito"
            placeholder="Propósito (opcional) — ej: Evangelístico, Edificativo…"
            value={datos.proposito || ''}
            onChange={(e) => setCampo('proposito', e.target.value)}
          />
        </div>
      </section>

      <section className="be-seccion">
        <h2 className="be-rotulo">Introducción</h2>
        <div className="be-subcampo">
          <label className="be-subrotulo">Gancho</label>
          <CampoTexto
            minRows={2}
            placeholder="Cómo captas la atención al empezar… (opcional)"
            value={datos.introduccion?.gancho || ''}
            onChange={(valor) => setSeccion('introduccion', 'gancho', valor)}
          />
        </div>
        <div className="be-subcampo">
          <label className="be-subrotulo">Conexión</label>
          <CampoTexto
            minRows={2}
            placeholder="Cómo conectas el gancho con el tema… (opcional)"
            value={datos.introduccion?.conexion || ''}
            onChange={(valor) => setSeccion('introduccion', 'conexion', valor)}
          />
        </div>
        <NotaBoton
          nota={datos.introduccion?.notas}
          onChange={(texto) => setSeccion('introduccion', 'notas', texto)}
        />
      </section>

      <section className="be-seccion">
        <h2 className="be-rotulo">Desarrollo</h2>
        <ListaPuntos
          puntos={puntos}
          nivel={0}
          rutaPadre={[]}
          acciones={acciones}
          plegados={plegados}
          togglePlegado={togglePlegado}
        />
        <button
          type="button"
          className="be-agregar-principal"
          onClick={() => acciones.agregar([])}
        >
          + Agregar punto principal
        </button>
      </section>

      <section className="be-seccion">
        <h2 className="be-rotulo">Aplicación</h2>
        <CampoTexto
          minRows={3}
          placeholder="Qué hace el oyente con esto… (opcional)"
          value={datos.aplicacion?.texto || ''}
          onChange={(valor) => setSeccion('aplicacion', 'texto', valor)}
        />
        <NotaBoton
          nota={datos.aplicacion?.notas}
          onChange={(texto) => setSeccion('aplicacion', 'notas', texto)}
        />
      </section>

      <section className="be-seccion">
        <h2 className="be-rotulo">Conclusión</h2>
        <div className="be-subcampo">
          <label className="be-subrotulo">Resumen</label>
          <CampoTexto
            minRows={2}
            placeholder="Cómo cierras el mensaje… (opcional)"
            value={datos.conclusion?.resumen || ''}
            onChange={(valor) => setSeccion('conclusion', 'resumen', valor)}
          />
        </div>
        <div className="be-subcampo">
          <label className="be-subrotulo">Llamado</label>
          <CampoTexto
            minRows={2}
            placeholder="Qué le pides al oyente que haga… (opcional)"
            value={datos.conclusion?.llamado || ''}
            onChange={(valor) => setSeccion('conclusion', 'llamado', valor)}
          />
        </div>
        <NotaBoton
          nota={datos.conclusion?.notas}
          onChange={(texto) => setSeccion('conclusion', 'notas', texto)}
        />
      </section>

      <div className="be-barra">
        <span className="be-barra-info">
          {totalPuntos} {totalPuntos === 1 ? 'punto' : 'puntos'}
        </span>
        <button
          type="button"
          className="be-btn be-btn-principal"
          onClick={onGuardar}
          disabled={guardando || sinTitulo}
        >
          {guardando ? 'Guardando…' : 'Guardar bosquejo'}
        </button>
      </div>
    </div>
  );
}
