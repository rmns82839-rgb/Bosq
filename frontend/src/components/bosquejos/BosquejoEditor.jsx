import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { VersiculoLink } from '../../lib/bibliaLink';
import '../../styles/bosquejo-editor.css';

/* ═══════════════════════════════════════════════════════════════
   NOTACIÓN HOMILÉTICA
   Nivel 0 → I, II, III   |   Nivel 1 → A, B, C   |   Nivel 2 → 1, 2, 3
   La numeración no decora: muestra la jerarquía real del bosquejo.
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
  subpuntos: [],
});

/* ── Utilidades de árbol (inmutables, por ruta) ───────────────── */
const getEn = (puntos, ruta) =>
  ruta.reduce((acc, i) => acc?.[i]?.subpuntos ?? acc?.[i], puntos);

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

function eliminarPunto(puntos, ruta) {
  const padre = ruta.slice(0, -1);
  const i = ruta[ruta.length - 1];
  return mapEnRuta(puntos, padre, (lista) => lista.filter((_, idx) => idx !== i));
}

const reordenar = (puntos, rutaPadre, desde, hasta) =>
  mapEnRuta(puntos, rutaPadre, (lista) => arrayMove(lista, desde, hasta));

/** Normaliza datos viejos: puntos planos sin id ni subpuntos. */
function normalizar(puntos) {
  if (!Array.isArray(puntos) || puntos.length === 0) return [nuevoPunto()];
  return puntos.map((p) => ({
    id: p.id || `p_${Math.random().toString(36).slice(2, 9)}`,
    titulo: p.titulo || '',
    // tolera el campo viejo `desarrollo`
    descripcion: p.descripcion ?? p.desarrollo ?? '',
    versos: p.versos || '',
    subpuntos: normalizarHijos(p.subpuntos),
  }));
}
const normalizarHijos = (subs) =>
  !Array.isArray(subs) || subs.length === 0 ? [] : normalizar(subs);

/* ── Textarea que crece con el contenido ─────────────────────── */
function AutoTextarea({ value, onChange, className = '', minRows = 1, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      onChange={onChange}
      className={`be-textarea ${className}`}
      {...props}
    />
  );
}

/* ── Un punto (recursivo) ────────────────────────────────────── */
function Punto({ punto, indice, nivel, ruta, acciones, plegados, togglePlegado }) {
  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: punto.id });

  const estilo = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
  };

  const subs = punto.subpuntos || [];
  const plegado = plegados.has(punto.id);
  const puedeAnidar = nivel < MAX_NIVEL;

  return (
    <div ref={setNodeRef} style={estilo} className={`be-punto be-nivel-${nivel}`}>
      <div className="be-punto-fila">
        {/* Marcador homilético en el margen */}
        <span className="be-marcador" aria-hidden="true">
          {marcador(nivel, indice)}.
        </span>

        <div className="be-punto-cuerpo">
          <div className="be-punto-encabezado">
            <button
              type="button"
              className="be-agarre"
              title="Arrastra para reordenar"
              aria-label={`Reordenar punto ${marcador(nivel, indice)}`}
              {...attributes}
              {...listeners}
            >
              ⠿
            </button>

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

          <AutoTextarea
            className="be-desarrollo"
            placeholder="Desarrollo del punto…"
            value={punto.descripcion}
            onChange={(e) => acciones.editar(ruta, 'descripcion', e.target.value)}
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

      {/* Subpuntos */}
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

/* ── Lista ordenable de puntos de un mismo nivel ─────────────── */
function ListaPuntos({ puntos, nivel, rutaPadre, acciones, plegados, togglePlegado }) {
  const sensores = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const desde = puntos.findIndex((p) => p.id === active.id);
    const hasta = puntos.findIndex((p) => p.id === over.id);
    if (desde !== -1 && hasta !== -1) acciones.mover(rutaPadre, desde, hasta);
  };

  return (
    <DndContext sensors={sensores} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={puntos.map((p) => p.id)} strategy={verticalListSortingStrategy}>
        <div className={`be-lista be-lista-${nivel}`}>
          {puntos.map((p, i) => (
            <Punto
              key={p.id}
              punto={p}
              indice={i}
              nivel={nivel}
              ruta={[...rutaPadre, i]}
              acciones={acciones}
              plegados={plegados}
              togglePlegado={togglePlegado}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
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

  const setPuntos = useCallback(
    (nuevos) => onChange({ ...datos, puntos: nuevos }),
    [datos, onChange]
  );

  const acciones = useMemo(
    () => ({
      editar: (ruta, campo, valor) => setPuntos(actualizarPunto(puntos, ruta, campo, valor)),
      agregar: (rutaPadre) => setPuntos(agregarPunto(puntos, rutaPadre)),
      eliminar: (ruta) => setPuntos(eliminarPunto(puntos, ruta)),
      mover: (rutaPadre, desde, hasta) => setPuntos(reordenar(puntos, rutaPadre, desde, hasta)),
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

  // Conteo para el pie: cuántos puntos en total (todos los niveles)
  const totalPuntos = useMemo(() => {
    const contar = (lista) =>
      lista.reduce((n, p) => n + 1 + contar(p.subpuntos || []), 0);
    return contar(puntos);
  }, [puntos]);

  const sinTitulo = !datos.titulo?.trim();

  return (
    <div className="be-hoja">
      {/* ── Encabezado ── */}
      <header className="be-encabezado">
        <div className="be-encabezado-texto">
          <h1 className="be-encabezado-titulo">{titulo}</h1>
          <p className="be-encabezado-nota">
            Todo en una sola hoja. Arrastra ⠿ para reordenar.
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

      {/* ── Título y cita ── */}
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
      </section>

      {/* ── Introducción ── */}
      <section className="be-seccion">
        <h2 className="be-rotulo">Introducción</h2>
        <AutoTextarea
          minRows={3}
          placeholder="Cómo entras al tema…"
          value={datos.introduccion || ''}
          onChange={(e) => setCampo('introduccion', e.target.value)}
        />
      </section>

      {/* ── Desarrollo ── */}
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

      {/* ── Aplicación ── */}
      <section className="be-seccion">
        <h2 className="be-rotulo">Aplicación</h2>
        <AutoTextarea
          minRows={3}
          placeholder="Qué hace el oyente con esto…"
          value={datos.aplicacion || ''}
          onChange={(e) => setCampo('aplicacion', e.target.value)}
        />
      </section>

      {/* ── Conclusión ── */}
      <section className="be-seccion">
        <h2 className="be-rotulo">Conclusión</h2>
        <AutoTextarea
          minRows={3}
          placeholder="Cómo cierras…"
          value={datos.conclusion || ''}
          onChange={(e) => setCampo('conclusion', e.target.value)}
        />
      </section>

      {/* ── Barra fija de guardado ── */}
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
