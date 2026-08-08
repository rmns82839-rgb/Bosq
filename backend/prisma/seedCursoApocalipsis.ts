import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Curso Apocalipsis — Lección 1: "Las siete iglesias"
//  Contenido redactado en la línea del Movimiento Misionero
//  Mundial (arminiana, pretribulacional). Revisar pastoralmente.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando curso Apocalipsis...');

  await prisma.curso.deleteMany({ where: { slug: 'apocalipsis' } });

  const curso = await prisma.curso.create({
    data: {
      slug: 'apocalipsis',
      nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol',
      fechaEscritura: 'c. 95 d.C.',
      contextoGeneral: 'Escrito por el apóstol Juan desde la isla de Patmos, desterrado por causa de la Palabra de Dios y del testimonio de Jesucristo, durante la persecución del Imperio Romano. Su propósito es revelar la gloria de Cristo resucitado, exhortar a las iglesias y anunciar los acontecimientos finales, dando consuelo y esperanza al pueblo de Dios.',
      orden: 1,
      activo: true,
      lecciones: {
        create: [
          {
            orden: 1,
            semana: 1,
            titulo: 'Las siete iglesias',
            tema: 'Cristo glorificado en medio de su Iglesia',
            pasajeBase: 'Apocalipsis 1–3',
            introduccion:
              'El Apocalipsis se abre con una visión gloriosa de Jesucristo resucitado, que camina en medio de siete candeleros de oro. Esos candeleros son siete iglesias reales de Asia Menor —Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia y Laodicea—, y a cada una el Señor le envía un mensaje personal: reconoce lo bueno, señala lo que debe corregir, y promete galardón al que venciere. Estas cartas no son solo historia: son un espejo para la Iglesia de todos los tiempos, incluida la nuestra hoy.',
            contextoHistorico:
              'Las siete ciudades estaban unidas por una calzada romana en forma de circuito, en la provincia de Asia (actual Turquía occidental). Eran centros de comercio, culto imperial e idolatría. La Iglesia vivía bajo presión: persecución, falsos maestros y la tentación de mezclarse con el paganismo. Escribir "a los siete espíritus" y a las siete iglesias abarca, por el número siete —plenitud—, a toda la Iglesia del Señor.',
            versiculosMemoria: {
              create: [
                { cita: 'Apocalipsis 1:8', texto: 'Yo soy el Alfa y la Omega, principio y fin, dice el Señor, el que es y que era y que ha de venir, el Todopoderoso.', orden: 1 },
                { cita: 'Apocalipsis 3:20', texto: 'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.', orden: 2 },
              ],
            },
            interpretaciones: {
              create: [
                {
                  escuela: 'preterista',
                  contenido:
                    'Sostiene que los mensajes se dirigieron y cumplieron esencialmente en el siglo I, en aquellas siete congregaciones históricas bajo el Imperio Romano. Lee el libro como palabra para su tiempo. Valor: honra el contexto histórico real de las iglesias. Límite (según nuestra postura): reduce el alcance profético del libro, que también mira hacia el fin.',
                  esPosturaPropia: false, orden: 1,
                },
                {
                  escuela: 'historicista',
                  contenido:
                    'Ve en las siete iglesias siete edades sucesivas de la historia de la Iglesia, desde los apóstoles hasta hoy (por ejemplo, Laodicea como la iglesia tibia de los últimos tiempos). Valor: resalta que las cartas hablan proféticamente a toda la era cristiana. Límite: el orden de las "edades" es interpretativo y no siempre encaja con la historia.',
                  esPosturaPropia: false, orden: 2,
                },
                {
                  escuela: 'futurista',
                  contenido:
                    'Nuestra posición (línea del Movimiento Misionero Mundial). Las siete iglesias fueron congregaciones reales del siglo I y, a la vez, retratan a la Iglesia a lo largo de la era de la gracia. El cuerpo del libro (del capítulo 4 en adelante) describe acontecimientos aún futuros. Sostenemos el arrebatamiento de la Iglesia ANTES de la Gran Tribulación (rapto pretribulacional): la Iglesia fiel no pasará por ese tiempo de ira, sino que será llevada con el Señor, y luego vendrán los juicios sobre la tierra. Por eso el llamado a cada iglesia es a vencer y estar preparados.',
                  esPosturaPropia: true, orden: 3,
                },
                {
                  escuela: 'idealista',
                  contenido:
                    'Entiende las cartas como símbolos de virtudes y peligros espirituales presentes en toda congregación de cualquier época, sin ligarlas a fechas ni eventos concretos. Valor: hace la aplicación siempre vigente para el creyente. Límite (según nuestra postura): al espiritualizar todo, tiende a diluir el contenido profético y literal del libro.',
                  esPosturaPropia: false, orden: 4,
                },
              ],
            },
            simbolos: {
              create: [
                { nombre: 'Siete candeleros de oro', significado: 'Las siete iglesias. El oro habla del valor que tiene la Iglesia para Cristo; el candelero, de su llamado a alumbrar en medio de las tinieblas.', referencias: 'Apocalipsis 1:20', orden: 1 },
                { nombre: 'Siete estrellas', significado: 'Los ángeles (mensajeros/pastores) de las siete iglesias, sostenidos en la mano derecha de Cristo.', referencias: 'Apocalipsis 1:16,20', orden: 2 },
                { nombre: 'Espada aguda de dos filos', significado: 'La Palabra de Dios que sale de la boca de Cristo, que discierne, juzga y corrige.', referencias: 'Apocalipsis 1:16; Hebreos 4:12', orden: 3 },
                { nombre: 'El número siete', significado: 'Plenitud y perfección divina: siete iglesias abarcan a toda la Iglesia.', referencias: 'Apocalipsis 1:4', orden: 4 },
              ],
            },
            tipologias: {
              create: [
                { elemento: 'El que anda en medio de los candeleros', cristoEnEl: 'Cristo presente y activo en medio de su Iglesia, cuidándola y conociéndola por completo. No es un Dios distante: camina entre los suyos.', cita: 'Apocalipsis 2:1', orden: 1 },
                { elemento: 'El Primero y el Último, el que vivió y estuvo muerto', cristoEnEl: 'Cristo eterno y resucitado, vencedor de la muerte, que tiene las llaves de la muerte y del Hades. Base de nuestra esperanza.', cita: 'Apocalipsis 1:17-18', orden: 2 },
                { elemento: 'El Alfa y la Omega', cristoEnEl: 'Cristo como principio y fin de todo; Señor de la historia, que tiene la primera y la última palabra.', cita: 'Apocalipsis 1:8', orden: 3 },
              ],
            },
            profecias: {
              create: [
                { tema: 'Corona de vida para el fiel hasta la muerte', estado: 'por_cumplir', citaBase: 'Apocalipsis 2:10', citaCumplimiento: null, orden: 1 },
                { tema: 'El vencedor no sufrirá daño de la muerte segunda', estado: 'por_cumplir', citaBase: 'Apocalipsis 2:11', citaCumplimiento: 'Apocalipsis 20:6,14', orden: 2 },
                { tema: 'Al vencedor, sentarse con Cristo en su trono', estado: 'por_cumplir', citaBase: 'Apocalipsis 3:21', citaCumplimiento: null, orden: 3 },
              ],
            },
            ciudades: {
              create: [
                { nombreBiblico: 'Éfeso', ubicacion: 'Asia Menor, junto al mar Egeo', equivalenteActual: 'Cerca de Selçuk, Turquía', nota: 'La iglesia trabajadora y firme en doctrina, pero que había dejado su primer amor. Llamada a arrepentirse y volver a lo primero.', orden: 1 },
                { nombreBiblico: 'Esmirna', ubicacion: 'Asia Menor, puerto sobre el Egeo', equivalenteActual: 'Izmir, Turquía', nota: 'La iglesia pobre y perseguida, pero rica delante de Dios. No recibe reproche, sino consuelo: sé fiel hasta la muerte.', orden: 2 },
                { nombreBiblico: 'Pérgamo', ubicacion: 'Asia Menor, ciudad del culto imperial', equivalenteActual: 'Bergama, Turquía', nota: 'Fiel al nombre de Cristo donde estaba "el trono de Satanás", pero tolerando doctrinas falsas. Llamada a limpiarse.', orden: 3 },
                { nombreBiblico: 'Tiatira', ubicacion: 'Asia Menor, ciudad de gremios y comercio', equivalenteActual: 'Akhisar, Turquía', nota: 'Rica en amor y servicio, pero permitía la seducción de "Jezabel". Se le exige no tolerar lo que corrompe.', orden: 4 },
                { nombreBiblico: 'Sardis', ubicacion: 'Asia Menor, antigua capital de Lidia', equivalenteActual: 'Sart, Turquía', nota: 'Tenía nombre de que vivía, pero estaba muerta. Llamada a despertar y afirmar lo que estaba por morir.', orden: 5 },
                { nombreBiblico: 'Filadelfia', ubicacion: 'Asia Menor, ciudad sobre ruta comercial', equivalenteActual: 'Alaşehir, Turquía', nota: 'La iglesia fiel de puerta abierta, con poca fuerza pero guardadora de la Palabra. Recibe la promesa de ser guardada de la hora de la prueba.', orden: 6 },
                { nombreBiblico: 'Laodicea', ubicacion: 'Asia Menor, ciudad rica y comercial', equivalenteActual: 'Cerca de Denizli, Turquía', nota: 'La iglesia tibia y autosuficiente, que se creía rica sin saber su miseria espiritual. Cristo está a la puerta y llama.', orden: 7 },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: 'Según Apocalipsis 1:20, ¿qué representan los siete candeleros de oro?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Las siete iglesias', esCorrecta: true, orden: 1 },
                      { texto: 'Los siete sellos', esCorrecta: false, orden: 2 },
                      { texto: 'Los siete ángeles del juicio', esCorrecta: false, orden: 3 },
                      { texto: 'Las siete trompetas', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: 'Conforme a la postura del Movimiento Misionero Mundial, ¿cuándo es arrebatada la Iglesia respecto a la Gran Tribulación?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'Antes de la Gran Tribulación', esCorrecta: true, orden: 1 },
                      { texto: 'A la mitad de la Gran Tribulación', esCorrecta: false, orden: 2 },
                      { texto: 'Al final de la Gran Tribulación', esCorrecta: false, orden: 3 },
                      { texto: 'La Iglesia pasa por toda la Gran Tribulación', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Cuál iglesia fue reprendida por haber dejado su primer amor?',
                  orden: 3,
                  opciones: {
                    create: [
                      { texto: 'Éfeso', esCorrecta: true, orden: 1 },
                      { texto: 'Esmirna', esCorrecta: false, orden: 2 },
                      { texto: 'Filadelfia', esCorrecta: false, orden: 3 },
                      { texto: 'Laodicea', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '¿Qué se dice de la iglesia de Laodicea?',
                  orden: 4,
                  opciones: {
                    create: [
                      { texto: 'Que era tibia y se creía rica sin saber su pobreza espiritual', esCorrecta: true, orden: 1 },
                      { texto: 'Que era pobre y perseguida, pero rica en Dios', esCorrecta: false, orden: 2 },
                      { texto: 'Que tenía puerta abierta y guardaba la Palabra', esCorrecta: false, orden: 3 },
                      { texto: 'Que moraba donde estaba el trono de Satanás', esCorrecta: false, orden: 4 },
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

  console.log(`✅ Curso "${curso.nombre}" sembrado con la lección 1 (contenido real).`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });