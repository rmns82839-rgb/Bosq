import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setTrasfondo(orden: number, nombre: string, texto: string) {
  const r = await prisma.simbolo.updateMany({
    where: {
      nombre,
      leccion: {
        orden,
        curso: { slug: 'lucas' },
      },
    },
    data: { trasfondoCultural: texto },
  });
  if (r.count === 0) console.warn(`⚠️  No se encontró el símbolo "${nombre}" (lección ${orden})`);
  else console.log(`   ✓ ${nombre}`);
}

async function main() {
  console.log('🌱 Completando trasfondo cultural de los símbolos de Lucas...');

  // ── Lección 1 ──
  await setTrasfondo(1, 'El templo', 'El templo de Jerusalén era el centro de la vida religiosa judía. Construido por Herodes el Grande, era un lugar de sacrificios y oración. La presencia de Dios habitaba en el Lugar Santísimo, y solo el sumo sacerdote podía entrar una vez al año. El anuncio del nacimiento de Juan a Zacarías en el templo es significativo: el fin del silencio profético comienza en el lugar de la presencia de Dios. (verificar)');
  await setTrasfondo(1, 'El ángel Gabriel', 'Gabriel es uno de los arcángeles mencionados en la Biblia (junto con Miguel). Su nombre significa "hombre de Dios" o "poderoso de Dios". Aparece en Daniel 8:16 y 9:21 anunciando eventos proféticos. En Lucas, Gabriel anuncia los nacimientos de Juan y Jesús, conectando el Nuevo Testamento con las profecías del Antiguo.');
  await setTrasfondo(1, 'El pesebre', 'Un pesebre era un comedero para animales, hecho de piedra o madera. En Belén, las cuevas o establos eran comunes. Que el Rey de reyes naciera en un pesebre era una señal de humildad extrema. Para los pastores, la señal de un "niño envuelto en pañales, acostado en un pesebre" era fácil de identificar.');
  await setTrasfondo(1, 'Los pastores', 'Los pastores eran considerados de baja clase social en el siglo I. Su testimonio no era confiable en los tribunales. Que Dios eligiera a pastores para ser los primeros en escuchar el anuncio del nacimiento del Salvador muestra que el evangelio es para los humildes y marginados.');

  // ── Lección 2 ──
  await setTrasfondo(2, 'Juan el Bautista', 'Juan era el hijo de Zacarías e Isabel, de linaje sacerdotal. Vivía en el desierto, vestido de pelo de camello con un cinturón de cuero, y comía langostas y miel silvestre (ver Marcos 1:6). Su estilo de vida recordaba al profeta Elías (2 Reyes 1:8). Su mensaje de arrepentimiento preparaba el camino para el Mesías.');
  await setTrasfondo(2, 'El bautismo de Jesús', 'El bautismo de Juan no era el bautismo cristiano; era un acto de arrepentimiento. Jesús, sin pecado, se somete al bautismo para identificarse con los pecadores y cumplir toda justicia (Mateo 3:15). La voz del Padre y el descenso del Espíritu confirman su identidad como el Hijo de Dios.');
  await setTrasfondo(2, 'La paloma', 'En el Antiguo Testamento, la paloma era un animal usado en sacrificios (Levítico 12:8) y símbolo de pureza. En Génesis 8:11, la paloma trae una hoja de olivo, señal de nueva vida. El Espíritu Santo desciende en forma de paloma sobre Jesús, simbolizando su pureza y la nueva creación que Él inaugura.');
  await setTrasfondo(2, 'El desierto', 'El desierto era el lugar de prueba para Israel durante 40 años (Éxodo). Jesús, como el nuevo Israel, es probado en el desierto durante 40 días. Vence donde Israel falló, citando la Escritura para resistir las tentaciones. El desierto simboliza la prueba y la dependencia de Dios.');

  // ── Lección 3 ──
  await setTrasfondo(3, 'La sinagoga', 'La sinagoga era el centro de la vida religiosa y comunitaria judía. Jesús enseñaba regularmente en las sinagogas. El rollo de Isaías que lee en Nazaret contenía la profecía mesiánica de Isaías 61:1-2. Jesús declara que la profecía se cumple en Él, afirmando su mesianismo.');
  await setTrasfondo(3, 'La pesca milagrosa', 'La pesca milagrosa es un signo de la provisión de Dios y del llamado a ser "pescadores de hombres". Pedro, después de ver el milagro, se siente indigno y se postra ante Jesús. Es un momento de llamado radical: "Dejaron todo y le siguieron".');
  await setTrasfondo(3, 'Los doce apóstoles', 'El número doce es significativo: representa las doce tribus de Israel. Jesús elige a doce para establecer el nuevo Israel, la Iglesia. Los apóstoles son el fundamento de la Iglesia (Efesios 2:20).');

  // ── Lección 4 ──
  await setTrasfondo(4, 'El lugar llano', 'El lugar llano contrasta con el "monte" del Sermón del Monte de Mateo. Lucas enfatiza la accesibilidad del mensaje de Jesús para todos. El llano simboliza que el evangelio es para los humildes, los pobres y los marginados.');
  await setTrasfondo(4, 'La casa sobre la roca', 'En la región de Galilea, las tormentas podían ser violentas. Una casa construida sobre roca resistía las inundaciones. Jesús usa esta imagen para enseñar que la obediencia a sus palabras es el fundamento seguro para la vida.');

  // ── Lección 5 ──
  await setTrasfondo(5, 'El centurión romano', 'El centurión era un oficial romano con autoridad sobre 100 soldados. Era un gentil, pero había construido una sinagoga y se preocupaba por su siervo. Su fe humilde contrasta con la arrogancia de los líderes judíos. Jesús alaba su fe como superior a la de Israel.');
  await setTrasfondo(5, 'El joven resucitado en Naín', 'Naín era un pueblo pequeño en Galilea. La resurrección del joven es única en los evangelios (no aparece en Mateo, Marcos o Juan). Este milagro muestra la compasión de Jesús y su poder sobre la muerte. La compasión de Jesús se destaca: "No llores".');
  await setTrasfondo(5, 'La viuda de Naín', 'Las viudas eran extremadamente vulnerables en el mundo antiguo. La pérdida de su único hijo significaba la pérdida de su sustento y protección. Jesús no solo resucita al joven, sino que restaura la esperanza y la dignidad de la viuda. Este acto de compasión es un anticipo de la resurrección final.');
  await setTrasfondo(5, 'La mujer pecadora que unge a Jesús', 'La mujer probablemente era una prostituta, despreciada por la sociedad. Su acto de unción con perfume costoso era extravagante. Las lágrimas y el perfume muestran su profundo arrepentimiento y amor. Jesús la perdona y declara: "Tu fe te ha salvado".');
  await setTrasfondo(5, 'El perfume y las lágrimas', 'El perfume de alabastro era muy costoso, valía el salario de un año (ver Juan 12:5). Las lágrimas de la mujer simbolizan su contrición y amor por Jesús. En la cultura judía, ungir los pies con perfume y secarlos con los cabellos era un acto de profunda humildad y devoción.');

  // ── Lección 6 ──
  await setTrasfondo(6, 'Los setenta discípulos', 'El número setenta recuerda a los setenta ancianos de Israel (Números 11:16-17). Jesús envía a los setenta en una misión extensiva, anunciando que el Reino se extiende a todas las naciones. Su regreso con alegría muestra el poder del evangelio.');
  await setTrasfondo(6, 'El buen samaritano', 'Los samaritanos eran despreciados por los judíos. Jesús elige a un samaritano como ejemplo de prójimo para desafiar los prejuicios étnicos. La parábola enseña que el prójimo es cualquiera que muestra misericordia, independientemente de su religión o nacionalidad.');
  await setTrasfondo(6, 'Marta y María', 'Betania era un pueblo cerca de Jerusalén. Marta representa la actividad y el servicio; María, la adoración y la escucha. Jesús afirma que María ha escogido "la buena parte", priorizando la comunión con Él sobre el trabajo.');

  // ── Lección 7 ──
  await setTrasfondo(7, 'El Padre Nuestro', 'El Padre Nuestro es un resumen de la oración judía, pero con un enfoque en la intimidad con Dios como Padre. Refleja las prioridades del Reino: santificar el nombre de Dios, su venida, el pan cotidiano, el perdón y la protección contra el mal.');
  await setTrasfondo(7, 'El amigo importuno', 'La parábola del amigo que pide pan a medianoche enseña sobre la perseverancia en la oración. En la cultura judía, la amistad implicaba hospitalidad; negarse a ayudar era una vergüenza. Jesús usa esta parábola para animar a orar sin desanimarse.');
  await setTrasfondo(7, 'Beelzebú', 'Beelzebú era el nombre de un dios filisteo, pero se había convertido en un nombre para el diablo. Los fariseos acusan a Jesús de expulsar demonios por el poder de Satanás. Jesús responde que un reino dividido no puede permanecer.');

  // ── Lección 8 ──
  await setTrasfondo(8, 'El rico insensato', 'La parábola del rico insensato advierte contra la codicia y la acumulación de riquezas. En la cultura judía, la riqueza era vista como bendición, pero Jesús la cuestiona. El rico es llamado "insensato" porque acumula para sí y no es rico para con Dios.');
  await setTrasfondo(8, 'La higuera estéril', 'La higuera era un símbolo de Israel. La parábola muestra la paciencia de Dios, pero también la urgencia del arrepentimiento. El viñador pide tiempo para cavar y abonar, una imagen de la gracia de Dios que da tiempo para el arrepentimiento.');
  await setTrasfondo(8, 'La mujer encorvada', 'La mujer había estado encorvada por 18 años, atada por Satanás. Su sanidad en el día de reposo provoca conflicto con los líderes religiosos. Jesús muestra que la liberación y la sanidad son prioritarias sobre el legalismo.');
  await setTrasfondo(8, 'La puerta angosta', 'La imagen de la puerta angosta es común en el judaísmo. El esfuerzo para entrar sugiere que la salvación requiere decisión y perseverancia. Muchos intentarán entrar y no podrán, una advertencia contra la complacencia.');

  // ── Lección 9 ──
  await setTrasfondo(9, 'La gran cena', 'La parábola de la gran cena refleja la costumbre de invitar a un banquete. Los invitados originales excusan, reflejando el rechazo de Israel. El señor envía a buscar a los pobres, cojos, ciegos y cojos, mostrando que el Reino es para los marginados.');
  await setTrasfondo(9, 'La oveja perdida', 'El pastor que busca a una oveja perdida refleja el cuidado de Dios por los pecadores. En la cultura judía, el pastor era una figura de liderazgo. Jesús es el Buen Pastor que da su vida por las ovejas.');
  await setTrasfondo(9, 'La moneda perdida', 'La moneda era una dracma, probablemente parte de una dote o una herencia. La mujer barre la casa hasta encontrarla, mostrando la diligencia de Dios en buscar a los perdidos. La alegría del hallazgo es un anticipo del gozo celestial por un pecador que se arrepiente.');
  await setTrasfondo(9, 'El hijo pródigo', 'El hijo pródigo es la parábola más conocida de la Biblia. En la cultura judía, pedir la herencia antes de tiempo era una afrenta al padre. El padre, al verlo regresar, corre hacia él (un gesto indigno para un hombre mayor en el mundo antiguo) y lo recibe con amor. La parábola muestra la gracia incondicional de Dios.');
  await setTrasfondo(9, 'El padre del hijo pródigo', 'El padre representa a Dios, que espera pacientemente el regreso del pecador. Su reacción (correr, abrazar, besar) muestra la profundidad del amor de Dios. La restauración del hijo (anillo, sandalias, vestido) muestra la plena restauración de su posición.');
  await setTrasfondo(9, 'El mayordomo infiel', 'La parábola del mayordomo infiel es difícil de interpretar. Probablemente enseña la necesidad de ser astutos en el uso de los recursos para el Reino. El mayordomo asegura su futuro reduciendo las deudas de los deudores, mostrando que debemos usar el dinero para hacer amigos para la eternidad.');

  // ── Lección 10 ──
    // ── Lección 10 ──
  await setTrasfondo(10, 'Los diez leprosos', 'Los leprosos eran marginados sociales y religiosos. Según la ley levítica, debían vivir fuera de los campamentos y gritar "¡inmundo, inmundo!" (Levítico 13:45-46). Jesús los sana, pero solo uno, un samaritano, regresa a dar gracias. La ingratitud de los nueve contrasta con la fe del samaritano que reconoce a Dios como la fuente de su sanidad.');
  await setTrasfondo(10, 'El fariseo y el publicano', 'El fariseo representa la autosuficiencia religiosa. Su oración se centra en sus propias obras y en el desprecio por los demás. El publicano, un recaudador de impuestos despreciado, se humilla y reconoce su pecado. Jesús enseña que la humildad y el arrepentimiento son la clave de la justificación, no la auto-justificación.');
  await setTrasfondo(10, 'Zaqueo', 'Zaqueo era un jefe de recaudadores de impuestos en Jericó, una ciudad estratégica y rica. Era despreciado por los judíos por colaborar con el Imperio Romano. Su decisión de subirse a un sicómoro para ver a Jesús muestra su deseo genuino. Jesús se invita a sí mismo a su casa, y Zaqueo se arrepiente y restituye el cuádruple de lo robado (ver la ley de restitución en Éxodo 22:1).');
  await setTrasfondo(10, 'Las minas', 'La parábola de las minas se basa en la situación política de la época, cuando Arquelao, hijo de Herodes, viajó a Roma para recibir el reino y sus siervos esperaban su regreso (ver Josefo, Antigüedades 17.9.3). (verificar) Las minas representan los dones y responsabilidades que Dios nos da. La fidelidad en lo poco resulta en recompensa en el Reino.');

  // ── Lección 11 ──
  await setTrasfondo(11, 'La entrada triunfal', 'La entrada triunfal en Jerusalén cumplía la profecía de Zacarías 9:9: "He aquí tu rey viene a ti, montado en un asno". En el mundo antiguo, los reyes entraban montados en caballos para la guerra o en asnos para la paz. Jesús entra humildemente como el Rey de paz. La multitud aclama con "¡Hosanna!" (que significa "¡Sálvanos ahora!").');
  await setTrasfondo(11, 'El pan y la copa de la última cena', 'La última cena era una cena de Pascua, que conmemoraba la liberación de Egipto (Éxodo 12). Jesús transforma los elementos de la Pascua en el memorial de su muerte: el pan partido representa su cuerpo quebrantado, y la copa representa su sangre derramada para establecer el nuevo pacto (Jeremías 31:31-34).');
  await setTrasfondo(11, 'Getsemaní', 'Getsemaní era un huerto de olivos al pie del Monte de los Olivos. El nombre significa "prensa de aceite", aludiendo al proceso de extracción de aceite de oliva, que simboliza la presión y la agonía que Jesús sufrió allí. Su sudor como gotas de sangre refleja su intensa angustia (ver Lucas 22:44). (verificar)');
  await setTrasfondo(11, 'La cruz', 'La crucifixión era la pena de muerte más cruel, reservada para esclavos y rebeldes. Era una muerte pública y humillante. Jesús fue crucificado entre dos ladrones, cumpliendo la profecía de Isaías 53:12: "y con los pecadores fue contado". El velo del templo rasgado (Lucas 23:45) simboliza el acceso directo a Dios a través de la muerte de Cristo (Hebreos 10:19-22).');
  await setTrasfondo(11, 'El velo rasgado', 'El velo del templo separaba el Lugar Santo del Lugar Santísimo, donde la presencia de Dios habitaba. Solo el sumo sacerdote podía entrar una vez al año. El rasgamiento del velo en el momento de la muerte de Jesús simboliza que el camino a Dios está abierto para todos los creyentes a través del sacrificio de Cristo.');

  // ── Lección 12 ──
  await setTrasfondo(12, 'El sepulcro vacío', 'El sepulcro vacío es la evidencia fundamental de la resurrección de Cristo. Las mujeres encuentran el sepulcro vacío, y los ángeles les anuncian: "Ha resucitado". El sepulcro vacío es la prueba histórica de que Jesús venció a la muerte. En el mundo antiguo, el testimonio de las mujeres no era considerado confiable, pero Lucas las incluye como testigos fieles.');
  await setTrasfondo(12, 'El camino a Emaús', 'El camino a Emaús es un viaje de 11 km desde Jerusalén (verificar la distancia exacta). Los dos discípulos están desanimados y tristes. Jesús se acerca y camina con ellos, pero sus ojos "están velados" para no reconocerlo. La explicación de las Escrituras comienza con Moisés y todos los profetas, mostrando que todo el Antiguo Testamento apunta a Cristo. El reconocimiento ocurre al "partir el pan", un eco de la última cena.');
  await setTrasfondo(12, 'El pan partido', 'El pan partido en Emaús es el momento de la revelación. Cuando Jesús toma el pan, lo bendice, lo parte y se lo da, los discípulos lo reconocen. Este acto recuerda la última cena y la institución de la Eucaristía. Es el momento en que la comunión con Cristo se hace real para los discípulos.');
  await setTrasfondo(12, 'La ascensión', 'La ascensión de Jesús a la diestra del Padre es la culminación de su obra redentora. Ascender significa que Jesús, después de completar su misión terrenal, regresa al cielo para ser exaltado y para interceder por los suyos (Romanos 8:34; Hebreos 7:25). La ascensión es la garantía de su regreso (Hechos 1:11).');
  await setTrasfondo(12, 'El poder del Espíritu Santo', 'La promesa del Espíritu Santo es la herencia de los creyentes. Jesús les dice a los discípulos que esperen en Jerusalén hasta que sean revestidos de poder desde lo alto. Esta promesa se cumple en Pentecostés (Hechos 2). El Espíritu Santo capacita a los discípulos para ser testigos de Cristo en todo el mundo.');

  console.log('✅ Trasfondo cultural de los símbolos de Lucas sembrado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });