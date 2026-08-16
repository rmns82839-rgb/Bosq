import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 7: "El Cordero en el monte Sión y los mensajes angelicales" (Ap 14)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 7.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: Identidad de los 144,000 (¿literal o simbólico?),
//     el monte Sión (terrenal o celestial), el vino de la ira de Dios,
//     y la conexión con Joel 3 y Zacarías 14.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 7 de Apocalipsis...');

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

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 7 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 7,
      semana: 7,
      titulo: 'El Cordero en el monte Sión y los mensajes angelicales',
      tema:
        'La seguridad del pueblo redimido y el anuncio final del juicio divino sobre el mundo',
      pasajeBase: 'Apocalipsis 14',
      introduccion:
        'En contraste con la persecución y el poder de la bestia en el capítulo 13, Juan ve al Cordero de pie sobre el monte Sión, rodeado de 144,000 redimidos que llevan su nombre y el de su Padre. Luego, tres ángeles vuelan en medio del cielo con mensajes urgentes: el primero anuncia el evangelio eterno; el segundo proclama la caída de Babilonia; el tercero advierte sobre el juicio de aquellos que adoran a la bestia. Finalmente, la escena culmina con la cosecha de la tierra y la vendimia del vino de la ira de Dios. Es un capítulo de contraste: la protección del remanente fiel versus la inminente ira divina sobre un mundo rebelde.',
      contextoHistorico:
        'El monte Sión era el lugar emblemático de la presencia de Dios en Jerusalén, el centro de la adoración y la esperanza mesiánica en el Antiguo Testamento (ver Salmo 2:6; Isaías 2:2-3). Para un judío del siglo I, Sión representaba la ciudad de David y el templo, el lugar donde Dios habitaba entre su pueblo. En la profecía, Sión adquiere también un sentido celestial (ver Hebreos 12:22-24, donde el creyente se acerca al "monte de Sión" celestial). Los 144,000 evocan a las tribus de Israel (ver Apocalipsis 7), pero aquí parecen representar al pueblo redimido en su totalidad (verificar). La imagen de la "cosecha" y la "vendimia" era común en el Antiguo Testamento para describir el juicio de Dios sobre las naciones (ver Joel 3:13; Isaías 63:1-6). Juan toma estas imágenes y las aplica al juicio final.',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 14:6',
            texto:
              'Vi volar por en medio del cielo a otro ángel, que tenía el evangelio eterno para predicarlo a los moradores de la tierra, a toda nación, tribu, lengua y pueblo.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 14:13',
            texto:
              'Y oí una voz que desde el cielo me decía: Escribe: Bienaventurados de aquí en adelante los muertos que mueren en el Señor. Sí, dice el Espíritu, descansarán de sus trabajos, porque sus obras con ellos siguen.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Interpreta el monte Sión como la Jerusalén terrenal y los 144,000 como los judíos cristianos que fueron preservados durante la guerra judía (66-70 d.C.). Los mensajes angelicales anuncian la caída de Jerusalén y el juicio sobre el judaísmo incrédulo. Valor: conecta el texto con un contexto histórico inmediato de persecución. Límite (según nuestra postura): reduce el alcance global de los mensajes a un evento local y no da cuenta del juicio final universal que el texto describe.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve en los mensajes de los ángeles una secuencia de eventos históricos a lo largo de la era cristiana: la predicación del evangelio, la caída del Imperio Romano (Babilonia) y los juicios contra los imperios opresores. La cosecha representa la separación final de justos e injustos. Valor: reconoce la obra de Dios en la historia. Límite: la identificación de Babilonia con figuras históricas concretas (como el papado o un imperio) es especulativa y varía según los intérpretes.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). El monte Sión es el lugar celestial donde el Cordero reúne a su pueblo redimido (los 144,000, probablemente un número simbólico de la plenitud de Israel y la Iglesia). Los mensajes de los ángeles son pronunciamientos proféticos que ocurren durante la Gran Tribulación: el evangelio eterno sigue siendo predicado, Babilonia (el sistema mundial opresor) cae, y se advierte sobre la marca de la bestia. La cosecha y la vendimia representan el juicio final de Dios sobre las naciones, que ocurre después del arrebatamiento de la Iglesia.',
            esPosturaPropia: true,
            orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Interpreta el capítulo como una representación simbólica del conflicto entre la iglesia fiel (los 144,000) y el mundo impío. Los mensajes angelicales son el llamado constante de Dios al arrepentimiento a lo largo de todas las épocas. La cosecha y la vendimia simbolizan el juicio final que ocurre al final de los tiempos. Valor: mantiene viva la urgencia del evangelio y la esperanza del juicio divino. Límite (según nuestra postura): al no ubicar los mensajes en un marco profético concreto, se corre el riesgo de diluir el carácter de advertencia específica que el texto tiene.',
            esPosturaPropia: false,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'El Cordero sobre el monte Sión',
            significado:
              'Representa a Cristo triunfante, rodeado de su pueblo redimido, en el lugar de la presencia y la seguridad divina.',
            referencias: 'Apocalipsis 14:1',
            trasfondoCultural:
              'En el Antiguo Testamento, el monte Sión era la colina de Jerusalén donde estaba el templo, el centro de la adoración a Dios y el símbolo de su presencia entre su pueblo (ver Salmo 132:13-14). También se usaba como metáfora del reino de Dios y del lugar de refugio para su pueblo (ver Isaías 4:2-6). Para un lector judío del siglo I, el Cordero sobre Sión era una imagen del Mesías victorioso que reina sobre su pueblo (ver Jeremías 3:17; Zacarías 14:9). (verificar) El monte Sión celestial aparece también en Hebreos 12:22-24 como la ciudad del Dios vivo.',
            orden: 1,
          },
          {
            nombre: 'Los 144,000 redimidos',
            significado:
              'Simbolizan la totalidad del pueblo de Dios que ha sido sellado y preservado, y que permanece fiel en medio de la tribulación. Puede referirse tanto a Israel como a la Iglesia.',
            referencias: 'Apocalipsis 14:1-5',
            trasfondoCultural:
              'El número 144,000 es 12 × 12 × 1,000, lo que sugiere plenitud y totalidad (12 es el número del pueblo de Dios, multiplicado por sí mismo, y 1000 es un número grande). En el capítulo 7, los 144,000 representan a las doce tribus de Israel selladas para la protección (ver Apocalipsis 7:4-8). Aquí, están sobre el monte Sión con el Cordero, lo que indica su victoria y pureza espiritual. La mención de que "no se contaminaron con mujeres" (Apocalipsis 14:4) probablemente es una imagen de fidelidad espiritual, no necesariamente de celibato literal (verificar), pues el Antiguo Testamento a menudo usa la imagen de la "prostitución espiritual" para describir la idolatría (ver Oseas 1-3).',
            orden: 2,
          },
          {
            nombre: 'El primer ángel: el evangelio eterno',
            significado:
              'El anuncio del evangelio a toda la tierra, una proclamación de la salvación y el juicio que no se detiene.',
            referencias: 'Apocalipsis 14:6-7',
            trasfondoCultural:
              'En el mundo antiguo, los mensajeros (ángeles o heraldos) eran enviados para anunciar noticias importantes: victorias en batalla, decretos reales o la llegada de un rey. El "evangelio eterno" es la buena noticia de que Dios ha establecido su reino y que todos deben temerle y adorarle (ver Hechos 17:30-31). Para un lector del siglo I, esto era un contraste directo con los cultos imperiales que exigían adoración al emperador. El mensaje de este ángel es claro: la adoración pertenece solo al Creador.',
            orden: 3,
          },
          {
            nombre: 'El segundo ángel: la caída de Babilonia',
            significado:
              'El anuncio profético de la destrucción del sistema mundial opresor y pecaminoso que se opone a Dios.',
            referencias: 'Apocalipsis 14:8',
            trasfondoCultural:
              'Babilonia, en el Antiguo Testamento, era el imperio que destruyó Jerusalén y el templo en el 586 a.C., y que exilió al pueblo de Dios. Era el símbolo supremo del poder pagano que se opone a Dios (ver Jeremías 51:7-8). En el Nuevo Testamento, Babilonia es la imagen de todo poder humano que se levanta contra Dios y persigue a su pueblo (ver 1 Pedro 5:13, donde algunos intérpretes ven a Roma como "Babilonia"). El "vino de la ira de su fornicación" se refiere a la influencia corruptora de Babilonia que ha embriagado a las naciones (ver Jeremías 51:7). (verificar)',
            orden: 4,
          },
          {
            nombre: 'El tercer ángel: la advertencia sobre la bestia',
            significado:
              'Una advertencia directa a los que adoran a la bestia y reciben su marca; les espera el fuego y el azufre, el juicio sin mezcla de misericordia.',
            referencias: 'Apocalipsis 14:9-11',
            trasfondoCultural:
              'En el mundo antiguo, el castigo con fuego y azufre era conocido como la destrucción de Sodoma y Gomorra (ver Génesis 19:24-25). Isaías usó esta imagen para describir el juicio de Dios sobre los impíos (ver Isaías 34:8-10). El "tormento" que sube por los siglos de los siglos refleja la idea de un juicio eterno, una separación irrevocable de la presencia de Dios. Para el lector del siglo I, esto era una advertencia seria contra la idolatría, especialmente en el contexto de la presión para adorar al emperador.',
            orden: 5,
          },
          {
            nombre: 'La cosecha de la tierra',
            significado:
              'El juicio de Dios sobre los justos (la cosecha) y sobre los impíos (la vendimia), separando a los que son suyos de los que no lo son.',
            referencias: 'Apocalipsis 14:14-20',
            trasfondoCultural:
              'En el mundo agrícola del siglo I, la cosecha era el momento de la siega del trigo y la vendimia de las uvas. El Antiguo Testamento usaba esta imagen para describir el juicio de Dios sobre las naciones (ver Joel 3:13: "echad la hoz, porque la mies está ya madura"). La "gran vendimia" y el lagar del vino de la ira de Dios evocan a Isaías 63:1-6, donde el Señor viene con sus vestiduras manchadas de sangre, juzgando a los enemigos. Esta imagen final del capítulo 14 es una preparación para los juicios de las copas en los capítulos 15-16.',
            orden: 6,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'El Cordero sobre el monte Sión',
            cristoEnEl:
              'Cristo es el Cordero inmolado que ahora reina como Rey victorioso. Su presencia en el monte Sión celestial asegura a su pueblo que Él está con ellos y que su gobierno es eterno.',
            cita: 'Apocalipsis 14:1; Apocalipsis 5:6-8; Hebreos 12:22-24',
            orden: 1,
          },
          {
            elemento: 'La cosecha de la tierra y la vendimia',
            cristoEnEl:
              'Cristo es el que siega y separa el trigo de la cizaña. Él es el Rey que viene a juzgar y a recoger a su pueblo, y el que ejecuta la ira de Dios sobre los rebeldes (ver Mateo 13:30, 40-42).',
            cita: 'Apocalipsis 14:14-16; Mateo 13:30; Juan 5:22-27',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'La predicación del evangelio a toda nación, tribu, lengua y pueblo',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 14:6-7',
            citaCumplimiento: 'Mateo 24:14',
            orden: 1,
          },
          {
            tema: 'La caída de Babilonia, el sistema mundial opresor',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 14:8',
            citaCumplimiento: 'Apocalipsis 18:2-3',
            orden: 2,
          },
          {
            tema: 'El juicio sobre los que adoran a la bestia',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 14:9-11',
            citaCumplimiento: 'Apocalipsis 19:20-21; 20:10',
            orden: 3,
          },
        ],
      },
      ciudades: {
        create: [
          {
            nombreBiblico: 'Monte Sión',
            ubicacion: 'Jerusalén, centro de la adoración en el Antiguo Testamento',
            equivalenteActual: 'Jerusalén, colina oriental de la ciudad vieja',
            nota: 'En Apocalipsis 14:1, el monte Sión tiene un significado tanto terrenal como celestial. En el Nuevo Testamento, se usa como símbolo de la presencia de Dios entre su pueblo redimido (ver Hebreos 12:22-24).',
            orden: 1,
          },
          {
            nombreBiblico: 'Babilonia',
            ubicacion: 'Imperio mesopotámico, en la actual Irak',
            equivalenteActual: 'Cerca de Bagdad, Irak (ruinas de Babilonia)',
            nota: 'En Apocalipsis, Babilonia es un símbolo profético de todo poder humano que se opone a Dios y persigue a su pueblo. No se refiere necesariamente a la ciudad literal de Babilonia, sino al sistema mundial de oposición a Dios (ver Apocalipsis 17-18).',
            orden: 2,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿Qué representa el monte Sión en Apocalipsis 14 según la interpretación futurista?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'El lugar celestial donde el Cordero reina y reúne a su pueblo redimido',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La colina literal de Jerusalén donde se encuentra el templo reconstruido',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El centro del Imperio Romano en el siglo I',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'La ciudad donde la bestia establece su trono',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Cuál es el mensaje del primer ángel en Apocalipsis 14?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'El evangelio eterno debe ser predicado a toda nación, tribu, lengua y pueblo',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La bestia ha sido derrotada y el reino es de Cristo',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'La Iglesia debe ser arrebatada inmediatamente',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Los cielos y la tierra pasarán',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué representa la imagen de la "cosecha" y la "vendimia" en Apocalipsis 14?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'El juicio final de Dios, separando a los justos de los impíos',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La cosecha agrícola literal al final del año',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'La reconstrucción del templo en Jerusalén',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'La fiesta de la cosecha que celebra el pueblo de Israel',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              'Según el mensaje del tercer ángel, ¿qué les espera a los que adoran a la bestia y reciben su marca?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'Fuego, azufre y tormento eterno, sin descanso de día ni de noche',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Serán perdonados si se arrepienten en el último momento',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Serán transformados en hijos de Dios',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'No sufrirán ningún castigo porque la bestia los protege',
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

  console.log('✅ Lección 7 "El Cordero en el monte Sión y los mensajes angelicales" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });