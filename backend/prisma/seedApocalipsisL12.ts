import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  Apocalipsis — Lección 12: "Cielo nuevo, tierra nueva y la nueva Jerusalén" (Ap 21–22)
//  Seed ADITIVO: reemplaza SOLO la lección de orden 12.
//  Símbolos con trasfondoCultural incluido.
//  Línea del MMM (pretribulacional). Revisar pastoralmente.
//
//  ⚠️ VERIFICAR: La nueva Jerusalén (dimensiones, materiales),
//     el río de agua de vida (Ezequiel 47, Zacarías 14),
//     el árbol de la vida (Génesis 2-3, Ezequiel 47),
//     y la promesa de "ya no habrá muerte".
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Sembrando lección 12 de Apocalipsis...');

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

  await prisma.leccion.deleteMany({ where: { cursoId: curso.id, orden: 12 } });

  await prisma.leccion.create({
    data: {
      cursoId: curso.id,
      orden: 12,
      semana: 12,
      titulo: 'Cielo nuevo, tierra nueva y la nueva Jerusalén',
      tema:
        'La consumación de todas las cosas: la morada de Dios con los hombres y el comienzo de la eternidad',
      pasajeBase: 'Apocalipsis 21–22',
      introduccion:
        'Juan ve un cielo nuevo y una tierra nueva, porque el primer cielo y la primera tierra ya pasaron. La nueva Jerusalén desciende del cielo, preparada como una novia adornada para su esposo. Una voz del cielo declara: "El tabernáculo de Dios está con los hombres, y él morará con ellos; y ellos serán su pueblo, y Dios mismo estará con ellos como su Dios". Ya no habrá muerte, ni llanto, ni clamor, ni dolor, porque las primeras cosas han pasado. El que está sentado en el trono dice: "He aquí, yo hago nuevas todas las cosas". El ángel muestra a Juan la ciudad santa, con sus doce puertas, doce cimientos, y sus dimensiones perfectas. En la ciudad no hay templo, porque el Señor Dios Todopoderoso y el Cordero son su templo. Un río de agua de vida brota del trono de Dios, y a cada lado del río está el árbol de la vida, que da fruto cada mes. La promesa final es: "Ven, Señor Jesús". La historia humana llega a su consumación: el cielo y la tierra son renovados, y Dios reina para siempre con su pueblo.',
      contextoHistorico:
        'La idea de un "cielo nuevo y tierra nueva" tiene raíces en el Antiguo Testamento (ver Isaías 65:17; 66:22). La nueva Jerusalén es el cumplimiento de las promesas de Dios a Israel (ver Ezequiel 40-48, donde el profeta ve una nueva ciudad y un nuevo templo). La ciudad tiene dimensiones perfectas: 12,000 estadios de largo, ancho y alto (verificar), lo que la convierte en un cubo perfecto, simbolizando la perfección y la presencia de Dios (el Lugar Santísimo en el templo era un cubo perfecto, ver 1 Reyes 6:20). Los materiales preciosos (oro, jaspe, zafiro, etc.) evocan la belleza del jardín del Edén (ver Génesis 2:11-12) y el esplendor del templo (ver Éxodo 25-28). El río de agua de vida y el árbol de la vida recuerdan el jardín del Edén (Génesis 2:8-10) y la profecía de Ezequiel 47:1-12, donde un río sale del templo y trae vida a donde fluye. La imagen de la novia (Apocalipsis 21:2, 9) era común en la literatura judía para describir la relación de Dios con su pueblo (ver Isaías 62:5; Oseas 2:19-20). (verificar) La promesa de que "no habrá más muerte" es el cumplimiento final de la victoria sobre la muerte (ver 1 Corintios 15:54-55; Isaías 25:8).',
      versiculosMemoria: {
        create: [
          {
            cita: 'Apocalipsis 21:1-2',
            texto:
              'Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron, y el mar ya no existía más. Y yo Juan vi la santa ciudad, la nueva Jerusalén, descender del cielo, de Dios, dispuesta como una novia ataviada para su marido.',
            orden: 1,
          },
          {
            cita: 'Apocalipsis 21:4',
            texto:
              'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.',
            orden: 2,
          },
        ],
      },
      interpretaciones: {
        create: [
          {
            escuela: 'preterista',
            contenido:
              'Interpreta el cielo nuevo y la tierra nueva como la renovación espiritual que vino con la venida de Cristo y la destrucción de Jerusalén en el año 70 d.C. La nueva Jerusalén es la iglesia cristiana, que reemplazó al antiguo Israel. Valor: conecta el texto con el cumplimiento de las promesas en Cristo. Límite (según nuestra postura): reduce la creación nueva a un evento espiritual ya pasado, sin dar lugar a la renovación literal del cosmos que el texto describe.',
            esPosturaPropia: false,
            orden: 1,
          },
          {
            escuela: 'historicista',
            contenido:
              'Ve en el cielo nuevo y la tierra nueva la era final de la iglesia gloriosa, y en la nueva Jerusalén la iglesia triunfante después de la Reforma o después de un período de paz. Valor: enfatiza el triunfo final del reino de Dios en la historia. Límite: la aplicación a períodos históricos concretos es especulativa.',
            esPosturaPropia: false,
            orden: 2,
          },
          {
            escuela: 'futurista (POSTURA PROPIA)',
            contenido:
              'Nuestra postura (línea del Movimiento Misionero Mundial). El cielo nuevo y la tierra nueva son la renovación literal del cosmos después del juicio final. La nueva Jerusalén es la morada eterna de los redimidos, que desciende del cielo a la tierra renovada. Dios morará físicamente con su pueblo, y no habrá más muerte, dolor ni pecado. La ciudad es literal (aunque con dimensiones simbólicas) y representa la consumación de la obra redentora de Cristo. Este es el estado eterno, donde el reino de Dios se manifiesta en toda su plenitud.',
            esPosturaPropia: true,
            orden: 3,
          },
          {
            escuela: 'idealista',
            contenido:
              'Interpreta el cielo nuevo y la tierra nueva como el estado final de comunión con Dios, donde el pecado y la muerte son completamente vencidos. La nueva Jerusalén es la comunidad de los redimidos en su relación perfecta con Dios. Valor: enfatiza la esperanza de la vida eterna en comunión con Dios. Límite (según nuestra postura): al espiritualizar la ciudad y la tierra renovada, puede perder la dimensión de una realidad física y concreta que el texto describe.',
            esPosturaPropia: false,
            orden: 4,
          },
        ],
      },
      simbolos: {
        create: [
          {
            nombre: 'El cielo nuevo y la tierra nueva',
            significado:
              'La renovación total de la creación después del juicio final, donde el pecado y la muerte son completamente erradicados.',
            referencias: 'Apocalipsis 21:1',
            trasfondoCultural:
              'En el pensamiento judío, la creación actual está contaminada por el pecado, y Dios promete una nueva creación (ver Isaías 65:17; 66:22). La frase "el mar ya no existía más" (Apocalipsis 21:1) es significativa, porque en el mundo antiguo el mar era un símbolo del caos y del mal (ver Apocalipsis 13:1, donde la bestia sale del mar). La ausencia del mar indica que todo caos y mal han sido eliminados. (verificar)',
            orden: 1,
          },
          {
            nombre: 'La nueva Jerusalén',
            significado:
              'La ciudad santa, la morada de Dios y de los redimidos en la eternidad, donde Dios habita con su pueblo.',
            referencias: 'Apocalipsis 21:2, 9-27',
            trasfondoCultural:
              'Jerusalén era la ciudad de David, el centro de la adoración en Israel y el lugar del templo. En la profecía, la nueva Jerusalén es la ciudad celestial, la promesa de la presencia de Dios con su pueblo (ver Ezequiel 48:30-35, donde la ciudad se llama "Jehová-shamma", que significa "El Señor está allí"). Las doce puertas con los nombres de las tribus de Israel y los doce cimientos con los nombres de los apóstoles (Apocalipsis 21:12-14) muestran la continuidad entre el Antiguo y el Nuevo Testamento: la ciudad de Dios incluye a todo el pueblo de Dios de todas las épocas. (verificar) La ciudad es un cubo perfecto (12,000 estadios de lado), como el Lugar Santísimo del templo, simbolizando la presencia perfecta de Dios (ver 1 Reyes 6:20; Ezequiel 41:4).',
            orden: 2,
          },
          {
            nombre: 'La novia, la esposa del Cordero',
            significado:
              'Representa al pueblo redimido (la Iglesia) en su unión eterna con Cristo.',
            referencias: 'Apocalipsis 21:2, 9',
            trasfondoCultural:
              'En el mundo antiguo, el matrimonio era la relación más íntima y sagrada. La imagen de la novia (la Iglesia) y el esposo (Cristo) es común en el Nuevo Testamento (ver Efesios 5:25-27; 2 Corintios 11:2). En el Antiguo Testamento, Dios es el esposo de Israel (ver Isaías 62:5; Oseas 2:19-20). La novia está "adornada" para su esposo, lo que indica que los redimidos son presentados perfectos delante de Cristo.',
            orden: 3,
          },
          {
            nombre: 'El río de agua de vida',
            significado:
              'La vida eterna y la abundancia de la presencia de Dios que fluye para su pueblo.',
            referencias: 'Apocalipsis 22:1-2',
            trasfondoCultural:
              'El río de agua de vida recuerda el río que salía del Edén (Génesis 2:8-10) y el río que brota del templo en Ezequiel 47:1-12, que trae vida donde fluye. En el judaísmo, el agua era un símbolo de la Torah y de la vida espiritual (ver Juan 4:13-14; 7:37-39). (verificar) El hecho de que el río brote del "trono de Dios y del Cordero" indica que la vida eterna proviene de la presencia misma de Dios.',
            orden: 4,
          },
          {
            nombre: 'El árbol de la vida',
            significado:
              'Simboliza la vida eterna y la sanidad de las naciones, restaurando lo que se perdió en el Edén.',
            referencias: 'Apocalipsis 22:2',
            trasfondoCultural:
              'El árbol de la vida estaba en el centro del jardín del Edén (Génesis 2:9), y después del pecado, el acceso a él fue prohibido (Génesis 3:22-24). En la nueva creación, el árbol de la vida es restaurado, y sus hojas son para "la sanidad de las naciones". Esto indica que en la eternidad, no solo Israel, sino todas las naciones serán bendecidas. El árbol da fruto cada mes, lo que simboliza la provisión continua y abundante de Dios. (verificar)',
            orden: 5,
          },
          {
            nombre: 'La luz de la ciudad',
            significado:
              'Dios y el Cordero son la luz de la nueva Jerusalén; no hay necesidad de sol ni luna.',
            referencias: 'Apocalipsis 21:23-24',
            trasfondoCultural:
              'En el mundo antiguo, la luz era esencial para la vida y era un símbolo de Dios (ver Salmo 27:1; Juan 8:12). El hecho de que la ciudad no necesite sol ni luna indica que la presencia de Dios es la fuente de toda vida y verdad. En Isaías 60:19-20, se profetiza que Dios será la luz eterna de su pueblo. (verificar) La ciudad también tiene puertas que "nunca se cerrarán", lo que indica que el acceso a Dios es permanente y sin restricciones (en contraste con las puertas cerradas de la Jerusalén terrenal).',
            orden: 6,
          },
        ],
      },
      tipologias: {
        create: [
          {
            elemento: 'La nueva Jerusalén como novia del Cordero',
            cristoEnEl:
              'Cristo es el Esposo que ha amado a su Iglesia y se ha entregado por ella, para presentarla santa y sin mancha. La unión eterna de Cristo con su pueblo es el cumplimiento de su promesa de "no os dejaré huérfanos" (Juan 14:18) y de la oración de Jesús por la unidad de los suyos (Juan 17:20-23).',
            cita: 'Apocalipsis 21:2, 9; Efesios 5:25-27; Juan 17:20-23',
            orden: 1,
          },
          {
            elemento: 'El árbol de la vida y el río de agua de vida',
            cristoEnEl:
              'Cristo es la fuente de vida eterna. En Juan 4:13-14, Jesús ofrece "agua que salta para vida eterna"; en Juan 6:35, Él es "el pan de vida"; en Juan 15:1, Él es "la vid verdadera". En la nueva creación, la vida que Cristo ofrece fluye abundantemente para todos los redimidos.',
            cita: 'Apocalipsis 22:1-2; Juan 4:13-14; 6:35; 15:1',
            orden: 2,
          },
        ],
      },
      profecias: {
        create: [
          {
            tema: 'La creación de un cielo nuevo y una tierra nueva',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 21:1',
            citaCumplimiento: 'Isaías 65:17; 66:22',
            orden: 1,
          },
          {
            tema: 'La morada de Dios con los hombres en la nueva Jerusalén',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 21:3-4',
            citaCumplimiento: 'Ezequiel 37:26-27; Levítico 26:11-12',
            orden: 2,
          },
          {
            tema: 'La promesa de que no habrá más muerte, ni llanto, ni dolor',
            estado: 'por_cumplir',
            citaBase: 'Apocalipsis 21:4',
            citaCumplimiento: 'Isaías 25:8; 1 Corintios 15:54-55',
            orden: 3,
          },
        ],
      },
      ciudades: {
        create: [
          {
            nombreBiblico: 'Nueva Jerusalén',
            ubicacion: 'La ciudad celestial que desciende del cielo',
            equivalenteActual: 'No tiene equivalente terrenal; es la ciudad eterna de Dios',
            nota: 'La nueva Jerusalén es la morada eterna de Dios y de los redimidos. No debe confundirse con la Jerusalén terrenal actual. Es la promesa del cumplimiento de la presencia de Dios con su pueblo para siempre.',
            orden: 1,
          },
        ],
      },
      preguntas: {
        create: [
          {
            enunciado:
              '¿Qué sucede con el primer cielo y la primera tierra según Apocalipsis 21:1?',
            orden: 1,
            opciones: {
              create: [
                {
                  texto: 'Pasan, y Dios crea un cielo nuevo y una tierra nueva',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'Son transformados en el cielo y la tierra actuales',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Son destruidos para siempre y no hay reemplazo',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'Permanecen igual, pero los redimidos son llevados al cielo',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué representa la nueva Jerusalén que desciende del cielo?',
            orden: 2,
            opciones: {
              create: [
                {
                  texto: 'La morada eterna de Dios y de los redimidos en la tierra renovada',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La ciudad literal de Jerusalén reconstruida por los judíos',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'La Iglesia en su estado actual en la tierra',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El templo que será reconstruido antes del fin',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué promesa se cumple con la declaración "ya no habrá muerte, ni llanto, ni clamor, ni dolor"?',
            orden: 3,
            opciones: {
              create: [
                {
                  texto: 'La victoria final sobre el pecado y la muerte en la nueva creación',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'La paz temporal que Israel tendrá en el milenio',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'La vida sin sufrimiento que los cristianos experimentan ahora',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'La promesa de que los impíos no sufrirán castigo',
                  esCorrecta: false,
                  orden: 4,
                },
              ],
            },
          },
          {
            enunciado:
              '¿Qué simboliza el río de agua de vida y el árbol de la vida en la nueva Jerusalén?',
            orden: 4,
            opciones: {
              create: [
                {
                  texto: 'La vida eterna y la abundante provisión de Dios para su pueblo',
                  esCorrecta: true,
                  orden: 1,
                },
                {
                  texto: 'El regreso del jardín del Edén solo para Israel',
                  esCorrecta: false,
                  orden: 2,
                },
                {
                  texto: 'Los sacramentos que la Iglesia practica en la tierra',
                  esCorrecta: false,
                  orden: 3,
                },
                {
                  texto: 'El río literal que fluirá en Jerusalén durante el milenio',
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

  console.log('✅ Lección 12 "Cielo nuevo, tierra nueva y la nueva Jerusalén" sembrada (con trasfondo cultural).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });