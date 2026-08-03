import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import Modal from '../common/Modal';

/**
 * Superficie de escritura sin caja: crece hacia abajo con el contenido,
 * nunca tiene scroll interno — siempre ves todo lo que escribiste, desde
 * la primera línea.
 *
 * Formato ligero (Markdown-style): **negrita** y ==resaltado==. Los
 * marcadores se guardan dentro del mismo texto plano, así no cambia nada
 * del guardar/cargar/notas; se renderizan bonito al leer y al predicar.
 */
export default function CampoTexto({ value, onChange, placeholder, minRows = 2, className = '' }) {
  const taRef = useRef(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [borrador, setBorrador] = useState('');

  const ajustar = useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';                    // suelta el alto anterior
    el.style.height = `${el.scrollHeight}px`;    // y toma el del contenido real
  }, []);

  // useLayoutEffect: ajusta ANTES de pintar, para que no se vea el salto.
  useLayoutEffect(() => { ajustar(); });

  // El texto refluye si cambia el ancho (girar el teléfono, cambiar de
  // diapositiva, abrir el teclado): hay que recalcular el alto.
  useLayoutEffect(() => {
    const el = taRef.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', ajustar);
      return () => window.removeEventListener('resize', ajustar);
    }
    const ro = new ResizeObserver(ajustar);
    ro.observe(el);
    return () => ro.disconnect();
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
      ajustar();
    });
  };

  // Envuelve la selección (o inserta en el cursor) con una marca de formato.
  const envolver = (marca) => {
    const el = taRef.current;
    const texto = value || '';
    const inicio = el?.selectionStart ?? texto.length;
    const fin = el?.selectionEnd ?? texto.length;
    const seleccion = texto.slice(inicio, fin);
    const nuevo = texto.slice(0, inicio) + marca + seleccion + marca + texto.slice(fin);
    onChange(nuevo);
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      const pos = seleccion
        ? inicio + marca.length + seleccion.length + marca.length
        : inicio + marca.length;
      el.setSelectionRange(pos, pos);
      ajustar();
    });
  };

  return (
    <div className="be-campo-notas">
      <textarea
        ref={taRef}
        rows={minRows}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); ajustar(); }}
        onInput={ajustar}
        className={`be-texto-libre ${className}`}
        style={{
          overflowY: 'hidden',   // sin scroll interno: el campo crece
          resize: 'none',
          minHeight: 0,
          maxHeight: 'none',
          boxSizing: 'border-box',
        }}
      />

      <div className="be-formato-barra">
        <button type="button" className="be-formato-btn" onClick={() => envolver('**')} title="Negrita (rodea la palabra seleccionada)"><b>N</b></button>
        <button type="button" className="be-formato-btn" onClick={() => envolver('==')} title="Resaltar (rodea la palabra seleccionada)">🖍</button>
        <button type="button" className="be-btn-insertar-nota" onClick={abrirModal}>📝 + Nota aquí</button>
      </div>

      <Modal
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        titulo="Insertar nota"
        footer={
          <>
            <button type="button" className="nota-btn nota-btn-plano" onClick={() => setModalAbierto(false)}>
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