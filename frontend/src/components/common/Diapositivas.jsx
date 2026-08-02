import React, { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import '../../styles/diapositivas.css';

/**
 * Visor de diapositivas de propósito general: una "cosa" a pantalla
 * completa a la vez, deslizando o tocando para pasar a la siguiente.
 *
 * Incluye un panel lateral de MINIATURAS (estilo PowerPoint): la lista
 * completa en pequeño, con su color de rol y una vista previa del texto,
 * para ver la estructura del sermón de un vistazo y saltar a cualquiera.
 *
 * slides: [{ id, rol, etiqueta, resumen? }]
 * renderSlide(slide, indice): contenido de esa diapositiva
 * ref.current.irAId(id): navega por fuera a un slide puntual
 */

// Colores de rol para las miniaturas (mismo criterio que el editor).
const ROL_COLOR = {
  intro: '#C06B4E',       // terracota
  punto0: '#7C3AED',      // morado litúrgico
  punto1: '#3E6B4E',      // verde bosque
  punto2: '#3A5A8B',      // azul tintero
  aplicacion: '#6B7A3A',  // verde oliva
  conclusion: '#A8823C',  // latón / oro
};

const Diapositivas = React.forwardRef(function Diapositivas(
  { slides, indiceInicial = 0, renderSlide, onIndiceCambia },
  ref
) {
  const [currentId, setCurrentId] = useState(
    () => slides[Math.min(indiceInicial, Math.max(0, slides.length - 1))]?.id ?? null
  );
  const [direccion, setDireccion] = useState(1);
  const ultimoIndiceRef = useRef(Math.min(indiceInicial, Math.max(0, slides.length - 1)));
  const [maxVisto, setMaxVisto] = useState(ultimoIndiceRef.current);

  // Panel de miniaturas: abierto por defecto en escritorio, cerrado en móvil.
  const [railAbierto, setRailAbierto] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  );

  const total = slides.length;
  const indice = Math.max(0, slides.findIndex((s) => s.id === currentId));

  // Si el slide actual desapareció de la lista (se borró un punto),
  // aterriza en el que quedó en la misma posición aproximada.
  useEffect(() => {
    if (total === 0) return;
    if (!slides.some((s) => s.id === currentId)) {
      const destino = slides[Math.min(ultimoIndiceRef.current, total - 1)];
      setCurrentId(destino?.id ?? null);
    }
  }, [slides]);

  useEffect(() => {
    ultimoIndiceRef.current = indice;
    setMaxVisto((m) => Math.max(m, indice));
  }, [indice]);

  const irA = useCallback((nuevoIndice) => {
    const clamped = Math.min(total - 1, Math.max(0, nuevoIndice));
    setDireccion(clamped >= indice ? 1 : -1);
    setCurrentId(slides[clamped]?.id ?? null);
    onIndiceCambia?.(clamped);
  }, [indice, slides, total, onIndiceCambia]);

  const irAId = useCallback((id) => {
    const i = slides.findIndex((s) => s.id === id);
    if (i !== -1) irA(i);
  }, [slides, irA]);

  useImperativeHandle(ref, () => ({ irAId, irA }), [irAId, irA]);

  const siguiente = useCallback(() => irA(indice + 1), [indice, irA]);
  const anterior = useCallback(() => irA(indice - 1), [indice, irA]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') siguiente();
      else if (e.key === 'ArrowLeft') anterior();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [siguiente, anterior]);

  if (total === 0) return null;
  const slide = slides[indice];

  const variantes = {
    entra: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    centro: { x: 0, opacity: 1 },
    sale: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  const onDragEnd = (e, info) => {
    const umbral = 70;
    if (info.offset.x < -umbral) siguiente();
    else if (info.offset.x > umbral) anterior();
  };

  return (
    <div className="dp-wrap" style={{ display: 'flex', height: '100%', minHeight: 0 }}>

      {/* ── Panel de miniaturas ── */}
      {railAbierto && (
        <aside
          className="dp-rail"
          style={{
            width: 190, flexShrink: 0, overflowY: 'auto', padding: '10px 8px',
            borderRight: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.025)',
          }}
        >
          {slides.map((s, i) => {
            const color = ROL_COLOR[s.rol] || '#b9a98f';
            const activo = i === indice;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => irA(i)}
                title={s.etiqueta}
                style={{
                  width: '100%', display: 'flex', gap: 8, alignItems: 'stretch',
                  textAlign: 'left', marginBottom: 6, padding: '8px 8px', cursor: 'pointer',
                  borderRadius: 8, border: `1px solid ${activo ? color : 'rgba(0,0,0,0.08)'}`,
                  background: activo ? `${color}1a` : 'rgba(255,255,255,0.5)',
                  transition: 'all .15s',
                }}
              >
                <span style={{ width: 4, borderRadius: 4, background: color, flexShrink: 0 }} />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
                    fontWeight: 600, color, marginBottom: 2,
                  }}>
                    <span style={{ opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                    {s.etiqueta}
                  </span>
                  {s.resumen ? (
                    <span style={{
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden', fontSize: 11, lineHeight: 1.35, color: 'rgba(40,30,25,0.7)',
                    }}>
                      {s.resumen}
                    </span>
                  ) : (
                    <span style={{ fontSize: 11, color: 'rgba(40,30,25,0.35)', fontStyle: 'italic' }}>
                      (vacío)
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </aside>
      )}

      {/* ── Zona principal ── */}
      <div className="dp-contenedor" style={{ flex: 1, minWidth: 0, position: 'relative' }}>

        {/* Botón para mostrar/ocultar las miniaturas */}
        <button
          type="button"
          className="dp-rail-toggle"
          onClick={() => setRailAbierto((v) => !v)}
          title={railAbierto ? 'Ocultar miniaturas' : 'Mostrar miniaturas'}
          style={{
            position: 'absolute', top: 8, left: 8, zIndex: 5,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px', fontSize: 12, cursor: 'pointer',
            borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)',
            background: 'rgba(255,255,255,0.75)', color: 'rgba(40,30,25,0.75)',
          }}
        >
          ▤ {railAbierto ? 'Ocultar' : `Diapositivas (${total})`}
        </button>

        <div className="dp-lienzo">
          <AnimatePresence mode="wait" custom={direccion}>
            <motion.div
              key={slide.id}
              custom={direccion}
              variants={variantes}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              className={clsx('dp-diapositiva', slide.rol && `rol-${slide.rol}`)}
            >
              <div className="dp-diapositiva-scroll">
                <p className="dp-rotulo">{slide.etiqueta}</p>
                {renderSlide(slide, indice)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="dp-nav">
          <button
            type="button"
            className="dp-flecha"
            onClick={anterior}
            disabled={indice === 0}
            aria-label="Diapositiva anterior"
          >
            ‹
          </button>

          <div className="dp-puntos">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={clsx(
                  'dp-punto',
                  s.rol && `rol-${s.rol}`,
                  i === indice && 'dp-punto-activo',
                  i <= maxVisto && i !== indice && 'dp-punto-visitado'
                )}
                onClick={() => irA(i)}
                title={s.etiqueta}
                aria-current={i === indice}
              />
            ))}
          </div>

          <button
            type="button"
            className="dp-flecha"
            onClick={siguiente}
            disabled={indice === total - 1}
            aria-label="Diapositiva siguiente"
          >
            ›
          </button>
        </div>

        <p className="dp-contador">{indice + 1} / {total}</p>
      </div>
    </div>
  );
});

export default Diapositivas;