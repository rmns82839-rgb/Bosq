import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Actualizando trasfondo del curso Lucas...');

  const trasfondoAutor =
    'Lucas es el autor del tercer evangelio y del libro de los Hechos. Es el único evangelista gentil, un médico de profesión (Colosenses 4:14), y compañero de Pablo (2 Timoteo 4:11; Filemón 24). ' +
    'La tradición eclesiástica lo identifica como un historiador cuidadoso que investigó todo desde el principio (Lucas 1:1-4), entrevistando a testigos oculares. ' +
    'Eusebio de Cesarea (Historia Eclesiástica 3.4) menciona que Lucas era de Antioquía de Siria (verificar). ' +
    'Su evangelio muestra un interés especial por los gentiles, los pobres, las mujeres y los marginados. ' +
    'El vocabulario médico que utiliza en algunos pasajes refleja su profesión (verificar). ' +
    'La tradición dice que Lucas murió mártir, aunque no se sabe con certeza (verificar).';

  const trasfondoEpoca =
    'La mayoría de los estudiosos sitúa la composición del Evangelio de Lucas entre los años 60-65 d.C., aunque algunos proponen una fecha más tardía (c. 80-90 d.C.). ' +
    'Si Lucas escribió antes de la destrucción de Jerusalén (70 d.C.), como parece indicar la ausencia de una referencia explícita a ese evento en Hechos, la fecha temprana es más probable. ' +
    'Lucas escribió para Teófilo (Lucas 1:3), probablemente un gentil prominente, y su audiencia principal eran los gentiles que necesitaban un relato ordenado y confiable de la vida de Jesús. ' +
    'El contexto es el Imperio Romano del siglo I, bajo el dominio de emperadores como Augusto y Tiberio, donde el cristianismo se expandía rápidamente.';

  const fuentes =
    '• Eusebio de Cesarea, "Historia Eclesiástica" (s. IV): menciona a Lucas como autor del evangelio y los Hechos, y lo identifica como médico y compañero de Pablo.\n' +
    '• Ireneo de Lyon, "Contra las herejías" (c. 180 d.C.): cita el Evangelio de Lucas como parte del canon.\n' +
    '• Jerónimo, "De viris illustribus" (c. 393 d.C.): habla de Lucas como médico de Antioquía y autor del evangelio.\n' +
    '• El "Prólogo antimarcionita" (verificar): un documento antiguo que da detalles sobre Lucas.\n' +
    '• Testimonios de los Padres de la Iglesia: Clemente de Alejandría, Orígenes y Tertuliano atribuyen el evangelio a Lucas.\n\n' +
    'Nota: estas son fuentes históricas y tradicionales; al enseñar conviene contrastarlas y presentarlas con humildad.';

  await prisma.curso.upsert({
    where: { slug: 'lucas' },
    update: {
      trasfondoAutor,
      trasfondoEpoca,
      fuentes,
    },
    create: {
      slug: 'lucas',
      nombre: 'Lucas',
      descripcion:
        'El Evangelio de Lucas: el relato histórico y detallado de la vida, ministerio, muerte y resurrección de Jesucristo, el Salvador de todos los hombres.',
      autor: 'Lucas, el médico amado, compañero de Pablo',
      fechaEscritura: 'c. 60-65 d.C.',
      orden: 3,
      activo: true,
      trasfondoAutor,
      trasfondoEpoca,
      fuentes,
    },
  });

  console.log('✅ Trasfondo del curso Lucas actualizado (autor, época, fuentes).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });