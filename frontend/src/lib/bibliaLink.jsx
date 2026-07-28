// ============================================================================
// bibliaLink.jsx — Enlaza citas bíblicas a la RVR1960 en YouVersion / Bible.com
// Reemplaza el lector propio (roto). En móvil, el enlace abre la app YouVersion
// si está instalada; si no, cae al lector web. Cero mantenimiento, sin líos de
// licencia (la RVR1960 tiene derechos de autor; YouVersion ya la licenció).
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

// Normaliza: minúsculas, sin acentos, sin espacios ni puntos.
const normaliza = (s) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[\s.]/g, '');

/**
 * Convierte una cita ("Apocalipsis 1:8", "1 Juan 4:7-9", "Salmos 23") en la
 * URL de la RVR1960 en Bible.com. Devuelve null si no puede interpretar la cita.
 */
export function youVersionUrl(cita, versionId = RVR1960_VERSION_ID) {
  if (!cita || typeof cita !== 'string') return null;

  // Separa "Libro" de "Capítulo[:Versículo[-Versículo]]".
  // Captura: (nombre con posibles números y espacios) (cap) [ : verso [ - verso ] ]
  const m = cita.trim().match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
  if (!m) return null;

  const [, libroRaw, cap, versoIni, versoFin] = m;
  const usfm = USFM[normaliza(libroRaw)];
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
