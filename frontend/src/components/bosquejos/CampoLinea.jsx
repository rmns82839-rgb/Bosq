import React, { useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Reemplaza a los <input> del editor. Es un textarea, así que el texto
 * ENVUELVE y el campo CRECE hacia abajo en vez de irse de lado — nunca
 * pierdes de vista el principio de lo que escribiste. Sin bordes ni caja.
 *
 * Sigue siendo un valor de una sola línea: Enter no inserta salto, y el
 * texto pegado con saltos se aplana a espacios.
 *
 * Los estilos críticos van en línea (ver nota en CampoTexto).
 */
export default function CampoLinea({ value, onChange, placeholder, className = '', autoFocus = false }) {
  const ref = useRef(null);

  const ajustar = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useLayoutEffect(() => { ajustar(); });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', ajustar);
      return () => window.removeEventListener('resize', ajustar);
    }
    const ro = new ResizeObserver(ajustar);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ajustar]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value || ''}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      onChange={(e) => { onChange(e.target.value.replace(/[\r\n]+/g, ' ')); ajustar(); }}
      onInput={ajustar}
      className={`be-texto-libre ${className}`}
      style={{
        overflowY: 'hidden',
        resize: 'none',
        minHeight: 0,
        maxHeight: 'none',
        boxSizing: 'border-box',
      }}
    />
  );
}
