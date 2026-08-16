import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Trasfondo cultural de los símbolos (lecciones 1–4).
//  Actualiza SOLO el campo trasfondoCultural de cada símbolo, por
//  nombre + lección. Idempotente (re-ejecutable).
//
//  ⚠️ DATOS A VERIFICAR (ver lista en el chat):
//   - Testamento romano sellado por SIETE testigos (nº de sellos)
//   - "romphaía" (espada larga) vs gladius en Ap 1:16
//   - Costumbre de reyes vasallos de deponer coronas ante el soberano
// ─────────────────────────────────────────────────────────────

async function setTrasfondo(orden: number, nombre: string, texto: string) {
  const r = await prisma.simbolo.updateMany({
    where: { nombre, leccion: { orden, curso: { slug: 'apocalipsis' } } },
    data: { trasfondoCultural: texto },
  });
  if (r.count === 0) console.warn(`⚠️  No se encontró el símbolo "${nombre}" (lección ${orden})`);
  else console.log(`   ✓ ${nombre}`);
}

async function main() {
  console.log('🌱 Sembrando trasfondo cultural de los símbolos...');

  // ── Lección 1: Las siete iglesias ──
  await setTrasfondo(1, 'Siete candeleros de oro',
    'El candelero de oro remitía al candelabro (menorá) del templo, que ardía de continuo en el lugar santo y debía ser atendido cada día: se le añadía aceite y se recortaban las mechas, o la llama se apagaba. La imagen dice algo a cada iglesia: su luz no se mantiene sola, necesita ser cuidada. Y es Cristo quien anda en medio de los candeleros, atendiéndolos.');

  await setTrasfondo(1, 'Espada aguda de dos filos',
    'Roma se distinguía por "el derecho de la espada" (ius gladii): la potestad del gobernador de dar vida o muerte, simbolizada en la espada. Juan presenta una espada mayor: la que sale de la boca de Cristo, es decir, su Palabra. Frente al imperio que amenazaba con la espada física, el creyente sabía que la última palabra —la que de verdad juzga— es la de Cristo.');

  // ── Lección 2: El trono y el Cordero ──
  await setTrasfondo(2, 'El libro sellado con siete sellos',
    'En el mundo romano, los documentos legales importantes —sobre todo un testamento— se escribían en un rollo y se cerraban por fuera con sellos de cera estampados por testigos. La ley exigía varios testigos para que nadie pudiera falsificarlo, y solo una persona con derecho legal —el heredero nombrado o un ejecutor autorizado— podía romper esos sellos y hacer cumplir lo que el documento ordenaba. Por eso, cuando Juan llora porque "ninguno era digno de abrir el libro" (Ap 5:4), un lector del siglo I entendía el drama: era como si el testamento de Dios sobre su creación fuera a quedar sin ejecutarse por falta de un heredero digno. Entonces aparece el Cordero, que con su sangre compró ese derecho: no solo tiene poder, tiene el derecho legal de tomar el rollo y ejecutar el plan de Dios.');

  await setTrasfondo(2, 'Los veinticuatro ancianos',
    'Los ancianos llevan coronas de oro, pero no la diadema de un rey, sino la corona del vencedor (en griego, stéphanos), como la que recibía el atleta triunfador. Y hacen algo que en el mundo antiguo tenía un sentido claro: echan sus coronas delante del trono. Los reyes menores, al presentarse ante un soberano mayor, deponían sus insignias a sus pies en señal de homenaje y sumisión. Así, los ancianos reconocen que toda su gloria viene de Dios, y a Él se la devuelven.');

  await setTrasfondo(2, 'El Cordero como inmolado, con siete cuernos y siete ojos',
    'Para un judío, "el Cordero" evocaba de inmediato el cordero de la Pascua —cuya sangre en los dinteles libró a Israel de la muerte en Egipto— y los corderos que se sacrificaban a diario en el templo. Que el Cordero aparezca "como inmolado" pero vivo y de pie une las dos ideas: el sacrificio ya se consumó, y sin embargo Él vive. Juan el Bautista lo había señalado: "He aquí el Cordero de Dios que quita el pecado del mundo" (Jn 1:29).');

  // ── Lección 3: Los siete sellos ──
  await setTrasfondo(3, 'Caballo negro y la balanza',
    'La balanza en la mano evoca el mercado: en tiempos de escasez, el pan se pesaba y se racionaba. La voz que fija el precio del trigo y la cebada señala precios de hambruna, cuando el jornal de un día entero apenas alcanza para el alimento básico de una persona. Es la imagen del hambre que sigue a la guerra, cuando el trabajo de todo un día no basta para alimentar a la familia.');

  await setTrasfondo(3, 'Las almas bajo el altar (quinto sello)',
    'En el sistema de sacrificios, la sangre de la víctima se derramaba al pie del altar. Por eso ver a los mártires "bajo el altar" tiene fuerza: su vida entregada es como una ofrenda derramada delante de Dios, que no la olvida. Su clamor "¿hasta cuándo?" es el de quien espera con confianza la justicia de Dios.');

  // ── Lección 4: Los 144.000 y la gran multitud ──
  await setTrasfondo(4, 'El sello en la frente',
    'En el mundo antiguo, un sello —como el de un anillo— marcaba la propiedad y la autenticidad: se sellaban cartas, mercancías y documentos para decir "esto pertenece a tal persona y es auténtico". Sellar a los siervos de Dios en la frente los declara propiedad suya y bajo su protección. La imagen recuerda a Ezequiel 9, donde Dios manda marcar a los suyos antes del juicio.');

  await setTrasfondo(4, 'La gran multitud con palmas',
    'Las ramas de palma eran señal de victoria y celebración: se agitaban en desfiles triunfales y en la fiesta de los Tabernáculos, y el pueblo las usó al recibir a Jesús en su entrada a Jerusalén. La gran multitud con palmas en las manos celebra el triunfo final: no el suyo propio, sino el del Cordero que los salvó.');

  await setTrasfondo(4, 'Las ropas blancas',
    'En el mundo antiguo, la ropa blanca hablaba de pureza, fiesta y victoria; los que triunfaban se vestían de blanco en las celebraciones. Pero aquí lo asombroso es cómo llegaron a ser blancas: "las lavaron y las emblanquecieron en la sangre del Cordero". Es una paradoja deliberada —una sangre que limpia y deja blanco—: la pureza no viene del mérito propio, sino del sacrificio de Cristo.');

  console.log('✅ Trasfondo cultural de los símbolos sembrado.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });