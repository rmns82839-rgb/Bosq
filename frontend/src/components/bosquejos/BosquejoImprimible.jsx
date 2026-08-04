import React from 'react';
import { decodificarSeccion } from '../../lib/bosquejoSecciones';

const ROMANOS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
function marcador(nivel, i) {
  if (nivel === 0) return ROMANOS[i] || String(i + 1);
  if (nivel === 1) return LETRAS[i] || String(i + 1);
  return String(i + 1);
}

const NOTA = /⟦([\s\S]*?)⟧/g;
const FMT = /(\*\*([^*\n]+)\*\*)|(==([^=\n]+)==)/g;

// Convierte texto plano (**negrita**, ==resaltado==, ⟦notas⟧) en nodos para
// impresión: las notas se vuelven superíndices y se acumulan al pie.
function renderImpreso(texto, notas, keyBase) {
  if (!texto) return null;
  const nodos = [];
  let k = 0;
  const pushTexto = (t) => {
    let u = 0, f; FMT.lastIndex = 0;
    while ((f = FMT.exec(t)) !== null) {
      if (f.index > u) nodos.push(t.slice(u, f.index));
      if (f[2] !== undefined) nodos.push(<strong key={`${keyBase}-b${k++}`}>{f[2]}</strong>);
      else if (f[4] !== undefined) nodos.push(<mark key={`${keyBase}-h${k++}`} className="pr-mark">{f[4]}</mark>);
      u = FMT.lastIndex;
    }
    if (u < t.length) nodos.push(t.slice(u));
  };
  let ultimo = 0, m;
  NOTA.lastIndex = 0;
  while ((m = NOTA.exec(texto)) !== null) {
    if (m.index > ultimo) pushTexto(texto.slice(ultimo, m.index));
    const num = notas.length + 1;
    notas.push({ n: num, contenido: m[1] });
    nodos.push(<sup key={`${keyBase}-s${num}`} className="pr-sup">{num}</sup>);
    ultimo = NOTA.lastIndex;
  }
  if (ultimo < texto.length) pushTexto(texto.slice(ultimo));
  return nodos;
}

function PieNotas({ notas, notaBloque }) {
  if (!notas.length && !notaBloque?.trim()) return null;
  return (
    <div className="pr-notas">
      {notas.map((nf) => (
        <p key={nf.n} className="pr-nota"><sup>{nf.n}</sup> {nf.contenido}</p>
      ))}
      {notaBloque?.trim() && <p className="pr-nota pr-nota-bloque">◆ {notaBloque.trim()}</p>}
    </div>
  );
}

// Tabla de paralelos para el PDF: tabla real (lado a lado), que en papel
// se lee bien y pagina sola. El título va en la cabecera del punto.
function ParaleloImpreso({ punto }) {
  const cols = Array.isArray(punto.columnas) && punto.columnas.length ? punto.columnas : ['', ''];
  const filas = Array.isArray(punto.filas) ? punto.filas : [];
  if (filas.length === 0) return null;

  return (
    <table className="pr-paralelo-tabla">
      <thead>
        <tr>
          {cols.map((c, ci) => (
            <th key={ci} className="pr-paralelo-th">{c || `Columna ${ci + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filas.map((fila, fi) => (
          <tr key={fi}>
            {cols.map((_, ci) => (
              <td key={ci} className="pr-paralelo-td">{(fila && fila[ci]) || ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


function renderPunto(p, nivel, i, salida) {
  if (p.tipo === 'paralelo') {
    salida.push(
      <div key={`pt-${nivel}-${i}-${salida.length}`} className={`pr-punto pr-nivel-${Math.min(nivel, 2)}`}>
        <p className="pr-punto-cabeza">
          <span className="pr-marcador">{marcador(nivel, i)}.</span>
          {p.titulo && <span className="pr-punto-titulo">{p.titulo}</span>}
        </p>
        <ParaleloImpreso punto={p} />
      </div>
    );
    if (Array.isArray(p.subpuntos)) p.subpuntos.forEach((sp, j) => renderPunto(sp, nivel + 1, j, salida));
    return;
  }
  const notas = [];
  const cuerpo = p.descripcion ?? p.desarrollo ?? '';
  const cuerpoNodos = renderImpreso(cuerpo, notas, `p-${nivel}-${i}`);
  salida.push(
    <div key={`pt-${nivel}-${i}-${salida.length}`} className={`pr-punto pr-nivel-${Math.min(nivel, 2)}`}>
      <p className="pr-punto-cabeza">
        <span className="pr-marcador">{marcador(nivel, i)}.</span>
        {p.titulo && <span className="pr-punto-titulo">{p.titulo}</span>}
      </p>
      {p.versos?.trim() && <p className="pr-versos">📖 {p.versos}</p>}
      {cuerpo?.trim() && <p className="pr-texto">{cuerpoNodos}</p>}
      <PieNotas notas={notas} notaBloque={p.notas} />
    </div>
  );
  if (Array.isArray(p.subpuntos)) p.subpuntos.forEach((sp, j) => renderPunto(sp, nivel + 1, j, salida));
}

function Seccion({ etiqueta, campos }) {
  const notas = [];
  const cuerpo = [];
  campos.forEach(([texto, key], idx) => {
    if (texto?.trim()) cuerpo.push(<p key={`${key}-${idx}`} className="pr-texto">{renderImpreso(texto, notas, key)}</p>);
  });
  if (!cuerpo.length && !notas.length) return null;
  return (
    <div className="pr-seccion">
      <h3 className="pr-seccion-titulo">{etiqueta}</h3>
      {cuerpo}
      <PieNotas notas={notas} />
    </div>
  );
}

export default function BosquejoImprimible({ bosquejo }) {
  if (!bosquejo) return null;
  const intro = decodificarSeccion(bosquejo.introduccion, 'gancho');
  const aplic = decodificarSeccion(bosquejo.aplicacion, 'texto');
  const concl = decodificarSeccion(bosquejo.conclusion, 'resumen');
  const puntos = Array.isArray(bosquejo.puntos) ? bosquejo.puntos : [];

  const salidaPuntos = [];
  puntos.forEach((p, i) => renderPunto(p, 0, i, salidaPuntos));

  return (
    <div className="bosquejo-print">
      <header className="pr-cabecera">
        <h1 className="pr-titulo">{bosquejo.titulo || 'Bosquejo'}</h1>
        {(bosquejo.tema?.trim() || bosquejo.proposito?.trim()) && (
          <p className="pr-meta">
            {bosquejo.tema?.trim()}
            {bosquejo.tema?.trim() && bosquejo.proposito?.trim() ? ' · ' : ''}
            {bosquejo.proposito?.trim()}
          </p>
        )}
        {bosquejo.cita?.trim() && <p className="pr-cita">📖 {bosquejo.cita}</p>}
      </header>

      <Seccion etiqueta="Introducción" campos={[[intro.gancho, 'g'], [intro.conexion, 'c']]} />
      {intro.notas?.trim() && <div className="pr-seccion"><PieNotas notas={[]} notaBloque={intro.notas} /></div>}

      {salidaPuntos.length > 0 && <div className="pr-puntos">{salidaPuntos}</div>}

      <Seccion etiqueta="Aplicación" campos={[[aplic.texto, 'a']]} />
      {aplic.notas?.trim() && <div className="pr-seccion"><PieNotas notas={[]} notaBloque={aplic.notas} /></div>}

      <Seccion etiqueta="Conclusión" campos={[[concl.resumen, 'r'], [concl.llamado, 'l']]} />
      {concl.notas?.trim() && <div className="pr-seccion"><PieNotas notas={[]} notaBloque={concl.notas} /></div>}
    </div>
  );
}