import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 10: "La venida de Cristo y el milenio" (Ap 19–20)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 10.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional, amilenial). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: La segunda venida de Cristo (Ap 19),
//     el milenio (Ap 20:1-6) y la posición amilenial,
//     la derrota de Satanás, la resurrección primera.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 10 de Apocalipsis...');

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

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 10 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 10,
      semana: 10,
      titulo: 'La venida de Cristo y el milenio',
      tema:
        'El regreso triunfal de Cristo, la derrota final del mal y el reinado de los santos durante el milenio',
      pasajeBase: 'Apocalipsis 19–20',
      introduccion:
        'El cielo se abre y Juan ve a Cristo cabalgando sobre un caballo blanco, con un manto teñido en sangre, y los ejércitos del cielo le siguen. Él derrota a la bestia y al falso profeta, y los lanza al lago de fuego. Satanás es atado por mil años y arrojado al abismo. Durante estos mil años, los santos que no adoraron a la bestia reinan con Cristo. Pasado el milenio, Satanás es suelto por un poco de tiempo, reúne a las naciones para la batalla final, pero es derrotado y lanzado al lago de fuego. Luego viene el juicio final. Este es el clímax de la historia: el Rey ha venido, el mal ha sido derrotado, y su reino eterno comienza.',
      contextoHistorico:
        'El "milenio" o reino de mil años (Apocalipsis 20:1-6) ha sido interpretado de diversas maneras en la historia de la iglesia. La palabra "milenio" viene del latín "mille" (mil) y "annus" (año). La idea de un reino terrenal de Cristo era común en el judaísmo del segundo templo, donde se esperaba que el Mesías reinara sobre Israel durante un período de paz y justicia. (verificar) El texto se refiere a dos resurrecciones: la primera, de los santos que reinan con Cristo; y la segunda, de los impíos que son juzgados. (verificar) La batalla final en Apocalipsis 20:7-10 tiene ecos de la batalla de Gog y Magog en Ezequiel 38-39. (verificar) La posición del Movimiento Misionero Mundial es **amilenial**: el milenio es un período simbólico que representa el reinado de Cristo en los corazones de los creyentes durante la era de la Iglesia, desde Su ascensión hasta Su segunda venida. Los "mil años" no son literales, sino un número simbólico de plenitud (10 × 10 × 10), que termina con la segunda venida de Cristo y el juicio final.',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 19:11',
            texto:
              'Entonces vi el cielo abierto; y he aquí un caballo blanco, y el que lo montaba se llamaba Fiel y Verdadero, y con justicia juzga y pelea.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 20:6',
            texto:
              'Bienaventurado y santo el que tiene parte en la primera resurrección; la segunda muerte no tiene potestad sobre estos, sino que serán sacerdotes de Dios y de Cristo, y reinarán con él mil años.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Interpreta el milenio como el período de la historia de la iglesia desde su fundación hasta el fin del mundo. La atadura de Satanás se refiere a la victoria de Cristo sobre el mal en la cruz. La batalla final es la persecución de los cristianos en el siglo I. Valor: reconoce la soberanía de Cristo sobre la historia. Límite (según nuestra postura): reduce la profecía a eventos ya pasados y no deja lugar para la segunda venida de Cristo como un evento futuro y literal.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Identifica el milenio con el período posterior al fin del Imperio Romano, y la atadura de Satanás con la caída del paganismo. Algunos lo sitúan entre el 313 d.C. (Edicto de Milán) y la Reforma, o entre la Reforma y el regreso de Cristo. Valor: reconoce el avance del reino de Dios en la historia. Límite: la datación del milenio es muy variable y especulativa.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista (premilenial)',
            contenido:
              'A diferencia de nuestra posición, los premilenialistas creen que el milenio es un período literal de 1,000 años después de la segunda venida de Cristo, en el cual Cristo reina sobre la tierra desde Jerusalén. La Iglesia es arrebatada antes de la tribulación (pretribulacionismo), y el milenio viene después del Armagedón. Valor: toma el texto de manera literal. Límite: la mayoría de los teólogos no interpretan los 1,000 años como literales, y la idea de un reino terrenal de Cristo antes del juicio final tiene problemas teológicos.',
            esPosturaPropia: false,
            orden: 3,
          },
          {
            escuela: 'amilenial (POSTURA PROPIA)',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). El milenio no es un período literal de 1,000 años, sino un número simbólico que representa el período completo de la era de la iglesia, desde la ascensión de Cristo hasta su segunda venida. Durante este tiempo, Satanás está atado, el evangelio se predica, y los santos reinan con Cristo en sentido espiritual. La "primera resurrección" es la resurrección espiritual de los creyentes en el bautismo (ver Efesios 2:5-6; Colosenses 2:12-13). La "segunda muerte" es el juicio final de los impíos. La segunda venida de Cristo, la resurrección de los muertos y el juicio final suceden al final de este período, y entonces viene el cielo nuevo y la tierra nueva. El reino de Dios se consuma en la eternidad.',
            esPosturaPropia: true,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'El caballo blanco y el Jinete',
            significado:
              'Representa a Cristo en su segunda venida, como Rey victorioso, Fiel y Verdadero, que viene a juzgar y a hacer guerra con justicia.',
            referencias: 'Apocalipsis 19:11-16',
            trasfondoCultural:
              'En el mundo antiguo, los generales victoriosos montaban caballos blancos en sus desfiles de triunfo (ver Plinio el Joven, "Panegírico" (verificar)). El manto teñido en sangre (Apocalipsis 19:13) recuerda a Isaías 63:1-3, donde el Señor viene de Edom con sus vestiduras manchadas de sangre, juzgando a las naciones. El nombre "Fiel y Verdadero" afirma que Cristo cumplirá toda promesa y ejecutará el juicio con justicia. La "palabra de Dios" que sale de su boca es su espada, que derrota a sus enemigos (ver Efesios 6:17; Hebreos 4:12).',
            orden: 1,
          },
          {
            nombre: 'La atadura de Satanás',
            significado:
              'Representa la victoria de Cristo sobre el poder de Satanás, quien es atado por mil años para que no engañe a las naciones durante la era de la iglesia.',
            referencias: 'Apocalipsis 20:1-3',
            trasfondoCultural:
              'En el mundo antiguo, la atadura de un rey o general enemigo era un signo de derrota y sumisión. Los triunfos romanos incluían la exhibición de reyes cautivos encadenados. Satanás es atado para que no pueda engañar a las naciones (el mundo gentil) durante el tiempo de la predicación del evangelio. El "abismo" (el lugar de los demonios) es donde es confinado (ver Lucas 8:31). El sello que pone sobre él es una señal de autoridad y de restricción divina.',
            orden: 2,
          },
          {
            nombre: 'El milenio',
            significado:
              'El período simbólico de 1,000 años durante el cual Cristo reina en los corazones de los santos, y Satanás está atado.',
            referencias: 'Apocalipsis 20:4-6',
            trasfondoCultural:
              'El número 1000 en la Biblia se usa a menudo como un número de plenitud o perfección (ver Salmo 50:10, "las bestias del monte son mías, y mías son las mil bestias"; Deuteronomio 7:9, "que guarda pacto y misericordia con los que le aman hasta mil generaciones"). En el judaísmo del segundo templo, el "día del Señor" de 1,000 años era una idea común, basada en Salmo 90:4, "mil años delante de tus ojos son como el día de ayer". (verificar) Por lo tanto, el milenio no debe entenderse como un período literal, sino como el tiempo completo del reino de Cristo en la historia.',
            orden: 3,
          },
          {
            nombre: 'La primera y segunda resurrección',
            significado:
              'La primera resurrección es espiritual: la vida nueva en Cristo. La segunda resurrección es la resurrección física de los impíos para el juicio final.',
            referencias: 'Apocalipsis 20:5-6',
            trasfondoCultural:
              'La resurrección era una doctrina central del judaísmo y del cristianismo primitivo (ver Daniel 12:2; Juan 5:28-29). Los fariseos creían en la resurrección, mientras que los saduceos la negaban (ver Hechos 23:8). El Nuevo Testamento enseña que hay dos resurrecciones: la de los justos (Juan 5:24, 1 Corintios 15:23) y la de los impíos (Hechos 24:15). La "segunda muerte" es el juicio final, la separación eterna de Dios, de la que no hay resurrección (ver Apocalipsis 20:14-15).',
            orden: 4,
          },
          {
            nombre: 'Gog y Magog',
            significado:
              'Son los nombres de las naciones que Satanás reúne para la batalla final contra el pueblo de Dios.',
            referencias: 'Apocalipsis 20:8-9',
            trasfondoCultural:
              'En Ezequiel 38-39, Gog es un rey de Magog (una región al norte de Israel) que ataca a Israel después de que Dios lo ha restaurado. La batalla de Gog y Magog es una profecía de una invasión final contra el pueblo de Dios. Juan usa este nombre para simbolizar a todas las naciones que se rebelan contra Dios al final de la historia. La batalla final es una imagen del juicio de Dios sobre todos los enemigos de su pueblo.',
            orden: 5,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'El Jinete del caballo blanco (Cristo)',
            cristoEnEl:
              'Cristo es el Rey de reyes y Señor de señores, que viene en gloria para juzgar y hacer guerra. Él es el cumplimiento de todas las profecías mesiánicas del Antiguo Testamento que hablan de un Rey que traerá justicia y paz (ver Isaías 11:1-5; Zacarías 9:9-10).',
            cita: 'Apocalipsis 19:11-16; Isaías 63:1-3; Salmo 2:6-9',
            orden: 1,
          },
          {
            elemento: 'El reinado de los santos con Cristo',
            cristoEnEl:
              'Cristo comparte su reinado con los suyos. La unión con Cristo en Su muerte, resurrección y vida nueva nos da autoridad espiritual y nos hace participantes de Su reino (ver Romanos 6:1-11; Efesios 2:4-7).',
            cita: 'Apocalipsis 20:4-6; 2 Timoteo 2:11-12; Romanos 8:17',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'La segunda venida de Cristo en gloria',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 19:11-16',
            citaCumplimiento: null,
            orden: 1,
          },
          {
            tema: 'El reinado de los santos con Cristo durante el milenio',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 20:4-6',
            citaCumplimiento: null,
            orden: 2,
          },
          {
            tema: 'La derrota final de Satanás y el juicio del mundo',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 20:7-15',
            citaCumplimiento: null,
            orden: 3,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿Cómo se llama el Jinete del caballo blanco en Apocalipsis 19?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'Fiel y Verdadero',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'El León de Judá',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El Cordero de Dios',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El Hijo del Hombre',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué representa el milenio según la postura amilenial del MMM?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'El período simbólico de la era de la iglesia, donde Cristo reina en los corazones de los creyentes',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Un período literal de 1,000 años después de la segunda venida de Cristo',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El tiempo que Satanás estará suelto para engañar a las naciones',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El tiempo de la Gran Tribulación antes del arrebatamiento',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué sucede con Satanás al final del milenio según Apocalipsis 20?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'Es suelto por un poco de tiempo, reúne naciones para la batalla final, y es lanzado al lago de fuego',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Es destruido inmediatamente y no hay más pecado',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Es restaurado a su posición original en el cielo',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Es perdonado y se arrepiente de su rebelión',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Quiénes reinan con Cristo durante el milenio según Apocalipsis 20:4-6?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'Los santos que no adoraron a la bestia y que tienen parte en la primera resurrección',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Todos los que han muerto en el Señor sin excepción',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Solo los apóstoles y profetas del Antiguo Testamento',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Los ángeles que no cayeron',
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

  console.log('✅ Lección 10 "La venida de Cristo y el milenio" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });