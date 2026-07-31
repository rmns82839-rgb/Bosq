// prisma/seedProfecias.ts
// 52 profecías mesiánicas con su cita del Antiguo Testamento y su
// cumplimiento en el Nuevo, agrupadas por etapa.
//
// Nota honesta: NO existe un número cerrado de profecías mesiánicas.
// Según el criterio que se use, las listas van desde ~44 hasta más de
// 300 (contando alusiones y tipologías). Esta es una selección de las
// mejor atestiguadas, donde el propio Nuevo Testamento señala el
// cumplimiento o la conexión es ampliamente reconocida.
//
// Corre con: npx ts-node prisma/seedProfecias.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando profecías existentes...');
  await prisma.profeciaMesianica.deleteMany({});

  console.log('Sembrando 52 profecías mesiánicas...');

  const P = (categoria: string, tema: string, citaProfecia: string, citaCumplimiento: string) =>
    ({ categoria, tema, citaProfecia, citaCumplimiento });

  await prisma.profeciaMesianica.createMany({
    data: [
      // ═══ LINAJE Y NACIMIENTO ═══════════════════════════════
      P('nacimiento', 'La simiente de la mujer', 'Génesis 3:15', 'Gálatas 4:4'),
      P('nacimiento', 'Descendiente de Abraham', 'Génesis 12:3', 'Mateo 1:1'),
      P('nacimiento', 'Descendiente de Isaac', 'Génesis 17:19', 'Lucas 3:34'),
      P('nacimiento', 'Descendiente de Jacob', 'Números 24:17', 'Lucas 3:34'),
      P('nacimiento', 'De la tribu de Judá', 'Génesis 49:10', 'Lucas 3:33'),
      P('nacimiento', 'Del linaje de Isaí', 'Isaías 11:1', 'Lucas 3:32'),
      P('nacimiento', 'De la casa de David', 'Jeremías 23:5', 'Lucas 3:31'),
      P('nacimiento', 'Nacido de una virgen', 'Isaías 7:14', 'Mateo 1:18'),
      P('nacimiento', 'Nacido en Belén', 'Miqueas 5:2', 'Mateo 2:1'),
      P('nacimiento', 'Llanto en Ramá: la matanza de los niños', 'Jeremías 31:15', 'Mateo 2:16-18'),
      P('nacimiento', 'Llamado de Egipto', 'Oseas 11:1', 'Mateo 2:14-15'),

      // ═══ MINISTERIO ════════════════════════════════════════
      P('ministerio', 'Precedido por un mensajero', 'Malaquías 3:1', 'Mateo 3:1-3'),
      P('ministerio', 'Voz que clama en el desierto', 'Isaías 40:3', 'Mateo 3:3'),
      P('ministerio', 'Ungido con el Espíritu de Jehová', 'Isaías 11:2', 'Mateo 3:16-17'),
      P('ministerio', 'Declarado Hijo de Dios', 'Salmos 2:7', 'Mateo 3:17'),
      P('ministerio', 'Su ministerio comenzaría en Galilea', 'Isaías 9:1-2', 'Mateo 4:12-16'),
      P('ministerio', 'Profeta como Moisés', 'Deuteronomio 18:15', 'Hechos 3:20-22'),
      P('ministerio', 'Sacerdote según el orden de Melquisedec', 'Salmos 110:4', 'Hebreos 5:5-6'),
      P('ministerio', 'Hablaría en parábolas', 'Salmos 78:2', 'Mateo 13:34-35'),
      P('ministerio', 'Predicaría buenas nuevas a los abatidos', 'Isaías 61:1', 'Lucas 4:18-19'),
      P('ministerio', 'Llevaría nuestras enfermedades', 'Isaías 53:4', 'Mateo 8:16-17'),
      P('ministerio', 'El celo por la casa de Dios lo consumiría', 'Salmos 69:9', 'Juan 2:15-17'),
      P('ministerio', 'Entraría al templo', 'Malaquías 3:1', 'Mateo 21:12'),
      P('ministerio', 'Apacentaría como pastor', 'Isaías 40:11', 'Juan 10:11'),
      P('ministerio', 'Luz para los gentiles', 'Isaías 49:6', 'Hechos 13:47'),
      P('ministerio', 'Rechazado por los suyos', 'Isaías 53:3', 'Juan 1:11'),
      P('ministerio', 'Aborrecido sin causa', 'Salmos 69:4', 'Juan 15:24-25'),
      P('ministerio', 'Piedra desechada por los edificadores', 'Salmos 118:22', '1 Pedro 2:7'),
      P('ministerio', 'Piedra de tropiezo para Israel', 'Isaías 8:14', 'Romanos 9:32-33'),
      P('ministerio', 'Entrada triunfal montado en un asno', 'Zacarías 9:9', 'Mateo 21:6-9'),

      // ═══ PASIÓN ════════════════════════════════════════════
      P('pasion', 'Traicionado por un amigo cercano', 'Salmos 41:9', 'Mateo 26:47-50'),
      P('pasion', 'Vendido por treinta piezas de plata', 'Zacarías 11:12', 'Mateo 26:15'),
      P('pasion', 'Las treinta piezas arrojadas y dadas al alfarero', 'Zacarías 11:13', 'Mateo 27:6-7'),
      P('pasion', 'Sus discípulos lo abandonarían', 'Zacarías 13:7', 'Mateo 26:31'),
      P('pasion', 'Acusado por falsos testigos', 'Salmos 35:11', 'Mateo 26:59-61'),
      P('pasion', 'Callado ante sus acusadores', 'Isaías 53:7', 'Mateo 27:12-14'),
      P('pasion', 'Herido, azotado y escupido', 'Isaías 50:6', 'Mateo 26:67'),
      P('pasion', 'Escarnecido y burlado', 'Salmos 22:7-8', 'Mateo 27:39-43'),
      P('pasion', 'Manos y pies horadados', 'Salmos 22:16', 'Juan 20:25-27'),
      P('pasion', 'Crucificado entre transgresores', 'Isaías 53:12', 'Marcos 15:27-28'),
      P('pasion', 'Intercedió por sus perseguidores', 'Isaías 53:12', 'Lucas 23:34'),
      P('pasion', 'Le dieron hiel y vinagre', 'Salmos 69:21', 'Mateo 27:34'),
      P('pasion', '"Dios mío, ¿por qué me has desamparado?"', 'Salmos 22:1', 'Mateo 27:46'),
      P('pasion', 'Encomendó su espíritu al Padre', 'Salmos 31:5', 'Lucas 23:46'),
      P('pasion', 'Repartieron sus vestidos y echaron suertes', 'Salmos 22:18', 'Juan 19:23-24'),
      P('pasion', 'Ninguno de sus huesos sería quebrado', 'Salmos 34:20', 'Juan 19:33,36'),
      P('pasion', 'Su costado sería traspasado', 'Zacarías 12:10', 'Juan 19:34,37'),
      P('pasion', 'Herido por nuestras rebeliones', 'Isaías 53:5', '1 Pedro 2:24'),
      P('pasion', 'Sepultado con los ricos', 'Isaías 53:9', 'Mateo 27:57-60'),

      // ═══ RESURRECCIÓN Y EXALTACIÓN ═════════════════════════
      P('resurreccion', 'Resucitaría sin ver corrupción', 'Salmos 16:10', 'Hechos 2:31'),
      P('resurreccion', 'Ascendería a lo alto', 'Salmos 68:18', 'Efesios 4:8'),
      P('resurreccion', 'Sentado a la diestra de Dios', 'Salmos 110:1', 'Hebreos 1:3'),
      P('resurreccion', 'Su reino sería eterno', 'Daniel 7:14', 'Lucas 1:32-33'),
      P('resurreccion', 'Mediador de un nuevo pacto', 'Jeremías 31:31-34', 'Hebreos 8:6-13'),
    ],
  });

  const total = await prisma.profeciaMesianica.count();
  console.log(`Listo — ${total} profecías sembradas.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
