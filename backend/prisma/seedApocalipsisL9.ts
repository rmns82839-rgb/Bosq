import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 9: "La caída de Babilonia" (Ap 17–18)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 9.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: Identidad de la gran ramera (Roma vs. sistema mundial),
//     los siete reyes (¿siete emperadores romanos?),
//     Babilonia como símbolo (Jeremías 50-51, Isaías 13-14),
//     y el lamento de los mercaderes (comercio internacional).
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 9 de Apocalipsis...');

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

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 9 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 9,
      semana: 9,
      titulo: 'La caída de Babilonia',
      tema:
        'El juicio de Dios sobre el sistema mundial corrupto que ha perseguido a su pueblo',
      pasajeBase: 'Apocalipsis 17–18',
      introduccion:
        'Juan es llevado en el Espíritu al desierto, donde ve a una mujer sentada sobre una bestia escarlata, llena de nombres de blasfemia, vestida de púrpura y escarlata, y adornada con oro, piedras preciosas y perlas. Sostiene una copa de oro llena de abominaciones, y está ebria con la sangre de los mártires. Su nombre es: "Babilonia la grande, la madre de las rameras y de las abominaciones de la tierra". Un ángel explica el misterio: la bestia, los siete reyes y los diez cuernos. Luego, otro ángel proclama la caída de Babilonia, y una voz del cielo llama al pueblo de Dios a salir de ella para no participar en sus plagas. Los reyes, los mercaderes y los marineros lloran su destrucción, pero el cielo se regocija porque Dios ha vengado la sangre de sus siervos.',
      contextoHistorico:
        'La Babilonia del Antiguo Testamento fue el imperio que destruyó Jerusalén y el templo en el 586 a.C., y exilió al pueblo de Dios (ver 2 Reyes 25; Jeremías 39). Los profetas Jeremías (capítulos 50-51) e Isaías (capítulos 13-14) anunciaron su caída, que ocurrió en el 539 a.C. cuando Ciro el Persa conquistó la ciudad. Para un lector del siglo I, Babilonia era también un nombre simbólico para Roma, la ciudad que había destruido Jerusalén en el año 70 d.C. (verificar). El apóstol Pedro usa el mismo símbolo en 1 Pedro 5:13 (donde "Babilonia" probablemente se refiere a Roma). (verificar) Juan va más allá: Babilonia se convierte en el símbolo de todo sistema humano que se opone a Dios, que explota y corrompe a las naciones, y que persigue a los santos. El lamento de los mercaderes (Apocalipsis 18:11-17) refleja el comercio internacional que prosperaba gracias a la opresión y al lujo de Roma (verificar).',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 18:4',
            texto:
              'Y oí otra voz del cielo, que decía: Salid de ella, pueblo mío, para que no seáis partícipes de sus pecados, ni recibáis parte de sus plagas.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 17:14',
            texto:
              'Ellos pelearán contra el Cordero, y el Cordero los vencerá, porque es Señor de señores y Rey de reyes; y los que están con él son llamados, y elegidos, y fieles.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Identifica a la gran ramera con la ciudad de Roma, que persiguió a los cristianos en el siglo I. Los siete reyes son siete emperadores romanos (verificar). La caída de Babilonia representa la caída del Imperio Romano. Valor: conecta el texto con un contexto histórico inmediato de persecución. Límite (según nuestra postura): la profecía tiene un alcance más amplio y final, y la caída de Roma no se ha cumplido de manera literal, sino que se refiere a un sistema mundial que perdura hasta el fin.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Interpreta a Babilonia como el papado o el sistema religioso católico-romano, y la caída como la Reforma Protestante o el fin de la opresión papal. Los mercaderes representan las riquezas de la iglesia institucional. Valor: reconoce el elemento religioso y político del texto. Límite: la identificación con una institución histórica concreta es muy debatida y no hace justicia al alcance global del sistema descrito.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). Babilonia es el sistema mundial de oposición a Dios que alcanza su plenitud en la Gran Tribulación: una federación política, económica y religiosa que persigue a los santos y a Israel. La "gran ramera" es la religión falsa y apóstata, y la "bestia" es el poder político que la respalda. La caída de Babilonia es un evento futuro, probablemente al inicio de la segunda mitad de la tribulación. Los mercaderes lloran porque el sistema económico mundial colapsa. El llamado "salid de ella" es una advertencia final para que el pueblo de Dios no participe en el pecado del sistema.',
            esPosturaPropia: true,
            orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Interpreta a Babilonia como el símbolo de toda ciudad o sistema humano que se levanta contra Dios y corrompe a las naciones. La caída representa el juicio de Dios sobre la injusticia y la opresión en todas las épocas. Valor: mantiene la relevancia del mensaje contra la corrupción y la idolatría en cualquier tiempo. Límite (según nuestra postura): al no ubicar a Babilonia en un marco profético específico, se pierde la urgencia y la certeza del juicio final sobre el sistema mundial.',
            esPosturaPropia: false,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'La gran ramera',
            significado:
              'Simboliza un sistema religioso y político corrupto que seduce a las naciones, persigue a los santos y se opone a Dios.',
            referencias: 'Apocalipsis 17:1-6',
            trasfondoCultural:
              'En el Antiguo Testamento, la "prostitución" espiritual era una imagen común para la idolatría y la infidelidad de Israel (ver Oseas 1-3; Jeremías 2:20; Ezequiel 16). Una "ramera" es alguien que se ofrece a muchos amantes, y aquí representa a las naciones que se han aliado con sistemas que se oponen a Dios. La "copa de oro llena de abominaciones" recuerda a Jeremías 51:7, donde Babilonia era "una copa de oro en la mano de Jehová, que embriagó a toda la tierra". (verificar)',
            orden: 1,
          },
          {
            nombre: 'La bestia escarlata',
            significado:
              'Representa al poder político y militar que respalda el sistema de Babilonia, y que eventualmente la destruye.',
            referencias: 'Apocalipsis 17:3, 7-8',
            trasfondoCultural:
              'El color "escarlata" era el color de la realeza y de la opulencia, y también el color de la sangre (ver Isaías 1:18, donde el pecado es escarlata). La bestia con siete cabezas y diez cuernos recuerda a la bestia del mar (Apocalipsis 13) y a Daniel 7. (verificar) Su "vuelta a la vida" podría referirse a la resurrección de un imperio pasado (¿el Imperio Romano?) bajo una nueva forma.',
            orden: 2,
          },
          {
            nombre: 'Los siete reyes',
            significado:
              'Los siete reyes representan siete imperios o poderes que han existido o existirán, y que persiguen al pueblo de Dios.',
            referencias: 'Apocalipsis 17:9-11',
            trasfondoCultural:
              'La identificación de los siete reyes es un misterio muy debatido. Algunos lo identifican con los emperadores romanos (verificar). El texto dice: "cinco han caído, uno es, el otro aún no ha venido". Si Juan escribía en tiempos de Domiciano (c. 95 d.C.) (verificar), los cinco emperadores caídos serían: Augusto, Tiberio, Calígula, Claudio, Nerón; "uno es" podría ser Vespasiano o Domiciano (verificar). Sin embargo, en la interpretación futurista, los siete reyes son simbólicos y representan a los imperios que han oprimido a Israel y a la iglesia: Egipto, Asiria, Babilonia, Media-Persia, Grecia, Roma, y el sistema final de la Gran Tribulación.',
            orden: 3,
          },
          {
            nombre: 'La caída de Babilonia',
            significado:
              'La destrucción repentina y total del sistema mundial opresor, que es un acto de juicio de Dios.',
            referencias: 'Apocalipsis 18:1-8',
            trasfondoCultural:
              'La caída de Babilonia fue un evento histórico real en el 539 a.C., cuando Ciro desvió el Éufrates y entró en la ciudad (ver Daniel 5:30-31; Jeremías 51:30-33). (verificar) El lamento de los reyes, mercaderes y marineros en Apocalipsis 18 refleja la dependencia económica de las naciones del sistema de Babilonia. La idea de que la ciudad será quemada con fuego recuerda la destrucción de Sodoma y Gomorra (ver Génesis 19) y el castigo de las naciones opresoras (ver Isaías 34:9-10).',
            orden: 4,
          },
          {
            nombre: 'Los mercaderes de la tierra',
            significado:
              'Representan el sistema económico mundial que se beneficia de la opresión y el lujo, y que lamenta la caída de Babilonia.',
            referencias: 'Apocalipsis 18:11-17',
            trasfondoCultural:
              'El comercio internacional era vital para el Imperio Romano, y muchas ciudades prosperaban gracias al comercio (ver Hechos 16:14-15, donde Lidia era una vendedora de púrpura). (verificar) La lista de mercancías en Apocalipsis 18:12-13 incluye productos de lujo (oro, plata, piedras preciosas, perlas, púrpura, seda, escarlata, marfil, madera fina) y también esclavos. Esto refleja un sistema económico basado en la explotación y el lujo.',
            orden: 5,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'El Cordero como Señor de señores y Rey de reyes',
            cristoEnEl:
              'Cristo es el Vencedor final que derrota a todos los poderes que se oponen a Dios. Aunque la bestia y los reyes hacen guerra contra el Cordero, Él los vence porque es soberano sobre todos los poderes humanos y espirituales.',
            cita: 'Apocalipsis 17:14; 19:11-16',
            orden: 1,
          },
          {
            elemento: 'El llamado a salir de Babilonia',
            cristoEnEl:
              'Cristo es el Redentor que llama a su pueblo a salir del sistema corrupto del mundo. Así como llamó a Lot a salir de Sodoma (ver Génesis 19:15-16), y a Israel a salir de Egipto, Cristo llama a los suyos a separarse del mundo y a seguirle a Él.',
            cita: 'Apocalipsis 18:4; Génesis 19:15-16; 2 Corintios 6:17',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'La caída de Babilonia, el sistema mundial opresor',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 18:1-8',
            citaCumplimiento: 'Apocalipsis 19:1-3',
            orden: 1,
          },
          {
            tema: 'El llamado de Dios a su pueblo a salir de Babilonia',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 18:4-5',
            citaCumplimiento: null,
            orden: 2,
          },
          {
            tema: 'El lamento de los reyes y mercaderes por la caída de Babilonia',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 18:9-19',
            citaCumplimiento: null,
            orden: 3,
          },
        ],
      },
      ciudades: {
        create: [
          {
            nombreBiblico: 'Babilonia',
            ubicacion: 'Imperio mesopotámico, en la actual Irak',
            equivalenteActual: 'Ruinas de Babilonia, cerca de Bagdad, Irak',
            nota: 'En Apocalipsis, Babilonia es un símbolo profético del sistema mundial de oposición a Dios. No se refiere necesariamente a la ciudad literal de Babilonia, sino a todo poder humano que se opone a Dios y persigue a su pueblo (ver Apocalipsis 17-18).',
            orden: 1,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿A quién representa la "gran ramera" en Apocalipsis 17 según la interpretación futurista?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'Un sistema religioso y político corrupto que se opone a Dios y persigue a los santos',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La ciudad literal de Jerusalén en el siglo I',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'La iglesia apóstata del siglo IV',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El Imperio Romano exclusivamente',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué significa el llamado "salid de ella, pueblo mío" en Apocalipsis 18:4?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'Una advertencia para que los creyentes no participen en el pecado del sistema mundial',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Una orden para que los cristianos abandonen sus hogares',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Un llamado a emigrar a Jerusalén antes del fin',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Una invitación a unirse al sistema político de la bestia',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué lamentan los mercaderes en Apocalipsis 18 cuando cae Babilonia?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'Que nadie compra más sus mercancías y su comercio ha cesado',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Que los santos han sido liberados de su persecución',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Que la ciudad se ha arrepentido y ha vuelto a Dios',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Que el sistema religioso ha triunfado sobre el político',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Cuál es el resultado final de la batalla entre la bestia y el Cordero según Apocalipsis 17:14?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'El Cordero los vencerá porque es Señor de señores y Rey de reyes',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La bestia vencerá al Cordero por un tiempo determinado',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Habrá un empate y se firmará una tregua',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El conflicto continuará eternamente sin una resolución',
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

  console.log('✅ Lección 9 "La caída de Babilonia" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });