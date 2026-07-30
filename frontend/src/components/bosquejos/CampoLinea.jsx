import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Reemplaza a los <input> del editor. Es un textarea, así que el texto
 * ENVUELVE y el campo CRECE hacia abajo en vez de irse de lado — nunca
 * pierdes de vista el principio de lo que escribiste. Sin bordes ni caja.
 *
 * Aunque visualmente ocupa varias líneas, sigue siendo un valor de una
 * sola línea: Enter no inserta salto (lo bloquea), y si llega texto con
 * saltos (por pegado) se aplanan a espacios.
 */
export default function CampoLinea({ value, onChange, placeholder, className = '', autoFocus = false }) {
  const ref = useRef(null);

  const ajustar = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => { ajustar(); }, [value, ajustar]);

  useEffect(() => {
    window.addEventListener('resize', ajustar);
    return () => window.removeEventListener('resize', ajustar);
  }, [ajustar]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value || ''}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      onChange={(e) => onChange(e.target.value.replace(/[\r\n]+/g, ' '))}
      className={`be-texto-libre ${className}`}
    />
  );
}
