import React, { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import '../../styles/diapositivas.css';

/**
 * Visor de diapositivas de propósito general: una "cosa" a pantalla
 * completa a la vez, deslizando o tocando para pasar a la siguiente.
 * Cada slide se distingue únicamente por su color de rol (clase
 * `rol-*` de premium-tokens.css) — no por tamaño de letra.
 *
 * Sigue el slide actual por SU ID, no por posición — así, si la lista
 * cambia (agregas, borras o mueves un punto mientras editas), no te
 * salta a un lugar inesperado: se queda donde corresponde, o aterriza
 * en la posición más cercana si el slide actual desapareció.
 *
 * slides: [{ id, rol, etiqueta }]
 * renderSlide(slide, indice): contenido de esa diapositiva
 * ref.current.irAId(id): navega por fuera a un slide puntual
 */
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
    <div className="dp-contenedor">
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
  );
});

export default Diapositivas;
