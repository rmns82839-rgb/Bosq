import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Trasfondo del curso: autor, época y fuentes.
//  ⚠️ DATOS A VERIFICAR (ver lista en el chat):
//   - Ireneo "Contra las herejías" 5.30.3 → fecha (fin de Domiciano)
//   - Suetonio "Domiciano" 13 → título "dominus et deus"
//   - Eusebio "Hist. Ecl." 3.18 y 3.23 → Patmos y regreso a Éfeso
//   - Tradición: Juan único apóstol que no murió mártir
//   - Debate autoría "Juan el anciano" vs apóstol Juan
//   - Debate sobre cuán amplia fue la persecución de Domiciano
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Actualizando trasfondo del curso Apocalipsis...');

  const trasfondoAutor =
    'Según la tradición de la Iglesia, el autor es el apóstol Juan, hijo de Zebedeo, hermano de Jacobo y uno de los doce. ' +
    'Fue pescador en Galilea, llamado por Jesús junto a su hermano, y llegó a formar parte del círculo íntimo del Señor —con Pedro y Jacobo—, ' +
    'presente en momentos como la transfiguración y Getsemaní. El Evangelio que lleva su nombre lo describe como "el discípulo a quien Jesús amaba", ' +
    'que estuvo al pie de la cruz y a quien el Señor encomendó a su madre. Tras la resurrección y Pentecostés, Juan ministró en la iglesia primitiva. ' +
    'La tradición antigua, recogida por Eusebio de Cesarea en el siglo IV, lo sitúa después en la ciudad de Éfeso, y afirma que fue desterrado a la isla de Patmos, ' +
    'donde recibió el Apocalipsis. Liberado tras la muerte de Domiciano, habría regresado a Éfeso, donde escribió su Evangelio y sus cartas, y murió anciano, ' +
    'siendo —según esta misma tradición— el único de los apóstoles que no murió como mártir. ' +
    '(Algunos estudiosos discuten si el autor fue el apóstol mismo o un discípulo distinto llamado "Juan el anciano"; la Iglesia históricamente ha sostenido que fue el apóstol Juan.)';

  const trasfondoEpoca =
    'La mayoría de los estudiosos y la tradición antigua ubican la escritura del Apocalipsis alrededor del año 95–96 d.C., hacia el final del reinado del emperador Domiciano; ' +
    'así lo afirma Ireneo de Lyon, un testigo cercano en el tiempo. (Una minoría propone una fecha más temprana, en tiempos de Nerón, cerca del año 68 d.C.) ' +
    'Las siete iglesias se encontraban en la provincia romana de Asia —la actual Turquía occidental—, donde el culto al emperador era muy fuerte: ' +
    'había templos dedicados a Roma y al César, y se esperaba que los súbditos honraran al emperador como señor. ' +
    'Se dice que Domiciano gustaba del título "señor y dios" (en latín, dominus et deus), lo cual ponía a los cristianos en un serio aprieto: ' +
    'confesar que "el Señor es Jesús" chocaba de frente con esa exigencia. Aunque los historiadores debaten cuán amplia y sistemática fue la persecución bajo Domiciano, ' +
    'sí es claro que los creyentes de Asia vivían bajo fuerte presión social y religiosa por negarse a participar del culto imperial y de la idolatría de sus ciudades. ' +
    'A esa Iglesia presionada y tentada a claudicar le escribe Juan, para consolarla y llamarla a la fidelidad hasta el fin.';

  const fuentes =
    '• Ireneo de Lyon, "Contra las herejías" (c. 180 d.C.): atribuye el libro al apóstol Juan y ubica la visión hacia el final del reinado de Domiciano. Es la fuente antigua más citada para la fecha.\n' +
    '• Eusebio de Cesarea, "Historia Eclesiástica" (s. IV): recoge la tradición del destierro de Juan en Patmos y de su regreso a Éfeso tras la muerte de Domiciano.\n' +
    '• Suetonio, "Vidas de los doce césares" (Domiciano): menciona que el emperador se hacía llamar "señor y dios".\n' +
    '• Plinio el Joven, "Cartas" (libro 10, carta 96, c. 112 d.C.): describe cómo Roma juzgaba a los cristianos, exigiéndoles honrar la imagen del emperador; es algo posterior al libro, pero ilumina la presión de aquellos años.\n' +
    '• Tácito, "Anales" (15.44): relata la hostilidad romana hacia los cristianos ya desde tiempos de Nerón.\n\n' +
    'Nota: estas son fuentes históricas y tradicionales; al enseñar conviene contrastarlas y presentarlas con humildad, distinguiendo el dato firme de la tradición.';

  await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: { trasfondoAutor, trasfondoEpoca, fuentes },
    create: {
      slug: 'apocalipsis', nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol', fechaEscritura: 'c. 95 d.C.', orden: 1, activo: true,
      trasfondoAutor, trasfondoEpoca, fuentes,
    },
  });

  console.log('✅ Trasfondo del curso Apocalipsis actualizado (autor, época, fuentes).');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });