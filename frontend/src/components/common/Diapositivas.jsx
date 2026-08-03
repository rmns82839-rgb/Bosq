import React, { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import '../../styles/diapositivas.css';

/**
 * Visor de diapositivas: una a pantalla completa, se pasa deslizando
 * (swipe táctil propio), con flechas o teclado. Incluye panel lateral
 * de MINIATURAS estilo PowerPoint.
 *
 * slides: [{ id, rol, etiqueta, resumen? }]
 * renderSlide(slide, indice)
 * ref.current.irAId(id)
 */

const ROL_COLOR = {
  intro: '#C06B4E', punto0: '#7C3AED', punto1: '#3E6B4E',
  punto2: '#3A5A8B', aplicacion: '#6B7A3A', conclusion: '#A8823C',
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
  const [railAbierto, setRailAbierto] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const tactilRef = useRef({ x: 0, y: 0 });

  const total = slides.length;
  const indice = Math.max(0, slides.findIndex((s) => s.id === currentId));

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

  // ── Swipe táctil propio (más confiable que el drag en móvil) ──
  const onTouchStart = (e) => {
    const t = e.touches[0];
    tactilRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - tactilRef.current.x;
    const dy = t.clientY - tactilRef.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) siguiente(); else anterior();
    }
  };

  if (total === 0) return null;
  const slide = slides[indice];

  const variantes = {
    entra: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    centro: { x: 0, opacity: 1 },
    sale: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="dp-wrap" style={{ display: 'flex', height: '100%', minHeight: 0 }}>

      {/* ── Panel de miniaturas ── */}
      {railAbierto && (
        <aside
          className="dp-rail"
          style={{
            width: 'clamp(92px, 24vw, 190px)', flexShrink: 0, overflowY: 'auto', padding: '8px 6px',
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
                  width: '100%', display: 'flex', gap: 6, alignItems: 'stretch',
                  textAlign: 'left', marginBottom: 6, padding: '6px 6px', cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: 8, border: `1px solid ${activo ? color : 'rgba(0,0,0,0.08)'}`,
                  background: activo ? `${color}1a` : 'rgba(255,255,255,0.5)',
                }}
              >
                <span style={{ width: 3, borderRadius: 3, background: color, flexShrink: 0 }} />
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                  <span style={{ display: 'block', fontSize: 9.5, fontWeight: 600, color, lineHeight: 1.2, marginBottom: 2, wordBreak: 'break-word' }}>
                    {i + 1}. {s.etiqueta}
                  </span>
                  {s.resumen ? (
                    <span style={{
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden', fontSize: 8.5, lineHeight: 1.3, color: 'rgba(40,30,25,0.62)',
                      wordBreak: 'break-word',
                    }}>
                      {s.resumen}
                    </span>
                  ) : (
                    <span style={{ fontSize: 8.5, color: 'rgba(40,30,25,0.3)', fontStyle: 'italic' }}>(vacío)</span>
                  )}
                </span>
              </button>
            );
          })}
        </aside>
      )}

      {/* ── Zona principal ── */}
      <div className="dp-contenedor" style={{ flex: 1, minWidth: 0 }}>

        <div className="dp-lienzo" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence mode="wait" custom={direccion}>
            <motion.div
              key={slide.id}
              custom={direccion}
              variants={variantes}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
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
            className="dp-mini-toggle"
            onClick={() => setRailAbierto((v) => !v)}
            title={railAbierto ? 'Ocultar miniaturas' : 'Ver miniaturas'}
            aria-label="Miniaturas"
          >
            ▤
          </button>

          <button type="button" className="dp-flecha" onClick={anterior} disabled={indice === 0} aria-label="Anterior">‹</button>

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

          <button type="button" className="dp-flecha" onClick={siguiente} disabled={indice === total - 1} aria-label="Siguiente">›</button>

          <span className="dp-contador">{indice + 1}/{total}</span>
        </div>
      </div>
    </div>
  );
});

export default Diapositivas;