import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 11: "El juicio final ante el gran trono blanco" (Ap 20:11-15)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 11.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: El gran trono blanco, los libros abiertos,
//     el libro de la vida, la segunda muerte,
//     y el juicio según las obras.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 11 de Apocalipsis...');

  const curso = await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: {},
    create: {
      slug: 'apocalipsis',
      nombre: 'Apocalipsis',
      descripcion:
        'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol',
      fechaEscritura: 'c. 95 d.C.',
      orden: 1,
      activo: true,
    },
  });

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 11 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 11,
      semana: 11,
      titulo: 'El juicio final ante el gran trono blanco',
      tema:
        'La resurrección de los impíos y el juicio final donde se decide el destino eterno de todos los hombres',
      pasajeBase: 'Apocalipsis 20:11-15',
      introduccion:
        'Juan ve un gran trono blanco y a Aquel que está sentado en él, delante de quien huyen la tierra y el cielo. Los muertos, grandes y pequeños, están de pie delante del trono, y los libros son abiertos. También es abierto el libro de la vida. Los muertos son juzgados según lo que está escrito en los libros, conforme a sus obras. El mar, la muerte y el Hades entregan a los muertos que había en ellos, y cada uno es juzgado según sus obras. La muerte y el Hades son lanzados al lago de fuego. Y todo aquel cuyo nombre no se halló escrito en el libro de la vida es lanzado al lago de fuego. Este es el juicio final, el momento en que toda injusticia es rectificada y la justicia de Dios se manifiesta plenamente.',
      contextoHistorico:
        'La imagen de un juicio final donde se abren libros era común en el Antiguo Testamento (ver Daniel 7:9-10, donde el Anciano de días se sienta en un trono y los libros son abiertos). El "libro de la vida" aparece en el Éxodo (Éxodo 32:32-33, donde Moisés pide ser borrado del libro), en los Salmos (Salmo 69:28) y en el Nuevo Testamento (Filipenses 4:3; Apocalipsis 3:5; 13:8; 17:8). En la antigüedad, las ciudades llevaban registros de sus ciudadanos; ser borrado del registro significaba perder la ciudadanía. El "lago de fuego" (verificar) era una imagen de la gehena o valle de Hinom, un lugar cerca de Jerusalén asociado con el juicio y el fuego (ver Jeremías 7:31-32; 19:6). En el judaísmo del segundo templo, el juicio final y la resurrección eran creencias comunes, aunque con diversas interpretaciones sobre quiénes serían juzgados y el destino final de los impíos (verificar).',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 20:12',
            texto:
              'Y vi a los muertos, grandes y pequeños, de pie ante Dios; y los libros fueron abiertos, y otro libro fue abierto, el cual es el libro de la vida; y fueron juzgados los muertos por las cosas que estaban escritas en los libros, según sus obras.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 20:15',
            texto:
              'Y el que no se halló inscrito en el libro de la vida fue lanzado al lago de fuego.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Interpreta el gran trono blanco como el juicio de Dios sobre Israel en el año 70 d.C., y sobre el Imperio Romano. Los "libros" son los registros de las obras de las naciones. La "segunda muerte" es la destrucción total de Jerusalén. Valor: conecta el juicio con un evento histórico de gran importancia. Límite (según nuestra postura): reduce un juicio universal a un evento local, y no da cuenta de la resurrección de todos los muertos.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve el juicio del gran trono blanco como el juicio final de todas las naciones a lo largo de la historia, aplicando los libros a los registros de las acciones de imperios y sistemas. La "segunda muerte" es el fin de los sistemas opresores. Valor: reconoce que Dios juzga en la historia. Límite: la aplicación a sistemas históricos concretos es especulativa.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista (POSTURA PROPIA)',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). El gran trono blanco es el juicio final de todos los impíos de todas las épocas, después del milenio y la derrota final de Satanás. Este juicio incluye a los que han muerto sin Cristo, que resucitan para ser juzgados. Los libros contienen el registro de las obras de cada persona, y el libro de la vida contiene los nombres de los redimidos. La "segunda muerte" es el castigo eterno en el lago de fuego. La Iglesia ya ha sido juzgada en el tribunal de Cristo (ver 2 Corintios 5:10), y los santos reinan con Cristo durante el milenio.',
            esPosturaPropia: true,
            orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Interpreta el juicio del trono blanco como el juicio de Dios sobre el pecado y la injusticia en todas las épocas. Los libros representan la conciencia humana y la ley de Dios escrita en los corazones. La "segunda muerte" es la separación eterna de Dios. Valor: enfatiza la certeza del juicio divino y la responsabilidad humana. Límite (según nuestra postura): al espiritualizar el juicio, puede perder la dimensión de un evento futuro y literal.',
            esPosturaPropia: false,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'El gran trono blanco',
            significado:
              'Representa el juicio final de Dios, donde toda la humanidad es juzgada con justicia y verdad.',
            referencias: 'Apocalipsis 20:11',
            trasfondoCultural:
              'En el mundo antiguo, los reyes se sentaban en tronos para juzgar a sus súbditos. El color "blanco" simboliza pureza, justicia y santidad. En Daniel 7:9-10, el "Anciano de días" se sienta en un trono de fuego para juzgar a las naciones. Este trono es "grande" porque su autoridad es absoluta, y "blanco" porque su juicio es perfectamente justo. La tierra y el cielo huyen de delante de Él, lo que indica que la creación misma es transformada por la gloria del Juez.',
            orden: 1,
          },
          {
            nombre: 'Los libros abiertos',
            significado:
              'Representan el registro de las obras de cada persona, que son la base del juicio según las obras.',
            referencias: 'Apocalipsis 20:12',
            trasfondoCultural:
              'En el mundo antiguo, los registros escritos eran esenciales para la administración de justicia. Los reyes y gobernantes llevaban libros de cuentas y registros de deudas. En el Antiguo Testamento, Dios tiene un "libro de memoria" (Malaquías 3:16) donde escribe los nombres de los que le temen. Aquí, los libros contienen las obras de cada persona, lo que significa que nadie será juzgado por ignorancia; cada acción será considerada (ver Romanos 2:6; 2 Corintios 5:10).',
            orden: 2,
          },
          {
            nombre: 'El libro de la vida',
            significado:
              'El registro de los nombres de los redimidos, aquellos que han sido salvos por la fe en Cristo y han perseverado hasta el fin.',
            referencias: 'Apocalipsis 20:12, 15',
            trasfondoCultural:
              'En las ciudades antiguas, los ciudadanos tenían sus nombres inscritos en un registro cívico; ser borrado significaba perder la ciudadanía (ver Apocalipsis 3:5). En la Biblia, el "libro de la vida" es el registro celestial de los que pertenecen a Dios (ver Éxodo 32:32-33; Salmo 69:28; Filipenses 4:3). El hecho de que sea abierto en el juicio final indica que la salvación no es automática; es necesario que el nombre esté escrito en él (ver Apocalipsis 13:8; 17:8). La seguridad del creyente está en que Cristo ha escrito su nombre en el cielo.',
            orden: 3,
          },
          {
            nombre: 'El lago de fuego',
            significado:
              'La "segunda muerte", el castigo eterno de los impíos, que es la separación definitiva de Dios.',
            referencias: 'Apocalipsis 20:14-15',
            trasfondoCultural:
              'El "lago de fuego" es una imagen de la gehena, el valle de Hinom cerca de Jerusalén, donde se quemaban basuras y desechos, y que se convirtió en un símbolo del castigo final (ver Jeremías 7:31-32; 19:6). En el judaísmo del segundo templo, la gehena era el lugar de castigo de los impíos (verificar). El fuego y el azufre recuerdan la destrucción de Sodoma y Gomorra (ver Génesis 19:24-25). La "segunda muerte" es la muerte eterna, la separación irreversible de la fuente de vida, en contraste con la primera muerte (física) que todos experimentan.',
            orden: 4,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'El Juez sentado en el gran trono blanco',
            cristoEnEl:
              'Cristo es el Juez de vivos y muertos (ver Juan 5:22-27; Hechos 10:42). Él es quien ejecuta el juicio final con justicia perfecta, porque es el Hijo del Hombre que ha vivido entre los hombres y conoce todas las cosas.',
            cita: 'Apocalipsis 20:11; Juan 5:22-27; Hechos 17:31',
            orden: 1,
          },
          {
            elemento: 'El libro de la vida',
            cristoEnEl:
              'Cristo es el Cordero inmolado que ha comprado con su sangre a los que están inscritos en el libro de la vida (ver Apocalipsis 13:8). El nombre del creyente está escrito en el libro porque Cristo ha pagado el precio de su redención.',
            cita: 'Apocalipsis 13:8; 21:27; Filipenses 4:3',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'El juicio final ante el gran trono blanco',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 20:11-15',
            citaCumplimiento: null,
            orden: 1,
          },
          {
            tema: 'La resurrección de los impíos para ser juzgados',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 20:12-13',
            citaCumplimiento: 'Juan 5:28-29; Hechos 24:15',
            orden: 2,
          },
          {
            tema: 'La condenación de los que no están en el libro de la vida',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 20:15',
            citaCumplimiento: null,
            orden: 3,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿Qué representa el "gran trono blanco" en Apocalipsis 20?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'El juicio final de todos los impíos, donde Dios juzga con justicia absoluta',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'El trono de Salomón en Jerusalén',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El lugar donde los santos son coronados',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El asiento de la bestia en el templo',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué se encuentra en los libros que son abiertos en el juicio final?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'Las obras de cada persona, según las cuales serán juzgados',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Los nombres de los ángeles caídos',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Las profecías de los profetas',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Las oraciones de los santos',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué es la "segunda muerte" según Apocalipsis 20?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'El castigo eterno en el lago de fuego, la separación definitiva de Dios',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La muerte física que todos experimentamos',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'La muerte espiritual durante la vida',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El olvido total de la existencia',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué sucede con aquellos cuyo nombre no está escrito en el libro de la vida?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'Son lanzados al lago de fuego',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Son perdonados y entran al cielo',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Son enviados de vuelta a la tierra para una segunda oportunidad',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Son aniquilados y dejan de existir',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Lección 11 "El juicio final ante el gran trono blanco" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });