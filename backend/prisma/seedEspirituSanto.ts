// prisma/seedEspirituSanto.ts
// Estudio completo del Espíritu Santo, en nueve secciones. Cada entrada
// guarda solo el título y la CITA (nunca el texto del versículo — eso lo
// abre VersiculoLink en YouVersion), más una línea de contexto. El botón
// de IA profundiza cada una.
//
// Corre con: npx ts-node prisma/seedEspirituSanto.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando contenido existente del Espíritu Santo...');
  await prisma.espirituSanto.deleteMany({});

  console.log('Sembrando estudio completo...');

  await prisma.espirituSanto.createMany({
    data: [
      // ═══ NOMBRES Y TÍTULOS ═══════════════════════════════════
      { categoria: 'nombre', titulo: 'Espíritu Santo', cita: 'Lucas 11:13', descripcion: 'Su nombre más frecuente: santo en naturaleza y santificador en obra.' },
      { categoria: 'nombre', titulo: 'Espíritu de Dios', cita: 'Génesis 1:2', descripcion: 'El primer título con que aparece en la Escritura.' },
      { categoria: 'nombre', titulo: 'Espíritu de Cristo', cita: 'Romanos 8:9', descripcion: 'Vincula su obra con la del Hijo: quien no lo tiene, no es de Cristo.' },
      { categoria: 'nombre', titulo: 'Consolador (Paracleto)', cita: 'Juan 14:16', descripcion: 'Del griego *parakletos*: el llamado a estar al lado, abogado y ayudador.' },
      { categoria: 'nombre', titulo: 'Espíritu de verdad', cita: 'Juan 16:13', descripcion: 'Guía a toda la verdad; no habla por su propia cuenta.' },
      { categoria: 'nombre', titulo: 'Espíritu de gracia', cita: 'Hebreos 10:29', descripcion: 'Aplica la gracia de Dios al creyente.' },
      { categoria: 'nombre', titulo: 'Espíritu de vida', cita: 'Romanos 8:2', descripcion: 'La ley del Espíritu de vida libra de la ley del pecado y de la muerte.' },
      { categoria: 'nombre', titulo: 'Espíritu de adopción', cita: 'Romanos 8:15', descripcion: 'Por él clamamos "Abba, Padre".' },
      { categoria: 'nombre', titulo: 'Espíritu de sabiduría y revelación', cita: 'Efesios 1:17', descripcion: 'Da conocimiento de Dios y alumbra los ojos del entendimiento.' },
      { categoria: 'nombre', titulo: 'Espíritu eterno', cita: 'Hebreos 9:14', descripcion: 'Por el Espíritu eterno Cristo se ofreció a sí mismo.' },
      { categoria: 'nombre', titulo: 'Espíritu de gloria', cita: '1 Pedro 4:14', descripcion: 'Reposa sobre el creyente en medio del vituperio por Cristo.' },
      { categoria: 'nombre', titulo: 'Espíritu de santidad', cita: 'Romanos 1:4', descripcion: 'Según el cual Jesús fue declarado Hijo de Dios con poder.' },
      { categoria: 'nombre', titulo: 'El buen Espíritu de Dios', cita: 'Nehemías 9:20', descripcion: 'Dado para enseñar al pueblo en el desierto.' },
      { categoria: 'nombre', titulo: 'Espíritu de súplica', cita: 'Zacarías 12:10', descripcion: 'Derramado junto con el espíritu de gracia sobre la casa de David.' },

      // ═══ ES UNA PERSONA, NO UNA FUERZA ═══════════════════════
      { categoria: 'persona', titulo: 'Tiene mente (entendimiento)', cita: 'Romanos 8:27', descripcion: 'El que escudriña los corazones sabe cuál es la intención del Espíritu.' },
      { categoria: 'persona', titulo: 'Tiene voluntad (decide)', cita: '1 Corintios 12:11', descripcion: 'Reparte los dones "como él quiere".' },
      { categoria: 'persona', titulo: 'Tiene emociones (se contrista)', cita: 'Efesios 4:30', descripcion: 'No se contrista una fuerza impersonal; se contrista una persona.' },
      { categoria: 'persona', titulo: 'Habla', cita: 'Hechos 13:2', descripcion: '"Apartadme a Bernabé y a Saulo" — habla en primera persona.' },
      { categoria: 'persona', titulo: 'Enseña y recuerda', cita: 'Juan 14:26', descripcion: 'Os enseñará todas las cosas y os recordará todo lo que os he dicho.' },
      { categoria: 'persona', titulo: 'Intercede', cita: 'Romanos 8:26', descripcion: 'Intercede por nosotros con gemidos indecibles.' },
      { categoria: 'persona', titulo: 'Da testimonio', cita: 'Juan 15:26', descripcion: 'Él dará testimonio acerca de mí.' },
      { categoria: 'persona', titulo: 'Se le puede mentir', cita: 'Hechos 5:3', descripcion: 'Ananías mintió al Espíritu Santo — y Pedro añade "no has mentido a los hombres, sino a Dios".' },
      { categoria: 'persona', titulo: 'Guía y prohíbe', cita: 'Hechos 16:6-7', descripcion: 'Les prohibió predicar en Asia y no les permitió ir a Bitinia.' },

      // ═══ SU DEIDAD ═══════════════════════════════════════════
      { categoria: 'deidad', titulo: 'Es llamado Dios directamente', cita: 'Hechos 5:3-4', descripcion: 'Mentir al Espíritu Santo es mentir a Dios.' },
      { categoria: 'deidad', titulo: 'Es eterno', cita: 'Hebreos 9:14', descripcion: 'El "Espíritu eterno" — sin principio ni fin.' },
      { categoria: 'deidad', titulo: 'Es omnipresente', cita: 'Salmos 139:7', descripcion: '"¿A dónde me iré de tu Espíritu?"' },
      { categoria: 'deidad', titulo: 'Es omnisciente', cita: '1 Corintios 2:10-11', descripcion: 'Escudriña aun lo profundo de Dios.' },
      { categoria: 'deidad', titulo: 'Participa en la creación', cita: 'Job 33:4', descripcion: '"El Espíritu de Dios me hizo".' },
      { categoria: 'deidad', titulo: 'Aparece en la fórmula trinitaria', cita: 'Mateo 28:19', descripcion: 'Un solo nombre: Padre, Hijo y Espíritu Santo.' },
      { categoria: 'deidad', titulo: 'En la bendición apostólica', cita: '2 Corintios 13:14', descripcion: 'La comunión del Espíritu Santo, junto a la gracia del Hijo y el amor del Padre.' },

      // ═══ SÍMBOLOS ════════════════════════════════════════════
      { categoria: 'simbolo', titulo: 'Paloma — mansedumbre y pureza', cita: 'Mateo 3:16', descripcion: 'Desciende sobre Jesús en su bautismo.' },
      { categoria: 'simbolo', titulo: 'Fuego — purificación y presencia', cita: 'Hechos 2:3', descripcion: 'Lenguas repartidas como de fuego en Pentecostés.' },
      { categoria: 'simbolo', titulo: 'Viento — soberanía e invisibilidad', cita: 'Juan 3:8', descripcion: '"El viento sopla de donde quiere". En hebreo y griego, la misma palabra significa viento, aliento y espíritu.' },
      { categoria: 'simbolo', titulo: 'Aceite — unción y consagración', cita: '1 Samuel 16:13', descripcion: 'Samuel unge a David y el Espíritu viene sobre él desde ese día.' },
      { categoria: 'simbolo', titulo: 'Agua — vida y limpieza', cita: 'Juan 7:38-39', descripcion: '"Ríos de agua viva" — Juan aclara que hablaba del Espíritu.' },
      { categoria: 'simbolo', titulo: 'Sello — propiedad y garantía', cita: 'Efesios 1:13', descripcion: 'Fuisteis sellados con el Espíritu Santo de la promesa.' },
      { categoria: 'simbolo', titulo: 'Arras (anticipo)', cita: '2 Corintios 1:22', descripcion: 'El pago inicial que garantiza la herencia completa.' },
      { categoria: 'simbolo', titulo: 'Vino nuevo — gozo desbordante', cita: 'Efesios 5:18', descripcion: '"No os embriaguéis con vino… antes bien sed llenos del Espíritu" — el contraste es deliberado.' },
      { categoria: 'simbolo', titulo: 'Nube y gloria — presencia manifiesta', cita: 'Éxodo 40:34-35', descripcion: 'La gloria llena el tabernáculo; figura de la presencia que después habita en el creyente.' },

      // ═══ SU OBRA ═════════════════════════════════════════════
      { categoria: 'obra', titulo: 'Convence al mundo de pecado, justicia y juicio', cita: 'Juan 16:8', descripcion: 'Su obra primera hacia el incrédulo.' },
      { categoria: 'obra', titulo: 'Regenera (nuevo nacimiento)', cita: 'Juan 3:5', descripcion: 'Nacer del agua y del Espíritu.' },
      { categoria: 'obra', titulo: 'Bautiza en el cuerpo de Cristo', cita: '1 Corintios 12:13', descripcion: 'Por un solo Espíritu fuimos todos bautizados en un cuerpo.' },
      { categoria: 'obra', titulo: 'Mora en el creyente', cita: '1 Corintios 6:19', descripcion: 'Vuestro cuerpo es templo del Espíritu Santo.' },
      { categoria: 'obra', titulo: 'Sella hasta el día de la redención', cita: 'Efesios 4:30', descripcion: 'Marca de propiedad y seguridad.' },
      { categoria: 'obra', titulo: 'Llena (y vuelve a llenar)', cita: 'Efesios 5:18', descripcion: 'Imperativo continuo: "sed llenos" — no es una sola vez.' },
      { categoria: 'obra', titulo: 'Guía en la verdad', cita: 'Juan 16:13', descripcion: 'Os guiará a toda la verdad; os hará saber las cosas que habrán de venir.' },
      { categoria: 'obra', titulo: 'Enseña y recuerda la Palabra', cita: 'Juan 14:26', descripcion: 'Maestro interior del creyente.' },
      { categoria: 'obra', titulo: 'Intercede en la oración', cita: 'Romanos 8:26', descripcion: 'Ayuda en nuestra debilidad, pues no sabemos pedir como conviene.' },
      { categoria: 'obra', titulo: 'Santifica', cita: '2 Tesalonicenses 2:13', descripcion: 'Dios os escogió para salvación mediante la santificación por el Espíritu.' },
      { categoria: 'obra', titulo: 'Da poder para testificar', cita: 'Hechos 1:8', descripcion: 'Recibiréis poder cuando venga sobre vosotros el Espíritu Santo.' },
      { categoria: 'obra', titulo: 'Da testimonio de nuestra adopción', cita: 'Romanos 8:16', descripcion: 'El Espíritu da testimonio a nuestro espíritu de que somos hijos de Dios.' },
      { categoria: 'obra', titulo: 'Reparte dones', cita: '1 Corintios 12:11', descripcion: 'A cada uno en particular, como él quiere.' },
      { categoria: 'obra', titulo: 'Inspiró las Escrituras', cita: '2 Pedro 1:21', descripcion: 'Hombres santos hablaron siendo inspirados por el Espíritu Santo.' },
      { categoria: 'obra', titulo: 'Resucita', cita: 'Romanos 8:11', descripcion: 'El que levantó a Jesús vivificará también vuestros cuerpos mortales por su Espíritu.' },
      { categoria: 'obra', titulo: 'Envía y comisiona al servicio', cita: 'Hechos 13:2-4', descripcion: 'Enviados por el Espíritu Santo.' },

      // ═══ DONES ═══════════════════════════════════════════════
      { categoria: 'don', titulo: 'Palabra de sabiduría', cita: '1 Corintios 12:8', descripcion: 'Lista de 1 Corintios 12.' },
      { categoria: 'don', titulo: 'Palabra de ciencia', cita: '1 Corintios 12:8', descripcion: 'Lista de 1 Corintios 12.' },
      { categoria: 'don', titulo: 'Fe', cita: '1 Corintios 12:9', descripcion: 'No la fe salvadora, sino una fe especial para actuar.' },
      { categoria: 'don', titulo: 'Dones de sanidades', cita: '1 Corintios 12:9', descripcion: 'En plural, tanto el don como las sanidades.' },
      { categoria: 'don', titulo: 'Hacer milagros', cita: '1 Corintios 12:10', descripcion: 'Operaciones de poder.' },
      { categoria: 'don', titulo: 'Profecía', cita: '1 Corintios 12:10', descripcion: 'Aparece en las tres listas principales del NT.' },
      { categoria: 'don', titulo: 'Discernimiento de espíritus', cita: '1 Corintios 12:10', descripcion: 'Distinguir el origen de lo que se manifiesta.' },
      { categoria: 'don', titulo: 'Diversos géneros de lenguas', cita: '1 Corintios 12:10', descripcion: 'Junto con su interpretación.' },
      { categoria: 'don', titulo: 'Interpretación de lenguas', cita: '1 Corintios 12:10', descripcion: 'Para que la iglesia sea edificada.' },
      { categoria: 'don', titulo: 'Servicio (diaconía)', cita: 'Romanos 12:7', descripcion: 'Lista de Romanos 12.' },
      { categoria: 'don', titulo: 'Enseñanza', cita: 'Romanos 12:7', descripcion: 'Lista de Romanos 12.' },
      { categoria: 'don', titulo: 'Exhortación', cita: 'Romanos 12:8', descripcion: 'Lista de Romanos 12.' },
      { categoria: 'don', titulo: 'Repartir (generosidad)', cita: 'Romanos 12:8', descripcion: '"con liberalidad".' },
      { categoria: 'don', titulo: 'Presidir (liderazgo)', cita: 'Romanos 12:8', descripcion: '"con solicitud".' },
      { categoria: 'don', titulo: 'Misericordia', cita: 'Romanos 12:8', descripcion: '"con alegría".' },
      { categoria: 'don', titulo: 'Apóstoles', cita: 'Efesios 4:11', descripcion: 'Dones ministeriales de Efesios 4.' },
      { categoria: 'don', titulo: 'Profetas', cita: 'Efesios 4:11', descripcion: 'Dones ministeriales de Efesios 4.' },
      { categoria: 'don', titulo: 'Evangelistas', cita: 'Efesios 4:11', descripcion: 'Dones ministeriales de Efesios 4.' },
      { categoria: 'don', titulo: 'Pastores y maestros', cita: 'Efesios 4:11', descripcion: 'Para perfeccionar a los santos para la obra del ministerio.' },

      // ═══ EL FRUTO (Gálatas 5:22-23) ══════════════════════════
      { categoria: 'fruto', titulo: 'Amor', cita: 'Gálatas 5:22', descripcion: 'Encabeza la lista; es la raíz de las demás.' },
      { categoria: 'fruto', titulo: 'Gozo', cita: 'Gálatas 5:22', descripcion: 'Independiente de las circunstancias.' },
      { categoria: 'fruto', titulo: 'Paz', cita: 'Gálatas 5:22', descripcion: 'Con Dios, con otros y consigo mismo.' },
      { categoria: 'fruto', titulo: 'Paciencia', cita: 'Gálatas 5:22', descripcion: 'Longanimidad: soportar sin apresurarse a reaccionar.' },
      { categoria: 'fruto', titulo: 'Benignidad', cita: 'Gálatas 5:22', descripcion: 'Bondad activa hacia el otro.' },
      { categoria: 'fruto', titulo: 'Bondad', cita: 'Gálatas 5:22', descripcion: 'Rectitud moral generosa.' },
      { categoria: 'fruto', titulo: 'Fe (fidelidad)', cita: 'Gálatas 5:22', descripcion: 'Confiabilidad, lealtad sostenida.' },
      { categoria: 'fruto', titulo: 'Mansedumbre', cita: 'Gálatas 5:23', descripcion: 'Fuerza bajo control, no debilidad.' },
      { categoria: 'fruto', titulo: 'Templanza', cita: 'Gálatas 5:23', descripcion: 'Dominio propio. "Contra tales cosas no hay ley".' },

      // ═══ PECADOS CONTRA EL ESPÍRITU ══════════════════════════
      { categoria: 'pecado', titulo: 'Contristar al Espíritu', cita: 'Efesios 4:30', descripcion: 'Entristecerlo con el pecado del creyente — el contexto son las palabras y actitudes.' },
      { categoria: 'pecado', titulo: 'Apagar al Espíritu', cita: '1 Tesalonicenses 5:19', descripcion: 'Sofocar su obra; el contexto inmediato es despreciar las profecías.' },
      { categoria: 'pecado', titulo: 'Resistir al Espíritu', cita: 'Hechos 7:51', descripcion: 'Acusación de Esteban al Sanedrín: "vosotros resistís siempre al Espíritu Santo".' },
      { categoria: 'pecado', titulo: 'Mentir al Espíritu', cita: 'Hechos 5:3', descripcion: 'El caso de Ananías y Safira.' },
      { categoria: 'pecado', titulo: 'Blasfemar contra el Espíritu', cita: 'Mateo 12:31-32', descripcion: 'El único pecado que Jesús declara sin perdón; su contexto es atribuir a Satanás la obra del Espíritu.' },
      { categoria: 'pecado', titulo: 'Ultrajar al Espíritu de gracia', cita: 'Hebreos 10:29', descripcion: 'Advertencia severa a quien pisotea al Hijo de Dios.' },
    ],
  });

  // ═══ EL ESPÍRITU SANTO LIBRO POR LIBRO ═════════════════════
  // Solo los libros con mención EXPLÍCITA del Espíritu. A diferencia de
  // "Cristo en cada libro" (que es tipológico), aquí no se fuerza: hay
  // libros que sencillamente no lo mencionan, y eso se dice en la app.
  const porLibro = [
    ['Génesis', 'Se movía sobre la faz de las aguas', 'Génesis 1:2'],
    ['Éxodo', 'Llena a Bezaleel de sabiduría para el arte del tabernáculo', 'Éxodo 31:3'],
    ['Números', 'Reposa sobre los setenta ancianos', 'Números 11:25'],
    ['Deuteronomio', 'Josué lleno del espíritu de sabiduría', 'Deuteronomio 34:9'],
    ['Jueces', 'Viene sobre los jueces para librar a Israel', 'Jueces 6:34'],
    ['1 Samuel', 'Viene sobre David desde el día de su unción', '1 Samuel 16:13'],
    ['2 Samuel', 'Habla por medio de David', '2 Samuel 23:2'],
    ['1 Reyes', 'Arrebata y lleva a Elías de un lugar a otro', '1 Reyes 18:12'],
    ['2 Reyes', 'La doble porción del espíritu sobre Eliseo', '2 Reyes 2:9'],
    ['1 Crónicas', 'Viene sobre Amasai, jefe de los treinta', '1 Crónicas 12:18'],
    ['2 Crónicas', 'Viste a Zacarías hijo de Joiada para hablar al pueblo', '2 Crónicas 24:20'],
    ['Nehemías', 'El buen Espíritu dado para enseñar al pueblo', 'Nehemías 9:20'],
    ['Job', 'El Espíritu de Dios como autor de la vida', 'Job 33:4'],
    ['Salmos', 'Omnipresente: "¿a dónde me iré de tu Espíritu?"', 'Salmos 139:7'],
    ['Proverbios', 'La sabiduría promete derramar su espíritu', 'Proverbios 1:23'],
    ['Isaías', 'Los siete aspectos del Espíritu sobre el Renuevo', 'Isaías 11:2'],
    ['Ezequiel', 'Puesto dentro del pueblo para que ande en sus estatutos', 'Ezequiel 36:27'],
    ['Daniel', 'Reconocido en Daniel por reyes paganos como espíritu excelente', 'Daniel 5:14'],
    ['Joel', 'Derramado sobre toda carne — profecía citada en Pentecostés', 'Joel 2:28'],
    ['Miqueas', 'Llena al profeta de poder para denunciar el pecado', 'Miqueas 3:8'],
    ['Hageo', 'Permanece en medio del pueblo que reconstruye', 'Hageo 2:5'],
    ['Zacarías', '"No con ejército, ni con fuerza, sino con mi Espíritu"', 'Zacarías 4:6'],
    ['Mateo', 'La concepción de Jesús y el descenso en su bautismo', 'Mateo 1:18'],
    ['Marcos', '"Él os bautizará con Espíritu Santo"', 'Marcos 1:8'],
    ['Lucas', 'El Evangelio donde más se menciona: llena a Jesús y a los suyos', 'Lucas 4:1'],
    ['Juan', 'El otro Consolador prometido, que mora para siempre', 'Juan 14:16'],
    ['Hechos', 'El libro del Espíritu: Pentecostés y la expansión de la iglesia', 'Hechos 2:4'],
    ['Romanos', 'La vida en el Espíritu frente a la vida en la carne', 'Romanos 8:9'],
    ['1 Corintios', 'Los dones repartidos y el cuerpo como templo suyo', '1 Corintios 12:4'],
    ['2 Corintios', '"Donde está el Espíritu del Señor, allí hay libertad"', '2 Corintios 3:17'],
    ['Gálatas', 'El fruto del Espíritu frente a las obras de la carne', 'Gálatas 5:22'],
    ['Efesios', 'Sella al creyente y llena continuamente', 'Efesios 1:13'],
    ['Filipenses', 'El suministro del Espíritu de Jesucristo', 'Filipenses 1:19'],
    ['Colosenses', 'El amor de los santos en el Espíritu', 'Colosenses 1:8'],
    ['1 Tesalonicenses', '"No apaguéis al Espíritu"', '1 Tesalonicenses 5:19'],
    ['2 Tesalonicenses', 'Salvación mediante la santificación por el Espíritu', '2 Tesalonicenses 2:13'],
    ['1 Timoteo', '"El Espíritu dice claramente" sobre los tiempos postreros', '1 Timoteo 4:1'],
    ['2 Timoteo', 'Guardar el buen depósito por el Espíritu Santo que mora en nosotros', '2 Timoteo 1:14'],
    ['Tito', 'El lavamiento de la regeneración y la renovación en el Espíritu', 'Tito 3:5'],
    ['Hebreos', 'Cristo se ofreció por el Espíritu eterno', 'Hebreos 9:14'],
    ['Santiago', 'El Espíritu que él hizo morar en nosotros', 'Santiago 4:5'],
    ['1 Pedro', 'El Espíritu de Cristo que estaba en los profetas', '1 Pedro 1:11'],
    ['2 Pedro', 'Los hombres santos hablaron inspirados por el Espíritu Santo', '2 Pedro 1:21'],
    ['1 Juan', 'Nos ha dado de su Espíritu como señal de que permanecemos en él', '1 Juan 4:13'],
    ['Judas', 'Orar en el Espíritu Santo', 'Judas 1:20'],
    ['Apocalipsis', '"Oiga lo que el Espíritu dice a las iglesias"', 'Apocalipsis 2:7'],
  ];

  await prisma.espirituSanto.createMany({
    data: porLibro.map(([libro, titulo, cita]) => ({
      categoria: 'por_libro',
      titulo: `${libro} — ${titulo}`,
      cita,
      descripcion: libro,
    })),
  });

  const total = await prisma.espirituSanto.count();
  console.log(`Listo — ${total} entradas sembradas (${porLibro.length} libros con mención explícita).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
