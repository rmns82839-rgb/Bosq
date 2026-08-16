import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 5: "Las siete trompetas" (Ap 8–11)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 5.
//  Símbolos YA con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: "Ajenjo" (Wormwood) y su sentido de amargura;
//     trompetas (shofar) como alarma de guerra/asamblea en Israel;
//     langostas — eco de la plaga de Éxodo y de Joel 1–2.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 5 de Apocalipsis...');

  const curso = await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: {},
    create: {
      slug: 'apocalipsis', nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol', fechaEscritura: 'c. 95 d.C.', orden: 1, activo: true,
    },
  });

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 5 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 5,
      semana: 5,
      titulo: 'Las siete trompetas',
      tema: 'El juicio se intensifica y la oración de los santos sube a Dios',
      pasajeBase: 'Apocalipsis 8–11',
      introduccion:
        'Al abrirse el séptimo sello, tras un silencio solemne, se entregan siete trompetas a siete ángeles. Antes de que suenen, un ángel ofrece incienso junto con las oraciones de los santos, que suben delante de Dios. Luego, una a una, las trompetas desatan juicios sobre la tierra, el mar, los ríos y los astros, y plagas semejantes a las de Egipto: granizo y fuego, una montaña ardiendo en el mar, la estrella Ajenjo que amarga las aguas, langostas del abismo y un ejército incontable. En medio de todo, dos testigos profetizan, mueren y resucitan. La séptima trompeta anuncia que "los reinos del mundo han venido a ser de nuestro Señor y de su Cristo".',
      contextoHistorico:
        'La trompeta (en Israel, el shofar o cuerno) servía para dar la alarma de guerra, convocar al pueblo y anunciar los grandes días del Señor. Muchas de estas plagas evocan de forma deliberada las plagas de Egipto (granizo, tinieblas, aguas vueltas amargas, langostas), recordando que el mismo Dios que juzgó a Egipto y libró a su pueblo vuelve a actuar. También resuenan las langostas de Joel. En nuestra comprensión, estos juicios se desatan durante la Gran Tribulación sobre un mundo que rechaza a Dios, ya arrebatada la Iglesia.',
      versiculosMemoria: {
        create: [
          { cita: 'Apocalipsis 8:4', texto: 'Y de la mano del ángel subió a la presencia de Dios el humo del incienso con las oraciones de los santos.', orden: 1 },
          { cita: 'Apocalipsis 11:15', texto: 'Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos.', orden: 2 },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Interpreta las trompetas como juicios de Dios sobre la Jerusalén incrédula y el mundo judío del siglo I, culminando en la caída de Jerusalén en el año 70, o como golpes contra el Imperio Romano. Valor: liga el texto a juicios históricos reales. Límite (según nuestra postura): no abarca el alcance final y mundial que el pasaje describe.',
            esPosturaPropia: false, orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve en las trompetas una secuencia de grandes acontecimientos de la historia: invasiones, caídas de imperios y crisis a lo largo de los siglos (algunos las han aplicado a las invasiones bárbaras o al avance de otros poderes). Valor: afirma que Dios obra en la historia. Límite: la asignación de cada trompeta a un hecho concreto es muy variable entre intérpretes.',
            esPosturaPropia: false, orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra posición (línea del Movimiento Misionero Mundial). Las trompetas son juicios reales y futuros que caen sobre la tierra durante la Gran Tribulación, más severos que los sellos, sobre un mundo que persiste en su rebeldía. Las plagas evocan las de Egipto porque es el mismo Dios que juzga y salva. Los dos testigos profetizan en ese tiempo. La séptima trompeta anticipa el desenlace: la proclamación de que el reino es del Señor y de su Cristo. La Iglesia no está en esta escena de ira, pues ya fue llevada con el Señor.',
            esPosturaPropia: true, orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Entiende las trompetas como símbolos de los juicios y advertencias de Dios que se repiten a lo largo de toda la historia, llamando al mundo al arrepentimiento, sin señalar eventos concretos. Valor: mantiene vivo el llamado a oír a Dios en todo tiempo. Límite (según nuestra postura): al no ubicarlas en el plan profético, atenúa el anuncio de los juicios finales.',
            esPosturaPropia: false, orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'Las trompetas', significado: 'Instrumentos de alarma y anuncio: cada trompeta desata un juicio y convoca la atención del mundo al obrar de Dios.', referencias: 'Apocalipsis 8:6',
            trasfondoCultural: 'En Israel, la trompeta —el shofar o cuerno de carnero— no era un instrumento musical cualquiera: servía para dar la alarma ante la guerra, convocar al pueblo a asamblea y anunciar las fiestas y los grandes días del Señor. Oír la trompeta era ponerse en alerta. Por eso, siete trompetas que anuncian juicios comunican urgencia: Dios está llamando la atención de un mundo distraído.',
            orden: 1,
          },
          {
            nombre: 'El incienso con las oraciones de los santos', significado: 'Las oraciones del pueblo de Dios suben a su presencia y Él las tiene en cuenta antes de actuar en juicio.', referencias: 'Apocalipsis 8:3-4',
            trasfondoCultural: 'En el templo, el sacerdote quemaba incienso sobre el altar de oro, y su humo fragante subía como símbolo de las oraciones que ascienden a Dios (véase el Salmo 141:2). Un lector judío entendía al instante la imagen: las oraciones de los santos perseguidos no caen al vacío, sino que llegan a la presencia misma de Dios como incienso aceptable, y Él responde.',
            orden: 2,
          },
          {
            nombre: 'La estrella Ajenjo', significado: 'Una estrella que cae y amarga la tercera parte de las aguas, causando muerte: juicio sobre las fuentes de vida.', referencias: 'Apocalipsis 8:10-11',
            trasfondoCultural: 'El "ajenjo" era una planta real, conocida en el mundo antiguo por su sabor intensamente amargo. En el Antiguo Testamento se usa como imagen de la amargura y del castigo que sobreviene por abandonar a Dios (Jeremías 9:15). Que una estrella llamada Ajenjo amargue las aguas dulces —lo que da vida— pinta un juicio que vuelve amargo aquello de lo que el hombre depende para vivir.',
            orden: 3,
          },
          {
            nombre: 'Las langostas del abismo', significado: 'Criaturas de tormento que salen del pozo del abismo para afligir a los hombres que no tienen el sello de Dios.', referencias: 'Apocalipsis 9:1-11',
            trasfondoCultural: 'Para el mundo antiguo, una plaga de langostas era una de las peores calamidades: podían oscurecer el cielo y devorar toda cosecha en horas, dejando hambre a su paso (así fue la octava plaga de Egipto, y así lo describe el profeta Joel). Estas langostas del abismo son aún más terribles, pues no dañan las plantas sino que atormentan a los hombres: la imagen toma un terror conocido y lo lleva a un plano espiritual.',
            orden: 4,
          },
          {
            nombre: 'Los dos testigos', significado: 'Dos testigos que profetizan con poder, son muertos y resucitan, mostrando que el testimonio de Dios no puede ser silenciado.', referencias: 'Apocalipsis 11:3-12',
            trasfondoCultural: 'La ley de Israel exigía "dos o tres testigos" para establecer la verdad de un asunto (Deuteronomio 19:15); un solo testigo no bastaba. Por eso Dios levanta DOS testigos: su testimonio es legalmente firme e irrefutable. Los prodigios que hacen recuerdan a Moisés (plagas) y a Elías (cerrar el cielo), los grandes profetas del Antiguo Testamento.',
            orden: 5,
          },
          {
            nombre: 'La séptima trompeta', significado: 'Anuncia que el reino del mundo ha pasado a ser de Dios y de su Cristo; el cielo estalla en adoración.', referencias: 'Apocalipsis 11:15-17',
            trasfondoCultural: 'En el mundo antiguo, la llegada o la victoria de un rey se anunciaba con toque de trompeta y con aclamaciones públicas ("¡viva el rey!"). La séptima trompeta funciona así: es el anuncio real de que el verdadero Rey ha tomado posesión de su reino. Frente a un imperio que aclamaba al César, el cielo proclama que el reino es del Señor y de su Cristo.',
            orden: 6,
          },
        ],
      },
      tipologias: {
        create: [
          { elemento: 'El ángel con el incienso ante el altar', cristoEnEl: 'Apunta a la obra intercesora: nuestras oraciones son aceptas delante de Dios por causa del sacrificio. Cristo es nuestro sumo sacerdote que intercede y presenta a los suyos delante del Padre.', cita: 'Apocalipsis 8:3; Hebreos 7:25', orden: 1 },
          { elemento: 'El reino que llega a ser de "nuestro Señor y de su Cristo"', cristoEnEl: 'Cristo, el Rey de reyes que reinará por los siglos de los siglos; toda la historia avanza hacia su reinado.', cita: 'Apocalipsis 11:15', orden: 2 },
        ],
      },
      profecias: {
        create: [
          { tema: 'Los juicios de las siete trompetas sobre la tierra', estado: 'por_cumplir', citaBase: 'Apocalipsis 8:6-9:21', citaCumplimiento: null, orden: 1 },
          { tema: 'El ministerio, muerte y resurrección de los dos testigos', estado: 'por_cumplir', citaBase: 'Apocalipsis 11:3-12', citaCumplimiento: null, orden: 2 },
          { tema: 'La proclamación del reino de Cristo', estado: 'por_cumplir', citaBase: 'Apocalipsis 11:15', citaCumplimiento: 'Apocalipsis 19:6', orden: 3 },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado: '¿Qué sube a la presencia de Dios junto con el incienso del ángel?',
            orden: 1,
            opciones: {
              create: [
                { texto: 'Las oraciones de los santos', esCorrecta: true, orden: 1 },
                { texto: 'Los nombres de los reyes de la tierra', esCorrecta: false, orden: 2 },
                { texto: 'Las siete copas de la ira', esCorrecta: false, orden: 3 },
                { texto: 'El libro sellado', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Qué le ocurre a la tercera parte de las aguas con la estrella Ajenjo?',
            orden: 2,
            opciones: {
              create: [
                { texto: 'Se vuelven amargas y muchos mueren por ellas', esCorrecta: true, orden: 1 },
                { texto: 'Se secan por completo', esCorrecta: false, orden: 2 },
                { texto: 'Se convierten en sangre', esCorrecta: false, orden: 3 },
                { texto: 'Se vuelven dulces y sanas', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Por qué levanta Dios precisamente DOS testigos?',
            orden: 3,
            opciones: {
              create: [
                { texto: 'Porque la ley exigía dos o tres testigos para establecer la verdad', esCorrecta: true, orden: 1 },
                { texto: 'Porque uno era para Israel y otro para las naciones', esCorrecta: false, orden: 2 },
                { texto: 'Porque representan a Moisés y a Abraham', esCorrecta: false, orden: 3 },
                { texto: 'Porque el número dos significa juicio', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Qué se proclama cuando suena la séptima trompeta?',
            orden: 4,
            opciones: {
              create: [
                { texto: 'Que los reinos del mundo han venido a ser de nuestro Señor y de su Cristo', esCorrecta: true, orden: 1 },
                { texto: 'Que comienza la creación de un cielo nuevo', esCorrecta: false, orden: 2 },
                { texto: 'Que Babilonia ha sido reconstruida', esCorrecta: false, orden: 3 },
                { texto: 'Que la Iglesia debe pasar la Gran Tribulación', esCorrecta: false, orden: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Lección 5 "Las siete trompetas" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });