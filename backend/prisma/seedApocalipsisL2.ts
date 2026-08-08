import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 2: "El trono de Dios y el Cordero" (Ap 4–5)
//  Seed ADITIVO: usa el curso existente y reemplaza SOLO la
//  lección de orden 2. No toca las demás lecciones.
//  Contenido en línea del MMM (pretribulacional). Revisar pastoralmente.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 2 de Apocalipsis...');

  const curso = await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: {},
    create: {
      slug: 'apocalipsis',
      nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol',
      fechaEscritura: 'c. 95 d.C.',
      orden: 1,
      activo: true,
    },
  });

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 2 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 2,
      semana: 2,
      titulo: 'El trono de Dios y el Cordero',
      tema: 'Digno es el Cordero que fue inmolado',
      pasajeBase: 'Apocalipsis 4–5',
      introduccion:
        'Después de los mensajes a las siete iglesias, Juan oye una voz que le dice: "Sube acá", y al instante es arrebatado en el Espíritu al cielo. Allí contempla el trono de Dios rodeado de adoración: veinticuatro ancianos, cuatro seres vivientes, relámpagos y voces. En la mano del que está sentado en el trono hay un libro sellado con siete sellos que nadie es digno de abrir… hasta que aparece el Cordero como inmolado. Él es hallado digno, y todo el cielo estalla en alabanza: "Digno es el Cordero".',
      contextoHistorico:
        'Esta visión del trono pertenece al género de las grandes teofanías de la Escritura, en la línea de Isaías 6, Ezequiel 1 y Daniel 7. Juan describe lo celestial con imágenes tomadas de lo que un hombre del siglo I podía comprender —trono, coronas, arpas, incienso—. El capítulo 4 nos ubica en el cielo antes de que se abran los sellos y comiencen los juicios de los capítulos 6 en adelante.',
      versiculosMemoria: {
        create: [
          { cita: 'Apocalipsis 4:11', texto: 'Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas.', orden: 1 },
          { cita: 'Apocalipsis 5:12', texto: 'El Cordero que fue inmolado es digno de tomar el poder, las riquezas, la sabiduría, la fortaleza, la honra, la gloria y la alabanza.', orden: 2 },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Entiende la visión del trono como una afirmación, para la Iglesia perseguida del siglo I, de que Dios reina soberano por encima del Imperio Romano y de todo poder terreno. El Cordero digno consuela a los mártires de aquel tiempo. Valor: resalta el señorío de Dios sobre la historia. Límite (según nuestra postura): no reconoce que la escena inaugura juicios todavía futuros.',
            esPosturaPropia: false, orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve en el libro sellado el desarrollo de la historia de la Iglesia y del mundo que se va abriendo a lo largo de los siglos conforme el Cordero rompe los sellos. Valor: subraya que Cristo gobierna el curso de la historia. Límite: tiende a asignar cada sello a épocas concretas, lo cual es interpretativo.',
            esPosturaPropia: false, orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra posición (línea del Movimiento Misionero Mundial). El "Sube acá" de 4:1 es entendido por muchos maestros de nuestra línea como una hermosa figura del arrebatamiento de la Iglesia: tras las cartas a las iglesias (la era de la gracia), la Iglesia es llamada al cielo. De allí en adelante la Iglesia se contempla en la gloria —muchos ven a los veinticuatro ancianos como figura de los redimidos glorificados—, mientras que sobre la tierra están por comenzar los juicios de la Gran Tribulación cuando el Cordero abra los sellos. Todo confirma nuestra esperanza pretribulacional: el pueblo fiel está con el Señor antes de la ira.',
            esPosturaPropia: true, orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Lee la escena como un cuadro atemporal de la soberanía de Dios y de la dignidad del Cordero, que consuela al creyente de cualquier época sin referirse a eventos futuros concretos. Valor: exalta la adoración y el señorío de Dios siempre vigentes. Límite (según nuestra postura): al espiritualizar la visión, deja de lado su lugar dentro del programa profético del libro.',
            esPosturaPropia: false, orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          { nombre: 'El trono', significado: 'La soberanía absoluta de Dios, centro de todo el cielo y de toda la escena. Todo gira en torno a quien está sentado en él.', referencias: 'Apocalipsis 4:2', orden: 1 },
          { nombre: 'Los veinticuatro ancianos', significado: 'Vestidos de blanco y con coronas de oro; muchos los entienden como figura de los redimidos glorificados que adoran delante de Dios.', referencias: 'Apocalipsis 4:4', orden: 2 },
          { nombre: 'Los cuatro seres vivientes', significado: 'Seres celestiales de adoración incesante, semejantes a los querubines y serafines de Ezequiel e Isaías.', referencias: 'Apocalipsis 4:6-8', orden: 3 },
          { nombre: 'Las siete lámparas / siete espíritus', significado: 'La plenitud del Espíritu de Dios delante del trono.', referencias: 'Apocalipsis 4:5', orden: 4 },
          { nombre: 'El libro sellado con siete sellos', significado: 'El rollo del destino y los juicios de Dios sobre la tierra, que solo el Cordero es digno de abrir.', referencias: 'Apocalipsis 5:1', orden: 5 },
          { nombre: 'El Cordero como inmolado, con siete cuernos y siete ojos', significado: 'Cristo crucificado y resucitado: los cuernos hablan de su poder pleno; los ojos, de su plena sabiduría y del Espíritu enviado a toda la tierra.', referencias: 'Apocalipsis 5:6', orden: 6 },
        ],
      },
      tipologias: {
        create: [
          { elemento: 'El Cordero como inmolado', cristoEnEl: 'Cristo, el Cordero de Dios que quita el pecado del mundo; sus llagas permanecen como testimonio eterno de la redención que compró con su sangre.', cita: 'Apocalipsis 5:6; Juan 1:29', orden: 1 },
          { elemento: 'El León de la tribu de Judá, la raíz de David', cristoEnEl: 'Cristo, el Mesías prometido, vencedor y Rey; el mismo que es León es el Cordero: fuerza y sacrificio unidos.', cita: 'Apocalipsis 5:5', orden: 2 },
          { elemento: 'El único digno de abrir el libro', cristoEnEl: 'Cristo, único mediador y Señor de la historia, digno por su obra redentora de ejecutar el plan de Dios.', cita: 'Apocalipsis 5:9', orden: 3 },
        ],
      },
      profecias: {
        create: [
          { tema: 'El Cordero abrirá los sellos (comienzo de los juicios)', estado: 'por_cumplir', citaBase: 'Apocalipsis 5:5-7', citaCumplimiento: 'Apocalipsis 6:1', orden: 1 },
          { tema: 'Los redimidos reinarán sobre la tierra', estado: 'por_cumplir', citaBase: 'Apocalipsis 5:10', citaCumplimiento: 'Apocalipsis 20:6', orden: 2 },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado: '¿Quién fue hallado digno de abrir el libro sellado con siete sellos?',
            orden: 1,
            opciones: {
              create: [
                { texto: 'El Cordero (Cristo)', esCorrecta: true, orden: 1 },
                { texto: 'Uno de los veinticuatro ancianos', esCorrecta: false, orden: 2 },
                { texto: 'El ángel fuerte', esCorrecta: false, orden: 3 },
                { texto: 'Ninguno, quedó cerrado', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: 'Según la interpretación de nuestra línea (MMM), ¿qué figura ve en el "Sube acá" de Apocalipsis 4:1?',
            orden: 2,
            opciones: {
              create: [
                { texto: 'El arrebatamiento de la Iglesia', esCorrecta: true, orden: 1 },
                { texto: 'La segunda venida de Cristo a la tierra', esCorrecta: false, orden: 2 },
                { texto: 'El juicio final ante el gran trono blanco', esCorrecta: false, orden: 3 },
                { texto: 'La caída de Babilonia', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Por qué es digno el Cordero de tomar el libro y abrir sus sellos?',
            orden: 3,
            opciones: {
              create: [
                { texto: 'Porque fue inmolado y con su sangre redimió para Dios a un pueblo', esCorrecta: true, orden: 1 },
                { texto: 'Porque es el mayor de los ángeles', esCorrecta: false, orden: 2 },
                { texto: 'Porque lo eligieron los ancianos', esCorrecta: false, orden: 3 },
                { texto: 'Porque nadie más quiso hacerlo', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: 'En la visión, ¿qué representa principalmente el trono?',
            orden: 4,
            opciones: {
              create: [
                { texto: 'La soberanía absoluta de Dios sobre todo', esCorrecta: true, orden: 1 },
                { texto: 'El templo de Jerusalén', esCorrecta: false, orden: 2 },
                { texto: 'El Imperio Romano', esCorrecta: false, orden: 3 },
                { texto: 'La Iglesia de Laodicea', esCorrecta: false, orden: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Lección 2 "El trono de Dios y el Cordero" sembrada.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });