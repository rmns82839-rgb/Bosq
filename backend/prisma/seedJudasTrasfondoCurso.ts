import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Judas — Trasfondo del curso: autor, época y fuentes.
//  ⚠️ DATOS A VERIFICAR (ver lista en el chat):
//   - Judas "hermano de Jacobo" (¿hermano de Jesús? ¿hijo de José?)
//   - Fecha de escritura (65-80 d.C.)
//   - Eusebio "Hist. Ecl." 3.25 → Judas como libro "disputado" (antilegomena)
//   - Clemente de Alejandría sobre Judas (verificar)
//   - Josefo "Antigüedades" 20.9.1 → muerte de Jacobo (hermano de Jesús)
//   - Debate sobre el autor (¿Judas hermano de Jesús?)
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Actualizando trasfondo del curso Judas...');

  const trasfondoAutor =
    'Según la tradición de la Iglesia, el autor es Judas, "siervo de Jesucristo y hermano de Jacobo" (Judas 1:1). ' +
    'La identificación de este Judas ha sido debatida. La mayoría de los estudiosos lo identifican con Judas, ' +
    'hermano de Jesús (Mateo 13:55; Marcos 6:3), quien también es llamado "hermano de Jacobo". ' +
    'No debe confundirse con Judas Iscariote, el traidor. ' +
    'Este Judas, como sus hermanos Santiago (Jacobo) y José, no creyó en Jesús durante su ministerio terrenal ' +
    '(Juan 7:5), pero después de la resurrección se convirtió en un líder en la iglesia primitiva ' +
    '(Hechos 1:14; 1 Corintios 9:5). ' +
    'La tradición eclesiástica primitiva (Eusebio, Historia Eclesiástica 3.25) clasifica a Judas entre los libros "disputados" (antilegomena), ' +
    'es decir, que no fueron aceptados universalmente en todas las iglesias desde el principio, ' +
    'pero que finalmente fueron reconocidos como canónicos. ' +
    'Clemente de Alejandría (verificar) menciona que Judas fue escrito por el hermano de Jesús. ' +
    'Algunos estudiosos modernos cuestionan si el autor fue realmente el hermano de Jesús, ' +
    'pero la tradición y el texto mismo (que se presenta con autoridad) respaldan su identidad como Judas, ' +
    'siervo de Cristo y hermano de Jacobo (no el apóstol).';

  const trasfondoEpoca =
    'La fecha de escritura de la epístola de Judas es incierta. La mayoría de los estudiosos la sitúan entre los años 65 y 80 d.C. ' +
    'Varios factores apoyan esta datación: ' +
    '1) La epístola asume que los falsos maestros ya se han infiltrado en la iglesia, lo cual era común en el período post-apostólico. ' +
    '2) Judas hace referencia a las palabras de los apóstoles como algo ya conocido (Judas 1:17-18), lo que sugiere que la generación apostólica estaba terminando. ' +
    '3) La carta no menciona la destrucción de Jerusalén en el año 70 d.C., lo que algunos interpretan como una fecha anterior a ese evento, ' +
    'aunque otros argumentan que la ausencia no es concluyente. ' +
    '4) La situación de la iglesia refleja conflictos con falsos maestros que promueven libertinaje, ' +
    'lo cual encaja bien con el período de las pastorales (1 Timoteo, Tito) y con el contexto de finales del siglo I. ' +
    'Algunos eruditos proponen una fecha más tardía, hacia finales del siglo I (c. 80-90 d.C.), ' +
    'especialmente si se considera la relación literaria entre Judas y 2 Pedro (muchos creen que 2 Pedro usó a Judas o viceversa). ' +
    'En cualquier caso, la epístola fue escrita en un contexto de crisis doctrinal, donde la iglesia enfrentaba enseñanzas que distorsionaban la gracia de Dios.';

  const fuentes =
    '• Eusebio de Cesarea, "Historia Eclesiástica" (s. IV): clasifica a Judas como un libro "disputado" (antilegomena), pero aceptado por muchos. ' +
    'Menciona que el autor era hermano de Jacobo y, por tanto, hermano de Jesús (verificar).\n' +
    '• Clemente de Alejandría (c. 150-215 d.C.): menciona la epístola y la atribuye a Judas, hermano de Jesús (verificar).\n' +
    '• Orígenes (c. 185-254 d.C.): acepta Judas como canónico y comenta sobre su autoría (verificar).\n' +
    '• Jerónimo (c. 347-420 d.C.): en su "De viris illustribus", menciona a Judas como autor de la epístola, ' +
    'notando que algunos la cuestionaban por la referencia al libro apócrifo de Enoc (Judas 1:14-15).\n' +
    '• Josefo, "Antigüedades de los judíos" 20.9.1: menciona la muerte de Jacobo (Santiago), el hermano de Jesús, ' +
    'lo que arroja luz sobre la familia de Jesús y el contexto de Judas.\n\n' +
    'Nota: estas son fuentes históricas y tradicionales; al enseñar conviene contrastarlas y presentarlas con humildad, ' +
    'distinguishedo el dato firme de la tradición. La referencia a Enoc ha sido un punto de debate en la historia de la iglesia.';

  await prisma.curso.upsert({
    where: { slug: 'judas' },
    update: { 
      trasfondoAutor, 
      trasfondoEpoca, 
      fuentes 
    },
    create: {
      slug: 'judas',
      nombre: 'Judas',
      descripcion: 'La epístola de Judas: una advertencia contra los falsos maestros y un llamado a contender ardientemente por la fe.',
      autor: 'Judas, siervo de Jesucristo y hermano de Jacobo',
      fechaEscritura: 'c. 65-80 d.C.',
      orden: 2,
      activo: true,
      trasfondoAutor,
      trasfondoEpoca,
      fuentes,
    },
  });

  console.log('✅ Trasfondo del curso Judas actualizado (autor, época, fuentes).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });