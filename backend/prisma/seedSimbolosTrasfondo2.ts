import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Trasfondo cultural: SÍMBOLOS RESTANTES (lecc. 1–4).
//  Segunda tanda: completa los símbolos que la primera no cubrió.
//  Idempotente. Correr después de seedSimbolosTrasfondo.ts.
//
//  ⚠️ VERIFICAR (menores): la estrella/cometa a la muerte de Julio César;
//     caballos blancos en el triunfo romano; guardianes alados asirios.
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
  console.log('🌱 Completando trasfondo cultural de los símbolos restantes...');

  // ── Lección 1 ──
  await setTrasfondo(1, 'Siete estrellas',
    'En el mundo antiguo, los astros se asociaban al poder y a lo divino; los emperadores usaban imágenes de estrellas para reforzar su gloria (a la muerte de Julio César se habló de una estrella que anunciaba su ascenso entre los dioses). Que Cristo sostenga las siete estrellas en SU mano derecha —la mano del poder— declara que es Él, y no el César, quien tiene en su mano a los mensajeros de las iglesias y vela por ellos.');

  await setTrasfondo(1, 'El número siete',
    'Para la mentalidad hebrea, el siete era el número de la plenitud y la perfección, ligado a los siete días de la creación y al reposo del sábado. No es un número mágico, sino una manera de decir "completo, perfecto, de parte de Dios". Por eso siete iglesias, siete espíritus, siete sellos: no son solo una cuenta, sino la señal de la obra completa de Dios.');

  // ── Lección 2 ──
  await setTrasfondo(2, 'El trono',
    'En el mundo antiguo, el trono era el centro del poder: los reyes y el emperador recibían a sus súbditos en salas diseñadas para impresionar, y acercarse sin permiso podía costar la vida. El trono era también asiento de juicio. Al poner el trono de Dios en el centro del cielo —por encima del trono del César—, Juan consuela a una Iglesia perseguida: el poder que de verdad gobierna no está en Roma, sino en el cielo.');

  await setTrasfondo(2, 'Los cuatro seres vivientes',
    'Con rostros de león, becerro, hombre y águila, estos seres recuerdan a los querubines de Ezequiel y a los serafines de Isaías que rodean la presencia de Dios. En el mundo antiguo era común representar seres alados compuestos como guardianes de templos y tronos reales (como las grandes figuras aladas de Asiria y Babilonia). Aquí, en lugar de custodiar a un rey terrenal, existen para adorar sin cesar al Dios vivo.');

  await setTrasfondo(2, 'Las siete lámparas / siete espíritus',
    'Las siete lámparas encendidas delante del trono evocan de nuevo el candelabro del templo, que ardía ante la presencia de Dios. Y se identifican con "los siete espíritus de Dios": no siete espíritus distintos, sino una manera de expresar la plenitud del único Espíritu Santo (como en Isaías 11:2, donde el Espíritu reposa con siete rasgos sobre el Mesías).');

  // ── Lección 3 ──
  await setTrasfondo(3, 'Caballo blanco y su jinete',
    'En el mundo romano, el caballo blanco se asociaba con el triunfo: el vencedor desfilaba en su procesión triunfal, y salir "venciendo y para vencer" con arco y corona evocaba a un conquistador. El primer jinete se presenta con esa imagen de victoria militar. (Conviene distinguirlo del jinete del caballo blanco de Apocalipsis 19, que es Cristo mismo: aquí hay una imitación de conquista; allá, el triunfo verdadero.)');

  await setTrasfondo(3, 'Caballo bermejo (rojo)',
    'El color rojo encendido evocaba de inmediato la sangre derramada. A este jinete se le da una gran espada y el poder de quitar la paz de la tierra: es la guerra abierta, con su secuela de violencia. En un imperio que presumía de la "paz romana" (la pax romana), la imagen anuncia que esa paz se romperá.');

  await setTrasfondo(3, 'Caballo amarillo y su jinete',
    'El color del cuarto caballo (en griego, chlorós) es el verde amarillento de un cuerpo enfermo o de un cadáver. Por eso a su jinete se le llama la Muerte, y tras él viene el Hades (la morada de los muertos). Es la imagen de la mortandad masiva que sigue a la guerra y al hambre.');

  await setTrasfondo(3, 'Señales en el sexto sello',
    'El sol que se oscurece, la luna como sangre y las estrellas que caen son el lenguaje con que los profetas del Antiguo Testamento anunciaban "el día del Señor" (Joel, Isaías): el juicio de Dios que hace temblar hasta lo que parece más firme en los cielos. No es solo un fenómeno natural, sino la señal de que Dios está sacudiendo el orden del mundo.');

  await setTrasfondo(3, 'Silencio en el cielo (séptimo sello)',
    'En la Escritura, el silencio delante de Dios expresa reverencia y expectación ante su juicio ("calle delante de Jehová toda la tierra", Habacuc 2:20; Sofonías 1:7). Esa media hora de silencio en el cielo es una pausa solemne, como conteniendo el aliento, antes de que suenen las trompetas y continúe el juicio.');

  // ── Lección 4 ──
  await setTrasfondo(4, 'Los 144.000 de las tribus de Israel',
    'Enumerar a los sellados "por tribus" recuerda los censos militares del Antiguo Testamento, donde se contaba a Israel por tribus para la guerra (como en el libro de Números). La imagen sugiere un ejército de Dios, ordenado y marcado como suyo. El número (12 x 12 x 1000) une a las doce tribus con la idea de plenitud.');

  await setTrasfondo(4, 'Los cuatro vientos detenidos',
    'En el mundo antiguo se hablaba de los cuatro vientos —de los cuatro puntos cardinales— como fuerzas poderosas que podían traer destrucción. Que cuatro ángeles "detengan los vientos" es la imagen de un juicio ya listo para soltarse, pero contenido por la mano de Dios hasta que sus siervos estén sellados. Dios manda incluso sobre el momento del juicio.');

  console.log('✅ Trasfondo cultural de los símbolos restantes sembrado.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });