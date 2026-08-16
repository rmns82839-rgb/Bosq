import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Curso Lucas — Evangelio completo (12 lecciones)
//  Contenido redactado en la línea del Movimiento Misionero
//  Mundial (arminiana, pretribulacional). Revisar pastoralmente.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando curso de Lucas...');

  // 1. Eliminar curso existente (si hay)
  await prisma.curso.deleteMany({ where: { slug: 'lucas' } });

  // 2. Crear el curso con todas las lecciones
  const curso = await prisma.curso.create({
    data: {
      slug: 'lucas',
      nombre: 'Lucas',
      descripcion:
        'El Evangelio de Lucas: el relato histórico y detallado de la vida, ministerio, muerte y resurrección de Jesucristo, el Salvador de todos los hombres.',
      autor: 'Lucas, el médico amado, compañero de Pablo',
      fechaEscritura: 'c. 60-65 d.C.',
      contextoGeneral:
        'Lucas es el único evangelista gentil, un médico (Colosenses 4:14) y compañero de Pablo (2 Timoteo 4:11). Escribe su evangelio con un enfoque histórico y cuidadoso, investigando todo desde el principio (Lucas 1:1-4). Su audiencia principal son los gentiles, y su énfasis está en que Jesús es el Salvador de todos: judíos, gentiles, pobres, marginados, mujeres y pecadores. El Evangelio de Lucas es el más extenso de los cuatro, y junto con Hechos forma una obra completa de dos volúmenes.',
      orden: 3,
      activo: true,
      lecciones: {
        create: [
          // ─── LECCIÓN 1: Prólogo, anuncios y nacimiento ───
          {
            orden: 1,
            semana: 1,
            titulo: 'Prólogo, anuncios y nacimiento',
            tema: 'El amanecer de la salvación anunciada a Israel',
            pasajeBase: 'Lucas 1–2',
            introduccion:
              'Lucas comienza su evangelio con un prólogo profesional, dedicado a Teófilo, declarando su intención de escribir un relato ordenado y verificado. Luego, el escenario cambia al templo, donde el ángel Gabriel anuncia a Zacarías el nacimiento de Juan el Bautista. Seis meses después, Gabriel visita a María en Nazaret con el anuncio más trascendental de la historia: dará a luz al Hijo del Altísimo. El encuentro de María con Isabel, el Magníficat, el nacimiento de Juan, el nacimiento de Jesús en Belén, los pastores y el canto de los ángeles: todo está tejido con alabanza y reconocimiento de que Dios ha visitado a su pueblo. Las profecías de Simeón y Ana sellan este capítulo inaugural con esperanza mesiánica.',
            contextoHistorico:
              'El Evangelio de Lucas fue escrito en un contexto greco-romano, probablemente en Grecia o en Antioquía. Lucas es un historiador cuidadoso que investiga fuentes y testimonios presenciales. Su enfoque en los marginados, las mujeres y los gentiles refleja la misión universal del evangelio. El nacimiento de Jesús en Belén, bajo el censo de Quirinio (Lucas 2:1-2), conecta el evento con la historia mundial. La presentación en el templo y las profecías de Simeón y Ana muestran la continuidad con el Antiguo Testamento. (verificar) El censo de Quirinio es mencionado por el historiador Josefo (Antigüedades 18.1.1), aunque hay debates sobre la fecha exacta.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 1:46-47',
                  texto: 'Entonces María dijo: Engrandece mi alma al Señor; y mi espíritu se regocija en Dios mi Salvador.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 2:11',
                  texto: 'Que os ha nacido hoy, en la ciudad de David, un Salvador, que es Cristo el Señor.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta los primeros dos capítulos como el cumplimiento de las promesas del Antiguo Testamento a Israel. El nacimiento de Juan y de Jesús son eventos históricos que inauguran el tiempo mesiánico. Valor: respeta el contexto histórico de la expectativa judía. Límite (según nuestra postura): no considera las implicaciones proféticas para el fin de los tiempos.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en estos capítulos el fundamento histórico de la fe cristiana, un relato cuidadosamente documentado para establecer la certeza del evangelio. Valor: enfatiza la historicidad del nacimiento de Cristo. Límite: no profundiza en el significado teológico más allá del registro histórico.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). Los anuncios del nacimiento de Juan y Jesús son el cumplimiento de las promesas mesiánicas del Antiguo Testamento. La venida de Cristo es el centro de la historia, y su primera venida garantiza su segunda venida. El canto de los ángeles ("gloria a Dios, paz en la tierra") apunta al reino futuro que Cristo establecerá en su segunda venida.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta los capítulos como símbolos de la esperanza humana: la visita de Dios a su pueblo, el nacimiento de la salvación, la alabanza de los humildes. Valor: mantiene vivo el mensaje de esperanza. Límite (según nuestra postura): al espiritualizar el texto, puede perder la historicidad y singularidad del nacimiento de Cristo.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'El templo',
                  significado: 'El lugar de la presencia de Dios y la esperanza de Israel, donde se anuncia el fin del silencio profético.',
                  referencias: 'Lucas 1:5-20',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El ángel Gabriel',
                  significado: 'El mensajero de Dios que anuncia los nacimientos de Juan y Jesús, trayendo buenas nuevas.',
                  referencias: 'Lucas 1:19, 26-38',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'El pesebre',
                  significado: 'La humildad del Salvador: el Rey de reyes nace en un establo y es acostado en un pesebre.',
                  referencias: 'Lucas 2:7, 12, 16',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'Los pastores',
                  significado: 'Los humildes y marginados son los primeros en recibir la buena noticia del nacimiento del Salvador.',
                  referencias: 'Lucas 2:8-20',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como Hijo del Altísimo',
                  cristoEnEl: 'Cristo es el Hijo de Dios, concebido por el Espíritu Santo, que nace de María. Su nacimiento virginal es la señal de su divinidad y de la obra de Dios en la humanidad.',
                  cita: 'Lucas 1:35; Juan 1:14',
                  orden: 1,
                },
                {
                  elemento: 'El Salvador que ha nacido',
                  cristoEnEl: 'Cristo es el Salvador prometido, el Mesías, el Señor. Su nacimiento es la respuesta de Dios al pecado y a la esperanza de Israel.',
                  cita: 'Lucas 2:11; Isaías 9:6',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'El nacimiento de Juan el Bautista como precursor',
                  estado: 'cumplida',
                  citaBase: 'Lucas 1:13-17',
                  citaCumplimiento: 'Malaquías 3:1; 4:5-6',
                  orden: 1,
                },
                {
                  tema: 'El nacimiento de Jesús como el Mesías',
                  estado: 'cumplida',
                  citaBase: 'Lucas 2:11',
                  citaCumplimiento: 'Isaías 7:14; 9:6-7',
                  orden: 2,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Belén',
                  ubicacion: 'Judea, al sur de Jerusalén',
                  equivalenteActual: 'Belén, Palestina',
                  nota: 'El lugar del nacimiento de Jesús, cumpliendo la profecía de Miqueas 5:2. Una pequeña ciudad que se convirtió en el centro de la historia de la salvación.',
                  orden: 1,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Quién anuncia el nacimiento de Jesús a María?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'El ángel Gabriel', esCorrecta: true, orden: 1 },
                      { texto: 'El ángel Rafael', esCorrecta: false, orden: 2 },
                      { texto: 'El profeta Isaías', esCorrecta: false, orden: 3 },
                      { texto: 'Juan el Bautista', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué canta María al visitar a Isabel?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'El Magníficat (Engrandece mi alma al Señor)', esCorrecta: true, orden: 1 },
                      { texto: 'El Benedictus (Bendito sea el Señor)', esCorrecta: false, orden: 2 },
                      { texto: 'El Nunc Dimittis (Ahora, Señor, despides a tu siervo)', esCorrecta: false, orden: 3 },
                      { texto: 'El Gloria in Excelsis (Gloria a Dios en las alturas)', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Quiénes son los primeros en visitar a Jesús después de su nacimiento?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Los pastores', esCorrecta: true, orden: 1 },
                      { texto: 'Los magos del oriente', esCorrecta: false, orden: 2 },
                      { texto: 'Los fariseos', esCorrecta: false, orden: 3 },
                      { texto: 'Los sumos sacerdotes', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué profecía de Simeón habla del destino de Jesús y de María?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Que Jesús sería para caída y levantamiento de muchos, y que una espada traspasaría el alma de María', esCorrecta: true, orden: 1 },
                      { texto: 'Que Jesús sería un rey político que liberaría a Israel', esCorrecta: false, orden: 2 },
                      { texto: 'Que María sería siempre virgen', esCorrecta: false, orden: 3 },
                      { texto: 'Que Jesús moriría en la cruz sin resucitar', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 2: Preparación y bautismo de Jesús ───
          {
            orden: 2,
            semana: 2,
            titulo: 'Preparación y bautismo de Jesús',
            tema: 'Juan el Bautista, el bautismo de Jesús y las tentaciones',
            pasajeBase: 'Lucas 3–4:13',
            introduccion:
              'Lucas introduce a Juan el Bautista con una cuidadosa ubicación histórica: "en el año quince del imperio de Tiberio César". Juan predica un bautismo de arrepentimiento para perdón de pecados, preparando el camino del Señor. Su mensaje es exigente: "¡Generación de víboras! ¿Quién os enseñó a huir de la ira venidera?" Jesús mismo viene a Juan para ser bautizado, y en ese momento el cielo se abre, el Espíritu Santo desciende en forma corporal de paloma, y una voz del Padre declara: "Tú eres mi Hijo amado; en ti tengo complacencia". Luego, Jesús es llevado por el Espíritu al desierto, donde es tentado por el diablo durante cuarenta días, y vence cada tentación con la Palabra de Dios.',
            contextoHistorico:
              'Juan el Bautista era una figura profética que llamaba a Israel al arrepentimiento. Su vestimenta de pelo de camello y su dieta de langostas y miel silvestre lo conectaban con el profeta Elías. (verificar) El bautismo de Juan no era el bautismo cristiano, sino un acto de preparación y arrepentimiento. Jesús, aunque sin pecado, se somete al bautismo para identificarse con los pecadores y para ser ungido por el Espíritu para su ministerio. Las tentaciones de Jesús tienen paralelos con las pruebas de Israel en el desierto (Éxodo); Jesús vence donde Israel falló.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 3:16',
                  texto: 'Juan respondió diciendo a todos: Yo, a la verdad, os bautizo en agua; pero viene uno más poderoso que yo, de quien no soy digno de desatar la correa de su calzado; él os bautizará en Espíritu Santo y fuego.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 4:4',
                  texto: 'Jesús le respondió: Escrito está: No solo de pan vivirá el hombre, sino de toda palabra de Dios.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta el ministerio de Juan como el fin del período profético y el inicio del evangelio. El bautismo de Jesús es la unción del Espíritu para su ministerio. Valor: conecta el texto con el contexto histórico de Israel. Límite (según nuestra postura): no considera las aplicaciones proféticas.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en el bautismo de Jesús un evento histórico que marca el inicio de su ministerio público. Las tentaciones son el modelo de cómo vencer al enemigo. Valor: hace aplicación práctica. Límite: tiende a subestimar el significado teológico del bautismo.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). El bautismo de Jesús es un anticipo de la obra del Espíritu en la Iglesia. La voz del Padre declara la identidad de Jesús como el Hijo de Dios, lo cual es central para nuestra fe. Las tentaciones de Jesús muestran cómo debemos enfrentar las pruebas con la Palabra de Dios. El ministerio de Juan es un modelo de preparación para el arrepentimiento antes de la venida del Señor.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta el bautismo como el momento en que Jesús asume su identidad y misión. Las tentaciones son la lucha espiritual de todo creyente. Valor: hace la aplicación personal. Límite (según nuestra postura): al espiritualizar, pierde la dimensión histórica y profética.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'Juan el Bautista',
                  significado: 'El precursor de Jesús, que prepara el camino del Señor con el llamado al arrepentimiento.',
                  referencias: 'Lucas 3:1-20',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El bautismo de Jesús',
                  significado: 'La unción de Jesús por el Espíritu Santo y la identificación divina como el Hijo amado.',
                  referencias: 'Lucas 3:21-22',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'La paloma',
                  significado: 'El símbolo del Espíritu Santo que desciende sobre Jesús en su bautismo.',
                  referencias: 'Lucas 3:22',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'El desierto',
                  significado: 'El lugar de prueba y tentación, donde Jesús vence al diablo.',
                  referencias: 'Lucas 4:1-13',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el nuevo Adán e Israel',
                  cristoEnEl: 'Cristo vence las tentaciones donde Adán e Israel fallaron. Él es el verdadero Israel que obedece perfectamente al Padre.',
                  cita: 'Lucas 4:1-13; Mateo 4:1-11',
                  orden: 1,
                },
                {
                  elemento: 'La voz del Padre',
                  cristoEnEl: 'El Padre declara la identidad de Jesús como su Hijo amado, confirmando su misión y autoridad.',
                  cita: 'Lucas 3:22; Salmo 2:7; Isaías 42:1',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'Juan como el precursor',
                  estado: 'cumplida',
                  citaBase: 'Lucas 3:4-6',
                  citaCumplimiento: 'Isaías 40:3-5',
                  orden: 1,
                },
                {
                  tema: 'Jesús como el Hijo de Dios',
                  estado: 'cumplida',
                  citaBase: 'Lucas 3:22',
                  citaCumplimiento: 'Salmo 2:7',
                  orden: 2,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'El Jordán',
                  ubicacion: 'Río principal de Israel, desde el monte Hermón hasta el Mar Muerto',
                  equivalenteActual: 'Río Jordán, Israel/Jordania',
                  nota: 'Lugar donde Juan bautizaba y donde Jesús fue bautizado. Un río con profundo significado en la historia de Israel (cruce hacia la Tierra Prometida).',
                  orden: 1,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: 'Según Lucas 3:16, ¿cuál es la diferencia entre el bautismo de Juan y el de Jesús?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Juan bautiza en agua, Jesús bautiza en Espíritu Santo y fuego', esCorrecta: true, orden: 1 },
                      { texto: 'Juan bautiza en el Jordán, Jesús en el Mar Muerto', esCorrecta: false, orden: 2 },
                      { texto: 'Juan bautiza a judíos, Jesús a gentiles', esCorrecta: false, orden: 3 },
                      { texto: 'Juan bautiza para perdón, Jesús para sanidad', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué sucede durante el bautismo de Jesús según Lucas 3:21-22?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'El cielo se abre, el Espíritu desciende como paloma, y el Padre habla', esCorrecta: true, orden: 1 },
                      { texto: 'Juan ve un ángel que anuncia el ministerio de Jesús', esCorrecta: false, orden: 2 },
                      { texto: 'Jesús cura a un leproso inmediatamente después', esCorrecta: false, orden: 3 },
                      { texto: 'Los discípulos son llamados y lo siguen', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Cómo responde Jesús a cada tentación en el desierto?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Citando la Escritura ("Escrito está")', esCorrecta: true, orden: 1 },
                      { texto: 'Usando su poder divino para vencer al diablo', esCorrecta: false, orden: 2 },
                      { texto: 'Llamando a ángeles para que lo ayuden', esCorrecta: false, orden: 3 },
                      { texto: 'Huyendo del desierto', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué nos enseñan las tentaciones de Jesús sobre cómo enfrentar las pruebas?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Debemos confiar en la Palabra de Dios y no en nuestros propios recursos', esCorrecta: true, orden: 1 },
                      { texto: 'Debemos evitar todas las pruebas y dificultades', esCorrecta: false, orden: 2 },
                      { texto: 'Debemos usar poder espiritual para aniquilar al enemigo', esCorrecta: false, orden: 3 },
                      { texto: 'Debemos orar para que Dios nos quite toda prueba', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 3: Ministerio inicial en Galilea ───
          {
            orden: 3,
            semana: 3,
            titulo: 'Ministerio inicial en Galilea',
            tema: 'Enseñanza, sanidades y llamado de los doce',
            pasajeBase: 'Lucas 4:14–6:16',
            introduccion:
              'Jesús regresa a Galilea con el poder del Espíritu. En la sinagoga de Nazaret, lee el rollo de Isaías y declara: "Hoy se ha cumplido esta Escritura". La reacción inicial es de admiración, pero luego rechazo. Jesús sana a un endemoniado en Capernaúm, a la suegra de Pedro, y a muchos enfermos. Llama a sus primeros discípulos junto al lago de Genesaret, con la pesca milagrosa. Enseña desde una barca, y más tarde elige a los doce apóstoles para que estén con él. El ministerio de Jesús comienza con poder, autoridad y un llamado radical a seguirlo.',
            contextoHistorico:
              'La sinagoga era el centro de la vida religiosa judía. Jesús era reconocido como un maestro (rabino) y se le daba el rollo para leer. La cita de Isaías 61:1-2 era mesiánica, y Jesús la aplica a sí mismo. (verificar) Las sanidades y liberaciones eran evidencia del poder del Reino. El llamado de los discípulos en Lucas 4-6 muestra el contraste entre la autoridad de Jesús y la religiosidad de su tiempo.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 4:18-19',
                  texto: 'El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a sanar a los quebrantados de corazón; a pregonar libertad a los cautivos, y vista a los ciegos; a poner en libertad a los oprimidos; a predicar el año agradable del Señor.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 5:10-11',
                  texto: 'Y Jesús dijo a Simón: No temas; desde ahora serás pescador de hombres. Y llevando las barcas a tierra, dejaron todo y le siguieron.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta el ministerio en Galilea como el inicio del evangelio en la región judía. La sinagoga era el lugar natural para la enseñanza. Valor: contextualiza el ministerio de Jesús. Límite (según nuestra postura): no considera el alcance universal.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en estos eventos el modelo del ministerio cristiano: enseñar, sanar, llamar discípulos. Valor: hace la aplicación práctica para la iglesia. Límite: tiende a subestimar la dimensión profética.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). El ministerio de Jesús en Galilea es un anticipo del poder del Reino que vendrá en plenitud en su segunda venida. La pesca milagrosa es un tipo del llamado a los discípulos para la misión. La elección de los doce establece el fundamento de la Iglesia.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta el ministerio de Jesús como el modelo de compasión y autoridad espiritual. Valor: enfatiza el cuidado de los marginados. Límite (según nuestra postura): al espiritualizar, pierde la historicidad de los eventos.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'La sinagoga',
                  significado: 'El lugar donde Jesús enseña y declara el cumplimiento de la profecía.',
                  referencias: 'Lucas 4:16-30',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'La pesca milagrosa',
                  significado: 'La provisión de Dios y el llamado a ser pescadores de hombres.',
                  referencias: 'Lucas 5:1-11',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'Los doce apóstoles',
                  significado: 'El fundamento de la nueva comunidad de Dios, la Iglesia.',
                  referencias: 'Lucas 6:12-16',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el Ungido del Espíritu',
                  cristoEnEl: 'Cristo es el Mesías, ungido por el Espíritu para traer salvación, sanidad y libertad.',
                  cita: 'Lucas 4:18-19; Isaías 61:1-2',
                  orden: 1,
                },
                {
                  elemento: 'Los discípulos como pescadores de hombres',
                  cristoEnEl: 'Cristo llama a los suyos a participar en su misión de buscar y salvar a los perdidos.',
                  cita: 'Lucas 5:10-11; Mateo 4:19',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'Jesús como el que trae el año agradable del Señor',
                  estado: 'cumplida',
                  citaBase: 'Lucas 4:18-19',
                  citaCumplimiento: 'Isaías 61:1-2',
                  orden: 1,
                },
                {
                  tema: 'El llamamiento de los doce como fundamento de la Iglesia',
                  estado: 'cumplida',
                  citaBase: 'Lucas 6:12-16',
                  citaCumplimiento: 'Efesios 2:20',
                  orden: 2,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Capernaúm',
                  ubicacion: 'Galilea, a orillas del mar de Genesaret',
                  equivalenteActual: 'Tel Hum, Israel',
                  nota: 'El centro del ministerio de Jesús en Galilea. Ciudad donde sanó al criado del centurión y a la suegra de Pedro.',
                  orden: 1,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué texto lee Jesús en la sinagoga de Nazaret?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Isaías 61:1-2', esCorrecta: true, orden: 1 },
                      { texto: 'Salmo 22', esCorrecta: false, orden: 2 },
                      { texto: 'Jeremías 31', esCorrecta: false, orden: 3 },
                      { texto: 'Zacarías 9', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué dice Jesús después de leer el rollo de Isaías?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: '"Hoy se ha cumplido esta Escritura delante de vosotros"', esCorrecta: true, orden: 1 },
                      { texto: '"Aún no ha llegado el tiempo de su cumplimiento"', esCorrecta: false, orden: 2 },
                      { texto: '"Esta Escritura se cumplirá en los últimos días"', esCorrecta: false, orden: 3 },
                      { texto: '"No entendéis lo que habéis oído"', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué milagro lleva a Pedro a reconocer a Jesús como Señor?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'La pesca milagrosa', esCorrecta: true, orden: 1 },
                      { texto: 'La sanidad de su suegra', esCorrecta: false, orden: 2 },
                      { texto: 'La expulsión de un demonio', esCorrecta: false, orden: 3 },
                      { texto: 'La curación de un leproso', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Cuántos apóstoles escoge Jesús en Lucas 6?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Doce', esCorrecta: true, orden: 1 },
                      { texto: 'Siete', esCorrecta: false, orden: 2 },
                      { texto: 'Cincuenta', esCorrecta: false, orden: 3 },
                      { texto: 'Setenta', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },   // ← CIERRA LA LECCIÓN 3
          // ─── LECCIÓN 4: El Sermón del Llano ───
          {
            orden: 4,
            semana: 4,
            titulo: 'El Sermón del Llano',
            tema: 'Bienaventuranzas y enseñanzas fundamentales del Reino',
            pasajeBase: 'Lucas 6:17-49',
            introduccion:
              'Jesús desciende de la montaña y se sitúa en un lugar llano, rodeado de una gran multitud de discípulos y gente de toda Judea, Jerusalén y la costa de Tiro y Sidón. Allí pronuncia las bienaventuranzas: "Bienaventurados vosotros los pobres, porque vuestro es el reino de Dios". Pero también pronuncia "ayes" sobre los ricos, los saciados, los que ríen y los que reciben alabanza. Enseña sobre el amor a los enemigos, la regla de oro, la no condenación y la importancia de construir la vida sobre la roca de sus palabras. Este sermón es el "Manifiesto del Reino" de Jesús, que establece los valores radicales del discipulado.',
            contextoHistorico:
              'El "Sermón del Llano" es el equivalente lucano del "Sermón del Monte" de Mateo, pero con diferencias significativas. Lucas enfatiza los aspectos socioeconómicos: los "pobres" reales, los "hambrientos" reales. (verificar) La enseñanza sobre el amor a los enemigos era radical en un contexto donde el honor y la venganza eran valores centrales. La "regla de oro" ("tratad a los demás como queréis que os traten") era conocida en varias tradiciones, pero Jesús la eleva a un principio fundamental del Reino.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 6:20-21',
                  texto: 'Bienaventurados vosotros los pobres, porque vuestro es el reino de Dios. Bienaventurados los que ahora hambrientáis, porque seréis saciados. Bienaventurados los que ahora lloráis, porque reiréis.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 6:31',
                  texto: 'Y como queréis que los hombres hagan con vosotros, así también haced vosotros con ellos.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'El lugar llano',
                  significado: 'El lugar donde Jesús enseña a la multitud, simbolizando que el evangelio es para todos, sin distinción.',
                  referencias: 'Lucas 6:17',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'La casa sobre la roca',
                  significado: 'La vida que obedece las palabras de Jesús, firme ante las tormentas de la vida.',
                  referencias: 'Lucas 6:47-49',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el nuevo Moisés que enseña la ley del Reino',
                  cristoEnEl: 'Cristo es el Maestro que revela la voluntad del Padre y establece los valores del Reino.',
                  cita: 'Lucas 6:20-49; Mateo 5-7',
                  orden: 1,
                },
                {
                  elemento: 'La regla de oro',
                  cristoEnEl: 'Cristo es el ejemplo perfecto de cómo tratar a los demás: con amor, compasión y justicia.',
                  cita: 'Lucas 6:31; Mateo 7:12',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'El Reino de Dios para los pobres y marginados',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 6:20-23',
                  citaCumplimiento: null,
                  orden: 1,
                },
                {
                  tema: 'El juicio sobre los que rechazan el mensaje',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 6:24-26',
                  citaCumplimiento: null,
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: 'Según Lucas 6:20, ¿quiénes son bienaventurados?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Los pobres, porque suyo es el reino de Dios', esCorrecta: true, orden: 1 },
                      { texto: 'Los ricos, porque tienen consuelo', esCorrecta: false, orden: 2 },
                      { texto: 'Los que ríen, porque heredarán la tierra', esCorrecta: false, orden: 3 },
                      { texto: 'Los que tienen honra, porque serán grandes', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Cuál es la "regla de oro" según Jesús en Lucas 6?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'Haced a los demás como queréis que os hagan', esCorrecta: true, orden: 1 },
                      { texto: 'No hagáis a los demás lo que no queréis que os hagan', esCorrecta: false, orden: 2 },
                      { texto: 'Amad a vuestros vecinos y odiad a vuestros enemigos', esCorrecta: false, orden: 3 },
                      { texto: 'Dad a todos lo que os piden', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué ilustración usa Jesús para enseñar sobre la importancia de obedecer sus palabras?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'La casa edificada sobre la roca', esCorrecta: true, orden: 1 },
                      { texto: 'La parábola del sembrador', esCorrecta: false, orden: 2 },
                      { texto: 'La parábola del buen samaritano', esCorrecta: false, orden: 3 },
                      { texto: 'El grano de mostaza', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué enseña Jesús sobre el amor a los enemigos?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Amad a vuestros enemigos, haced bien a los que os aborrecen', esCorrecta: true, orden: 1 },
                      { texto: 'Venganza justa contra los que os persiguen', esCorrecta: false, orden: 2 },
                      { texto: 'Indiferencia hacia los que os maltratan', esCorrecta: false, orden: 3 },
                      { texto: 'Separación total de los que no son como vosotros', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 5: Milagros y fe ───
          {
            orden: 5,
            semana: 5,
            titulo: 'Milagros y fe',
            tema: 'Milagros que revelan al Mesías y la fe que responde',
            pasajeBase: 'Lucas 7–8',
            introduccion:
              'Este capítulo está lleno de encuentros transformadores. Un centurión romano, sorprendentemente humilde, pide a Jesús que sane a su siervo. Su fe es tan grande que Jesús declara: "Ni aun en Israel he hallado tanta fe". Luego, Jesús encuentra el cortejo fúnebre de un joven, único hijo de una viuda, en la ciudad de Naín. Movido por compasión, toca el féretro y dice: "Joven, a ti te digo, levántate". El muerto vuelve a la vida, y la multitud glorifica a Dios. Juan el Bautista, desde la cárcel, envía mensajeros a preguntar si Jesús es el Mesías. Jesús responde con las obras que hace: los ciegos ven, los cojos andan, los leprosos son limpiados. Más tarde, una mujer pecadora unge los pies de Jesús con sus lágrimas y perfume, y Él la perdona, declarando: "Tu fe te ha salvado; ve en paz". Finalmente, Jesús enseña la parábola del sembrador y calma la tormenta.',
            contextoHistorico:
              'La ciudad de Naín estaba ubicada al sur de Galilea, cerca del monte Hermón (verificar). El encuentro con la viuda de Naín es único en Lucas y muestra la compasión de Jesús hacia los marginados. Las viudas en el mundo antiguo estaban entre las personas más vulnerables. En la cultura judía, el entierro de un hijo único significaba la pérdida de la esperanza y el sustento para la viuda. Jesús actúa con compasión y poder. El centurión romano era un oficial del ejército ocupante; su fe humilde contrastaba con la arrogancia de muchos líderes religiosos. La mujer pecadora (probablemente una prostituta) era despreciada por la sociedad, pero su amor y gratitud la llevan a arrodillarse ante Jesús.',
            // ⭐ SECCIÓN ESPECIAL: LA VIUDA DE NAÍN ⭐
            contextoHistorico: 
              'La ciudad de Naín estaba ubicada al sur de Galilea, cerca del monte Hermón (verificar). El encuentro con la viuda de Naín es único en Lucas y muestra la compasión de Jesús hacia los marginados. Las viudas en el mundo antiguo estaban entre las personas más vulnerables. En la cultura judía, el entierro de un hijo único significaba la pérdida de la esperanza y el sustento para la viuda, dejándola sin protección ni provisión. La compasión de Jesús no solo resucita al joven, sino que restaura la esperanza y la dignidad de esta mujer. El milagro de Naín es un anticipo de la victoria final de Cristo sobre la muerte. El centurión romano era un oficial del ejército ocupante; su fe humilde contrastaba con la arrogancia de muchos líderes religiosos. La mujer pecadora (probablemente una prostituta) era despreciada por la sociedad, pero su amor y gratitud la llevan a arrodillarse ante Jesús, mostrando que el amor y el perdón son más poderosos que el pecado.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 7:13-14',
                  texto: 'Y al verla, el Señor tuvo compasión de ella, y le dijo: No llores. Y acercándose, tocó el féretro; y los que lo llevaban se detuvieron. Y dijo: Joven, a ti te digo, levántate.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 7:50',
                  texto: 'Y dijo a la mujer: Tu fe te ha salvado; ve en paz.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta los milagros como señales del poder de Jesús que confirman su mesianismo. La resurrección del hijo de la viuda de Naín muestra la compasión de Dios por los marginados. Valor: respeta el contexto histórico de la compasión de Jesús. Límite (según nuestra postura): no considera la dimensión profética de la resurrección como anticipo de la resurrección general.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en estos milagros el fundamento histórico de la fe: Jesús demuestra su poder sobre la enfermedad y la muerte. Valor: refuerza la historicidad de los milagros. Límite: tiende a subestimar el significado teológico más profundo.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). La resurrección del hijo de la viuda de Naín es un anticipo de la resurrección final y un tipo de la resurrección de Cristo. La compasión de Jesús por la viuda muestra que Dios se preocupa por los que sufren y que el poder de Dios puede restaurar lo que parece perdido. El perdón a la mujer pecadora muestra que la salvación es por gracia mediante la fe.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta los milagros como símbolos del poder de Dios para transformar vidas. La resurrección del joven representa la vida nueva que Cristo da a los que están muertos en pecados. Valor: hace la aplicación espiritual. Límite (según nuestra postura): al espiritualizar, pierde la historicidad de los milagros.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'El centurión romano',
                  significado: 'Un gentil con gran fe que reconoce la autoridad de Jesús, símbolo de la fe que viene de la humildad.',
                  referencias: 'Lucas 7:1-10',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El joven resucitado en Naín',
                  significado: 'El poder de Jesús sobre la muerte y su compasión por los que sufren, especialmente los marginados y vulnerables.',
                  referencias: 'Lucas 7:11-17',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'La viuda de Naín',
                  significado: 'Símbolo de la fragilidad humana y de la compasión divina que restaura la esperanza y la vida.',
                  referencias: 'Lucas 7:11-17',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'La mujer pecadora que unge a Jesús',
                  significado: 'El amor y la gratitud que brotan del perdón recibido, y la fe que salva.',
                  referencias: 'Lucas 7:36-50',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
                {
                  nombre: 'El perfume y las lágrimas',
                  significado: 'La adoración genuina que surge del corazón transformado por el amor de Dios.',
                  referencias: 'Lucas 7:37-38',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 5,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús que resucita al joven de Naín',
                  cristoEnEl: 'Cristo es la Resurrección y la Vida. Su compasión por la viuda prefigura su victoria sobre la muerte en su propia resurrección.',
                  cita: 'Lucas 7:11-17; Juan 11:25-26',
                  orden: 1,
                },
                {
                  elemento: 'Jesús que perdona a la mujer pecadora',
                  cristoEnEl: 'Cristo es el que perdona los pecados y da vida nueva. Su gracia transforma el corazón del pecador y lo lleva a la adoración y la gratitud.',
                  cita: 'Lucas 7:36-50; Romanos 5:8',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La resurrección del joven en Naín como anticipo de la resurrección final',
                  estado: 'cumplida',
                  citaBase: 'Lucas 7:11-17',
                  citaCumplimiento: 'Juan 5:28-29; Apocalipsis 20:12-13',
                  orden: 1,
                },
                {
                  tema: 'El perdón de los pecados por la fe en Jesús',
                  estado: 'cumplida',
                  citaBase: 'Lucas 7:48-50',
                  citaCumplimiento: 'Hechos 10:43',
                  orden: 2,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Naín',
                  ubicacion: 'Galilea, al sur del monte Hermón',
                  equivalenteActual: 'Nein, Israel',
                  nota: 'La ciudad donde Jesús resucitó al hijo de la viuda. Un pequeño pueblo que se hizo famoso por el gran milagro de compasión de Jesús.',
                  orden: 1,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué milagro lleva a Pedro a reconocer a Jesús como Señor?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'La pesca milagrosa', esCorrecta: true, orden: 1 },
                      { texto: 'La sanidad de su suegra', esCorrecta: false, orden: 2 },
                      { texto: 'La expulsión de un demonio', esCorrecta: false, orden: 3 },
                      { texto: 'La curación de un leproso', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué ocurre en la ciudad de Naín según Lucas 7?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'Jesús resucita al hijo único de una viuda', esCorrecta: true, orden: 1 },
                      { texto: 'Jesús calma una tormenta en el mar', esCorrecta: false, orden: 2 },
                      { texto: 'Jesús sana a un leproso', esCorrecta: false, orden: 3 },
                      { texto: 'Jesús llama a sus primeros discípulos', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué respuesta da Jesús a los mensajeros de Juan el Bautista?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Muestra los milagros como evidencia de que es el Mesías', esCorrecta: true, orden: 1 },
                      { texto: 'Envía a Juan un mensaje de condenación', esCorrecta: false, orden: 2 },
                      { texto: 'Dice que no es el Mesías', esCorrecta: false, orden: 3 },
                      { texto: 'Pide que Juan espere un poco más', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué declara Jesús a la mujer pecadora que unge sus pies?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: '"Tu fe te ha salvado; ve en paz"', esCorrecta: true, orden: 1 },
                      { texto: '"Tu pecado te es perdonado, pero no peques más"', esCorrecta: false, orden: 2 },
                      { texto: '"El que no tiene deuda, poco ama"', esCorrecta: false, orden: 3 },
                      { texto: '"No basta con llorar; debes cambiar tu vida"', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 6: Enseñanzas sobre el Reino ───
          {
            orden: 6,
            semana: 6,
            titulo: 'Enseñanzas sobre el Reino',
            tema: 'Misión de los doce, los setenta, el buen samaritano',
            pasajeBase: 'Lucas 9–10',
            introduccion:
              'Jesús envía a los doce apóstoles con poder sobre demonios y enfermedades, y les da instrucciones específicas para su misión. Más tarde, envía a setenta discípulos de dos en dos, anunciando que "la mies es mucha, pero los obreros pocos". El buen samaritano es una de las parábolas más conocidas de Jesús, que redefine al "prójimo" como cualquiera que muestra misericordia, más allá de las barreras étnicas y religiosas. Jesús también enseña sobre la importancia de la oración y la prioridad de escuchar su Palabra, como María, que escogió la buena parte.',
            contextoHistorico:
              'La misión de los setenta refleja la organización de la comunidad judía, que tenía setenta ancianos (ver Números 11:16-17). (verificar) Los discípulos son enviados sin provisiones, confiando en la provisión de Dios. La parábola del buen samaritano responde a la pregunta "¿quién es mi prójimo?" y desafía las divisiones étnicas entre judíos y samaritanos. La prioridad de la oración y la escucha de la Palabra se destaca en el episodio de Marta y María.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 10:25-27',
                  texto: 'Y he aquí un intérprete de la ley se levantó y dijo, para probarle: Maestro, ¿qué haré para heredar la vida eterna? Él le dijo: ¿Qué está escrito en la ley? ¿Cómo lees? Respondiendo él, dijo: Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con todas tus fuerzas, y con toda tu mente; y a tu prójimo como a ti mismo.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 10:42',
                  texto: 'Pero una cosa es necesaria; y María ha escogido la buena parte, la cual no le será quitada.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'Los setenta discípulos',
                  significado: 'La misión extensiva del evangelio a todas las naciones, anunciando la llegada del Reino.',
                  referencias: 'Lucas 10:1-20',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El buen samaritano',
                  significado: 'El prójimo que muestra misericordia, rompiendo barreras étnicas y religiosas.',
                  referencias: 'Lucas 10:29-37',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'Marta y María',
                  significado: 'El contraste entre la actividad y la adoración; la prioridad de escuchar a Jesús.',
                  referencias: 'Lucas 10:38-42',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el que envía a sus discípulos',
                  cristoEnEl: 'Cristo es el Señor de la mies que envía a sus obreros al mundo para anunciar el Reino.',
                  cita: 'Lucas 10:1-2; Mateo 28:18-20',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el buen samaritano',
                  cristoEnEl: 'Cristo es el que se acerca a los heridos, los sana y los restaura, mostrando la compasión de Dios.',
                  cita: 'Lucas 10:29-37; Isaías 53:4-5',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La misión de los discípulos como anticipo de la misión de la Iglesia',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 10:1-12',
                  citaCumplimiento: 'Hechos 1:8',
                  orden: 1,
                },
                {
                  tema: 'La caída de Satanás vista por los discípulos',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 10:17-20',
                  citaCumplimiento: 'Apocalipsis 12:9',
                  orden: 2,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Betania',
                  ubicacion: 'Cerca de Jerusalén, al este del Monte de los Olivos',
                  equivalenteActual: 'El-Azariyeh, Palestina',
                  nota: 'Casa de Marta, María y Lázaro. Lugar donde Jesús enseñó la prioridad de escuchar la Palabra.',
                  orden: 1,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Cuántos discípulos envía Jesús en Lucas 10?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Setenta', esCorrecta: true, orden: 1 },
                      { texto: 'Doce', esCorrecta: false, orden: 2 },
                      { texto: 'Cincuenta', esCorrecta: false, orden: 3 },
                      { texto: 'Ochenta', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué lección enseña la parábola del buen samaritano?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'El prójimo es cualquiera que muestra misericordia', esCorrecta: true, orden: 1 },
                      { texto: 'Solo los judíos son prójimos', esCorrecta: false, orden: 2 },
                      { texto: 'Los sacerdotes y levitas son los únicos justos', esCorrecta: false, orden: 3 },
                      { texto: 'No debemos ayudar a los que nos odian', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué escoge María que es la "buena parte"?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Sentarse a los pies de Jesús y escuchar su Palabra', esCorrecta: true, orden: 1 },
                      { texto: 'Servir en la cocina como Marta', esCorrecta: false, orden: 2 },
                      { texto: 'Salir a predicar el evangelio', esCorrecta: false, orden: 3 },
                      { texto: 'Ayunar y orar sin cesar', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué dice Jesús que no debe quitarse a María?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'La buena parte que ha escogido', esCorrecta: true, orden: 1 },
                      { texto: 'Su riqueza y prosperidad', esCorrecta: false, orden: 2 },
                      { texto: 'Su posición en la iglesia', esCorrecta: false, orden: 3 },
                      { texto: 'Su familia y amigos', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 7: Oración, oración y más oración ───
          {
            orden: 7,
            semana: 7,
            titulo: 'Oración, oración y más oración',
            tema: 'La oración modelo, señales y advertencias',
            pasajeBase: 'Lucas 11',
            introduccion:
              'Jesús enseña a sus discípulos a orar, dándoles el Padre Nuestro como modelo. Luego, mediante la parábola del amigo importuno, enseña sobre la perseverancia en la oración. Jesús sana a un endemoniado y es acusado de expulsar demonios por Beelzebú. Responde con la enseñanza sobre el reino dividido y la importancia de estar del lado de Dios. También enseña sobre la luz del cuerpo y la necesidad de tener el ojo lleno de luz. Finalmente, pronuncia ayes sobre los fariseos y los intérpretes de la ley, denunciando su hipocresía. La oración es el centro de esta lección: la comunión con el Padre es esencial para el discipulado.',
            contextoHistorico:
              'La oración era una práctica central en el judaísmo. El Padre Nuestro es un resumen de la oración judía, pero con un enfoque en la relación íntima con Dios como Padre. (verificar) La acusación de que Jesús expulsa demonios por Beelzebú refleja la oposición de los líderes religiosos. Los ayes sobre los fariseos y los intérpretes de la ley revelan las tensiones entre Jesús y la autoridad religiosa.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 11:2-4',
                  texto: 'Cuando oréis, decid: Padre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Danos cada día nuestro pan cotidiano. Y perdónanos nuestros pecados, porque también nosotros perdonamos a todos los que nos deben. Y no nos metas en tentación, mas líbranos del mal.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 11:9-10',
                  texto: 'Y yo os digo: Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá. Porque todo aquel que pide, recibe; y el que busca, halla; y al que llama, se le abrirá.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'El Padre Nuestro',
                  significado: 'El modelo de oración que enseña a los discípulos la relación filial con Dios y las prioridades del Reino.',
                  referencias: 'Lucas 11:1-4',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El amigo importuno',
                  significado: 'La perseverancia en la oración, confiando en que Dios responde a los que le buscan.',
                  referencias: 'Lucas 11:5-8',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'Beelzebú',
                  significado: 'El príncipe de los demonios, al cual algunos acusaban a Jesús de servir.',
                  referencias: 'Lucas 11:15-23',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el que enseña a orar',
                  cristoEnEl: 'Cristo es el mediador que nos enseña a acercarnos al Padre con confianza y perseverancia.',
                  cita: 'Lucas 11:1-4; Juan 14:13-14',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el que echa fuera demonios por el Espíritu de Dios',
                  cristoEnEl: 'Cristo es el que vence al poder de Satanás y establece el Reino de Dios.',
                  cita: 'Lucas 11:20-22; Colosenses 2:15',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La oración perseverante como práctica del Reino',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 11:5-13',
                  citaCumplimiento: null,
                  orden: 1,
                },
                {
                  tema: 'La hipocresía de los fariseos será juzgada',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 11:37-54',
                  citaCumplimiento: null,
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué enseñanza da Jesús sobre la oración en Lucas 11:9-10?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Pedid, buscad, llamad; y se os dará, hallaréis, se os abrirá', esCorrecta: true, orden: 1 },
                      { texto: 'Solo orad cuando estéis en problemas', esCorrecta: false, orden: 2 },
                      { texto: 'La oración es inútil sin ayuno', esCorrecta: false, orden: 3 },
                      { texto: 'Dios no responde a los que oran', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿A qué se compara la oración perseverante en la parábola de Lucas 11?',
                  orden: 2,
                  opciones: {
                    create: [
                                            { texto: 'A un amigo que pide pan a medianoche', esCorrecta: true, orden: 1 },
                      { texto: 'A una mujer que busca una moneda perdida', esCorrecta: false, orden: 2 },
                      { texto: 'A un sembrador que siembra semillas', esCorrecta: false, orden: 3 },
                      { texto: 'A un pastor que busca una oveja perdida', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué acusación hacen algunos contra Jesús en Lucas 11?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Que echa fuera demonios por Beelzebú', esCorrecta: true, orden: 1 },
                      { texto: 'Que es un samaritano', esCorrecta: false, orden: 2 },
                      { texto: 'Que no paga impuestos al César', esCorrecta: false, orden: 3 },
                      { texto: 'Que blasfema contra el templo', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué señales da Jesús sobre la luz del cuerpo?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'El ojo es la lámpara del cuerpo; si el ojo está sano, todo el cuerpo está lleno de luz', esCorrecta: true, orden: 1 },
                      { texto: 'El ojo no tiene relación con la luz del cuerpo', esCorrecta: false, orden: 2 },
                      { texto: 'La luz del cuerpo es la riqueza', esCorrecta: false, orden: 3 },
                      { texto: 'La luz del cuerpo es la fama', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 8: Parábolas de misericordia ───
          {
            orden: 8,
            semana: 8,
            titulo: 'Parábolas de misericordia',
            tema: 'Advertencias y parábolas del Reino sobre la fidelidad y la vigilancia',
            pasajeBase: 'Lucas 12–13',
            introduccion:
              'Jesús enseña a la multitud y a sus discípulos sobre la hipocresía, el temor a Dios, la confianza en la providencia, y la necesidad de estar preparados para su venida. La parábola del rico insensato advierte contra la codicia: "No os preocupéis por vuestra vida, qué comeréis; ni por el cuerpo, qué vestiréis". También enseña sobre el fuego que ha venido a traer a la tierra y la necesidad de discernir los tiempos. Luego, al enterarse de la muerte de algunos galileos a manos de Pilato, Jesús enseña sobre el arrepentimiento. La parábola de la higuera estéril muestra la paciencia de Dios y la urgencia del arrepentimiento. Finalmente, sana a una mujer encorvada en el día de reposo, desafiando la hipocresía de los líderes religiosos.',
            contextoHistorico:
              'Los galileos eran considerados más propensos a la rebelión por los romanos. (verificar) La mención de la torre de Siloé que cayó era un evento conocido. La sanidad de la mujer encorvada en el día de reposo muestra el conflicto de Jesús con los líderes religiosos sobre la interpretación de la ley. La parábola de la higuera estéril refleja la paciencia de Dios con Israel, pero también la urgencia del arrepentimiento.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 12:15',
                  texto: 'Mirad, y guardaos de toda avaricia; porque la vida del hombre no consiste en la abundancia de los bienes que posee.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 13:24-25',
                  texto: 'Esforzaos a entrar por la puerta angosta; porque os digo que muchos procurarán entrar, y no podrán.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'El rico insensato',
                  significado: 'La insensatez de acumular riquezas sin ser rico para con Dios.',
                  referencias: 'Lucas 12:13-21',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'La higuera estéril',
                  significado: 'La paciencia de Dios con Israel y la urgencia del arrepentimiento.',
                  referencias: 'Lucas 13:6-9',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'La mujer encorvada',
                  significado: 'La liberación de la esclavitud de Satanás y la compasión de Jesús.',
                  referencias: 'Lucas 13:10-17',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'La puerta angosta',
                  significado: 'La entrada al Reino requiere esfuerzo y decisión, no es automática.',
                  referencias: 'Lucas 13:24-30',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el que enseña sobre la provisión de Dios',
                  cristoEnEl: 'Cristo es el que provee para las necesidades de los suyos y nos enseña a confiar en el Padre.',
                  cita: 'Lucas 12:22-34; Mateo 6:25-34',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el que sana en el día de reposo',
                  cristoEnEl: 'Cristo es el Señor del reposo, que trae liberación y sanidad a los oprimidos.',
                  cita: 'Lucas 13:10-17; Éxodo 20:8-11',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La necesidad de estar preparados para la venida del Hijo del Hombre',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 12:35-48',
                  citaCumplimiento: null,
                  orden: 1,
                },
                {
                  tema: 'El juicio sobre los que no se arrepienten',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 13:1-5',
                  citaCumplimiento: null,
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué enseña Jesús sobre la vida del hombre en Lucas 12:15?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'No consiste en la abundancia de los bienes que posee', esCorrecta: true, orden: 1 },
                      { texto: 'Consiste en acumular riquezas para el futuro', esCorrecta: false, orden: 2 },
                      { texto: 'Consiste en tener una buena familia', esCorrecta: false, orden: 3 },
                      { texto: 'Consiste en tener éxito profesional', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué representa la parábola de la higuera estéril?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'La paciencia de Dios y la urgencia del arrepentimiento', esCorrecta: true, orden: 1 },
                      { texto: 'La inutilidad de la oración', esCorrecta: false, orden: 2 },
                      { texto: 'La condenación de los gentiles', esCorrecta: false, orden: 3 },
                      { texto: 'La bendición de la tierra', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué milagro realiza Jesús en el día de reposo en Lucas 13?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Sana a una mujer encorvada', esCorrecta: true, orden: 1 },
                      { texto: 'Sana a un leproso', esCorrecta: false, orden: 2 },
                      { texto: 'Resucita a un muerto', esCorrecta: false, orden: 3 },
                      { texto: 'Multiplica los panes', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué exhortación hace Jesús sobre la entrada al Reino?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Esforzaos a entrar por la puerta angosta', esCorrecta: true, orden: 1 },
                      { texto: 'Entrad por la puerta ancha, que es más fácil', esCorrecta: false, orden: 2 },
                      { texto: 'No es necesario esforzarse, solo hay que creer', esCorrecta: false, orden: 3 },
                      { texto: 'La entrada es automática para todos', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 9: Parábolas del amor y la gracia ───
          {
            orden: 9,
            semana: 9,
            titulo: 'Parábolas del amor y la gracia',
            tema: 'El amor incondicional de Dios y la gracia que busca a los perdidos',
            pasajeBase: 'Lucas 14–16',
            introduccion:
              'En Lucas 14-16, Jesús presenta algunas de las parábolas más hermosas sobre la gracia de Dios. La parábola de la gran cena muestra que Dios invita a todos, especialmente a los pobres, los cojos y los ciegos, cuando los invitados originales rechazan la invitación. Luego, la parábola de la oveja perdida, la moneda perdida, y el hijo pródigo ilustran la alegría de Dios cuando un pecador se arrepiente. El hijo pródigo es la joya de la corona: un hijo que desperdicia su herencia, regresa arrepentido, y es recibido con amor y celebración por su padre. También incluye la parábola del mayordomo infiel y la enseñanza sobre el amor al dinero.',
            contextoHistorico:
              'El contexto de estas parábolas es la crítica de los fariseos y escribas porque Jesús recibe a pecadores y come con ellos (Lucas 15:1-2). (verificar) La parábola del hijo pródigo refleja la cultura del honor y la vergüenza en el mundo antiguo: el hijo que pide su herencia antes de tiempo era una afrenta al padre. La recepción del hijo con un beso, un anillo y un banquete era una restauración completa de su posición. La parábola del mayordomo infiel ha sido difícil de interpretar; probablemente enseña la astucia en el uso de los recursos para el Reino. (verificar)',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 15:20',
                  texto: 'Se levantó, y vino a su padre. Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia, y corrió, y se echó sobre su cuello, y le besó.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 15:24',
                  texto: 'Porque este mi hijo muerto era, y ha revivido; se había perdido, y es hallado. Y comenzaron a regocijarse.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'La gran cena',
                  significado: 'La invitación universal al Reino de Dios, extendida a todos, especialmente a los marginados.',
                  referencias: 'Lucas 14:15-24',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'La oveja perdida',
                  significado: 'El amor de Dios que busca a los perdidos y se regocija en su restauración.',
                  referencias: 'Lucas 15:3-7',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'La moneda perdida',
                  significado: 'La diligencia de Dios en buscar a los que están perdidos hasta encontrarlos.',
                  referencias: 'Lucas 15:8-10',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'El hijo pródigo',
                  significado: 'El pecador que se arrepiente y es recibido con amor y gracia por el Padre.',
                  referencias: 'Lucas 15:11-32',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
                {
                  nombre: 'El padre del hijo pródigo',
                  significado: 'El amor incondicional de Dios, que corre hacia el pecador arrepentido y lo restaura.',
                  referencias: 'Lucas 15:20-24',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 5,
                },
                {
                  nombre: 'El mayordomo infiel',
                  significado: 'La necesidad de ser astutos en el uso de los recursos para el Reino.',
                  referencias: 'Lucas 16:1-13',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 6,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el que busca a los perdidos',
                  cristoEnEl: 'Cristo es el Buen Pastor que da su vida por las ovejas y busca a la que se ha perdido.',
                  cita: 'Lucas 15:1-7; Juan 10:11-18',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el padre del hijo pródigo',
                  cristoEnEl: 'Cristo revela el corazón del Padre, que recibe a los pecadores arrepentidos con amor y gracia.',
                  cita: 'Lucas 15:20-24; 2 Corintios 5:19',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La alegría de Dios por el arrepentimiento de los pecadores',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 15:7, 10',
                  citaCumplimiento: null,
                  orden: 1,
                },
                {
                  tema: 'La justicia de Dios y la promesa del Reino',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 16:16-17',
                  citaCumplimiento: null,
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué representa el padre en la parábola del hijo pródigo?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'El amor incondicional de Dios que recibe al pecador arrepentido', esCorrecta: true, orden: 1 },
                      { texto: 'La ley que castiga al pecador', esCorrecta: false, orden: 2 },
                      { texto: 'El diablo que tienta a los hombres', esCorrecta: false, orden: 3 },
                      { texto: 'La indiferencia de Dios ante el pecado', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué ocurre cuando el hijo pródigo regresa a su padre?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'El padre corre a su encuentro, lo abraza y celebra su regreso', esCorrecta: true, orden: 1 },
                      { texto: 'El padre lo rechaza y le dice que no es su hijo', esCorrecta: false, orden: 2 },
                      { texto: 'El padre le exige que pague toda su deuda', esCorrecta: false, orden: 3 },
                      { texto: 'El padre le da una tarea difícil como castigo', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Cuál es la reacción del hermano mayor en la parábola del hijo pródigo?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Se enoja y no quiere entrar a la celebración', esCorrecta: true, orden: 1 },
                      { texto: 'Se alegra y celebra con el padre', esCorrecta: false, orden: 2 },
                      { texto: 'Perdona inmediatamente a su hermano', esCorrecta: false, orden: 3 },
                      { texto: 'Se va de la casa para siempre', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué enseñanza deja la parábola de la oveja perdida?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Dios se regocija más por un pecador que se arrepiente que por noventa y nueve justos', esCorrecta: true, orden: 1 },
                      { texto: 'Dios solo se preocupa por los justos', esCorrecta: false, orden: 2 },
                      { texto: 'Los pecadores no tienen esperanza', esCorrecta: false, orden: 3 },
                      { texto: 'Dios busca a los justos, no a los pecadores', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 10: Entrada triunfal y enseñanza en el templo ───
          {
            orden: 10,
            semana: 10,
            titulo: 'Entrada triunfal y enseñanza en el templo',
            tema: 'Sanación, enseñanzas, Zaqueo, parábola de las minas',
            pasajeBase: 'Lucas 17–19:27',
            introduccion:
              'Jesús sana a diez leprosos, pero solo uno regresa para dar gracias. Enseña sobre la venida del Reino y la necesidad de estar preparados. La parábola del fariseo y el publicano muestra que la humildad es la clave de la justificación. Jesús bendice a los niños y enseña que de ellos es el Reino. El encuentro con Zaqueo en Jericó es un momento de gracia: un recaudador de impuestos, jefe de publicanos, se arrepiente y restituye. Jesús declara: "Hoy ha venido la salvación a esta casa". Luego, la parábola de las minas enseña sobre la fidelidad en el servicio mientras esperamos el regreso del Rey.',
            contextoHistorico:
              'Los leprosos eran marginados sociales y religiosos. (verificar) La parábola del fariseo y el publicano refleja las prácticas de oración en el templo: los fariseos eran respetados, los publicanos despreciados. Zaqueo era un recaudador de impuestos jefe, rico y despreciado por los judíos. La parábola de las minas se basa en la situación política de la época, cuando Arquelao viajó a Roma para recibir el reino y sus siervos esperaban su regreso. (verificar)',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 18:13-14',
                  texto: 'Mas el publicano, estando lejos, no quería ni aun alzar los ojos al cielo, sino que se golpeaba el pecho, diciendo: Dios, sé propicio a mí, pecador. Os digo que este descendió a su casa justificado antes que el otro; porque cualquiera que se enaltece, será humillado; y el que se humilla, será enaltecido.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 19:10',
                  texto: 'Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'Los diez leprosos',
                  significado: 'La gratitud que solo uno de cada diez expresa, mostrando la falta de reconocimiento humano.',
                  referencias: 'Lucas 17:11-19',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El fariseo y el publicano',
                  significado: 'La justificación por la fe y la humildad, no por la autosuficiencia.',
                  referencias: 'Lucas 18:9-14',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'Zaqueo',
                  significado: 'El pecador arrepentido que restituye y recibe la salvación.',
                  referencias: 'Lucas 19:1-10',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'Las minas',
                  significado: 'La responsabilidad de los siervos de usar los dones del Señor mientras esperan su regreso.',
                  referencias: 'Lucas 19:11-27',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el que busca y salva a los perdidos',
                  cristoEnEl: 'Cristo vino a buscar y salvar a los perdidos, como lo demuestra su encuentro con Zaqueo.',
                  cita: 'Lucas 19:10; Ezequiel 34:16',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el Rey que se va y regresa',
                  cristoEnEl: 'Cristo es el Rey que ascendió al cielo y regresará para juzgar y recompensar a sus siervos.',
                  cita: 'Lucas 19:11-27; Hechos 1:9-11',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La humildad como camino de justificación',
                  estado: 'por_cumplir',
                  citaBase: 'Lucas 18:13-14',
                  citaCumplimiento: null,
                  orden: 1,
                },
                {
                  tema: 'La búsqueda de los perdidos por parte del Hijo del Hombre',
                  estado: 'cumplida',
                  citaBase: 'Lucas 19:10',
                  citaCumplimiento: 'Ezequiel 34:16',
                  orden: 2,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Jericó',
                  ubicacion: 'Valle del Jordán, al este de Jerusalén',
                  equivalenteActual: 'Jericó, Palestina',
                  nota: 'Ciudad donde Jesús sana a Bartimeo y se encuentra con Zaqueo. Lugar de gran significado histórico (la conquista de Josué).',
                  orden: 1,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Cuántos leprosos regresan a dar gracias a Jesús?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Uno', esCorrecta: true, orden: 1 },
                      { texto: 'Cinco', esCorrecta: false, orden: 2 },
                      { texto: 'Diez', esCorrecta: false, orden: 3 },
                      { texto: 'Ninguno', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Quién se justifica en la parábola del fariseo y el publicano?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'El publicano que se humilla', esCorrecta: true, orden: 1 },
                      { texto: 'El fariseo que ora', esCorrecta: false, orden: 2 },
                      { texto: 'Ambos', esCorrecta: false, orden: 3 },
                      { texto: 'Ninguno', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué declara Jesús sobre Zaqueo?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: '"Hoy ha venido la salvación a esta casa"', esCorrecta: true, orden: 1 },
                      { texto: '"No eres digno de mí"', esCorrecta: false, orden: 2 },
                      { texto: '"Vende todo lo que tienes y sígueme"', esCorrecta: false, orden: 3 },
                      { texto: '"Todavía te falta una cosa"', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué enseña la parábola de las minas sobre el Rey?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Que el Rey se va y regresa para juzgar a sus siervos', esCorrecta: true, orden: 1 },
                      { texto: 'Que el Rey no regresará nunca', esCorrecta: false, orden: 2 },
                      { texto: 'Que los siervos no tienen responsabilidad', esCorrecta: false, orden: 3 },
                      { texto: 'Que el Reino no es para los siervos', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 11: La Pasión y muerte de Cristo ───
          {
            orden: 11,
            semana: 11,
            titulo: 'La Pasión y muerte de Cristo',
            tema: 'Entrada triunfal, última cena, juicio y crucifixión',
            pasajeBase: 'Lucas 19:28–23',
            introduccion:
              'La entrada triunfal en Jerusalén marca el inicio de la semana de la Pasión. Jesús llora sobre la ciudad, profetizando su destrucción. Luego purifica el templo y enseña en él. La última cena es una celebración de la nueva alianza: "Esto es mi cuerpo... Esta copa es el nuevo pacto en mi sangre". En el huerto de Getsemaní, Jesús ora con angustia, pero se somete a la voluntad del Padre. Judas lo traiciona, Pedro lo niega, y Jesús es llevado ante el Sanedrín, Pilato y Herodes. Es condenado y crucificado entre dos ladrones. Desde la cruz, clama: "Padre, perdónalos, porque no saben lo que hacen". Al morir, el velo del templo se rasga y la tierra tiembla. José de Arimatea pide su cuerpo y lo coloca en un sepulcro nuevo.',
            contextoHistorico:
              'La entrada triunfal en Jerusalén cumplía la profecía de Zacarías 9:9. (verificar) La última cena era una cena de Pascua, recordando la liberación de Egipto. Jesús la transforma en la institución de la Eucaristía. El juicio ante Pilato y Herodes refleja el sistema legal romano. La crucifixión era la pena de muerte más cruel, reservada para esclavos y rebeldes. El velo del templo rasgado simboliza el acceso directo a Dios a través de la muerte de Cristo.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 22:19-20',
                  texto: 'Y tomando el pan, dio gracias, y lo partió, y les dio, diciendo: Esto es mi cuerpo, que por vosotros es dado; haced esto en memoria de mí. De igual manera, después que cenaron, tomó la copa, diciendo: Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 23:34',
                  texto: 'Jesús decía: Padre, perdónalos, porque no saben lo que hacen.',
                  orden: 2,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'La entrada triunfal',
                  significado: 'La aclamación de Jesús como Rey, cumpliendo la profecía de Zacarías.',
                  referencias: 'Lucas 19:28-40',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El pan y la copa de la última cena',
                  significado: 'El cuerpo y la sangre de Cristo, el nuevo pacto en su muerte.',
                  referencias: 'Lucas 22:14-20',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'Getsemaní',
                  significado: 'El lugar de la agonía, donde Jesús se somete a la voluntad del Padre.',
                  referencias: 'Lucas 22:39-46',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'La cruz',
                  significado: 'El lugar de la muerte expiatoria de Cristo, donde el velo se rasga.',
                  referencias: 'Lucas 23:33-49',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
                {
                  nombre: 'El velo rasgado',
                  significado: 'El acceso directo a Dios a través de la muerte de Cristo.',
                  referencias: 'Lucas 23:45',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 5,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el Cordero de la Pascua',
                  cristoEnEl: 'Cristo es el Cordero sin mancha que es inmolado por los pecados del mundo.',
                  cita: 'Lucas 22:19-20; Juan 1:29',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el Rey humilde',
                  cristoEnEl: 'Cristo entra como Rey, pero en humildad, montado en un asno, inaugurando un Reino de paz.',
                  cita: 'Lucas 19:28-40; Zacarías 9:9',
                  orden: 2,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La entrada triunfal como cumplimiento de la profecía de Zacarías',
                  estado: 'cumplida',
                  citaBase: 'Lucas 19:28-40',
                  citaCumplimiento: 'Zacarías 9:9',
                  orden: 1,
                },
                {
                  tema: 'El nuevo pacto en la sangre de Cristo',
                  estado: 'cumplida',
                  citaBase: 'Lucas 22:19-20',
                  citaCumplimiento: 'Jeremías 31:31-34',
                  orden: 2,
                },
                {
                  tema: 'La crucifixión de Cristo como el Cordero de Dios',
                  estado: 'cumplida',
                  citaBase: 'Lucas 23:33-49',
                  citaCumplimiento: 'Isaías 53',
                  orden: 3,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Jerusalén',
                  ubicacion: 'Montañas de Judea',
                  equivalenteActual: 'Jerusalén, Israel',
                  nota: 'La ciudad donde Jesús fue crucificado y resucitó. Centro de la historia de la salvación.',
                  orden: 1,
                },
                {
                  nombreBiblico: 'Getsemaní',
                  ubicacion: 'Al pie del Monte de los Olivos, al este de Jerusalén',
                  equivalenteActual: 'Jardín de Getsemaní, Jerusalén',
                  nota: 'El lugar donde Jesús oró antes de ser arrestado. Un huerto de olivos.',
                  orden: 2,
                },
                {
                  nombreBiblico: 'Gólgota',
                  ubicacion: 'Fuera de las murallas de Jerusalén',
                  equivalenteActual: 'Calvario, Jerusalén',
                  nota: 'El lugar de la crucifixión, llamado "lugar de la calavera".',
                  orden: 3,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué instituye Jesús en la última cena?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'El nuevo pacto en su sangre y el memorial de su muerte', esCorrecta: true, orden: 1 },
                      { texto: 'Un banquete para celebrar la Pascua', esCorrecta: false, orden: 2 },
                      { texto: 'Una ceremonia política', esCorrecta: false, orden: 3 },
                      { texto: 'Un ritual de purificación', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué oración hace Jesús desde la cruz?',
                  orden: 2,
                  opciones: {
                    create: [
                                        { texto: '"Padre, perdónalos, porque no saben lo que hacen"', esCorrecta: true, orden: 1 },
                      { texto: '"Dios mío, Dios mío, ¿por qué me has desamparado?"', esCorrecta: false, orden: 2 },
                      { texto: '"En tus manos encomiendo mi espíritu"', esCorrecta: false, orden: 3 },
                      { texto: '"Consumado es"', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué sucede en el templo cuando Jesús muere?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'El velo del templo se rasga en dos', esCorrecta: true, orden: 1 },
                      { texto: 'El templo se derrumba', esCorrecta: false, orden: 2 },
                      { texto: 'Los sacerdotes se convierten', esCorrecta: false, orden: 3 },
                      { texto: 'El fuego desciende del cielo', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Quién pide el cuerpo de Jesús para sepultarlo?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'José de Arimatea, miembro del concilio', esCorrecta: true, orden: 1 },
                      { texto: 'Nicodemo', esCorrecta: false, orden: 2 },
                      { texto: 'Juan el discípulo', esCorrecta: false, orden: 3 },
                      { texto: 'María Magdalena', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
              ],
            },
          },
          // ─── LECCIÓN 12: La Resurrección y Ascensión ───
          {
            orden: 12,
            semana: 12,
            titulo: 'La Resurrección y Ascensión',
            tema: 'La victoria de Cristo sobre la muerte, el camino a Emaús y la ascensión',
            pasajeBase: 'Lucas 24',
            introduccion:
              'Lucas 24 es el capítulo de la victoria. Las mujeres van al sepulcro y lo encuentran vacío. Dos ángeles les anuncian que Jesús ha resucitado. Luego, el encuentro en el camino a Emaús es uno de los relatos más hermosos de la Escritura: Jesús se acerca a dos discípulos desanimados y les explica las Escrituras, comenzando por Moisés y todos los profetas. Su corazón arde mientras Él les habla. Finalmente, al partir el pan, lo reconocen. Jesús aparece a los once y a sus discípulos, les muestra sus manos y sus pies, come con ellos, y les abre el entendimiento para comprender las Escrituras. Les promete el poder del Espíritu Santo y los envía a predicar el arrepentimiento y el perdón a todas las naciones. Luego, los bendice y asciende al cielo. El evangelio termina con los discípulos adorando y llenos de gozo, esperando la promesa del Espíritu.',
            contextoHistorico:
              'La resurrección de Jesús era considerada imposible en el mundo antiguo. (verificar) Las mujeres eran testigos válidos en el contexto judío, aunque su testimonio no siempre era valorado. El camino a Emaús era una ruta de unos 11 kilómetros desde Jerusalén. (verificar) La aparición de Jesús a los discípulos en la tarde de Pascua muestra que su cuerpo resucitado es real, pero glorificado (puede aparecer y desaparecer). La ascensión es la culminación de su obra, sentándose a la diestra del Padre.',
            versiculosMemoria: {
              create: [
                {
                  cita: 'Lucas 24:5-6',
                  texto: '¿Por qué buscáis entre los muertos al que vive? No está aquí, sino que ha resucitado.',
                  orden: 1,
                },
                {
                  cita: 'Lucas 24:30-31',
                  texto: 'Y sucedió que mientras estaba sentado con ellos a la mesa, tomó el pan, lo bendijo, lo partió y les dio. Entonces les fueron abiertos los ojos, y le reconocieron; pero él se desapareció de su vista.',
                  orden: 2,
                },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Interpreta la resurrección como un evento histórico que confirma la identidad de Jesús como el Mesías. La ascensión marca el fin de su ministerio terrenal. Valor: respeta la historicidad de la resurrección. Límite (según nuestra postura): no considera las implicaciones proféticas de la ascensión y la segunda venida.',
                  esPosturaPropia: false,
                  orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en la resurrección el fundamento histórico de la fe cristiana. El camino a Emaús es la clave hermenéutica: toda la Escritura apunta a Cristo. Valor: enfatiza la unidad de la Escritura. Límite: tiende a subestimar la dimensión profética de la resurrección.',
                  esPosturaPropia: false,
                  orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra postura (línea del Movimiento Misionero Mundial). La resurrección de Cristo es la garantía de nuestra resurrección futura. La ascensión es la entrada de Cristo en su gloria y su intercesión a la diestra del Padre. La promesa del Espíritu Santo se cumple en Pentecostés, y la misión de predicar el arrepentimiento y el perdón a todas las naciones se extiende a toda la Iglesia hasta la segunda venida.',
                  esPosturaPropia: true,
                  orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Interpreta la resurrección como un símbolo de la victoria del amor sobre la muerte y del bien sobre el mal. El camino a Emaús representa la experiencia espiritual de cada creyente: Jesús se revela en la Palabra y en la comunión. Valor: hace la aplicación espiritual personal. Límite (según nuestra postura): al espiritualizar la resurrección, puede perder su historicidad y su poder como evento real.',
                  esPosturaPropia: false,
                  orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                {
                  nombre: 'El sepulcro vacío',
                  significado: 'La evidencia de la resurrección de Cristo y la victoria sobre la muerte.',
                  referencias: 'Lucas 24:1-12',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 1,
                },
                {
                  nombre: 'El camino a Emaús',
                  significado: 'El viaje de la fe: el encuentro con Cristo en las Escrituras y en el partir del pan.',
                  referencias: 'Lucas 24:13-35',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 2,
                },
                {
                  nombre: 'El pan partido',
                  significado: 'El reconocimiento de Cristo en la comunión, el memorial de su muerte.',
                  referencias: 'Lucas 24:30-31',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 3,
                },
                {
                  nombre: 'La ascensión',
                  significado: 'La exaltación de Cristo a la diestra del Padre y la promesa de su regreso.',
                  referencias: 'Lucas 24:50-53',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 4,
                },
                {
                  nombre: 'El poder del Espíritu Santo',
                  significado: 'La promesa del Padre que capacita a los discípulos para la misión.',
                  referencias: 'Lucas 24:49',
                  trasfondoCultural: '', // Se llenará con seedLucasTrasfondoSimbolos.ts
                  orden: 5,
                },
              ],
            },
            tipologias: {
              create: [
                {
                  elemento: 'Jesús como el Resucitado',
                  cristoEnEl: 'Cristo es el primogénito de los muertos, la garantía de nuestra resurrección. Su victoria sobre la muerte es la base de nuestra esperanza.',
                  cita: 'Lucas 24:5-6; 1 Corintios 15:20-23',
                  orden: 1,
                },
                {
                  elemento: 'Jesús como el que abre el entendimiento de las Escrituras',
                  cristoEnEl: 'Cristo es la clave de toda la Escritura. Todo el Antiguo Testamento apunta a Él. Sin Él, la Escritura no se entiende plenamente.',
                  cita: 'Lucas 24:25-27, 44-47; Juan 5:39',
                  orden: 2,
                },
                {
                  elemento: 'Jesús como el que bendice y asciende',
                  cristoEnEl: 'Cristo es el Rey que asciende al trono celestial y bendice a su pueblo. Su ascensión es la garantía de su regreso y de nuestra entrada en el cielo.',
                  cita: 'Lucas 24:50-53; Hebreos 4:14-16',
                  orden: 3,
                },
              ],
            },
            profecias: {
              create: [
                {
                  tema: 'La resurrección de Cristo al tercer día',
                  estado: 'cumplida',
                  citaBase: 'Lucas 24:1-8',
                  citaCumplimiento: 'Salmo 16:10; Oseas 6:2',
                  orden: 1,
                },
                {
                  tema: 'La apertura del entendimiento para entender las Escrituras',
                  estado: 'cumplida',
                  citaBase: 'Lucas 24:44-47',
                  citaCumplimiento: null,
                  orden: 2,
                },
                {
                  tema: 'La promesa del Espíritu Santo y la misión de la Iglesia',
                  estado: 'cumplida',
                  citaBase: 'Lucas 24:48-49',
                  citaCumplimiento: 'Hechos 1:8; 2:1-4',
                  orden: 3,
                },
              ],
            },
            ciudades: {
              create: [
                {
                  nombreBiblico: 'Emaús',
                  ubicacion: 'Un pueblo a unos 11 km de Jerusalén',
                  equivalenteActual: 'El-Qubeibeh o Amwas, Israel (debate sobre ubicación exacta)',
                  nota: 'El lugar donde Jesús se apareció a dos discípulos. Un viaje que se convirtió en el más memorable de la historia.',
                  orden: 1,
                },
                {
                  nombreBiblico: 'Betania',
                  ubicacion: 'Al este del Monte de los Olivos, cerca de Jerusalén',
                  equivalenteActual: 'El-Azariyeh, Palestina',
                  nota: 'El lugar desde donde Jesús ascendió al cielo. También el hogar de Marta, María y Lázaro.',
                  orden: 2,
                },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '¿Qué encuentran las mujeres en el sepulcro de Jesús?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'El sepulcro vacío y dos ángeles que anuncian la resurrección', esCorrecta: true, orden: 1 },
                      { texto: 'El cuerpo de Jesús aún en el sepulcro', esCorrecta: false, orden: 2 },
                      { texto: 'A Jesús resucitado hablando con ellas', esCorrecta: false, orden: 3 },
                      { texto: 'A los soldados romanos durmiendo', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Cómo reconocen los discípulos a Jesús en el camino a Emaús?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'Al partir el pan y bendecirlo', esCorrecta: true, orden: 1 },
                      { texto: 'Al ver sus heridas en las manos', esCorrecta: false, orden: 2 },
                      { texto: 'Al hablar con él y reconocer su voz', esCorrecta: false, orden: 3 },
                      { texto: 'Al verlo caminar sobre el agua', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué declara Jesús sobre las Escrituras en el camino a Emaús?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Que todas las Escrituras hablan de Él', esCorrecta: true, orden: 1 },
                      { texto: 'Que las Escrituras ya no son necesarias', esCorrecta: false, orden: 2 },
                      { texto: 'Que las Escrituras son solo para los judíos', esCorrecta: false, orden: 3 },
                      { texto: 'Que las Escrituras son mitos sin significado', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué promesa hace Jesús antes de ascender al cielo?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'El poder del Espíritu Santo para ser testigos', esCorrecta: true, orden: 1 },
                      { texto: 'Riquezas y prosperidad para la Iglesia', esCorrecta: false, orden: 2 },
                      { texto: 'La conquista política de Israel', esCorrecta: false, orden: 3 },
                      { texto: 'La destrucción de todos los enemigos', esCorrecta: false, orden: 4 },
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

  console.log(`✅ Curso "${curso.nombre}" sembrado con 12 lecciones.`);
  console.log('📖 Lección 1: Prólogo, anuncios y nacimiento (Lucas 1-2)');
  console.log('📖 Lección 2: Preparación y bautismo de Jesús (Lucas 3-4:13)');
  console.log('📖 Lección 3: Ministerio inicial en Galilea (Lucas 4:14-6:16)');
  console.log('📖 Lección 4: El Sermón del Llano (Lucas 6:17-49)');
  console.log('📖 Lección 5: Milagros y fe (Lucas 7-8)');
  console.log('📖 Lección 6: Enseñanzas sobre el Reino (Lucas 9-10)');
  console.log('📖 Lección 7: Oración, oración y más oración (Lucas 11)');
  console.log('📖 Lección 8: Parábolas de misericordia (Lucas 12-13)');
  console.log('📖 Lección 9: Parábolas del amor y la gracia (Lucas 14-16)');
  console.log('📖 Lección 10: Entrada triunfal y enseñanza en el templo (Lucas 17-19:27)');
  console.log('📖 Lección 11: La Pasión y muerte de Cristo (Lucas 19:28-23)');
  console.log('📖 Lección 12: La Resurrección y Ascensión (Lucas 24)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });