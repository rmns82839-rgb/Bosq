// prisma/seedJesusEnLibros.ts
// "Cristo en cada libro de la Biblia" es una tradición devocional de siglos
// (aparece con variantes en muchos comentarios y tratados antiguos) — NO es
// que cada versículo lo diga literalmente. Son títulos tradicionales con una
// cita principal, más 1-2 referencias adicionales del mismo libro donde
// también se ve a Cristo anticipado o revelado. El botón de IA sirve para
// profundizar el porqué de cada conexión.
//
// Corre con: npx ts-node prisma/seedJesusEnLibros.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const AT = 'antiguo';
const NT = 'nuevo';

async function main() {
  console.log('Borrando datos existentes...');
  await prisma.jesusEnLibro.deleteMany({});

  console.log('Sembrando los 66 libros con referencias adicionales...');

  const libros = [
    { orden: 1, libro: 'Génesis', testamento: AT, titulo: 'La simiente de la mujer', cita: 'Génesis 3:15',
      referenciasAdicionales: [
        { cita: 'Génesis 14:18-20', nota: 'Melquisedec, rey-sacerdote, tipo de Cristo.' },
        { cita: 'Génesis 22:6', nota: 'Isaac cargando la leña de su propio sacrificio.' },
      ] },
    { orden: 2, libro: 'Éxodo', testamento: AT, titulo: 'El Cordero de la Pascua', cita: 'Éxodo 12:13',
      referenciasAdicionales: [
        { cita: 'Éxodo 17:6', nota: 'La roca herida en Refidim.' },
        { cita: 'Éxodo 16:15', nota: 'El maná, pan del cielo.' },
      ] },
    { orden: 3, libro: 'Levítico', testamento: AT, titulo: 'Nuestro sacrificio expiatorio', cita: 'Levítico 16:15',
      referenciasAdicionales: [
        { cita: 'Levítico 16:32', nota: 'El sumo sacerdote que hace expiación.' },
        { cita: 'Levítico 4:3', nota: 'La ofrenda por el pecado.' },
      ] },
    { orden: 4, libro: 'Números', testamento: AT, titulo: 'La roca herida y la serpiente levantada', cita: 'Números 21:9',
      referenciasAdicionales: [
        { cita: 'Números 35:6', nota: 'Las ciudades de refugio.' },
        { cita: 'Números 24:17', nota: 'La estrella de Jacob, profecía mesiánica.' },
      ] },
    { orden: 5, libro: 'Deuteronomio', testamento: AT, titulo: 'El profeta como Moisés', cita: 'Deuteronomio 18:15',
      referenciasAdicionales: [
        { cita: 'Deuteronomio 21:23', nota: 'El maldito colgado en un madero (citado en Gálatas 3:13).' },
      ] },
    { orden: 6, libro: 'Josué', testamento: AT, titulo: 'El Capitán del ejército de Jehová', cita: 'Josué 5:14',
      referenciasAdicionales: [
        { cita: 'Hebreos 4:8', nota: 'Josué (mismo nombre hebreo que "Jesús") introduce al pueblo al reposo.' },
      ] },
    { orden: 7, libro: 'Jueces', testamento: AT, titulo: 'Nuestro juez y libertador', cita: 'Jueces 2:16',
      referenciasAdicionales: [
        { cita: 'Jueces 16:30', nota: 'Sansón entregando su vida al morir.' },
      ] },
    { orden: 8, libro: 'Rut', testamento: AT, titulo: 'El pariente redentor', cita: 'Rut 4:10',
      referenciasAdicionales: [
        { cita: 'Rut 4:9', nota: 'Booz comprando el campo y tomando esposa.' },
      ] },
    { orden: 9, libro: '1 Samuel', testamento: AT, titulo: 'El ungido esperado', cita: '1 Samuel 16:13',
      referenciasAdicionales: [
        { cita: '1 Samuel 17:45', nota: 'David como campeón que pelea por el pueblo.' },
      ] },
    { orden: 10, libro: '2 Samuel', testamento: AT, titulo: 'El trono eterno prometido a David', cita: '2 Samuel 7:16',
      referenciasAdicionales: [
        { cita: '2 Samuel 7:12-13', nota: 'El pacto davídico, base de la promesa mesiánica.' },
      ] },
    { orden: 11, libro: '1 Reyes', testamento: AT, titulo: 'El rey en toda su sabiduría', cita: '1 Reyes 10:9',
      referenciasAdicionales: [
        { cita: '1 Reyes 6:1', nota: 'Salomón construyendo el templo.' },
      ] },
    { orden: 12, libro: '2 Reyes', testamento: AT, titulo: 'El profeta que sana y resucita', cita: '2 Reyes 4:34',
      referenciasAdicionales: [
        { cita: '2 Reyes 4:42-44', nota: 'Eliseo multiplicando el pan.' },
      ] },
    { orden: 13, libro: '1 Crónicas', testamento: AT, titulo: 'El heredero legítimo del pacto con David', cita: '1 Crónicas 17:11-14',
      referenciasAdicionales: [
        { cita: '1 Crónicas 15:25', nota: 'El arca traída a Jerusalén, presencia de Dios con su pueblo.' },
      ] },
    { orden: 14, libro: '2 Crónicas', testamento: AT, titulo: 'El que sana la tierra de su pueblo', cita: '2 Crónicas 7:14',
      referenciasAdicionales: [
        { cita: '2 Crónicas 7:1-3', nota: 'La gloria de Dios llenando el templo.' },
      ] },
    { orden: 15, libro: 'Esdras', testamento: AT, titulo: 'El que restaura la adoración', cita: 'Esdras 3:11',
      referenciasAdicionales: [
        { cita: 'Esdras 1:1-3', nota: 'El decreto de Ciro liberando al pueblo.' },
      ] },
    { orden: 16, libro: 'Nehemías', testamento: AT, titulo: 'El reconstructor del muro caído', cita: 'Nehemías 2:17',
      referenciasAdicionales: [
        { cita: 'Nehemías 3:1', nota: 'La puerta de las Ovejas, primera en reconstruirse.' },
      ] },
    { orden: 17, libro: 'Ester', testamento: AT, titulo: 'El mediador que intercede por su pueblo', cita: 'Ester 4:16',
      referenciasAdicionales: [
        { cita: 'Ester 8:15', nota: 'Mardoqueo exaltado tras la humillación.' },
      ] },
    { orden: 18, libro: 'Job', testamento: AT, titulo: 'Nuestro redentor que vive', cita: 'Job 19:25',
      referenciasAdicionales: [
        { cita: 'Job 42:8', nota: 'Job intercediendo por sus amigos.' },
      ] },
    { orden: 19, libro: 'Salmos', testamento: AT, titulo: 'El pastor y el rey sufriente', cita: 'Salmos 22:1',
      referenciasAdicionales: [
        { cita: 'Salmos 110:1', nota: 'El Señor sentado a la diestra de Jehová.' },
        { cita: 'Salmos 2:7', nota: 'El ungido de Jehová, "mi Hijo eres tú".' },
      ] },
    { orden: 20, libro: 'Proverbios', testamento: AT, titulo: 'La sabiduría de Dios encarnada', cita: 'Proverbios 8:22-23',
      referenciasAdicionales: [
        { cita: 'Proverbios 1:20-23', nota: 'El clamor de la sabiduría en las calles.' },
      ] },
    { orden: 21, libro: 'Eclesiastés', testamento: AT, titulo: 'El único sentido bajo el sol', cita: 'Eclesiastés 12:13',
      referenciasAdicionales: [
        { cita: 'Eclesiastés 1:9', nota: 'Nada nuevo bajo el sol — contraste con la novedad que trae Cristo.' },
      ] },
    { orden: 22, libro: 'Cantares', testamento: AT, titulo: 'El amado del alma', cita: 'Cantares 2:16',
      referenciasAdicionales: [
        { cita: 'Cantares 2:8', nota: 'El esposo que viene saltando sobre los montes.' },
      ] },
    { orden: 23, libro: 'Isaías', testamento: AT, titulo: 'El siervo sufriente y el Príncipe de Paz', cita: 'Isaías 53:5',
      referenciasAdicionales: [
        { cita: 'Isaías 9:6', nota: 'El niño nacido, el hijo dado.' },
        { cita: 'Isaías 7:14', nota: 'El Emanuel.' },
      ] },
    { orden: 24, libro: 'Jeremías', testamento: AT, titulo: 'El Renuevo justo de David', cita: 'Jeremías 23:5',
      referenciasAdicionales: [
        { cita: 'Jeremías 31:31-34', nota: 'El nuevo pacto.' },
      ] },
    { orden: 25, libro: 'Lamentaciones', testamento: AT, titulo: 'El varón de dolores que aún da esperanza', cita: 'Lamentaciones 3:22-23',
      referenciasAdicionales: [
        { cita: 'Lamentaciones 1:12', nota: 'El sufrimiento que invita a "mirad y ved".' },
      ] },
    { orden: 26, libro: 'Ezequiel', testamento: AT, titulo: 'El buen pastor que busca la oveja perdida', cita: 'Ezequiel 34:23',
      referenciasAdicionales: [
        { cita: 'Ezequiel 37:1-14', nota: 'La visión de los huesos secos, resurrección.' },
        { cita: 'Ezequiel 44:3', nota: 'El príncipe venidero.' },
      ] },
    { orden: 27, libro: 'Daniel', testamento: AT, titulo: 'El Hijo del Hombre y la piedra no cortada por mano', cita: 'Daniel 7:13',
      referenciasAdicionales: [
        { cita: 'Daniel 3:25', nota: 'El cuarto varón en el horno de fuego.' },
        { cita: 'Daniel 2:34-35', nota: 'La piedra que se convierte en gran monte.' },
      ] },
    { orden: 28, libro: 'Oseas', testamento: AT, titulo: 'El esposo fiel al pueblo infiel', cita: 'Oseas 2:19',
      referenciasAdicionales: [
        { cita: 'Oseas 11:1', nota: '"De Egipto llamé a mi hijo" (citado en Mateo 2:15).' },
      ] },
    { orden: 29, libro: 'Joel', testamento: AT, titulo: 'El que derrama su Espíritu', cita: 'Joel 2:28',
      referenciasAdicionales: [
        { cita: 'Joel 2:31-32', nota: 'El día grande y terrible de Jehová.' },
      ] },
    { orden: 30, libro: 'Amós', testamento: AT, titulo: 'El que levanta el tabernáculo caído de David', cita: 'Amós 9:11',
      referenciasAdicionales: [
        { cita: 'Hechos 15:16-17', nota: 'Citado por Santiago sobre la inclusión de los gentiles.' },
      ] },
    { orden: 31, libro: 'Abdías', testamento: AT, titulo: 'El libertador en el monte de Sion', cita: 'Abdías 1:21',
      referenciasAdicionales: [] },
    { orden: 32, libro: 'Jonás', testamento: AT, titulo: 'La señal de tres días y tres noches', cita: 'Jonás 1:17',
      referenciasAdicionales: [
        { cita: 'Jonás 3:10', nota: 'La misericordia de Dios hacia los gentiles.' },
      ] },
    { orden: 33, libro: 'Miqueas', testamento: AT, titulo: 'El nacido en Belén, gobernante desde la eternidad', cita: 'Miqueas 5:2',
      referenciasAdicionales: [
        { cita: 'Miqueas 4:3', nota: 'El que juzgará entre naciones, paz universal.' },
      ] },
    { orden: 34, libro: 'Nahúm', testamento: AT, titulo: 'El que trae buenas nuevas de paz', cita: 'Nahúm 1:15',
      referenciasAdicionales: [
        { cita: 'Nahúm 1:7', nota: 'Jehová es bueno, fortaleza en el día de angustia.' },
      ] },
    { orden: 35, libro: 'Habacuc', testamento: AT, titulo: 'El justo que vive por fe', cita: 'Habacuc 2:4',
      referenciasAdicionales: [
        { cita: 'Habacuc 3:17-18', nota: '"Aunque la higuera no florezca... me gozaré en Jehová".' },
      ] },
    { orden: 36, libro: 'Sofonías', testamento: AT, titulo: 'El Salvador poderoso en medio de su pueblo', cita: 'Sofonías 3:17',
      referenciasAdicionales: [] },
    { orden: 37, libro: 'Hageo', testamento: AT, titulo: 'El deseado de todas las naciones', cita: 'Hageo 2:7',
      referenciasAdicionales: [
        { cita: 'Hageo 2:9', nota: '"La gloria postrera de esta casa será mayor que la primera".' },
      ] },
    { orden: 38, libro: 'Zacarías', testamento: AT, titulo: 'El rey manso que entra en un asno, el traspasado', cita: 'Zacarías 9:9',
      referenciasAdicionales: [
        { cita: 'Zacarías 12:10', nota: '"Mirarán a mí, a quien traspasaron".' },
        { cita: 'Zacarías 13:1', nota: 'La fuente abierta para el pecado.' },
      ] },
    { orden: 39, libro: 'Malaquías', testamento: AT, titulo: 'El sol de justicia', cita: 'Malaquías 4:2',
      referenciasAdicionales: [
        { cita: 'Malaquías 3:1', nota: '"Mi mensajero preparará el camino delante de mí".' },
      ] },

    { orden: 40, libro: 'Mateo', testamento: NT, titulo: 'El Rey de los judíos', cita: 'Mateo 2:2',
      referenciasAdicionales: [
        { cita: 'Mateo 5:1-2', nota: 'El Sermón del Monte, la ley del Reino.' },
        { cita: 'Mateo 1:1', nota: 'La genealogía real desde Abraham.' },
      ] },
    { orden: 41, libro: 'Marcos', testamento: NT, titulo: 'El siervo que vino a servir', cita: 'Marcos 10:45',
      referenciasAdicionales: [] },
    { orden: 42, libro: 'Lucas', testamento: NT, titulo: 'El Hijo del Hombre que vino a buscar lo perdido', cita: 'Lucas 19:10',
      referenciasAdicionales: [
        { cita: 'Lucas 2:8-12', nota: 'El nacimiento anunciado a los pastores, entre los humildes.' },
      ] },
    { orden: 43, libro: 'Juan', testamento: NT, titulo: 'El Hijo de Dios, el Verbo hecho carne', cita: 'Juan 1:14',
      referenciasAdicionales: [
        { cita: 'Juan 6:35', nota: 'Las declaraciones "Yo soy": pan de vida, luz del mundo, etc.' },
        { cita: 'Juan 11:25', nota: '"Yo soy la resurrección y la vida" en Lázaro.' },
      ] },
    { orden: 44, libro: 'Hechos', testamento: NT, titulo: 'El Señor resucitado y ascendido que sigue actuando', cita: 'Hechos 1:11',
      referenciasAdicionales: [
        { cita: 'Hechos 9:3-5', nota: 'La conversión de Saulo, encuentro con el Cristo resucitado.' },
      ] },
    { orden: 45, libro: 'Romanos', testamento: NT, titulo: 'Nuestra justicia por fe', cita: 'Romanos 3:21-22',
      referenciasAdicionales: [
        { cita: 'Romanos 5:12-19', nota: 'El postrer Adán, contraste con el primer Adán.' },
      ] },
    { orden: 46, libro: '1 Corintios', testamento: NT, titulo: 'Las primicias de la resurrección', cita: '1 Corintios 15:20',
      referenciasAdicionales: [
        { cita: '1 Corintios 5:7', nota: '"Nuestra pascua, que es Cristo, ya fue sacrificada".' },
      ] },
    { orden: 47, libro: '2 Corintios', testamento: NT, titulo: 'El que se hizo pecado por nosotros', cita: '2 Corintios 5:21',
      referenciasAdicionales: [
        { cita: '2 Corintios 5:18-19', nota: 'El ministerio de la reconciliación.' },
      ] },
    { orden: 48, libro: 'Gálatas', testamento: NT, titulo: 'Nuestra libertad de la ley', cita: 'Gálatas 5:1',
      referenciasAdicionales: [
        { cita: 'Gálatas 3:13', nota: 'Hecho maldición por nosotros.' },
      ] },
    { orden: 49, libro: 'Efesios', testamento: NT, titulo: 'La cabeza de la iglesia, su cuerpo', cita: 'Efesios 1:22-23',
      referenciasAdicionales: [
        { cita: 'Efesios 3:4-6', nota: 'El misterio de Cristo revelado a los gentiles.' },
      ] },
    { orden: 50, libro: 'Filipenses', testamento: NT, titulo: 'El que se humilló hasta la muerte de cruz', cita: 'Filipenses 2:6-8',
      referenciasAdicionales: [
        { cita: 'Filipenses 2:9-11', nota: 'El nombre que es sobre todo nombre.' },
      ] },
    { orden: 51, libro: 'Colosenses', testamento: NT, titulo: 'La plenitud de la Deidad en forma corporal', cita: 'Colosenses 1:19',
      referenciasAdicionales: [
        { cita: 'Colosenses 1:15', nota: 'La imagen del Dios invisible, primogénito de toda creación.' },
      ] },
    { orden: 52, libro: '1 Tesalonicenses', testamento: NT, titulo: 'El que viene otra vez', cita: '1 Tesalonicenses 4:16',
      referenciasAdicionales: [
        { cita: '1 Tesalonicenses 5:2', nota: 'El día del Señor como ladrón en la noche.' },
      ] },
    { orden: 53, libro: '2 Tesalonicenses', testamento: NT, titulo: 'El que se revelará en llama de fuego', cita: '2 Tesalonicenses 1:7',
      referenciasAdicionales: [
        { cita: '2 Tesalonicenses 2:8', nota: 'El destruido por el espíritu de su boca.' },
      ] },
    { orden: 54, libro: '1 Timoteo', testamento: NT, titulo: 'El único mediador entre Dios y los hombres', cita: '1 Timoteo 2:5',
      referenciasAdicionales: [
        { cita: '1 Timoteo 3:16', nota: '"Manifestado en carne" — el misterio de la piedad.' },
      ] },
    { orden: 55, libro: '2 Timoteo', testamento: NT, titulo: 'El juez justo que da la corona', cita: '2 Timoteo 4:8',
      referenciasAdicionales: [
        { cita: '2 Timoteo 2:8', nota: '"Acuérdate de Jesucristo, resucitado de los muertos".' },
      ] },
    { orden: 56, libro: 'Tito', testamento: NT, titulo: 'La esperanza bienaventurada que esperamos', cita: 'Tito 2:13',
      referenciasAdicionales: [
        { cita: 'Tito 2:14', nota: 'Se dio a sí mismo por nosotros para redimirnos.' },
      ] },
    { orden: 57, libro: 'Filemón', testamento: NT, titulo: 'El que paga la deuda ajena', cita: 'Filemón 1:18',
      referenciasAdicionales: [] },
    { orden: 58, libro: 'Hebreos', testamento: NT, titulo: 'Nuestro gran sumo sacerdote', cita: 'Hebreos 4:14',
      referenciasAdicionales: [
        { cita: 'Hebreos 1:3', nota: 'Resplandor de la gloria de Dios, mejor que los ángeles.' },
        { cita: 'Hebreos 5:6', nota: 'Sacerdote para siempre según el orden de Melquisedec.' },
      ] },
    { orden: 59, libro: 'Santiago', testamento: NT, titulo: 'El Señor de gloria sin acepción de personas', cita: 'Santiago 2:1',
      referenciasAdicionales: [
        { cita: 'Santiago 3:17', nota: 'La sabiduría que desciende de lo alto.' },
      ] },
    { orden: 60, libro: '1 Pedro', testamento: NT, titulo: 'El príncipe de los pastores', cita: '1 Pedro 5:4',
      referenciasAdicionales: [
        { cita: '1 Pedro 2:24', nota: 'Llevó él mismo nuestros pecados en su cuerpo sobre el madero.' },
      ] },
    { orden: 61, libro: '2 Pedro', testamento: NT, titulo: 'La estrella de la mañana en el corazón', cita: '2 Pedro 1:19',
      referenciasAdicionales: [
        { cita: '2 Pedro 1:16-18', nota: 'Su gloria en el monte de la transfiguración.' },
      ] },
    { orden: 62, libro: '1 Juan', testamento: NT, titulo: 'La Palabra de vida que vimos y palpamos', cita: '1 Juan 1:1',
      referenciasAdicionales: [
        { cita: '1 Juan 2:2', nota: 'Propiciación por nuestros pecados.' },
      ] },
    { orden: 63, libro: '2 Juan', testamento: NT, titulo: 'La verdad en la que debemos andar', cita: '2 Juan 1:6',
      referenciasAdicionales: [] },
    { orden: 64, libro: '3 Juan', testamento: NT, titulo: 'El nombre por el cual salimos a servir', cita: '3 Juan 1:7',
      referenciasAdicionales: [] },
    { orden: 65, libro: 'Judas', testamento: NT, titulo: 'El que nos guarda sin caída', cita: 'Judas 1:24',
      referenciasAdicionales: [
        { cita: 'Judas 1:25', nota: '"Al único y sabio Dios, nuestro Salvador, sea gloria".' },
      ] },
    { orden: 66, libro: 'Apocalipsis', testamento: NT, titulo: 'El Rey de reyes y Señor de señores', cita: 'Apocalipsis 19:16',
      referenciasAdicionales: [
        { cita: 'Apocalipsis 5:5-6', nota: 'El León que es también el Cordero inmolado.' },
        { cita: 'Apocalipsis 22:13', nota: 'El Alfa y la Omega, el principio y el fin.' },
      ] },
  ];

  for (const l of libros) {
    await prisma.jesusEnLibro.create({ data: l });
  }

  const total = await prisma.jesusEnLibro.count();
  console.log(`Listo — ${total} libros sembrados, cada uno con su referencia principal y adicionales.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
