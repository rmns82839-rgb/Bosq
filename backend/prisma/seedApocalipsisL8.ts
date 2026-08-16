import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 8: "Las siete copas de la ira" (Ap 15–16)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 8.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: Las plagas de Egipto como trasfondo,
//     el "mar de vidrio" (¿mar de bronce del templo?),
//     el Armagedón (identificación del lugar), y la conexión
//     con las trompetas (similitudes y diferencias).
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 8 de Apocalipsis...');

  const curso = await prisma.curso.upsert({
    where: { slug: 'apocalipsis' },
    update: {},
    create: {
      slug: 'apocalipsis',
      nombre: 'Apocalipsis',
      descripcion:
        'La revelación de Jesucristo: su gloria, su mensaje a la Iglesia y su plan profético hasta la consumación de los siglos.',
      autor: 'Juan el apóstol',
      fechaEscritura: 'c. 95 d.C.',
      orden: 1,
      activo: true,
    },
  });

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 8 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 8,
      semana: 8,
      titulo: 'Las siete copas de la ira',
      tema:
        'El juicio final de Dios se derrama sin misericordia sobre un mundo que persiste en su rebelión',
      pasajeBase: 'Apocalipsis 15–16',
      introduccion:
        'Juan ve en el cielo una señal grande y maravillosa: siete ángeles con las siete plagas finales, en las que se consuma la ira de Dios. Antes de que sean derramadas, los que han vencido a la bestia cantan el cántico de Moisés y del Cordero junto a un mar de vidrio. Luego, los siete ángeles salen del templo y derraman sus copas sobre la tierra. Las plagas son similares a las de las trompetas, pero mucho más severas: llagas dolorosas, mar convertido en sangre, ríos y fuentes ensangrentados, calor abrasador, tinieblas, y la sequía del Éufrates para preparar el camino de los reyes del oriente. Finalmente, una gran batalla se reúne en Armagedón, y una enorme tormenta de granizo cierra el ciclo de juicios. Es la ira de Dios sin mezcla de misericordia, el fin de la paciencia divina con un mundo que no se arrepiente.',
      contextoHistorico:
        'Las siete plagas de las copas son un eco deliberado de las diez plagas de Egipto (ver Éxodo 7-12): llagas (Éxodo 9:8-12), aguas convertidas en sangre (Éxodo 7:14-24), tinieblas (Éxodo 10:21-23), y granizo (Éxodo 9:13-35). El "mar de vidrio" que Juan ve en el cielo (Apocalipsis 15:2) recuerda el "mar de bronce" fundido que Salomón hizo para el templo (ver 1 Reyes 7:23-26), donde los sacerdotes se lavaban antes de oficiar. (verificar) La batalla de Armagedón (Apocalipsis 16:16) toma su nombre del hebreo "Har Megiddo" (Monte de Meguido), un lugar en el norte de Israel donde se libraron varias batallas decisivas en la historia de Israel (ver Jueces 5:19; 2 Reyes 23:29-30). (verificar) Para un lector del siglo I, estas plagas recordaban los juicios de Dios sobre Egipto, y la liberación de su pueblo, pero ahora aplicados al juicio final sobre el mundo.',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 15:3-4',
            texto:
              'Y cantan el cántico de Moisés siervo de Dios, y el cántico del Cordero, diciendo: Grandes y maravillosas son tus obras, Señor Dios Todopoderoso; justos y verdaderos son tus caminos, Rey de los santos. ¿Quién no te temerá, oh Señor, y no glorificará tu nombre? pues solo tú eres santo; por lo cual todas las naciones vendrán y te adorarán, porque tus juicios son manifestados.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 16:15',
            texto:
              'He aquí, yo vengo como ladrón. Bienaventurado el que vela, y guarda sus ropas, para que no ande desnudo, y vean su vergüenza.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Ve en las copas los juicios de Dios sobre el Imperio Romano y sobre los perseguidores de los cristianos en el siglo I. Algunos interpretan el Armagedón como la batalla de la guerra judía (66-70 d.C.), con la caída de Jerusalén. Valor: conecta el texto con un contexto histórico de persecución real. Límite (según nuestra postura): las plagas descritas tienen un alcance cósmico y final que va más allá de cualquier evento histórico puntual, y la batalla de Armagedón todavía no ha ocurrido.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Interpreta las copas como juicios sucesivos a lo largo de la historia de la iglesia, aplicándolas a diversas calamidades y guerras (invasiones bárbaras, caída del Imperio Romano, guerras europeas). El Armagedón representa la batalla final entre el bien y el mal en el fin de la historia. Valor: reconoce que Dios juzga en la historia. Límite: la asignación de cada copa a eventos históricos específicos es muy variable y especulativa.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). Las siete copas son los juicios finales de la Gran Tribulación, que se derraman sobre un mundo que ha rechazado el evangelio y persiste en su idolatría. Son más intensos que los juicios de las trompetas y no tienen mezcla de misericordia. El Armagedón es la batalla final donde las fuerzas del anticristo se reúnen para luchar contra Dios y su pueblo (Israel). La Iglesia ya ha sido arrebatada, y estos juicios preparan el camino para el regreso de Cristo en gloria (Apocalipsis 19).',
            esPosturaPropia: true,
            orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Interpreta las copas como una representación simbólica de la ira de Dios contra el pecado y la injusticia en todas las épocas. Las plagas no son eventos literales, sino imágenes de la certeza del juicio divino. El Armagedón representa la batalla espiritual constante entre el reino de Dios y las fuerzas del mal. Valor: enfatiza el carácter moral y espiritual del juicio de Dios. Límite (según nuestra postura): al espiritualizar el cumplimiento, puede perder la dimensión histórica y profética concreta que el texto enseña sobre el juicio final.',
            esPosturaPropia: false,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'El mar de vidrio mezclado con fuego',
            significado:
              'Representa la purificación, la santidad de Dios, y el lugar donde los redimidos se mantienen firmes, habiendo vencido a la bestia.',
            referencias: 'Apocalipsis 15:2',
            trasfondoCultural:
              'En el templo de Salomón, había un "mar de bronce" fundido, una gran pila para que los sacerdotes se purificaran antes de oficiar (ver 1 Reyes 7:23-26; 2 Crónicas 4:2-6). El "vidrio" sugiere transparencia, pureza y estabilidad (en contraste con las aguas turbulentas del mar). El fuego evoca la presencia de Dios (ver Éxodo 3:2; 19:18; Ezequiel 1:4). (verificar) Para un lector judío del siglo I, esta imagen combinaba el templo con la presencia gloriosa de Dios, pero en un plano celestial.',
            orden: 1,
          },
          {
            nombre: 'El cántico de Moisés y del Cordero',
            significado:
              'El himno de alabanza de los redimidos, que reconoce la justicia y santidad de Dios en sus juicios, y celebra la victoria del Cordero.',
            referencias: 'Apocalipsis 15:3-4',
            trasfondoCultural:
              'El "cántico de Moisés" se refiere al himno que Moisés y los israelitas cantaron después de cruzar el Mar Rojo, celebrando la liberación de Egipto (ver Éxodo 15:1-18). Era un himno de victoria sobre el enemigo y de alabanza a Dios como el único Salvador. El "cántico del Cordero" es la versión cristiana de ese himno, donde la liberación es por la sangre del Cordero (ver Apocalipsis 5:9-10; 12:11). Juntos, representan la continuidad de la obra redentora de Dios, desde el Éxodo hasta la victoria final de Cristo.',
            orden: 2,
          },
          {
            nombre: 'Las plagas de las copas',
            significado:
              'Son los juicios finales de Dios sobre un mundo impenitente, que reflejan las plagas de Egipto pero con mayor intensidad y alcance universal.',
            referencias: 'Apocalipsis 16:1-21',
            trasfondoCultural:
              'Las plagas de Egipto fueron el castigo de Dios sobre el faraón y su pueblo por su opresión y dureza de corazón (ver Éxodo 7-12). Eran señales del poder de Dios sobre los dioses de Egipto. Un lector del siglo I conocía bien estas historias. Juan las usa para mostrar que el mismo Dios que juzgó a Egipto juzgará al mundo entero. Las copas son como una "segunda vuelta" de las plagas, pero ahora no hay un Moisés que interceda, y no hay misericordia; es el juicio consumado. (verificar)',
            orden: 3,
          },
          {
            nombre: 'La sequía del Éufrates',
            significado:
              'El secamiento del gran río Éufrates para preparar el camino de los reyes del oriente, que vienen a la batalla del Armagedón.',
            referencias: 'Apocalipsis 16:12',
            trasfondoCultural:
              'El río Éufrates era uno de los cuatro grandes ríos del mundo antiguo (ver Génesis 2:14) y marcaba la frontera oriental del Imperio Romano (verificar). Para un lector del siglo I, el Éufrates representaba el límite del mundo conocido y el lugar de donde venían las invasiones de pueblos orientales. El secamiento del Éufrates evoca la liberación de Israel de Babilonia, cuando Ciro desvió las aguas del río para tomar la ciudad (ver Historia de Heródoto 1.191) (verificar). Aquí, el secamiento prepara el camino para la batalla final, en la que las fuerzas del anticristo se reunirán contra Dios.',
            orden: 4,
          },
          {
            nombre: 'Armagedón',
            significado:
              'El lugar donde se reúnen los ejércitos del mundo para la batalla final contra el Señor y su pueblo.',
            referencias: 'Apocalipsis 16:16',
            trasfondoCultural:
              'Armagedón proviene del hebreo "Har Megiddo", que significa "Monte de Meguido". Meguido era una ciudad fortificada en la llanura de Jezreel, en el norte de Israel, donde se libraron varias batallas importantes en la historia de Israel (ver Jueces 5:19; 2 Reyes 23:29-30; Zacarías 12:11). (verificar) Fue un lugar de encuentro de ejércitos, un campo de batalla estratégico. La profecía de Zacarías 12 y 14 habla de una batalla final donde las naciones se reunirán contra Jerusalén, y el Señor peleará por ella. Juan toma esta imagen y la usa como símbolo del escenario final del juicio.',
            orden: 5,
          },
          {
            nombre: 'El granizo de ciento veinte libras',
            significado:
              'El juicio final de Dios, tan pesado y destructivo que los hombres blasfeman contra Dios en lugar de arrepentirse.',
            referencias: 'Apocalipsis 16:21',
            trasfondoCultural:
              'El granizo era una de las plagas de Egipto (ver Éxodo 9:13-35) y un símbolo del juicio divino en el Antiguo Testamento (ver Josué 10:11; Isaías 28:2; Ezequiel 13:13). Una piedra de granizo de 120 libras (aproximadamente 54 kg) es inmensamente destructiva, capaz de destruir edificios y causar devastación masiva. (verificar) La reacción de los hombres que blasfeman en lugar de arrepentirse muestra la dureza del corazón humano: los juicios de Dios no producen arrepentimiento, sino endurecimiento.',
            orden: 6,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'El cántico de Moisés y del Cordero',
            cristoEnEl:
              'Cristo es el nuevo Moisés que libera a su pueblo de la esclavitud del pecado. Así como Moisés guió a Israel a través del Mar Rojo y lo liberó de Egipto, Cristo guía a su pueblo a través del juicio y lo libera del pecado y de la muerte.',
            cita: 'Apocalipsis 15:3-4; 1 Corintios 10:2-4; Hebreos 3:1-6',
            orden: 1,
          },
          {
            elemento: 'El secamiento del Éufrates y la batalla de Armagedón',
            cristoEnEl:
              'Cristo es el Rey que viene a pelear la batalla final. Él es el Vencedor que derrota a las fuerzas del mal y establece su reino eterno (ver Apocalipsis 19:11-21; Zacarías 14:3-4).',
            cita: 'Apocalipsis 16:12-16; 19:11-21; Zacarías 14:3-4',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'El derramamiento de las siete copas de la ira de Dios',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 16:1-21',
            citaCumplimiento: null,
            orden: 1,
          },
          {
            tema: 'La batalla de Armagedón',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 16:14-16',
            citaCumplimiento: 'Apocalipsis 19:17-21; Zacarías 14:1-4',
            orden: 2,
          },
          {
            tema: 'El juicio final sobre los que adoran a la bestia',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 16:2',
            citaCumplimiento: 'Apocalipsis 20:11-15',
            orden: 3,
          },
        ],
      },
      ciudades: {
        create: [
          {
            nombreBiblico: 'Armagedón',
            ubicacion: 'Llanura de Meguido, al norte de Israel',
            equivalenteActual: 'Tel Meguido, cerca de la ciudad de Afula, Israel',
            nota: 'Armagedón es el escenario profético de la batalla final, aunque el lugar exacto es simbólico. La llanura de Meguido ha sido un campo de batalla estratégico a lo largo de la historia, y en la profecía se convierte en el símbolo de la confrontación final entre las fuerzas del mal y el Señor.',
            orden: 1,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿Qué cantan los redimidos junto al mar de vidrio en Apocalipsis 15?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'El cántico de Moisés y el cántico del Cordero',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'El Salmo de David y el cántico de los profetas',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El himno de la creación y el canto de los ángeles',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El lamento de Jeremías y la oración de Daniel',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Cuál es la principal diferencia entre las plagas de las trompetas y las plagas de las copas?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'Las copas son juicios finales sin mezcla de misericordia, mientras que las trompetas eran advertencias',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Las trompetas son juicios eternos y las copas son temporales',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Las copas solo afectan a los impíos, las trompetas afectan a todos',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Las trompetas son más severas que las copas',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué evento clave sucede cuando la sexta copa es derramada sobre el río Éufrates?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'El río se seca para preparar el camino de los reyes del oriente',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Las aguas del Éufrates se convierten en sangre',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Aparece una gran estrella que cae del cielo',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El mar de vidrio se rompe en pedazos',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              'Según la interpretación futurista, ¿qué representa la batalla de Armagedón?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'La confrontación final entre las fuerzas del anticristo y el Señor en Su regreso',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La guerra entre judíos y romanos en el siglo I',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'El conflicto entre la Iglesia y el Imperio Romano',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Una batalla espiritual en el cielo sin afectar la tierra',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Lección 8 "Las siete copas de la ira" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });