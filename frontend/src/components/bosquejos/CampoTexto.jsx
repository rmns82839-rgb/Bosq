import React, { useRef, useState, useEffect, useCallback } from 'react';
import Modal from '../common/Modal';

/**
 * Superficie de escritura sin caja: crece hacia abajo con el contenido,
 * nunca tiene scroll interno (así siempre ves todo lo que escribiste,
 * desde la primera línea). Incluye el botón para insertar notas en
 * cualquier punto del texto.
 *
 * La nota queda incrustada en el mismo texto como ⟦contenido⟧. En el
 * bosquejo final eso se convierte en un pequeño 📝 justo en ese punto.
 */
export default function CampoTexto({ value, onChange, placeholder, minRows = 2, className = '' }) {
  const taRef = useRef(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [borrador, setBorrador] = useState('');

  // Ajusta la altura al contenido real. Se llama al escribir, al montar,
  // y cuando cambia el ancho de la ventana (porque al refluir el texto
  // cambia el número de líneas).
  const ajustar = useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => { ajustar(); }, [value, ajustar]);

  useEffect(() => {
    window.addEventListener('resize', ajustar);
    return () => window.removeEventListener('resize', ajustar);
  }, [ajustar]);

  const abrirModal = () => {
    setBorrador('');
    setModalAbierto(true);
  };

  const insertarNota = () => {
    if (!borrador.trim()) return;
    const el = taRef.current;
    const texto = value || '';
    const inicio = el?.selectionStart ?? texto.length;
    const fin = el?.selectionEnd ?? texto.length;
    const marcador = `⟦${borrador.trim()}⟧`;
    const nuevo = texto.slice(0, inicio) + marcador + texto.slice(fin);
    onChange(nuevo);
    setModalAbierto(false);
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      const pos = inicio + marcador.length;
      el.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="be-campo-notas">
      <textarea
        ref={taRef}
        rows={minRows}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`be-texto-libre ${className}`}
      />
      <button type="button" className="be-btn-insertar-nota" onClick={abrirModal}>
        📝 + Nota aquí
      </button>

      <Modal
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        titulo="Insertar nota"
        footer={
          <>
            <button
              type="button"
              className="nota-btn nota-btn-plano"
              onClick={() => setModalAbierto(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="nota-btn nota-btn-principal"
              onClick={insertarNota}
              disabled={!borrador.trim()}
            >
              Insertar
            </button>
          </>
        }
      >
        <textarea
          className="nota-textarea"
          autoFocus
          rows={5}
          placeholder="Escribe la nota que quieres dejar en este punto del texto…"
          value={borrador}
          onChange={(e) => setBorrador(e.target.value)}
        />
      </Modal>
    </div>
  );
}
