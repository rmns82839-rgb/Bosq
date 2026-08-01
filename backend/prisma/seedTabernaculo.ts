// prisma/seedTabernaculo.ts
// Módulo Tabernáculo / Templo. Filosofía de contenido igual que el resto:
// solo lo básico (nombre, cita, la tipología de Cristo en una línea); el
// botón "Preguntar a la IA" da el estudio completo. La tipología se apoya
// sobre todo en Hebreos; donde una conexión es más devocional que explícita,
// el botón de IA lo aclara.
//
// Corre con: npx ts-node prisma/seedTabernaculo.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando elementos y figuras existentes...');
  await prisma.elementoTabernaculo.deleteMany({});
  await prisma.figuraIglesia.deleteMany({});

  console.log('Sembrando 19 elementos del tabernáculo...');
  await prisma.elementoTabernaculo.createMany({
    data: [
      // ── Atrio ──
      { orden: 1, nombre: 'Puerta del atrio', seccion: 'atrio', cita: 'Éxodo 27:16', tipologiaCristo: 'la única puerta de entrada (Juan 10:9)', descripcion: 'Cortina de azul, púrpura y carmesí; la única entrada a todo el recinto.' },
      { orden: 2, nombre: 'Altar del holocausto', seccion: 'atrio', cita: 'Éxodo 27:1', tipologiaCristo: 'el sacrificio que quita el pecado (Hebreos 13:10-12)', descripcion: 'Altar de bronce, lo primero al entrar; allí se consumía la ofrenda.' },
      { orden: 3, nombre: 'Fuente de bronce (lavacro)', seccion: 'atrio', cita: 'Éxodo 30:18', tipologiaCristo: 'la limpieza por el lavamiento de la Palabra (Efesios 5:26)', descripcion: 'Los sacerdotes se lavaban manos y pies antes de servir.' },

      // ── Lugar Santo ──
      { orden: 4, nombre: 'Candelabro de oro (menorá)', seccion: 'lugar_santo', cita: 'Éxodo 25:31', tipologiaCristo: 'la luz del mundo (Juan 8:12)', descripcion: 'Oro puro labrado a martillo, siete lámparas; única luz del Lugar Santo.' },
      { orden: 5, nombre: 'Mesa de los panes de la proposición', seccion: 'lugar_santo', cita: 'Éxodo 25:30', tipologiaCristo: 'el pan de vida (Juan 6:35)', descripcion: 'Doce panes siempre ante Jehová, uno por cada tribu de Israel.' },
      { orden: 6, nombre: 'Altar del incienso', seccion: 'lugar_santo', cita: 'Éxodo 30:1', tipologiaCristo: 'nuestro intercesor perpetuo (Hebreos 7:25)', descripcion: 'Frente al velo; el incienso que sube representa las oraciones ante Dios.' },

      // ── Lugar Santísimo ──
      { orden: 7, nombre: 'El velo', seccion: 'lugar_santisimo', cita: 'Éxodo 26:31', tipologiaCristo: 'el acceso abierto por su carne (Hebreos 10:19-20)', descripcion: 'Separaba el Lugar Santo del Santísimo; se rasgó a la muerte de Cristo.' },
      { orden: 8, nombre: 'El arca del pacto', seccion: 'lugar_santisimo', cita: 'Éxodo 25:10', tipologiaCristo: 'la presencia de Dios entre los hombres (Juan 1:14)', descripcion: 'Cofre de acacia cubierto de oro; contenía el testimonio del pacto.' },
      { orden: 9, nombre: 'El propiciatorio', seccion: 'lugar_santisimo', cita: 'Éxodo 25:17', tipologiaCristo: 'la propiciación por nuestros pecados (Romanos 3:25)', descripcion: 'Cubierta de oro del arca; sobre ella se rociaba la sangre de expiación.' },
      { orden: 10, nombre: 'Los querubines de gloria', seccion: 'lugar_santisimo', cita: 'Éxodo 25:18', tipologiaCristo: 'coronado y cubierto de la gloria de Dios (Hebreos 9:5)', descripcion: 'Dos querubines de oro sobre el propiciatorio, cubriéndolo con sus alas.' },
      { orden: 11, nombre: 'Las tablas de la ley', seccion: 'lugar_santisimo', cita: 'Éxodo 25:16', tipologiaCristo: 'quien cumplió la ley perfectamente (Mateo 5:17)', descripcion: 'Guardadas dentro del arca; el testimonio del pacto de Dios.' },
      { orden: 12, nombre: 'El maná escondido', seccion: 'lugar_santisimo', cita: 'Éxodo 16:33-34', tipologiaCristo: 'el pan vivo que descendió del cielo (Juan 6:48-51)', descripcion: 'Una porción de maná guardada como memorial dentro del arca.' },
      { orden: 13, nombre: 'La vara de Aarón que reverdeció', seccion: 'lugar_santisimo', cita: 'Números 17:8', tipologiaCristo: 'el sacerdote resucitado y escogido por Dios (Hebreos 5:4-5)', descripcion: 'Vara seca que floreció y dio almendras, confirmando el sacerdocio.' },

      // ── Estructura ──
      { orden: 14, nombre: 'Tablas de acacia cubiertas de oro', seccion: 'estructura', cita: 'Éxodo 26:29', tipologiaCristo: 'humanidad sin corrupción y deidad gloriosa', descripcion: 'Las paredes: madera (humanidad) revestida de oro (deidad).' },
      { orden: 15, nombre: 'Las cubiertas del tabernáculo', seccion: 'estructura', cita: 'Éxodo 26:1-14', tipologiaCristo: 'gloria interior bajo apariencia humilde (Isaías 53:2)', descripcion: 'Lino y colores por dentro; pieles sin atractivo por fuera.' },
      { orden: 16, nombre: 'Las basas de plata', seccion: 'estructura', cita: 'Éxodo 26:19', tipologiaCristo: 'el fundamento puesto por el precio de la redención', descripcion: 'Cada tabla se asentaba sobre plata, el metal del rescate (Éxodo 30:11-16).' },

      // ── Sacerdocio ──
      { orden: 17, nombre: 'El sumo sacerdote', seccion: 'sacerdocio', cita: 'Éxodo 28:1', tipologiaCristo: 'nuestro gran Sumo Sacerdote (Hebreos 4:14)', descripcion: 'El único que entraba al Lugar Santísimo, una vez al año, con sangre.' },
      { orden: 18, nombre: 'Las vestiduras sacerdotales', seccion: 'sacerdocio', cita: 'Éxodo 28:2', tipologiaCristo: 'revestido de gloria y hermosura; nuestra justicia', descripcion: 'Hechas "para gloria y hermosura"; llevaba a las tribus sobre su corazón.' },
      { orden: 19, nombre: 'Los sacrificios y ofrendas', seccion: 'sacerdocio', cita: 'Levítico 1:1-4', tipologiaCristo: 'la ofrenda perfecta, una vez para siempre (Hebreos 10:10-14)', descripcion: 'El sistema de ofrendas anticipaba el único sacrificio suficiente.' },
    ],
  });

  console.log('Sembrando 14 figuras de la Iglesia...');
  await prisma.figuraIglesia.createMany({
    data: [
      { orden: 1, nombre: 'El Cuerpo', cita: 'Efesios 1:22-23', cristoEnLaFigura: 'la Cabeza', descripcion: 'La iglesia es el cuerpo; Cristo la cabeza de la cual todo recibe crecimiento.' },
      { orden: 2, nombre: 'La Esposa', cita: 'Apocalipsis 19:7', cristoEnLaFigura: 'el Esposo', descripcion: 'La iglesia es preparada como esposa para las bodas del Cordero.' },
      { orden: 3, nombre: 'El Templo de Dios', cita: 'Efesios 2:20-22', cristoEnLaFigura: 'la principal piedra del ángulo', descripcion: 'Edificados como casa espiritual sobre el fundamento de apóstoles y profetas.' },
      { orden: 4, nombre: 'El Rebaño', cita: 'Juan 10:14-16', cristoEnLaFigura: 'el Buen Pastor', descripcion: 'Un solo rebaño bajo un pastor que da su vida por las ovejas.' },
      { orden: 5, nombre: 'Los Pámpanos', cita: 'Juan 15:5', cristoEnLaFigura: 'la Vid verdadera', descripcion: 'Sin permanecer en la vid, el pámpano no puede llevar fruto.' },
      { orden: 6, nombre: 'El Candelero de oro', cita: 'Apocalipsis 1:20', cristoEnLaFigura: 'el que anda en medio de los candeleros', descripcion: 'Cada iglesia es un candelero que da luz; Cristo camina entre ellos.' },
      { orden: 7, nombre: 'La Casa de Dios', cita: 'Hebreos 3:6', cristoEnLaFigura: 'el Hijo sobre la casa', descripcion: 'Somos su casa si retenemos firme la confianza hasta el fin.' },
      { orden: 8, nombre: 'El Sacerdocio santo', cita: '1 Pedro 2:5', cristoEnLaFigura: 'el Sumo Sacerdote', descripcion: 'Un real sacerdocio para ofrecer sacrificios espirituales a Dios.' },
      { orden: 9, nombre: 'La Nación santa', cita: '1 Pedro 2:9', cristoEnLaFigura: 'el Rey', descripcion: 'Linaje escogido, pueblo adquirido para anunciar sus virtudes.' },
      { orden: 10, nombre: 'La Labranza de Dios', cita: '1 Corintios 3:9', cristoEnLaFigura: 'el Señor de la mies', descripcion: 'Uno planta, otro riega, pero Dios da el crecimiento.' },
      { orden: 11, nombre: 'Columna y baluarte de la verdad', cita: '1 Timoteo 3:15', cristoEnLaFigura: 'la Verdad', descripcion: 'La iglesia sostiene y proclama la verdad del evangelio ante el mundo.' },
      { orden: 12, nombre: 'La Heredad de Dios', cita: 'Efesios 1:18', cristoEnLaFigura: 'el Heredero de todo', descripcion: 'El pueblo de Dios es su posesión y herencia gloriosa entre los santos.' },
      { orden: 13, nombre: 'Los Embajadores de Cristo', cita: '2 Corintios 5:20', cristoEnLaFigura: 'el Rey a quien representan', descripcion: 'En nombre de Cristo rogamos: reconciliaos con Dios.' },
      { orden: 14, nombre: 'La Luz del mundo', cita: 'Mateo 5:14-16', cristoEnLaFigura: 'la Luz verdadera', descripcion: 'Como ciudad sobre un monte, la iglesia refleja la luz de Cristo.' },
    ],
  });

  const totalEl = await prisma.elementoTabernaculo.count();
  const totalFig = await prisma.figuraIglesia.count();
  console.log(`Listo — ${totalEl} elementos y ${totalFig} figuras sembradas.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });