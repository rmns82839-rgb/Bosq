// ============================================================================
// bibliaLink.jsx — Enlaza citas bíblicas a la RVR1960 en YouVersion / Bible.com
// Reemplaza el lector propio (roto). En móvil, el enlace abre la app YouVersion
// si está instalada; si no, cae al lector web. Cero mantenimiento, sin líos de
// licencia (la RVR1960 tiene derechos de autor; YouVersion ya la licenció).
//
// Tolerante a errores de tecleo: acepta ":", ".", "-" o combinaciones como
// separador entre capítulo y versículo, y reconoce nombres de libro con una
// letra cambiada, faltante o transpuesta (ej. "jaun" -> "juan").
// ============================================================================

const RVR1960_VERSION_ID = 149; // id de la RVR1960 en Bible.com

// Nombre del libro (en español, sin importar acentos/mayúsculas) -> código USFM
const USFM = {
  genesis: 'GEN', exodo: 'EXO', levitico: 'LEV', numeros: 'NUM',
  deuteronomio: 'DEU', josue: 'JOS', jueces: 'JDG', rut: 'RUT',
  '1samuel': '1SA', '2samuel': '2SA', '1reyes': '1KI', '2reyes': '2KI',
  '1cronicas': '1CH', '2cronicas': '2CH', esdras: 'EZR', nehemias: 'NEH',
  ester: 'EST', job: 'JOB', salmo: 'PSA', salmos: 'PSA', proverbios: 'PRO',
  eclesiastes: 'ECC', cantares: 'SNG', 'cantardeloscantares': 'SNG',
  isaias: 'ISA', jeremias: 'JER', lamentaciones: 'LAM', ezequiel: 'EZK',
  daniel: 'DAN', oseas: 'HOS', joel: 'JOL', amos: 'AMO', abdias: 'OBA',
  jonas: 'JON', miqueas: 'MIC', nahum: 'NAM', habacuc: 'HAB', sofonias: 'ZEP',
  hageo: 'HAG', zacarias: 'ZEC', malaquias: 'MAL',
  mateo: 'MAT', marcos: 'MRK', lucas: 'LUK', juan: 'JHN', hechos: 'ACT',
  'hechosdelosapostoles': 'ACT', romanos: 'ROM', '1corintios': '1CO',
  '2corintios': '2CO', galatas: 'GAL', efesios: 'EPH', filipenses: 'PHP',
  colosenses: 'COL', '1tesalonicenses': '1TH', '2tesalonicenses': '2TH',
  '1timoteo': '1TI', '2timoteo': '2TI', tito: 'TIT', filemon: 'PHM',
  hebreos: 'HEB', santiago: 'JAS', '1pedro': '1PE', '2pedro': '2PE',
  '1juan': '1JN', '2juan': '2JN', '3juan': '3JN', judas: 'JUD',
  apocalipsis: 'REV', revelacion: 'REV', apocalipse: 'REV',
};
const LIBROS = Object.keys(USFM);

// Normaliza: minúsculas, sin acentos, sin espacios ni puntos.
const normaliza = (s) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[\s.]/g, '');

/**
 * Distancia de edición (Optimal String Alignment): cuenta inserciones,
 * borrados, sustituciones y transposiciones de letras adyacentes como
 * 1 solo cambio — así "jaun" queda a distancia 1 de "juan", no 2.
 */
function distancia(a, b) {
  const d = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) d[i][0] = i;
  for (let j = 0; j <= b.length; j++) d[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + costo
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + costo);
      }
    }
  }
  return d[a.length][b.length];
}

/** Busca el código USFM del libro, tolerando pequeños errores de tecleo. */
function buscarLibro(nombreNormalizado) {
  if (USFM[nombreNormalizado]) return USFM[nombreNormalizado];

  let mejorLibro = null;
  let mejorDistancia = Infinity;
  for (const libro of LIBROS) {
    const d = distancia(nombreNormalizado, libro);
    if (d < mejorDistancia) {
      mejorDistancia = d;
      mejorLibro = libro;
    }
  }

  // Tolerancia proporcional al largo del nombre: nombres cortos ("rut",
  // "job") solo admiten 1 cambio; nombres largos admiten hasta 2.
  const tolerancia = Math.max(1, Math.floor(mejorLibro.length / 5));
  return mejorDistancia <= tolerancia ? USFM[mejorLibro] : null;
}

/**
 * Convierte una cita ("Apocalipsis 1:8", "1 Juan 4:7-9", "jaun 3.14",
 * "juan 14-.6") en la URL de la RVR1960 en Bible.com. Devuelve null si no
 * puede interpretar la cita en absoluto (libro irreconocible).
 */
export function youVersionUrl(cita, versionId = RVR1960_VERSION_ID) {
  if (!cita || typeof cita !== 'string') return null;

  // Libro, luego capítulo, luego —opcionalmente— cualquier separador no
  // numérico (":", ".", "-", "-.", etc.) y el versículo, con rango opcional.
  const m = cita.trim().match(/^(.+?)\s+(\d+)(?:[^\d]+(\d+)(?:-(\d+))?)?\s*$/);
  if (!m) return null;

  const [, libroRaw, cap, versoIni, versoFin] = m;
  const usfm = buscarLibro(normaliza(libroRaw));
  if (!usfm) return null;

  // Referencia estilo Bible.com: REV.1.8 | REV.1.8-9 | REV.1 (capítulo completo)
  let ref = `${usfm}.${cap}`;
  if (versoIni) ref += `.${versoIni}${versoFin ? `-${versoFin}` : ''}`;

  return `https://www.bible.com/bible/${versionId}/${ref}.RVR1960`;
}

// ---------------------------------------------------------------------------
// Componente: enlace tappable a la cita. Si la cita no se interpreta, muestra
// el texto plano (para no romper la UI).
// ---------------------------------------------------------------------------
export function VersiculoLink({ cita, children, className = '' }) {
  const url = youVersionUrl(cita);
  const texto = children || cita;

  if (!url) return <span className={className}>{texto}</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'text-primary-600 hover:text-primary-700 underline decoration-dotted ' +
        'underline-offset-2 font-medium ' + className
      }
    >
      {texto}
    </a>
  );
}

export default VersiculoLink;

// ---------------------------------------------------------------------------
// USO:
//   import { VersiculoLink } from './lib/bibliaLink';
//   <VersiculoLink cita="Apocalipsis 1:8" />
//   <VersiculoLink cita="1 Juan 4:7-9">1 Jn 4:7-9</VersiculoLink>
//
// O solo la URL, para un botón propio:
//   import { youVersionUrl } from './lib/bibliaLink';
//   youVersionUrl('Salmos 23')  ->  https://www.bible.com/bible/149/PSA.23.RVR1960
// ---------------------------------------------------------------------------
