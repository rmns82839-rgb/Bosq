import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  SEED DE PRUEBA — Curso Apocalipsis, lección 1.
//  Contenido de RELLENO para probar la estructura; el contenido
//  teológico definitivo (línea MMM) se redacta y aprueba aparte.
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando curso Apocalipsis (prueba)...');

  await prisma.curso.deleteMany({ where: { slug: 'apocalipsis' } });

  const curso = await prisma.curso.create({
    data: {
      slug: 'apocalipsis',
      nombre: 'Apocalipsis',
      descripcion: 'La revelación de Jesucristo: profecía, símbolos y esperanza para la Iglesia.',
      autor: 'Juan',
      fechaEscritura: 'c. 95 d.C.',
      contextoGeneral: 'Escrito desde la isla de Patmos durante la persecución, para consolar y advertir a las iglesias de Asia Menor.',
      orden: 1,
      activo: true,
      lecciones: {
        create: [
          {
            orden: 1,
            semana: 1,
            titulo: 'Las siete iglesias',
            tema: 'Cristo en medio de su Iglesia',
            pasajeBase: 'Apocalipsis 2–3',
            introduccion: '(RELLENO) Jesús se dirige a siete iglesias reales de Asia Menor, y en ellas a la Iglesia de todos los tiempos.',
            contextoHistorico: '(RELLENO) Siete ciudades sobre una ruta postal romana, cada una con su carácter y sus desafíos.',
            versiculosMemoria: {
              create: [
                { cita: 'Apocalipsis 3:20', texto: '(RELLENO) He aquí, yo estoy a la puerta y llamo…', orden: 1 },
              ],
            },
            interpretaciones: {
              create: [
                { escuela: 'preterista', contenido: '(RELLENO) Las cartas se cumplieron en el siglo I en esas iglesias.', esPosturaPropia: false, orden: 1 },
                { escuela: 'historicista', contenido: '(RELLENO) Las siete iglesias representan siete edades de la historia de la Iglesia.', esPosturaPropia: false, orden: 2 },
                { escuela: 'futurista', contenido: '(RELLENO) Iglesias reales del siglo I con aplicación profética; la Iglesia es arrebatada antes de la Gran Tribulación.', esPosturaPropia: true, orden: 3 },
                { escuela: 'idealista', contenido: '(RELLENO) Representan tipos de iglesia presentes en toda época.', esPosturaPropia: false, orden: 4 },
              ],
            },
            simbolos: {
              create: [
                { nombre: 'Los siete candeleros', significado: '(RELLENO) Las siete iglesias (Ap 1:20).', referencias: 'Apocalipsis 1:20', orden: 1 },
                { nombre: 'Las siete estrellas', significado: '(RELLENO) Los ángeles/mensajeros de las iglesias.', referencias: 'Apocalipsis 1:20', orden: 2 },
              ],
            },
            tipologias: {
              create: [
                { elemento: 'El que anda entre los candeleros', cristoEnEl: '(RELLENO) Cristo presente y activo en medio de su Iglesia.', cita: 'Apocalipsis 2:1', orden: 1 },
              ],
            },
            profecias: {
              create: [
                { tema: 'Corona de vida al fiel', estado: 'por_cumplir', citaBase: 'Apocalipsis 2:10', citaCumplimiento: null, orden: 1 },
              ],
            },
            ciudades: {
              create: [
                { nombreBiblico: 'Éfeso', ubicacion: 'Asia Menor (actual Turquía)', equivalenteActual: 'Cerca de Selçuk, Turquía', nota: '(RELLENO) La iglesia que dejó su primer amor.', orden: 1 },
                { nombreBiblico: 'Esmirna', ubicacion: 'Asia Menor (actual Turquía)', equivalenteActual: 'Izmir, Turquía', nota: '(RELLENO) La iglesia perseguida y fiel.', orden: 2 },
              ],
            },
            preguntas: {
              create: [
                {
                  enunciado: '(RELLENO) ¿Qué representan los siete candeleros?',
                  orden: 1,
                  opciones: {
                    create: [
                      { texto: 'Las siete iglesias', esCorrecta: true, orden: 1 },
                      { texto: 'Los siete sellos', esCorrecta: false, orden: 2 },
                      { texto: 'Los siete ángeles', esCorrecta: false, orden: 3 },
                      { texto: 'Las siete trompetas', esCorrecta: false, orden: 4 },
                    ],
                  },
                },
                {
                  enunciado: '(RELLENO) Según la postura futurista, ¿cuándo es arrebatada la Iglesia?',
                  orden: 2,
                  opciones: {
                    create: [
                      { texto: 'Antes de la Gran Tribulación', esCorrecta: true, orden: 1 },
                      { texto: 'A mitad de la Gran Tribulación', esCorrecta: false, orden: 2 },
                      { texto: 'Después de la Gran Tribulación', esCorrecta: false, orden: 3 },
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

  console.log(`✅ Curso "${curso.nombre}" sembrado con 1 lección de prueba.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });