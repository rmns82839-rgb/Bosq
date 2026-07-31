// prisma/seedMilagros.ts
// Los 34 milagros individuales de Jesús registrados en los Evangelios,
// por categoría, con su cita principal y los pasajes paralelos.
//
// Nota honesta: el número varía entre listas (34, 35, 37…) según cómo
// se agrupen los relatos y si se cuentan los resúmenes generales
// ("sanaba a todos los enfermos") como milagros individuales. Aquí van
// solo los relatos concretos e identificables.
//
// Corre con: npx ts-node prisma/seedMilagros.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando milagros existentes...');
  await prisma.milagroJesus.deleteMany({});

  console.log('Sembrando los milagros de Jesús...');

  const M = (
    categoria: string,
    titulo: string,
    cita: string,
    paralelos: string | null,
    descripcion: string,
  ) => ({ categoria, titulo, cita, paralelos, descripcion });

  await prisma.milagroJesus.createMany({
    data: [
      // ═══ SOBRE LA NATURALEZA ═══════════════════════════════
      M('naturaleza', 'Convierte el agua en vino', 'Juan 2:1-11', null, 'El primero de sus milagros, en las bodas de Caná.'),
      M('naturaleza', 'La pesca milagrosa', 'Lucas 5:1-11', null, 'Tras una noche sin pescar nada; Pedro deja todo y le sigue.'),
      M('naturaleza', 'Calma la tempestad', 'Marcos 4:35-41', 'Mateo 8:23-27 · Lucas 8:22-25', '"¿Quién es éste, que aun el viento y el mar le obedecen?"'),
      M('naturaleza', 'Alimenta a cinco mil', 'Juan 6:1-14', 'Mateo 14:15-21 · Marcos 6:34-44 · Lucas 9:12-17', 'El único milagro registrado en los cuatro Evangelios.'),
      M('naturaleza', 'Camina sobre el mar', 'Mateo 14:22-33', 'Marcos 6:45-52 · Juan 6:16-21', 'Pedro camina también, hasta que mira el viento.'),
      M('naturaleza', 'Alimenta a cuatro mil', 'Marcos 8:1-9', 'Mateo 15:32-39', 'Un segundo milagro de multiplicación, en territorio gentil.'),
      M('naturaleza', 'La moneda en la boca del pez', 'Mateo 17:24-27', null, 'Para pagar el impuesto del templo.'),
      M('naturaleza', 'Seca la higuera', 'Marcos 11:12-14,20-24', 'Mateo 21:18-22', 'El único milagro de juicio de Jesús.'),
      M('naturaleza', 'La segunda pesca milagrosa', 'Juan 21:1-14', null, 'Después de la resurrección: 153 peces grandes y la red no se rompió.'),

      // ═══ SANIDADES ═════════════════════════════════════════
      M('sanidad', 'Sana al hijo del noble', 'Juan 4:46-54', null, 'A distancia, desde Caná hasta Capernaum.'),
      M('sanidad', 'Sana a la suegra de Pedro', 'Marcos 1:30-31', 'Mateo 8:14-15 · Lucas 4:38-39', 'Se levantó y les servía.'),
      M('sanidad', 'Limpia a un leproso', 'Marcos 1:40-45', 'Mateo 8:2-4 · Lucas 5:12-15', '"Si quieres, puedes limpiarme". — "Quiero, sé limpio".'),
      M('sanidad', 'Sana al paralítico bajado por el techo', 'Marcos 2:3-12', 'Mateo 9:2-8 · Lucas 5:18-26', 'Primero perdona sus pecados, y por eso sana.'),
      M('sanidad', 'Sana al hombre de la mano seca', 'Marcos 3:1-5', 'Mateo 12:9-13 · Lucas 6:6-11', 'En sábado, provocando la ira de los fariseos.'),
      M('sanidad', 'Sana al siervo del centurión', 'Mateo 8:5-13', 'Lucas 7:1-10', '"Ni aun en Israel he hallado tanta fe".'),
      M('sanidad', 'Sana a la mujer con flujo de sangre', 'Marcos 5:25-34', 'Mateo 9:20-22 · Lucas 8:43-48', 'Doce años enferma; tocó el borde de su manto.'),
      M('sanidad', 'Sana a dos ciegos', 'Mateo 9:27-31', null, '"Conforme a vuestra fe os sea hecho".'),
      M('sanidad', 'Sana al sordo y tartamudo', 'Marcos 7:31-37', null, 'En Decápolis: "Efata", que es, sé abierto.'),
      M('sanidad', 'Sana al ciego de Betsaida', 'Marcos 8:22-26', null, 'El único milagro en dos etapas: primero ve "hombres como árboles".'),
      M('sanidad', 'Sana al ciego de nacimiento', 'Juan 9:1-12', null, 'Con lodo y saliva; el hombre lavado en Siloé.'),
      M('sanidad', 'Sana al paralítico de Betesda', 'Juan 5:1-9', null, 'Treinta y ocho años enfermo junto al estanque.'),
      M('sanidad', 'Sana a la mujer encorvada', 'Lucas 13:11-13', null, 'Dieciocho años sin poder enderezarse.'),
      M('sanidad', 'Sana al hidrópico', 'Lucas 14:1-4', null, 'En sábado, en casa de un principal de los fariseos.'),
      M('sanidad', 'Limpia a diez leprosos', 'Lucas 17:11-19', null, 'Solo uno volvió a dar gracias — y era samaritano.'),
      M('sanidad', 'Sana al ciego Bartimeo', 'Marcos 10:46-52', 'Mateo 20:29-34 · Lucas 18:35-43', 'Clamó a gritos: "Jesús, Hijo de David, ten misericordia de mí".'),
      M('sanidad', 'Restaura la oreja de Malco', 'Lucas 22:50-51', null, 'Su último milagro antes de la cruz — sanando a quien venía a arrestarlo.'),

      // ═══ LIBERACIONES ══════════════════════════════════════
      M('liberacion', 'Libera al endemoniado en la sinagoga', 'Marcos 1:23-26', 'Lucas 4:33-35', 'En Capernaum; el espíritu lo reconoce como el Santo de Dios.'),
      M('liberacion', 'Libera al endemoniado ciego y mudo', 'Mateo 12:22', 'Lucas 11:14', 'Ocasión de la acusación de obrar por Beelzebú.'),
      M('liberacion', 'Libera al endemoniado gadareno', 'Marcos 5:1-20', 'Mateo 8:28-34 · Lucas 8:26-39', 'Legión: los demonios entran en los cerdos.'),
      M('liberacion', 'Libera a la hija de la mujer sirofenicia', 'Marcos 7:24-30', 'Mateo 15:21-28', 'A distancia, por la fe insistente de su madre gentil.'),
      M('liberacion', 'Libera al muchacho endemoniado', 'Marcos 9:14-29', 'Mateo 17:14-21 · Lucas 9:37-43', '"Creo; ayuda mi incredulidad".'),

      // ═══ RESURRECCIONES ════════════════════════════════════
      M('resurreccion', 'Resucita a la hija de Jairo', 'Marcos 5:22-43', 'Mateo 9:18-26 · Lucas 8:41-56', '"Talita cumi": Niña, a ti te digo, levántate.'),
      M('resurreccion', 'Resucita al hijo de la viuda de Naín', 'Lucas 7:11-17', null, 'Detuvo el féretro camino al entierro, movido a compasión.'),
      M('resurreccion', 'Resucita a Lázaro', 'Juan 11:1-44', null, 'Cuatro días en el sepulcro. "Yo soy la resurrección y la vida".'),
    ],
  });

  const total = await prisma.milagroJesus.count();
  console.log(`Listo — ${total} milagros sembrados.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
