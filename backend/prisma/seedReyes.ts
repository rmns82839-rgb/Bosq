// prisma/seedReyes.ts
// Reemplaza la tabla Rey con la lista completa de los 42 reyes:
// 3 del reino unido + 20 de Judá + 19 de Israel (reino del norte).
//
// Fechas: siguen la cronología de Edwin Thiele, la reconstrucción más
// usada en comentarios bíblicos — pero hay coreinados (un rey empieza
// a reinar junto a su padre antes de que este muera) que distintos
// eruditos fechan distinto. Tómalas como referencia sólida, no como
// dato absoluto e indiscutible.
//
// Evaluación (bueno/malo/mixto): sigue el veredicto que el propio
// texto de 1-2 Reyes/1-2 Crónicas da de cada rey ("hizo lo malo ante
// los ojos de Jehová" vs. "hizo lo recto").
//
// Corre con: npx ts-node prisma/seedReyes.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando reyes existentes...');
  await prisma.rey.deleteMany({});

  console.log('Sembrando los 42 reyes...');

  await prisma.rey.createMany({
    data: [
      // ── REINO UNIDO ──────────────────────────────────────────
      { nombre: 'Saúl', reino: 'Israel unido', inicioAc: 1050, finAc: 1010, evaluacion: 'malo', cita: '1 Samuel 10:1' },
      { nombre: 'David', reino: 'Israel unido', inicioAc: 1010, finAc: 970, evaluacion: 'bueno', cita: '2 Samuel 5:3' },
      { nombre: 'Salomón', reino: 'Israel unido', inicioAc: 970, finAc: 930, evaluacion: 'mixto', cita: '1 Reyes 1:39' },

      // ── REINO DE JUDÁ (sur, hasta el exilio en 586 a.C.) ─────
      { nombre: 'Roboam', reino: 'Judá', inicioAc: 930, finAc: 913, evaluacion: 'malo', cita: '1 Reyes 12:1' },
      { nombre: 'Abiam', reino: 'Judá', inicioAc: 913, finAc: 910, evaluacion: 'malo', cita: '1 Reyes 15:1' },
      { nombre: 'Asa', reino: 'Judá', inicioAc: 910, finAc: 869, evaluacion: 'bueno', cita: '1 Reyes 15:9' },
      { nombre: 'Josafat', reino: 'Judá', inicioAc: 872, finAc: 848, evaluacion: 'bueno', cita: '1 Reyes 22:41' },
      { nombre: 'Joram', reino: 'Judá', inicioAc: 848, finAc: 841, evaluacion: 'malo', cita: '2 Reyes 8:16' },
      { nombre: 'Ocozías', reino: 'Judá', inicioAc: 841, finAc: 841, evaluacion: 'malo', cita: '2 Reyes 8:25' },
      { nombre: 'Atalía', reino: 'Judá', inicioAc: 841, finAc: 835, evaluacion: 'malo', cita: '2 Reyes 11:1' },
      { nombre: 'Joás', reino: 'Judá', inicioAc: 835, finAc: 796, evaluacion: 'mixto', cita: '2 Reyes 11:21' },
      { nombre: 'Amasías', reino: 'Judá', inicioAc: 796, finAc: 767, evaluacion: 'mixto', cita: '2 Reyes 14:1' },
      { nombre: 'Uzías (Azarías)', reino: 'Judá', inicioAc: 792, finAc: 740, evaluacion: 'mixto', cita: '2 Reyes 15:1' },
      { nombre: 'Jotam', reino: 'Judá', inicioAc: 750, finAc: 732, evaluacion: 'bueno', cita: '2 Reyes 15:32' },
      { nombre: 'Acaz', reino: 'Judá', inicioAc: 732, finAc: 716, evaluacion: 'malo', cita: '2 Reyes 16:1' },
      { nombre: 'Ezequías', reino: 'Judá', inicioAc: 716, finAc: 687, evaluacion: 'bueno', cita: '2 Reyes 18:1' },
      { nombre: 'Manasés', reino: 'Judá', inicioAc: 697, finAc: 643, evaluacion: 'mixto', cita: '2 Reyes 21:1' },
      { nombre: 'Amón', reino: 'Judá', inicioAc: 643, finAc: 641, evaluacion: 'malo', cita: '2 Reyes 21:19' },
      { nombre: 'Josías', reino: 'Judá', inicioAc: 641, finAc: 609, evaluacion: 'bueno', cita: '2 Reyes 22:1' },
      { nombre: 'Joacaz', reino: 'Judá', inicioAc: 609, finAc: 609, evaluacion: 'malo', cita: '2 Reyes 23:31' },
      { nombre: 'Joacim', reino: 'Judá', inicioAc: 609, finAc: 598, evaluacion: 'malo', cita: '2 Reyes 23:36' },
      { nombre: 'Joaquín', reino: 'Judá', inicioAc: 598, finAc: 597, evaluacion: 'malo', cita: '2 Reyes 24:8' },
      { nombre: 'Sedequías', reino: 'Judá', inicioAc: 597, finAc: 586, evaluacion: 'malo', cita: '2 Reyes 24:18' },

      // ── REINO DE ISRAEL (norte, hasta la caída ante Asiria en 722 a.C.) ──
      { nombre: 'Jeroboam I', reino: 'Israel', inicioAc: 930, finAc: 909, evaluacion: 'malo', cita: '1 Reyes 12:20' },
      { nombre: 'Nadab', reino: 'Israel', inicioAc: 909, finAc: 908, evaluacion: 'malo', cita: '1 Reyes 15:25' },
      { nombre: 'Baasa', reino: 'Israel', inicioAc: 908, finAc: 886, evaluacion: 'malo', cita: '1 Reyes 15:33' },
      { nombre: 'Ela', reino: 'Israel', inicioAc: 886, finAc: 885, evaluacion: 'malo', cita: '1 Reyes 16:8' },
      { nombre: 'Zimri', reino: 'Israel', inicioAc: 885, finAc: 885, evaluacion: 'malo', cita: '1 Reyes 16:15' },
      { nombre: 'Omri', reino: 'Israel', inicioAc: 885, finAc: 874, evaluacion: 'malo', cita: '1 Reyes 16:23' },
      { nombre: 'Acab', reino: 'Israel', inicioAc: 874, finAc: 853, evaluacion: 'malo', cita: '1 Reyes 16:29' },
      { nombre: 'Ocozías', reino: 'Israel', inicioAc: 853, finAc: 852, evaluacion: 'malo', cita: '1 Reyes 22:51' },
      { nombre: 'Joram', reino: 'Israel', inicioAc: 852, finAc: 841, evaluacion: 'malo', cita: '2 Reyes 3:1' },
      { nombre: 'Jehú', reino: 'Israel', inicioAc: 841, finAc: 814, evaluacion: 'mixto', cita: '2 Reyes 9:1' },
      { nombre: 'Joacaz', reino: 'Israel', inicioAc: 814, finAc: 798, evaluacion: 'malo', cita: '2 Reyes 13:1' },
      { nombre: 'Joás (Jehoás)', reino: 'Israel', inicioAc: 798, finAc: 782, evaluacion: 'malo', cita: '2 Reyes 13:10' },
      { nombre: 'Jeroboam II', reino: 'Israel', inicioAc: 793, finAc: 753, evaluacion: 'malo', cita: '2 Reyes 14:23' },
      { nombre: 'Zacarías', reino: 'Israel', inicioAc: 753, finAc: 753, evaluacion: 'malo', cita: '2 Reyes 15:8' },
      { nombre: 'Salum', reino: 'Israel', inicioAc: 752, finAc: 752, evaluacion: 'malo', cita: '2 Reyes 15:13' },
      { nombre: 'Manahem', reino: 'Israel', inicioAc: 752, finAc: 742, evaluacion: 'malo', cita: '2 Reyes 15:17' },
      { nombre: 'Pekaía', reino: 'Israel', inicioAc: 742, finAc: 740, evaluacion: 'malo', cita: '2 Reyes 15:23' },
      { nombre: 'Peka', reino: 'Israel', inicioAc: 752, finAc: 732, evaluacion: 'malo', cita: '2 Reyes 15:27' },
      { nombre: 'Oseas', reino: 'Israel', inicioAc: 732, finAc: 722, evaluacion: 'malo', cita: '2 Reyes 17:1' },
    ],
  });

  const total = await prisma.rey.count();
  console.log(`Listo — ${total} reyes sembrados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
