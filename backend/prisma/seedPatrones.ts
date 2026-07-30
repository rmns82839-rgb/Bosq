// prisma/seedPatrones.ts
// Reforma del módulo "Patrones Bíblicos". La versión original contaba
// frecuencia de palabras en los 66 libros, lo que exigía almacenar todo
// el texto de la RVR1960 (que tiene derechos de autor). Esta versión
// conserva el espíritu — ver las repeticiones y estructuras de la
// Escritura — con patrones literarios y estructurales reconocidos, y
// deja la búsqueda de frecuencia de palabras a la IA.
//
// Corre con: npx ts-node prisma/seedPatrones.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando patrones existentes...');
  await prisma.patronBiblico.deleteMany({});

  console.log('Sembrando patrones bíblicos...');

  await prisma.patronBiblico.createMany({
    data: [
      // ── ESTRUCTURA LITERARIA ──────────────────────────────────
      { nombre: 'Quiasmo (estructura en espejo A-B-C-B-A)', categoria: 'estructura', cita: 'Génesis 6:9-9:19', descripcion: 'El relato del diluvio está construido en espejo: lo que sube en la primera mitad, baja en la segunda, con el punto de giro en "se acordó Dios de Noé".' },
      { nombre: 'Paralelismo sinónimo', categoria: 'estructura', cita: 'Salmos 19:1', descripcion: 'La segunda línea repite la idea de la primera con otras palabras. Es la base de casi toda la poesía hebrea.' },
      { nombre: 'Paralelismo antitético', categoria: 'estructura', cita: 'Proverbios 10:1', descripcion: 'La segunda línea contrasta con la primera. Domina el libro de Proverbios.' },
      { nombre: 'Inclusio (misma frase al abrir y cerrar)', categoria: 'estructura', cita: 'Salmos 8:1', descripcion: 'Un pasaje empieza y termina con la misma expresión, enmarcando la unidad completa.' },
      { nombre: 'Estribillo repetido', categoria: 'estructura', cita: 'Salmos 136:1', descripcion: '"Porque para siempre es su misericordia" se repite en los 26 versículos del salmo.' },

      // ── FÓRMULAS RECURRENTES ──────────────────────────────────
      { nombre: 'Fórmula de evaluación de los reyes', categoria: 'formula', cita: '1 Reyes 15:11', descripcion: '"Hizo lo recto ante los ojos de Jehová" / "hizo lo malo ante los ojos de Jehová" — se repite para cada uno de los reyes de Israel y Judá.' },
      { nombre: 'Fórmula de las genealogías (toledot)', categoria: 'formula', cita: 'Génesis 5:1', descripcion: '"Estas son las generaciones de…" estructura todo Génesis en secciones.' },
      { nombre: 'Fórmula profética del mensajero', categoria: 'formula', cita: 'Isaías 7:7', descripcion: '"Así ha dicho Jehová" — introduce el oráculo profético a lo largo de todos los profetas.' },
      { nombre: 'Fórmula de los días de la creación', categoria: 'formula', cita: 'Génesis 1:5', descripcion: '"Y fue la tarde y la mañana del día…" marca cada uno de los seis días.' },
      { nombre: '"De cierto, de cierto os digo"', categoria: 'formula', cita: 'Juan 3:3', descripcion: 'Fórmula de énfasis de Jesús, especialmente frecuente en el Evangelio de Juan.' },

      // ── CICLOS Y REPETICIONES NARRATIVAS ──────────────────────
      { nombre: 'Ciclo de Jueces (pecado → opresión → clamor → libertador → paz)', categoria: 'ciclo', cita: 'Jueces 2:16-19', descripcion: 'El mismo ciclo se repite completo siete veces a lo largo del libro.' },
      { nombre: 'Los siete sellos, trompetas y copas', categoria: 'ciclo', cita: 'Apocalipsis 6:1', descripcion: 'Tres series de siete juicios, con estructura paralela entre ellas.' },
      { nombre: 'Las diez plagas de Egipto', categoria: 'ciclo', cita: 'Éxodo 7:14', descripcion: 'Estructuradas en tres tríadas más una plaga final, cada tríada con su propio patrón de advertencia.' },
      { nombre: 'Los siete "Yo soy" de Juan', categoria: 'ciclo', cita: 'Juan 6:35', descripcion: 'Pan de vida, luz del mundo, puerta, buen pastor, resurrección y vida, camino/verdad/vida, vid verdadera.' },

      // ── PACTOS ────────────────────────────────────────────────
      { nombre: 'Estructura de pacto (partes, condiciones, señal, bendiciones y maldiciones)', categoria: 'pacto', cita: 'Génesis 9:12', descripcion: 'Se repite en los pactos con Noé, Abraham, Moisés y David — con variantes condicionales e incondicionales.' },
      { nombre: 'La señal visible del pacto', categoria: 'pacto', cita: 'Génesis 17:11', descripcion: 'Arco iris, circuncisión, sábado, la copa de la Cena — cada pacto tiene su señal.' },

      // ── TIPOLOGÍA ─────────────────────────────────────────────
      { nombre: 'Sustitución del sacrificio', categoria: 'tipologia', cita: 'Génesis 22:13', descripcion: 'El carnero por Isaac, el cordero pascual, el macho cabrío del Día de Expiación — todos anticipan la sustitución en la cruz.' },
      { nombre: 'El agua que sale de la roca', categoria: 'tipologia', cita: 'Éxodo 17:6', descripcion: 'Repetido en Números 20 y aplicado a Cristo en 1 Corintios 10:4.' },
      { nombre: 'El hermano menor escogido sobre el mayor', categoria: 'tipologia', cita: 'Génesis 25:23', descripcion: 'Abel sobre Caín, Isaac sobre Ismael, Jacob sobre Esaú, David sobre sus hermanos — la elección de Dios no sigue el orden humano.' },
      { nombre: 'El descenso a Egipto y la salida', categoria: 'tipologia', cita: 'Oseas 11:1', descripcion: 'El patrón del éxodo se repite en la vida de Jesús (Mateo 2:15) y en el lenguaje de la redención.' },
    ],
  });

  const total = await prisma.patronBiblico.count();
  console.log(`Listo — ${total} patrones sembrados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
