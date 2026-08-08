import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 3: "Los siete sellos" (Ap 6; 8:1)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 3.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 3 de Apocalipsis...');

  const curso = await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: {},
    create: {
      slug: 'apocalipsis', nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol', fechaEscritura: 'c. 95 d.C.', orden: 1, activo: true,
    },
  });

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 3 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 3,
      semana: 3,
      titulo: 'Los siete sellos',
      tema: 'El Cordero abre los sellos y comienza el juicio',
      pasajeBase: 'Apocalipsis 6; 8:1',
      introduccion:
        'El Cordero, hallado digno, comienza a abrir el libro sellado, y con cada sello se desatan acontecimientos sobre la tierra. Aparecen los cuatro caballos —el blanco, el bermejo, el negro y el amarillo— que traen conquista, guerra, hambre y muerte. El quinto sello muestra a los mártires clamando "¿hasta cuándo?"; el sexto, grandes señales en el cielo y el terror de los hombres ante la ira del Cordero; y el séptimo abre paso a las trompetas. Es el comienzo del tiempo de juicio que nuestro Señor llamó "principio de dolores".',
      contextoHistorico:
        'Las imágenes de los caballos evocan a los caballos de Zacarías, y toda la escena resuena con el discurso de Jesús en el Monte de los Olivos (Mateo 24): guerras, hambres y persecución como señales del fin. En nuestra comprensión, estos juicios corresponden al tiempo de la Gran Tribulación sobre la tierra, después de que la Iglesia ha sido arrebatada.',
      versiculosMemoria: {
        create: [
          { cita: 'Apocalipsis 6:17', texto: 'Porque el gran día de su ira ha llegado; ¿y quién podrá sostenerse en pie?', orden: 1 },
          { cita: '1 Tesalonicenses 5:9', texto: 'Porque no nos ha puesto Dios para ira, sino para alcanzar salvación por medio de nuestro Señor Jesucristo.', orden: 2 },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Aplica los sellos a acontecimientos del siglo I: las guerras, hambres y convulsiones del Imperio Romano y la destrucción de Jerusalén en el año 70. Valor: ancla el texto en hechos históricos concretos. Límite (según nuestra postura): no da cuenta del carácter final y universal de estos juicios.',
            esPosturaPropia: false, orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve los sellos como etapas sucesivas de la historia desde el siglo I: el auge y la decadencia de Roma, invasiones, hambrunas y persecuciones a lo largo de los siglos. Valor: afirma que Cristo dirige el curso de la historia. Límite: la asignación de cada sello a un período concreto es interpretativa y variable.',
            esPosturaPropia: false, orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra posición (línea del Movimiento Misionero Mundial). Los sellos son juicios aún futuros que caen sobre la tierra durante la Gran Tribulación, después del arrebatamiento de la Iglesia. Los cuatro caballos anuncian el surgimiento del anticristo, la guerra, el hambre y la muerte; el quinto muestra a los mártires de ese tiempo; el sexto, las señales cósmicas previas al día de la ira. Coincide con el "principio de dolores" de Mateo 24. La Iglesia fiel no está en esta escena porque ya fue llevada con el Señor: "no nos ha puesto Dios para ira".',
            esPosturaPropia: true, orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Entiende los sellos como realidades permanentes de la historia humana —conquista, guerra, hambre, muerte y martirio— que se repiten en toda época y ante las cuales Dios sigue siendo soberano. Valor: hace el mensaje aplicable siempre. Límite (según nuestra postura): al no ligarlo a un tiempo profético concreto, diluye el anuncio de los juicios finales.',
            esPosturaPropia: false, orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          { nombre: 'Caballo blanco y su jinete', significado: 'Un conquistador que sale "venciendo y para vencer". Muchos en nuestra línea lo entienden como el anticristo que se levanta al inicio de la Tribulación (distinto del Cristo del caballo blanco de Ap 19).', referencias: 'Apocalipsis 6:2', orden: 1 },
          { nombre: 'Caballo bermejo (rojo)', significado: 'La guerra: se le da poder de quitar la paz de la tierra y hacer que los hombres se maten unos a otros.', referencias: 'Apocalipsis 6:4', orden: 2 },
          { nombre: 'Caballo negro y la balanza', significado: 'El hambre y la carestía: el alimento se pesa y se vende a precio de crisis.', referencias: 'Apocalipsis 6:5-6', orden: 3 },
          { nombre: 'Caballo amarillo y su jinete', significado: 'La muerte, seguida del Hades: mortandad por espada, hambre, mortandad y fieras sobre la cuarta parte de la tierra.', referencias: 'Apocalipsis 6:8', orden: 4 },
          { nombre: 'Las almas bajo el altar (quinto sello)', significado: 'Los mártires muertos por causa de la Palabra, que claman a Dios por justicia: "¿hasta cuándo?".', referencias: 'Apocalipsis 6:9-10', orden: 5 },
          { nombre: 'Señales en el sexto sello', significado: 'Terremoto, sol negro, luna como sangre y estrellas cayendo: la creación estremecida ante la ira del Cordero.', referencias: 'Apocalipsis 6:12-14', orden: 6 },
          { nombre: 'Silencio en el cielo (séptimo sello)', significado: 'Media hora de silencio solemne que da paso a las siete trompetas: el juicio continúa.', referencias: 'Apocalipsis 8:1', orden: 7 },
        ],
      },
      tipologias: {
        create: [
          { elemento: 'El Cordero que abre los sellos', cristoEnEl: 'Cristo, Señor soberano de la historia y del juicio: nada ocurre sin que Él lo permita; Él tiene el control aun del tiempo de la ira.', cita: 'Apocalipsis 6:1', orden: 1 },
          { elemento: 'El clamor "¿hasta cuándo?" y la respuesta de Dios', cristoEnEl: 'Cristo, el juez justo que vindicará a sus santos; la sangre de los mártires no se olvida delante de Él.', cita: 'Apocalipsis 6:10-11', orden: 2 },
        ],
      },
      profecias: {
        create: [
          { tema: 'Los cuatro jinetes: conquista, guerra, hambre y muerte', estado: 'por_cumplir', citaBase: 'Apocalipsis 6:1-8', citaCumplimiento: null, orden: 1 },
          { tema: 'Los mártires de la Tribulación', estado: 'por_cumplir', citaBase: 'Apocalipsis 6:9-11', citaCumplimiento: 'Apocalipsis 7:14', orden: 2 },
          { tema: 'El gran día de la ira del Cordero', estado: 'por_cumplir', citaBase: 'Apocalipsis 6:16-17', citaCumplimiento: null, orden: 3 },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado: '¿Quién abre los siete sellos del libro?',
            orden: 1,
            opciones: {
              create: [
                { texto: 'El Cordero (Cristo)', esCorrecta: true, orden: 1 },
                { texto: 'El anticristo', esCorrecta: false, orden: 2 },
                { texto: 'Un ángel poderoso', esCorrecta: false, orden: 3 },
                { texto: 'Uno de los cuatro seres vivientes', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: 'Según la postura del MMM, ¿en qué momento caen los juicios de los sellos respecto a la Iglesia?',
            orden: 2,
            opciones: {
              create: [
                { texto: 'Después del arrebatamiento de la Iglesia, durante la Gran Tribulación', esCorrecta: true, orden: 1 },
                { texto: 'Antes de que la Iglesia exista', esCorrecta: false, orden: 2 },
                { texto: 'Mientras la Iglesia fiel atraviesa la Gran Tribulación', esCorrecta: false, orden: 3 },
                { texto: 'Después del juicio final', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Qué representa el caballo amarillo y su jinete?',
            orden: 3,
            opciones: {
              create: [
                { texto: 'La muerte, seguida del Hades', esCorrecta: true, orden: 1 },
                { texto: 'La paz sobre la tierra', esCorrecta: false, orden: 2 },
                { texto: 'La predicación del evangelio', esCorrecta: false, orden: 3 },
                { texto: 'La resurrección de los justos', esCorrecta: false, orden: 4 },
              ],
            },
          },
          {
            enunciado: '¿Qué se ve al abrirse el quinto sello?',
            orden: 4,
            opciones: {
              create: [
                { texto: 'Las almas de los mártires que claman "¿hasta cuándo?"', esCorrecta: true, orden: 1 },
                { texto: 'La caída de Babilonia', esCorrecta: false, orden: 2 },
                { texto: 'La nueva Jerusalén', esCorrecta: false, orden: 3 },
                { texto: 'El trono blanco del juicio', esCorrecta: false, orden: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Lección 3 "Los siete sellos" sembrada.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });