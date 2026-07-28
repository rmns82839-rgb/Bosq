import React, { useRef, useState, useEffect } from 'react';
import Modal from '../common/Modal';

/**
 * Campo de texto largo (Gancho, Conexión, desarrollo de un punto,
 * Aplicación, Resumen, Llamado…) con un botón para insertar notas
 * sueltas en cualquier lugar del texto, mientras escribes.
 *
 * La nota queda incrustada en el mismo texto como ⟦contenido⟧. En el
 * bosquejo final eso se convierte en un pequeño 📝 justo en ese punto.
 */
export default function CampoTexto({ value, onChange, placeholder, minRows = 2 }) {
  const taRef = useRef(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [borrador, setBorrador] = useState('');

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

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
        className="be-textarea"
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
