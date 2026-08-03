import React from 'react';

/**
 * El texto plano puede llevar tres cosas incrustadas:
 *   ⟦nota⟧          → botón 📝 clicable (insertado con "📝 + Nota aquí")
 *   **negrita**     → texto en negrita
 *   ==resaltado==   → texto resaltado (marcador)
 * Esta función las convierte en su forma visual al leer/predicar el
 * bosquejo. El campo sigue siendo texto plano: los marcadores solo se ven
 * mientras editas.
 */
const MARCADOR = /⟦([\s\S]*?)⟧/g;
const FORMATO = /(\*\*([^*\n]+)\*\*)|(==([^=\n]+)==)/g;

// Renderiza **negrita** y ==resaltado== dentro de un fragmento de texto.
function renderFormato(texto, key) {
  const nodos = [];
  let ultimo = 0;
  let j = 0;
  let f;
  FORMATO.lastIndex = 0;
  while ((f = FORMATO.exec(texto)) !== null) {
    if (f.index > ultimo) nodos.push(texto.slice(ultimo, f.index));
    if (f[2] !== undefined) {
      nodos.push(<strong key={`${key}-b-${j++}`} className="texto-negrita">{f[2]}</strong>);
    } else if (f[4] !== undefined) {
      nodos.push(<mark key={`${key}-h-${j++}`} className="texto-resaltado">{f[4]}</mark>);
    }
    ultimo = FORMATO.lastIndex;
  }
  if (ultimo < texto.length) nodos.push(texto.slice(ultimo));
  return nodos.length ? nodos : texto;
}

export function renderTextoConNotas(texto, onAbrirNota, key = 'n') {
  if (!texto) return null;

  const partes = [];
  let ultimo = 0;
  let i = 0;
  let m;
  MARCADOR.lastIndex = 0;

  while ((m = MARCADOR.exec(texto)) !== null) {
    if (m.index > ultimo) {
      partes.push(...[].concat(renderFormato(texto.slice(ultimo, m.index), `${key}-t${i}`)));
    }
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
  if (ultimo < texto.length) {
    partes.push(...[].concat(renderFormato(texto.slice(ultimo), `${key}-tf`)));
  }

  return partes;
}

/** true si el texto trae contenido visible (ignora notas y marcadores de
 * formato), para no renderizar bloques vacíos. */
export function tieneTextoVisible(texto) {
  if (!texto) return false;
  return texto.replace(MARCADOR, '').replace(/\*\*|==/g, '').trim().length > 0;
}