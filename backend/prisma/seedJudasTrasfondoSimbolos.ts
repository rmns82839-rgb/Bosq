import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Judas — Trasfondo cultural de los símbolos.
//  Segunda tanda: completa los símbolos de las 3 lecciones.
//  Idempotente. Correr después de seedJudas.ts.
//
//  ⚠️ VERIFICAR:
//     - La referencia a Enoc (Judas 1:14-15) y su trasfondo.
//     - El "camino de Caín" y su interpretación en la tradición judía.
//     - Balaam como figura de codicia.
//     - Coré como ejemplo de rebelión.
// ─────────────────────────────────────────────────────────────

async function setTrasfondo(orden: number, nombre: string, texto: string) {
  const r = await prisma.simbolo.updateMany({
    where: { 
      nombre, 
      leccion: { 
        orden, 
        curso: { slug: 'judas' } 
      } 
    },
    data: { trasfondoCultural: texto },
  });
  if (r.count === 0) console.warn(`⚠️  No se encontró el símbolo "${nombre}" (lección ${orden})`);
  else console.log(`   ✓ ${nombre}`);
}

async function main() {
  console.log('🌱 Completando trasfondo cultural de los símbolos de Judas...');

  // ── Lección 1: Contender por la fe ──
  await setTrasfondo(1, 'La fe que ha sido una vez dada',
    'En el judaísmo del siglo I, la "fe" no era solo una creencia interior, sino un cuerpo de doctrina y un modo de vida. La frase "una vez dada" indica que la fe cristiana es un depósito completo y definitivo, entregado por los apóstoles, que no necesita añadidos humanos (similar al "depósito" de 1 Timoteo 6:20). Judas usa esta expresión para subrayar que la verdad no está en evolución constante; está establecida y debe ser defendida. Los falsos maestros pretenden "actualizar" la fe, pero Judas los confronta: ya fue dada de una vez por todas.'
  );

  await setTrasfondo(1, 'El libertinaje encubierto de gracia',
    'En el mundo grecorromano, algunas corrientes filosóficas (como los epicúreos) promovían el hedonismo. Algunos falsos maestros cristianos adaptaron esta idea, argumentando que si la gracia de Dios es abundante, el pecado no importa (ver Romanos 6:1-2). Judas los confronta directamente: la gracia no es una licencia para pecar. Esta misma herejía aparece en 2 Pedro 2:18-19 y en las cartas de Juan (1 Juan 3:4-10). El término "libertinaje" (aselgeia) en griego denota una falta de autocontrol y una vida entregada a los deseos.'
  );

  // ── Lección 2: El juicio de los falsos maestros ──
  await setTrasfondo(2, 'Israel en el desierto',
    'La generación que salió de Egipto vio los milagros de Dios (las plagas, el cruce del Mar Rojo, la provisión de maná), pero cuando llegó a la frontera de Canaán, no creyó que Dios pudiera darles la tierra (Números 14). Como resultado, murieron en el desierto y no entraron en la promesa. Judas usa este ejemplo para mostrar que el conocimiento de la verdad no es suficiente; la fe que se traduce en obediencia es necesaria. El juicio sobre Israel en el desierto era un ejemplo clásico en la tradición judía de la consecuencia de la incredulidad.'
  );

  await setTrasfondo(2, 'Los ángeles que no guardaron su dignidad',
    'Esta es una referencia a Génesis 6:1-4, donde "los hijos de Dios" (tradicionalmente interpretados como ángeles) tomaron mujeres humanas. En la literatura judía intertestamentaria (especialmente 1 Enoc), esta historia se desarrolla ampliamente: los ángeles pecadores son encadenados y arrojados al abismo. Judas usa este ejemplo para mostrar que ni siquiera los seres espirituales escapan del juicio de Dios cuando se rebelan. La idea de ángeles "guardados en cadenas eternas" era común en el judaísmo del siglo I (ver 1 Enoc 10:4-6; 2 Pedro 2:4).'
  );

  await setTrasfondo(2, 'Sodoma y Gomorra',
    'Sodoma y Gomorra eran símbolos de la depravación sexual en el mundo antiguo. Su destrucción por fuego y azufre (Génesis 19:24-25) era un ejemplo clásico del juicio de Dios contra el pecado. Jesús mismo las menciona como advertencia (Mateo 10:15; 11:23-24). En la tradición judía, Sodoma se había convertido en el ejemplo por excelencia del pecado que merece juicio divino. Judas las usa para mostrar que la inmoralidad sexual tiene consecuencias eternas.'
  );

  await setTrasfondo(2, 'Caín, Balaam y Coré',
    'Estos tres personajes del Antiguo Testamento representan diferentes pecados: Caín (envidia y homicidio, Génesis 4:1-16), Balaam (codicia y enseñar a Israel a pecar, Números 22-24; 31:16), y Coré (rebelión contra la autoridad de Moisés, Números 16). En la tradición judía, cada uno era un ejemplo de un camino de error: Caín fue el primer asesino, Balaam el profeta codicioso, y Coré el rebelde que desafió la autoridad divina. Judas los usa para mostrar que estos mismos patrones de pecado se repiten en los falsos maestros.'
  );

  await setTrasfondo(2, 'El libro de Enoc',
    'Judas cita una profecía atribuida a Enoc, el séptimo desde Adán (Génesis 5:21-24). Esta cita no aparece en el Antiguo Testamento canónico, sino en el libro apócrifo de 1 Enoc (capítulo 1:9). Algunos intérpretes han cuestionado el uso de un libro no canónico, pero otros señalan que Judas no lo cita como Escritura inspirada, sino como una fuente tradicional que su audiencia conocía. La cita encaja perfectamente con el tema de Judas: el juicio de Dios sobre los impíos. El hecho de que Judas cite una fuente extra-bíblica muestra que los autores inspirados podían usar tradiciones conocidas sin que eso les restara autoridad.'
  );

  // ── Lección 3: Manteniéndose firmes en la fe ──
  await setTrasfondo(3, 'La santísima fe',
    'En el Nuevo Testamento, la "fe" a menudo se refiere al cuerpo de doctrina cristiana (ver Efesios 4:5; 1 Timoteo 3:9). Judas llama a esta fe "santísima", porque proviene de Dios y es pura. La exhortación a edificarse sobre ella sugiere que la fe no es algo estático, sino que debe crecer y fortalecerse. La imagen de "edificar" recuerda a la parábola de la casa construida sobre la roca (Mateo 7:24-27) y a Pablo que se refiere a la iglesia como "edificio de Dios" (1 Corintios 3:9).'
  );

  await setTrasfondo(3, 'El amor de Dios',
    'El amor de Dios en la tradición judía no es solo un sentimiento, sino un compromiso de pacto. El "hesed" (amor leal) de Dios es su fidelidad a su pueblo a pesar de la infidelidad de ellos (ver Oseas 2:19-20). Judas exhorta a los creyentes a "conservarse en el amor de Dios", lo que implica permanecer en su voluntad y en su gracia. Esto se logra mediante la obediencia, la oración y la esperanza en la misericordia de Cristo. Es un llamado a la perseverancia activa.'
  );

  await setTrasfondo(3, 'La doxología final',
    'Las doxologías eran comunes en el judaísmo y en la iglesia primitiva para cerrar cartas y servicios litúrgicos. Esta doxología (Judas 1:24-25) es especialmente rica: reconoce a Dios como "el único Dios nuestro Salvador", a Cristo como "nuestro Señor", y atribuye gloria, majestad, dominio y potencia "antes de todo tiempo, ahora y por todos los siglos". Es una confesión de fe completa que exalta la soberanía de Dios y la seguridad del creyente. La estructura tripartita (antes, ahora, siempre) era común en las doxologías judías y enfatiza la eternidad de Dios.'
  );

  console.log('✅ Trasfondo cultural de los símbolos de Judas sembrado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });