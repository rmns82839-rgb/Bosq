import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 6: "La mujer, el dragón y las dos bestias" (Ap 12–13)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 6.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: Identidad de la mujer (Israel/La Iglesia?), 
//     el dragón (Satanás), bestias (poder político y religioso),
//     y el número 666 (marca del imperio, nombre de hombre).
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 6 de Apocalipsis...');

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

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 6 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 6,
      semana: 6,
      titulo: 'La mujer, el dragón y las dos bestias',
      tema:
        'La confrontación cósmica entre el pueblo de Dios, Satanás y los poderes del mundo',
      pasajeBase: 'Apocalipsis 12–13',
      introduccion:
        'El capítulo 12 abre con una señal en el cielo: una mujer embarazada, un dragón rojo y un niño que ha de gobernar con vara de hierro. El dragón es derrotado y arrojado a la tierra, y entonces persigue a la mujer. Desde el mar surge una bestia con diez cuernos y siete cabezas, a la que el dragón da su poder; y de la tierra emerge otra bestia que hace que toda la tierra adore a la primera. Es el drama profético de la historia de la salvación, visto desde el cielo: la guerra contra el pueblo de Dios y la imitación satánica del Hijo y del Espíritu. La Iglesia ya ha sido arrebatada, y esta escena describe la tribulación sobre Israel y las naciones.',
      contextoHistorico:
        'Para un lector del siglo I, la imagen del dragón con siete cabezas evocaba al monstruo marino Leviatán, símbolo del caos y del mal, y también recordaba a los imperios opresores (Egipto, Asiria, Babilonia, Persia, Grecia y Roma). La bestia que emerge del mar era una imagen conocida del poder político hostil a Dios (ver Daniel 7). La segunda bestia, que actúa como un "falso profeta", refleja los cultos imperiales que exigían adoración al emperador. El número 666 era un enigma en el mundo antiguo; según Ireneo (c. 180 d.C.) (verificar), algunos identificaban el número con el nombre de Nerón o con un sistema de valores numéricos. El trasfondo es una persecución real contra los cristianos que se negaban a adorar al César, pero la profecía mira más allá de Roma hacia un poder final y mundial.',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 12:11',
            texto:
              'Y ellos le han vencido por medio de la sangre del Cordero y de la palabra del testimonio de ellos, y menospreciaron sus vidas hasta la muerte.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 13:8',
            texto:
              'Y la adoraron todos los moradores de la tierra cuyos nombres no estaban escritos en el libro de la vida del Cordero que fue inmolado desde el principio del mundo.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Ve en la mujer a Israel perseguido, en el dragón a Satanás actuando a través de Roma, y en las bestias a las instituciones políticas y religiosas que persiguieron a los cristianos en el siglo I. La "mujer" que huye al desierto es la iglesia primitiva que escapa de la persecución. Valor: conecta el texto con el contexto inmediato de la persecución romana. Límite (según nuestra postura): reduce la profecía a un solo evento histórico y no deja espacio para el cumplimiento escatológico final que el texto mismo parece anunciar.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Interpreta la mujer como la Iglesia verdadera que atraviesa los siglos, el dragón como el poder de Roma pagana y luego papal, y las bestias como imperios y sistemas de poder que se han sucedido a lo largo de la historia (algunos los identifican con el Imperio Romano, el papado, Napoleón, Hitler, etc.). Valor: reconoce la lucha constante entre el bien y el mal en la historia. Límite: la identificación de cada bestia con figuras históricas concretas es altamente especulativa y cambia según el intérprete.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). La mujer representa al Israel creyente y también al remanente fiel que será protegido durante la Gran Tribulación. El dragón es Satanás, expulsado del cielo, que se encarniza contra el pueblo de Dios en la tierra. La primera bestia es un imperio mundial y un líder político (el anticristo), y la segunda es su cómplice religioso (el falso profeta). El capítulo describe el tiempo de la tribulación sobre un mundo que ha rechazado a Dios, después del arrebatamiento de la Iglesia. La séptima trompeta ya ha anunciado el reino; ahora vemos quién se opone.',
            esPosturaPropia: true,
            orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Entiende estos capítulos como una representación simbólica de la lucha espiritual continua entre el reino de Dios y las fuerzas del mal. La mujer es la Iglesia de todos los tiempos, el dragón es Satanás, y las bestias son los sistemas de poder que se oponen a Dios en cualquier época. Valor: mantiene la relevancia del texto para cada generación. Límite (según nuestra postura): al espiritualizar el cumplimiento, puede perder la dimensión histórica y profética concreta que el texto enseña, especialmente en la línea futurista.',
            esPosturaPropia: false,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'La mujer vestida de sol',
            significado:
              'Simboliza al pueblo de Dios (Israel y la Iglesia) que espera al Mesías y es protegido por Dios.',
            referencias: 'Apocalipsis 12:1-2',
            trasfondoCultural:
              'En el mundo antiguo, el sol, la luna y las estrellas se asociaban con la grandeza y la realeza. La mujer embarazada evoca a una nación que da a luz a su salvador. En la literatura judía, el pueblo de Israel es frecuentemente representado como una mujer (ver Isaías 54:5-6, Jeremías 3:6-10). La imagen tiene ecos de la visión de José en Génesis 37:9-11, donde el sol, la luna y las estrellas representan a Israel.',
            orden: 1,
          },
          {
            nombre: 'El dragón rojo',
            significado:
              'Es Satanás, el acusador de los hermanos, que busca devorar al hijo y perseguir a la mujer.',
            referencias: 'Apocalipsis 12:3-4, 9',
            trasfondoCultural:
              'El dragón era en el antiguo Oriente el símbolo del caos, del mal y de las fuerzas que se oponen a Dios (ver Isaías 27:1, donde Dios castiga a Leviatán). Sus siete cabezas y diez cuernos evocan a los imperios que han perseguido a Israel: Egipto, Asiria, Babilonia, etc. El color rojo recuerda la sangre derramada y la ferocidad del perseguidor (verificar). Según la tradición judía, el dragón era una figura del poder demoníaco.',
            orden: 2,
          },
          {
            nombre: 'El hijo varón',
            significado:
              'Representa a Jesucristo, que ha de gobernar todas las naciones con vara de hierro y que fue exaltado al cielo.',
            referencias: 'Apocalipsis 12:5',
            trasfondoCultural:
              'La "vara de hierro" era un símbolo de autoridad absoluta y juicio (ver Salmo 2:9). Un lector judío entendía inmediatamente que el niño era el Mesías prometido, que gobernaría sobre los reinos del mundo. La ascensión al cielo es una referencia al triunfo de Cristo sobre la muerte y a su entronización a la diestra de Dios.',
            orden: 3,
          },
          {
            nombre: 'La bestia del mar',
            significado:
              'Simboliza un imperio mundial y un líder político que recibe poder del dragón y blasfema contra Dios.',
            referencias: 'Apocalipsis 13:1-10',
            trasfondoCultural:
              'En el Antiguo Testamento, el "mar" es el abismo, el lugar del caos y de donde salen los monstruos. La bestia con diez cuernos (10 reyes) y siete cabezas (7 imperios) es una fusión de las cuatro bestias de Daniel 7 (león, oso, leopardo, y el cuarto temible). Para el lector del siglo I, era un símbolo del poder imperial romano, pero con una dimensión que va más allá de Roma hacia un poder final y mundial. (verificar) El nombre blasfemo que lleva es una parodia del nombre de Dios.',
            orden: 4,
          },
          {
            nombre: 'La bestia de la tierra',
            significado:
              'Es la segunda bestia, que ejerce la autoridad de la primera y hace que la tierra adore a la primera bestia. Se identifica con el falso profeta.',
            referencias: 'Apocalipsis 13:11-18',
            trasfondoCultural:
              'Esta bestia "semejante a un cordero" pero que "hablaba como dragón" era una imagen del engaño religioso. En el imperio romano, los sacerdotes del culto imperial promovían la adoración al emperador y perseguían a quienes se negaban. Para un cristiano que leía esto, era una advertencia contra los falsos profetas que mezclaban religión con poder político. La marca 666 (verificar) podría ser una referencia al sistema de numeración judío-griego que sumaba las letras de un nombre, o al emperador Nerón, cuyo nombre en hebreo puede dar esa suma (verificar).',
            orden: 5,
          },
          {
            nombre: 'El número 666',
            significado:
              'Es el número de la primera bestia, que identifica a sus seguidores y marca el control económico, pero no es un número que pueda salvar.',
            referencias: 'Apocalipsis 13:18',
            trasfondoCultural:
              'En la antigüedad, las letras hebreas y griegas tenían valor numérico (gematría). El 666 era el número que sumaba un nombre humano. Según Ireneo (c. 180 d.C.) (verificar), algunos consideraban que se refería al nombre de Nerón (Neron Kesar) o a un imperio futuro. Otros interpretan que el 6 es el número del hombre, y el 666 representa la plenitud del hombre en su oposición a Dios (el 7 es perfección divina, el 6 es imperfección). La tradición lo ha asociado con el anticristo, aunque no hay consenso sobre la identidad exacta.',
            orden: 6,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'El hijo varón que ha de gobernar con vara de hierro',
            cristoEnEl:
              'Cristo es el Mesías triunfante que ha vencido al dragón y que reinará sobre todas las naciones; es el cumplimiento de la promesa del Salmo 2.',
            cita: 'Apocalipsis 12:5; Salmo 2:9',
            orden: 1,
          },
          {
            elemento: 'La sangre del Cordero que vence al acusador',
            cristoEnEl:
              'La victoria sobre Satanás no se logra por el poder humano, sino por el sacrificio de Cristo. Su sangre es el fundamento de nuestra salvación y el arma que desarma al diablo.',
            cita: 'Apocalipsis 12:11; 1 Juan 1:7',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'La persecución del dragón contra el pueblo de Dios',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 12:13-17',
            citaCumplimiento: null,
            orden: 1,
          },
          {
            tema: 'La bestia del mar: un poder político mundial que blasfema contra Dios',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 13:1-10',
            citaCumplimiento: null,
            orden: 2,
          },
          {
            tema: 'La bestia de la tierra y la marca de la bestia (666)',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 13:11-18',
            citaCumplimiento: null,
            orden: 3,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿A quién representa la mujer vestida de sol en Apocalipsis 12?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'Al Israel creyente y al remanente fiel que espera al Mesías',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'A la ciudad de Roma',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'A la bestia del mar',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Al Imperio Romano en su totalidad',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué representa la bestia que emerge del mar en Apocalipsis 13?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'Un imperio político y un líder mundial hostil a Dios (el anticristo)',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La Iglesia perseguida',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El Espíritu Santo',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Los ángeles caídos',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Cuál es el significado principal del número 666 en Apocalipsis 13?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'Es el número de la imperfección humana que se opone a Dios',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Es la cantidad de años que durará el reino de la bestia',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Es el número de ángeles que caerán del cielo',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Es el código secreto para entrar al cielo',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué les sucede a los que se niegan a adorar a la bestia?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'Son perseguidos y muchos son martirizados',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Son llevados al cielo inmediatamente',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Son perdonados automáticamente por la bestia',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Nada les sucede, la bestia los deja vivir en paz',
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

  console.log('✅ Lección 6 "La mujer, el dragón y las dos bestias" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });