import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Curso Judas — Epístola completa (3 lecciones)
//  Contenido redactado en la línea del Movimiento Misionero
//  Mundial (arminiana, pretribulacional). Revisar pastoralmente.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando curso de Judas...');

  // 1. Eliminar curso existente (si hay)
  await prisma.curso.deleteMany({ where: { slug: 'judas' } });

  // 2. Crear el curso con todas las lecciones
  const curso = await prisma.curso.create({
    data: {
      slug: 'judas',
      nombre: 'Judas',
      descripcion:
        'La epístola de Judas: una advertencia contra los falsos maestros y un llamado a contender ardientemente por la fe.',
      autor: 'Judas, siervo de Jesucristo y hermano de Jacobo',
      fechaEscritura: 'c. 65-80 d.C.',
      contextoGeneral:
        'Escrita por Judas (no el Iscariote), probablemente entre los años 65-80 d.C., para una iglesia que enfrentaba la infiltración de falsos maestros que promovían libertinaje y negaban a Cristo. La carta es breve pero contundente, y combina advertencias severas con una doxología gloriosa.',
      orden: 2,
      activo: true,
      lecciones: {
        create: [
          // ─── LECCIÓN 1: Introducción y llamado a contender ───
          {
            orden: 1,
            semana: 1,
            titulo: 'Contender por la fe',
            tema:
              'La fe que ha sido entregada a los santos debe ser defendida',
            pasajeBase: 'Judas 1:1-4',
            introduccion:
              'Judas comienza su carta identificándose como "siervo de Jesucristo y hermano de Jacobo". Su intención original era escribir acerca de la salvación que comparten los creyentes, pero ante la urgencia de la situación, cambia de rumbo: los exhorta a contender ardientemente por la fe que ha sido una vez dada a los santos. ¿Por qué? Porque se han infiltrado personas que convierten la gracia de Dios en libertinaje y niegan a nuestro único Dueño y Señor. El tono es de urgencia pastoral: la fe está en peligro y debe ser defendida con pasión y verdad.',
            contextoHistorico:
              'En el siglo I, la iglesia primitiva enfrentaba diversas amenazas doctrinales. Por un lado, algunos judaizantes insistían en que los gentiles debían guardar la ley de Moisés. Por otro, comenzaban a surgir enseñanzas que distorsionaban la gracia, usándola como excusa para el libertinaje (ver Romanos 6:1-2). Además, el gnosticismo empezaba a infiltrarse, negando que Cristo hubiera venido en carne (ver 1 Juan 4:2-3). Judas escribe para confrontar estas enseñanzas y proteger a la comunidad cristiana.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Judas 1:3',
                  texto:
                    'Amados, por la gran solicitud que tenía de escribiros acerca de nuestra común salvación, me ha sido necesario escribiros exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos.',
                  orden: 1,
                },
                {
                  cita: 'Judas 1:24-25',
                  texto:
                    'A aquel que es poderoso para guardaros sin caída, y presentaros sin mancha delante de su gloria con gran alegría, al único Dios nuestro Salvador, por medio de Jesucristo nuestro Señor, sea gloria y majestad, dominio y potencia, antes de todo tiempo, ahora y por todos los siglos. Amén.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta la epístola en el contexto del siglo I, dirigida a iglesias que enfrentaban herejías judaizantes o gnósticas incipientes. Las advertencias se cumplieron con la caída de Jerusalén en el 70 d.C. Valor: respeta el contexto histórico inmediato. Límite (según nuestra postura): no considera las aplicaciones proféticas finales.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en los falsos maestros de Judas un arquetipo de los herejes que han surgido a lo largo de la historia de la iglesia, desde los gnósticos hasta los modernistas. Valor: reconoce la relevancia permanente de la advertencia. Límite: su aplicación histórica es muy amplia y variable.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). La epístola de Judas describe las características de los falsos maestros que se multiplicarán en los últimos días, antes del arrebatamiento de la Iglesia. Su mensaje es una advertencia profética para que los creyentes permanezcan firmes y no se dejen engañar. La promesa de que Cristo es "poderoso para guardaros sin caída" es la seguridad de los redimidos.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta la carta como una descripción simbólica de la lucha espiritual constante entre la verdad y el error. Los falsos maestros representan toda doctrina que se desvía de la fe. Valor: mantiene la vigencia del mensaje para todas las épocas. Límite (según nuestra postura): al espiritualizar el texto, puede perder la dimensión profética concreta.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'La fe que ha sido una vez dada',
                  significado:
                    'La verdad del evangelio, el depósito de la fe que los apóstoles recibieron de Cristo y transmitieron a la iglesia.',
                  referencias: 'Judas 1:3',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El libertinaje encubierto de gracia',
                  significado:
                    'La perversión de la gracia de Dios como excusa para el pecado, negando la santidad que el evangelio exige.',
                  referencias: 'Judas 1:4',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 2,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'El único Dueño y Señor',
                  cristoEnEl:
                    'Cristo es el Señor soberano que ha comprado a su pueblo con su sangre. Negarlo es rechazar la autoridad de Aquel que tiene todo poder en el cielo y en la tierra.',
                  cita: 'Judas 1:4; 2 Pedro 2:1',
                  orden: 1,
                },
                {
                  elemento: 'La fe que ha sido entregada',
                  cristoEnEl:
                    'La fe no es una creación humana, sino un depósito que viene de Cristo. Él es el autor y consumador de la fe (Hebreos 12:2).',
                  cita: 'Judas 1:3; Hebreos 12:2',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La infiltración de falsos maestros en la iglesia',
                  estado: 'por_cumplir',
                  citaBase: 'Judas 1:4',
                  citaCumplimiento: 'Hechos 20:29-30; 1 Timoteo 4:1-2',
                  orden: 1,
                },
                {
                  tema: 'La negación de Cristo como Señor en los últimos tiempos',
                  estado: 'por_cumplir',
                  citaBase: 'Judas 1:4',
                  citaCumplimiento: null,
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado:
                    '¿Cuál es el llamado principal de Judas a los creyentes en el versículo 3?',
                  orden: 1,
                  opciones: {
                    create: [
                      {
                        texto: 'Contender ardientemente por la fe que ha sido una vez dada a los santos',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Buscar señales y milagros',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Separarse completamente del mundo',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Construir grandes iglesias',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    'Según Judas, ¿qué hacen los falsos maestros con la gracia de Dios?',
                  orden: 2,
                  opciones: {
                    create: [
                      {
                        texto: 'La convierten en libertinaje',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'La predican fielmente',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'La ignoran completamente',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'La usan para enriquecerse',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    '¿Cómo identifica Judas a su audiencia en el versículo 1?',
                  orden: 3,
                  opciones: {
                    create: [
                      {
                        texto: 'Llamados, amados en Dios Padre y guardados en Jesucristo',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Santos y fieles en Cristo',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Peregrinos y extranjeros',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Elegidos según la presciencia de Dios',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    '¿Qué autoridad se atribuye Judas al identificarse como "siervo de Jesucristo"?',
                  orden: 4,
                  opciones: {
                    create: [
                      {
                        texto: 'Se presenta como siervo (esclavo) de Cristo, sin reclamar autoridad apostólica',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Se presenta como apóstol con autoridad plena',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Se presenta como profeta del Antiguo Testamento',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Se presenta como sumo sacerdote',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 2: Ejemplos de juicio ───
          {
            orden: 2,
            semana: 2,
            titulo: 'El juicio de los falsos maestros',
            tema:
              'Dios juzga a los que se desvían de la fe y corrompen a otros',
            pasajeBase: 'Judas 5-16',
            introduccion:
              'Judas no se queda en la advertencia general; pasa a demostrar, con ejemplos claros de la Escritura, que Dios sí juzga a los que se rebelan. Recuerda al pueblo que salió de Egipto pero fue destruido por su incredulidad; a los ángeles que abandonaron su morada y están reservados en cadenas eternas; y a Sodoma y Gomorra, que sufrieron el castigo del fuego eterno. Estos ejemplos son un espejo para los falsos maestros: su juicio está seguro. Luego describe con palabras duras a estos hombres: son "nubes sin agua", "árboles sin fruto", "espumarajos del mar". Su destino es la oscuridad eterna.',
            contextoHistorico:
              'Los tres ejemplos que Judas usa (Israel en el desierto, ángeles caídos, Sodoma y Gomorra) eran bien conocidos en la tradición judía. Cada uno ilustra un pecado específico: la incredulidad (Israel), la rebelión (ángeles), y la perversión sexual (Sodoma). Además, Judas hace referencia a dos figuras del Antiguo Testamento que fueron ejemplos de codicia y rebelión: Caín (que mató a su hermano por envidia), Balaam (que enseñó a Balac a poner tropiezo a Israel por ganancia), y Coré (que se rebeló contra Moisés y fue tragado por la tierra). Estos ejemplos muestran que el juicio de Dios es cierto y que nadie escapa de su justicia.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Judas 1:7',
                  texto:
                    'Como Sodoma y Gomorra y las ciudades circunvecinas, las cuales de la misma manera que aquellos, habiendo fornicado e ido en pos de vicios contranaturales, fueron puestas por ejemplo, sufriendo el castigo del fuego eterno.',
                  orden: 1,
                },
                {
                  cita: 'Judas 1:11',
                  texto:
                    '¡Ay de ellos! porque han seguido el camino de Caín, y se lanzaron por el error de Balaam en procura de ganancia, y perecieron en la contradicción de Coré.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta estos ejemplos como un recordatorio histórico para los judíos del siglo I, que conocían bien estas historias. El juicio sobre los falsos maestros se cumplió con la caída de Jerusalén en el 70 d.C. Valor: conecta el texto con la historia de Israel. Límite (según nuestra postura): no considera la aplicación profética para los últimos tiempos.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en cada ejemplo una ilustración de los peligros que han enfrentado la iglesia a lo largo de la historia: la incredulidad (Israel), la rebelión (ángeles), la inmoralidad (Sodoma), la envidia (Caín), la codicia (Balaam), y la rebelión contra la autoridad (Coré). Valor: hace la aplicación moral relevante. Límite: su aplicación es general y no profética.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). Los ejemplos de Judas son una advertencia profética para los últimos tiempos, cuando la apostasía se multiplicará. Así como Dios juzgó en el pasado, juzgará a los falsos maestros de los últimos días. La iglesia debe estar alerta y no dejarse engañar por enseñanzas que desvían de la fe.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta los ejemplos como símbolos de los peligros espirituales que enfrenta todo creyente: la incredulidad, la rebelión, la inmoralidad, la envidia, la codicia y la rebelión. Valor: hace la aplicación práctica para la vida cristiana. Límite (según nuestra postura): al no ubicar el texto en un contexto profético, pierde la dimensión de advertencia final.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'Israel en el desierto',
                  significado:
                    'Ejemplo de incredulidad y juicio: el pueblo que salió de Egipto pero no entró en la tierra prometida.',
                  referencias: 'Judas 1:5; Números 14:26-35',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'Los ángeles que no guardaron su dignidad',
                  significado:
                    'Ejemplo de rebelión y juicio: ángeles que pecaron y están reservados en cadenas eternas.',
                  referencias: 'Judas 1:6',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'Sodoma y Gomorra',
                  significado:
                    'Ejemplo de inmoralidad y juicio: ciudades destruidas por el fuego de Dios.',
                  referencias: 'Judas 1:7; Génesis 19:24-25',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'Caín, Balaam y Coré',
                  significado:
                    'Tres ejemplos de pecado: envidia (Caín), codicia (Balaam), y rebelión contra la autoridad (Coré).',
                  referencias: 'Judas 1:11; Génesis 4; Números 22-24; Números 16',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 4,
                },
                {
                  nombre: 'El libro de Enoc',
                  significado:
                    'La profecía de Enoc citada por Judas, que anuncia el juicio de Dios sobre los impíos.',
                  referencias: 'Judas 1:14-15; 1 Enoc 1:9',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 5,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'El juicio de Dios sobre los rebeldes',
                  cristoEnEl:
                    'Cristo es el Juez que vendrá a juzgar a vivos y muertos. Así como Dios juzgó en el pasado, Cristo juzgará al final de los tiempos (Hechos 17:31; Juan 5:22).',
                  cita: 'Judas 1:14-15; Apocalipsis 19:11-16',
                  orden: 1,
                },
                {
                  elemento: 'La gracia que salva pero no tolera el pecado',
                  cristoEnEl:
                    'La gracia de Cristo no es una licencia para pecar. Judas confronta esta enseñanza que ya existía en su tiempo: la gracia nos llama a la santidad, no al libertinaje (Tito 2:11-14).',
                  cita: 'Judas 1:4; Romanos 6:1-2; Tito 2:11-14',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'El juicio de los falsos maestros',
                  estado: 'por_cumplir',
                  citaBase: 'Judas 1:14-15',
                  citaCumplimiento: 'Apocalipsis 20:11-15',
                  orden: 1,
                },
                {
                  tema: 'La aparición de burladores en los postreros tiempos',
                  estado: 'por_cumplir',
                  citaBase: 'Judas 1:17-18',
                  citaCumplimiento: '2 Pedro 3:3-4',
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado:
                    '¿Qué ejemplo de juicio NO menciona Judas en su epístola?',
                  orden: 1,
                  opciones: {
                    create: [
                      {
                        texto: 'La Torre de Babel',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Israel en el desierto',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Los ángeles caídos',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Sodoma y Gomorra',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    'Según Judas, ¿qué tienen en común Caín, Balaam y Coré?',
                  orden: 2,
                  opciones: {
                    create: [
                      {
                        texto: 'Fueron ejemplos de pecado: envidia, codicia y rebelión',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Fueron todos profetas de Dios',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Fueron reyes de Israel',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Fueron salvados por su fe',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    '¿Qué describe Judas como el destino de Sodoma y Gomorra?',
                  orden: 3,
                  opciones: {
                    create: [
                      {
                        texto: 'Sufrieron el castigo del fuego eterno',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Fueron reconstruidas y restauradas',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Fueron perdonadas por su arrepentimiento',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Fueron escondidas por Dios',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    'Según la interpretación futurista, ¿qué representan los ejemplos de juicio en Judas?',
                  orden: 4,
                  opciones: {
                    create: [
                      {
                        texto: 'Una advertencia profética para los últimos tiempos',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Un registro histórico sin aplicación actual',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Una alegoría sin significado literal',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Un mito sin valor teológico',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 3: Exhortación y doxología ───
          {
            orden: 3,
            semana: 3,
            titulo: 'Manteniéndose firmes en la fe',
            tema:
              'La seguridad del creyente en medio de la apostasía',
            pasajeBase: 'Judas 17-25',
            introduccion:
              'Después de las duras advertencias, Judas cambia el tono para exhortar a los creyentes a mantenerse firmes. Les recuerda que los apóstoles ya habían advertido que vendrían burladores en los últimos tiempos. Luego da una serie de instrucciones prácticas: "edificaos sobre vuestra santísima fe, orando en el Espíritu Santo, conservaos en el amor de Dios, esperando la misericordia de nuestro Señor Jesucristo para vida eterna". La carta culmina con una doxología gloriosa: "A aquel que es poderoso para guardaros sin caída... sea gloria y majestad... por todos los siglos. Amén." La epístola termina con la certeza de que, aunque los falsos maestros son peligrosos, Dios es poderoso para guardar a los suyos.',
            contextoHistorico:
              'Las exhortaciones de Judas reflejan las prácticas de la iglesia primitiva: edificarse en la fe, orar en el Espíritu, guardarse en el amor de Dios, y esperar la venida de Cristo. Estas eran las herramientas espirituales que los creyentes necesitaban para enfrentar la apostasía. La doxología final (Judas 1:24-25) es una de las más completas del Nuevo Testamento, y es probable que fuera utilizada en la liturgia de la iglesia primitiva. Su mensaje es claro: la seguridad del creyente no está en su propia fuerza, sino en el poder de Dios.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Judas 1:20-21',
                  texto:
                    'Pero vosotros, amados, edificándoos sobre vuestra santísima fe, orando en el Espíritu Santo, conservaos en el amor de Dios, esperando la misericordia de nuestro Señor Jesucristo para vida eterna.',
                  orden: 1,
                },
                {
                  cita: 'Judas 1:24-25',
                  texto:
                    'A aquel que es poderoso para guardaros sin caída, y presentaros sin mancha delante de su gloria con gran alegría, al único Dios nuestro Salvador, por medio de Jesucristo nuestro Señor, sea gloria y majestad, dominio y potencia, antes de todo tiempo, ahora y por todos los siglos. Amén.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta las exhortaciones como instrucciones prácticas para los creyentes del siglo I, que enfrentaban persecución y herejía. La doxología final celebra la fidelidad de Dios en medio de las pruebas. Valor: da aplicación práctica al texto. Límite (según nuestra postura): no considera el alcance profético de las advertencias sobre los "postreros tiempos".',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en las exhortaciones un llamado para todos los creyentes a lo largo de la historia. La doxología es la confesión de que Dios es poderoso para guardar a su pueblo en todas las épocas. Valor: hace la aplicación universal. Límite: su aplicación es general y no profética.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). Las exhortaciones de Judas son especialmente relevantes para los creyentes que viven en los últimos tiempos, cuando la apostasía se multiplica. La doxología final es la seguridad de que Cristo es poderoso para guardar a los suyos hasta el fin. El arrebatamiento de la Iglesia es la esperanza que nos mantiene firmes.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta las exhortaciones como principios espirituales que son aplicables en cualquier tiempo y situación. La doxología es una expresión de adoración que reconoce la soberanía y el poder de Dios. Valor: enfatiza la necesidad de una vida espiritual constante. Límite (según nuestra postura): al no ubicar el texto en un contexto profético, pierde la dimensión de advertencia final.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'La santísima fe',
                  significado:
                    'El fundamento sobre el cual los creyentes deben edificarse: la verdad del evangelio recibida de los apóstoles.',
                  referencias: 'Judas 1:20',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El amor de Dios',
                  significado:
                    'El lugar donde los creyentes deben mantenerse: en la relación de amor con Dios, que se manifiesta en obediencia y santidad.',
                  referencias: 'Judas 1:21',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'La doxología final',
                  significado:
                    'La alabanza a Dios por su poder para guardar a los suyos y presentarlos sin mancha delante de su gloria.',
                  referencias: 'Judas 1:24-25',
                  trasfondoCultural: '', // Se llenará con seedJudasTrasfondoSimbolos.ts
                  orden: 3,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'El que es poderoso para guardaros sin caída',
                  cristoEnEl:
                    'Cristo es el Guardián de nuestras almas (1 Pedro 2:25). Él nos sostiene y nos preserva hasta el día de su venida. La seguridad del creyente no está en su propia fuerza, sino en el poder de Cristo (Juan 10:28-29).',
                  cita: 'Judas 1:24; Juan 10:28-29; 1 Pedro 2:25',
                  orden: 1,
                },
                {
                  elemento: 'El único Dios nuestro Salvador',
                  cristoEnEl:
                    'Cristo es el Salvador que nos redimió de nuestros pecados. Él es el mediador del nuevo pacto, el que nos da vida eterna y nos presenta sin mancha delante de Dios.',
                  cita: 'Judas 1:25; 1 Timoteo 2:5; Tito 2:13',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'Los burladores en los postreros tiempos',
                  estado: 'por_cumplir',
                  citaBase: 'Judas 1:17-18',
                  citaCumplimiento: '2 Pedro 3:3-4',
                  orden: 1,
                },
                {
                  tema: 'La preservación de los santos por el poder de Cristo',
                  estado: 'por_cumplir',
                  citaBase: 'Judas 1:24',
                  citaCumplimiento: null,
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado:
                    '¿Qué exhorta Judas a los creyentes a hacer en los versículos 20-21?',
                  orden: 1,
                  opciones: {
                    create: [
                      {
                        texto: 'Edificarse sobre la fe, orar en el Espíritu, conservarse en el amor de Dios y esperar la misericordia de Cristo',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Buscar señales y milagros',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Separarse completamente del mundo',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Construir grandes iglesias',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    '¿Cómo termina la epístola de Judas?',
                  orden: 2,
                  opciones: {
                    create: [
                      {
                        texto: 'Con una doxología que alaba a Dios por su poder para guardarnos',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Con una maldición contra los falsos maestros',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Con un saludo de Pablo',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Con la profecía de la destrucción de Jerusalén',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    '¿Qué promesa clave contiene la doxología de Judas?',
                  orden: 3,
                  opciones: {
                    create: [
                      {
                        texto: 'Dios es poderoso para guardarnos sin caída y presentarnos sin mancha',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Todos los creyentes serán ricos y prosperarán',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Los falsos maestros serán convertidos',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'La iglesia nunca enfrentará persecución',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
                {
                  enunciado:
                    '¿Qué advertencia habían dado los apóstoles según Judas?',
                  orden: 4,
                  opciones: {
                    create: [
                      {
                        texto: 'Que vendrían burladores en los postreros tiempos',
                        esCorrecta: true,
                        orden: 1,
                      },
                      {
                        texto: 'Que la iglesia sería perseguida por Roma',
                        esCorrecta: false,
                        orden: 2,
                      },
                      {
                        texto: 'Que Jerusalén sería destruida',
                        esCorrecta: false,
                        orden: 3,
                      },
                      {
                        texto: 'Que el fin del mundo llegaría en el año 100 d.C.',
                        esCorrecta: false,
                        orden: 4,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✅ Curso "${curso.nombre}" sembrado con 3 lecciones.`);
  console.log('📖 Lección 1: Contender por la fe (Judas 1:1-4)');
  console.log('📖 Lección 2: El juicio de los falsos maestros (Judas 5-16)');
  console.log('📖 Lección 3: Manteniéndose firmes en la fe (Judas 17-25)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });