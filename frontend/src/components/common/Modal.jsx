import React, { useEffect, useRef } from 'react';
import '../../styles/modal.css';

/**
 * Modal genérico y accesible.
 * - Cierra con Esc o clic fuera.
 * - Devuelve el foco al elemento que lo abrió, al cerrarse.
 * - No depende de Tailwind: funciona igual en el editor (CSS propio)
 *   y en VerBosquejo (Tailwind).
 */
export default function Modal({ open, onClose, titulo, children, footer = null }) {
  const cajaRef = useRef(null);
  const disparadorPrevio = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose; // siempre la versión más reciente, sin re-disparar el efecto

  useEffect(() => {
    if (!open) return;
    disparadorPrevio.current = document.activeElement;
    cajaRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      disparadorPrevio.current?.focus?.();
    };
    // Solo reacciona a abrir/cerrar — no a que onClose cambie de identidad
    // en cada render (eso robaba el foco en cada tecla escrita).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-fondo"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-caja"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        ref={cajaRef}
      >
        <div className="modal-encabezado">
          <h3 className="modal-titulo">{titulo}</h3>
          <button
            type="button"
            className="modal-cerrar"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="modal-cuerpo">{children}</div>

        {footer && <div className="modal-pie">{footer}</div>}
      </div>
    </div>
  );
}
