import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 4: "Los 144.000 y la gran multitud" (Ap 7)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 4.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 4 de Apocalipsis...');

  const curso = await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: {},
    create: {
      slug: 'apocalipsis', nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol', fechaEscritura: 'c. 95 d.C.', orden: 1, activo: true,
    },
  });

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 4 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 4,
      semana: 4,
      titulo: 'Los 144.000 y la gran multitud',
      tema: 'Sellados por Dios y salvos de toda nación',
      pasajeBase: 'Apocalipsis 7',
      introduccion:
        'Entre el sexto y el séptimo sello, Juan ve una pausa llena de gracia. Cuatro ángeles detienen los vientos de juicio hasta que sean sellados los siervos de Dios: ciento cuarenta y cuatro mil de todas las tribus de Israel, marcados en su frente. Luego contempla una gran multitud que nadie podía contar, de todas las naciones, tribus, pueblos y lenguas, de pie delante del trono, vestidos de ropas blancas y con palmas en las manos. Son los que han salido de la gran tribulación y han lavado sus ropas en la sangre del Cordero. En medio del juicio, Dios sigue salvando.',
      contextoHistorico:
        'El sellamiento en la frente recuerda a Ezequiel 9, donde Dios marca a los suyos para preservarlos antes del juicio. Las palmas y las ropas blancas evocan la fiesta de los Tabernáculos y la victoria. Este capítulo es un "interludio": detiene la acción de los sellos para mostrar que, aun en el tiempo más oscuro, Dios tiene un pueblo sellado y una cosecha de almas de todas las naciones.',
      versiculosMemoria: {
        create: [
          { cita: 'Apocalipsis 7:14', texto: 'Estos son los que han salido de la gran tribulación, y han lavado sus ropas, y las han emblanquecido en la sangre del Cordero.', orden: 1 },
          { cita: 'Apocalipsis 7:17', texto: 'Porque el Cordero que está en medio del trono los pastoreará, y los guiará a fuentes de aguas de vida; y Dios enjugará toda lágrima de los ojos de ellos.', orden: 2 },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Entiende a los sellados como los creyentes judíos preservados en el juicio del siglo I (la caída de Jerusalén), y a la gran multitud como la Iglesia primitiva que triunfa a pesar de la persecución romana. Valor: resalta la protección de Dios sobre los suyos en la prueba. Límite (según nuestra postura): reduce a un solo evento pasado lo que tiene alcance profético final.',
            esPosturaPropia: false, orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve en el sellamiento la preservación del pueblo fiel de Dios a lo largo de toda la historia de la Iglesia, y en la gran multitud a los redimidos de todas las edades. Valor: subraya que Dios guarda a su pueblo en todo tiempo. Límite: diluye la distinción entre Israel y la Iglesia que el texto parece marcar.',
            esPosturaPropia: false, orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra posición (línea del Movimiento Misionero Mundial). Los 144.000 son un número literal de sellados de las doce tribus de Israel, apartados y protegidos por Dios como testigos durante la Gran Tribulación, ya arrebatada la Iglesia. La gran multitud son los que se convierten y son salvos DURANTE la Tribulación —"los que han salido de la gran tribulación"—, de todas las naciones. Esto confirma nuestra esperanza: la Iglesia ya está con el Señor, y aun así Dios sigue salvando en la tierra en ese tiempo de juicio.',
            esPosturaPropia: true, orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Interpreta el número 144.000 como símbolo de la totalidad completa y perfecta del pueblo de Dios (12 x 12 x 1000), y la gran multitud como todos los redimidos de la historia delante del trono. Valor: exalta que ninguno de los suyos se pierde. Límite (según nuestra postura): al hacerlo todo simbólico, borra el sentido profético y literal del pasaje.',
            esPosturaPropia: false, orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          { nombre: 'El sello en la frente', significado: 'La marca de propiedad y protección de Dios sobre sus siervos; les pertenecen y Él los guarda en medio del juicio.', referencias: 'Apocalipsis 7:3', orden: 1 },
          { nombre: 'Los 144.000 de las tribus de Israel', significado: 'Número de sellados de las doce tribus; en nuestra línea, un remanente literal de Israel apartado por Dios en la Tribulación.', referencias: 'Apocalipsis 7:4-8', orden: 2 },
          { nombre: 'La gran multitud con palmas', significado: 'Incontables redimidos de toda nación, salidos de la gran tribulación; las palmas hablan de victoria y celebración.', referencias: 'Apocalipsis 7:9', orden: 3 },
          { nombre: 'Las ropas blancas', significado: 'La justicia y la pureza que vienen por haber lavado sus ropas en la sangre del Cordero, no por mérito propio.', referencias: 'Apocalipsis 7:14', orden: 4 },
          { nombre: 'Los cuatro vientos detenidos', significado: 'El juicio contenido por la mano de Dios hasta que los suyos estén sellados: Dios controla el tiempo del juicio.', referencias: 'Apocalipsis 7:1', orden: 5 },
        ],
      },
      tipologias: {
        create: [
          { elemento: 'El Cordero que pastorea en medio del trono', cristoEnEl: 'Cristo, el Cordero que es a la vez Pastor: guía a los suyos a fuentes de aguas de vida y enjuga toda lágrima. Sacrificio y cuidado unidos.', cita: 'Apocalipsis 7:17', orden: 1 },
          { elemento: 'La sangre del Cordero que emblanquece', cristoEnEl: 'Cristo, cuya sangre limpia y hace blanco lo que estaba manchado: la única fuente de justicia delante de Dios.', cita: 'Apocalipsis 7:14', orden: 2 },
        ],
      },
      profecias: {
        create: [
          { tema: 'El sellamiento de los 144.000 de Israel', estado: 'por_cumplir', citaBase: 'Apocalipsis 7:2-8', citaCumplimiento: 'Apocalipsis 14:1', orden: 1 },
          { tema: 'La gran multitud salida de la gran tribulación', estado: 'por_cumplir', citaBase: 'Apocalipsis 7:9-14', citaCumplimiento: null, orden: 2 },
          { tema: 'Dios enjugará toda lágrima', estado: 'por_cumplir', citaBase: 'Apocalipsis 7:17', citaCumplimiento: 'Apocalipsis 21:4', orden: 3 },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado: '¿Cuántos siervos de Dios fueron sellados de las tribus de Israel?',
            orden: 1,
            opciones: {
              create: [
                { texto: '144.000', esCorrecta: true, orden: 1 },
                { texto: '12.000', esCorrecta: false, orden: 2 },
                { texto: '7.000', esCorrecta: false, orden: 3 },
                { texto: 'Una cantidad que nadie podía contar', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿De dónde proviene la gran multitud vestida de ropas blancas?',
            orden: 2,
            opciones: {
              create: [
                { texto: 'De todas las naciones, tribus, pueblos y lenguas, salidos de la gran tribulación', esCorrecta: true, orden: 1 },
                { texto: 'Solamente de la tribu de Judá', esCorrecta: false, orden: 2 },
                { texto: 'De la ciudad de Babilonia', esCorrecta: false, orden: 3 },
                { texto: 'De los ángeles del cielo', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Por qué son blancas las ropas de la gran multitud?',
            orden: 3,
            opciones: {
              create: [
                { texto: 'Porque las lavaron y emblanquecieron en la sangre del Cordero', esCorrecta: true, orden: 1 },
                { texto: 'Porque nunca pecaron', esCorrecta: false, orden: 2 },
                { texto: 'Porque las compraron con oro', esCorrecta: false, orden: 3 },
                { texto: 'Porque los ángeles se las dieron por mérito propio', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: 'Según la postura del MMM, ¿quiénes son principalmente la gran multitud respecto a la Iglesia?',
            orden: 4,
            opciones: {
              create: [
                { texto: 'Los que se convierten y son salvos durante la Tribulación, ya arrebatada la Iglesia', esCorrecta: true, orden: 1 },
                { texto: 'La Iglesia que atraviesa toda la Gran Tribulación', esCorrecta: false, orden: 2 },
                { texto: 'Los ángeles que adoran ante el trono', esCorrecta: false, orden: 3 },
                { texto: 'Los reyes de la tierra', esCorrecta: false, orden: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Lección 4 "Los 144.000 y la gran multitud" sembrada.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });