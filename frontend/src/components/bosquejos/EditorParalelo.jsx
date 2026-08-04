import React from 'react';

/**
 * Editor de una tabla de paralelos. Se guarda como un "punto" con
 * tipo 'paralelo': { tipo:'paralelo', titulo, columnas:['Ley','Gracia'], filas:[['..','..'], ...] }
 * 2 columnas por defecto, filas ilimitadas. En móvil las columnas se apilan;
 * en PC van lado a lado (lo maneja el CSS).
 */
export default function EditorParalelo({ punto, ruta, acciones }) {
  const cols = Array.isArray(punto.columnas) && punto.columnas.length ? punto.columnas : ['', ''];
  const filas = Array.isArray(punto.filas) ? punto.filas : [];

  const setCol = (i, v) => {
    const nuevas = [...cols]; nuevas[i] = v;
    acciones.editar(ruta, 'columnas', nuevas);
  };
  const setCelda = (fi, ci, v) => {
    const nuevas = filas.map((f) => (Array.isArray(f) ? [...f] : cols.map(() => '')));
    if (!nuevas[fi]) nuevas[fi] = cols.map(() => '');
    nuevas[fi][ci] = v;
    acciones.editar(ruta, 'filas', nuevas);
  };
  const agregarFila = () => acciones.editar(ruta, 'filas', [...filas, cols.map(() => '')]);
  const quitarFila = (fi) => acciones.editar(ruta, 'filas', filas.filter((_, i) => i !== fi));

  return (
    <div className="be-paralelo">
      <input
        className="be-input be-paralelo-titulo"
        placeholder="Título de la tabla (ej: Primer y segundo Adán)"
        value={punto.titulo || ''}
        onChange={(e) => acciones.editar(ruta, 'titulo', e.target.value)}
      />

      <div className="be-paralelo-cols">
        {cols.map((c, ci) => (
          <input
            key={ci}
            className="be-paralelo-cabecera"
            placeholder={`Columna ${ci + 1} (ej: ${ci === 0 ? 'Ley' : 'Gracia'})`}
            value={c}
            onChange={(e) => setCol(ci, e.target.value)}
          />
        ))}
      </div>

      <div className="be-paralelo-filas">
        {filas.map((fila, fi) => (
          <div key={fi} className="be-paralelo-fila">
            {cols.map((_, ci) => (
              <textarea
                key={ci}
                className="be-paralelo-celda"
                rows={2}
                placeholder="…"
                value={(fila && fila[ci]) || ''}
                onChange={(e) => setCelda(fi, ci, e.target.value)}
              />
            ))}
            <button type="button" className="be-paralelo-quitar" onClick={() => quitarFila(fi)} title="Quitar fila">✕</button>
          </div>
        ))}
        {filas.length === 0 && (
          <p className="be-paralelo-vacio">Aún no hay filas. Agrega la primera comparación abajo.</p>
        )}
      </div>

      <button type="button" className="be-paralelo-agregar" onClick={agregarFila}>+ Agregar fila</button>
    </div>
  );
}