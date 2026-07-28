import React from 'react';

/**
 * Las notas quedan incrustadas en el mismo texto como ⟦contenido⟧
 * (el editor las inserta con el botón "📝 + Nota aquí"). Esta función
 * las convierte en botones "📝" clicables al momento de leer el
 * bosquejo — el resto del texto se ve normal, sin el marcador.
 */
const MARCADOR = /⟦([\s\S]*?)⟧/g;

export function renderTextoConNotas(texto, onAbrirNota, key = 'n') {
  if (!texto) return null;

  const partes = [];
  let ultimo = 0;
  let i = 0;
  let m;
  MARCADOR.lastIndex = 0;

  while ((m = MARCADOR.exec(texto)) !== null) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    const contenido = m[1];
    partes.push(
      <button
        key={`${key}-nota-${i++}`}
        type="button"
        className="nota-inline"
        onClick={() => onAbrirNota('Nota', contenido)}
        aria-label="Ver nota"
        title="Ver nota"
      >
        📝
      </button>
    );
    ultimo = MARCADOR.lastIndex;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));

  return partes;
}

/** true si el texto trae al menos un marcador de nota (útil para no
 * renderizar bloques vacíos cuando solo hay notas y nada de texto). */
export function tieneTextoVisible(texto) {
  if (!texto) return false;
  return texto.replace(MARCADOR, '').trim().length > 0;
}
