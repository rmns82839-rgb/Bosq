import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

/**
 * Nota de un punto, mostrada como enlace que abre un modal.
 *
 * Modo lectura (readOnly=true, para VerBosquejo):
 *   No aparece si no hay nota. Si hay, muestra "📝 Nota" y el modal
 *   solo muestra el texto.
 *
 * Modo edición (readOnly=false, para el editor):
 *   Si no hay nota, muestra "+ Nota" para crearla.
 *   Si hay, muestra "📝 Nota" y el modal trae un textarea + Guardar.
 */
export default function NotaBoton({ nota, onChange, readOnly = false, className = '' }) {
  const [abierto, setAbierto] = useState(false);
  const [borrador, setBorrador] = useState(nota || '');

  useEffect(() => {
    if (abierto) setBorrador(nota || '');
  }, [abierto, nota]);

  const tieneNota = !!nota?.trim();

  if (readOnly && !tieneNota) return null;

  const guardar = () => {
    onChange?.(borrador.trim());
    setAbierto(false);
  };

  return (
    <>
      <button
        type="button"
        className={`nota-enlace ${className}`}
        onClick={() => setAbierto(true)}
      >
        {tieneNota ? '📝 Nota' : '+ Nota'}
      </button>

      <Modal
        open={abierto}
        onClose={() => setAbierto(false)}
        titulo="Nota"
        footer={
          readOnly ? null : (
            <>
              <button type="button" className="nota-btn nota-btn-plano" onClick={() => setAbierto(false)}>
                Cancelar
              </button>
              <button type="button" className="nota-btn nota-btn-principal" onClick={guardar}>
                Guardar
              </button>
            </>
          )
        }
      >
        {readOnly ? (
          <p className="nota-texto-lectura">{nota}</p>
        ) : (
          <textarea
            className="nota-textarea"
            autoFocus
            rows={6}
            placeholder="Contexto histórico, una ilustración, una referencia cruzada…"
            value={borrador}
            onChange={(e) => setBorrador(e.target.value)}
          />
        )}
      </Modal>
    </>
  );
}
