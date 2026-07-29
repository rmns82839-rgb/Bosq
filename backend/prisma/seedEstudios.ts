// prisma/seedEstudios.ts
// Contenido inicial para los módulos de estudio — un punto de partida
// sólido, NO exhaustivo (sobre todo Reyes: son ~40 en total, aquí van 8
// para empezar). Corre con: npx ts-node prisma/seedEstudios.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Sembrando módulos de estudio...');

  await prisma.angel.createMany({
    data: [
      { nombre: 'Miguel', tipo: 'arcángel', cita: 'Judas 1:9', descripcion: 'El arcángel guerrero, príncipe que defiende al pueblo de Dios.' },
      { nombre: 'Gabriel', tipo: 'mensajero', cita: 'Lucas 1:26-27', descripcion: 'Anuncia el nacimiento de Juan el Bautista y de Jesús.' },
      { nombre: 'Querubines', tipo: 'guardián', cita: 'Génesis 3:24', descripcion: 'Custodian la entrada al Edén tras la expulsión de Adán y Eva.' },
      { nombre: 'Serafines', tipo: 'adorador', cita: 'Isaías 6:2', descripcion: 'Seres junto al trono de Dios que claman "Santo, santo, santo".' },
      { nombre: 'Ángel de Jehová', tipo: 'teofanía', cita: 'Éxodo 3:2', descripcion: 'Se aparece a Moisés en la zarza ardiente.' },
      { nombre: 'Ángel destructor', tipo: 'ejecutor de juicio', cita: '2 Samuel 24:16', descripcion: 'Envía plaga sobre Israel tras el censo de David.' },
    ],
  });

  await prisma.tituloMesias.createMany({
    data: [
      { titulo: 'Cordero de Dios', categoria: 'sacrificial', cita: 'Juan 1:29', descripcion: 'El que quita el pecado del mundo.' },
      { titulo: 'Alfa y Omega', categoria: 'divino', cita: 'Apocalipsis 1:8', descripcion: 'Principio y fin de todas las cosas.' },
      { titulo: 'Emanuel', categoria: 'profético', cita: 'Mateo 1:23', descripcion: 'Dios con nosotros.' },
      { titulo: 'Buen Pastor', categoria: 'pastoral', cita: 'Juan 10:11', descripcion: 'Da su vida por las ovejas.' },
      { titulo: 'Pan de Vida', categoria: 'sustento', cita: 'Juan 6:35', descripcion: 'El que viene a él nunca tendrá hambre.' },
      { titulo: 'León de la tribu de Judá', categoria: 'real', cita: 'Apocalipsis 5:5', descripcion: 'El único digno de abrir el rollo.' },
      { titulo: 'Príncipe de Paz', categoria: 'profético', cita: 'Isaías 9:6', descripcion: 'Uno de los nombres del hijo prometido.' },
      { titulo: 'El Camino, la Verdad y la Vida', categoria: 'salvífico', cita: 'Juan 14:6', descripcion: 'Nadie viene al Padre sino por él.' },
      { titulo: 'El Verbo', categoria: 'divino', cita: 'Juan 1:1', descripcion: 'En el principio era el Verbo, y el Verbo era Dios.' },
      { titulo: 'Rey de reyes y Señor de señores', categoria: 'real', cita: 'Apocalipsis 19:16', descripcion: 'Título escrito sobre su vestidura y su muslo.' },
    ],
  });

  await prisma.numeroBiblico.createMany({
    data: [
      { numero: 1, significado: 'Unidad de Dios', cita: 'Deuteronomio 6:4', descripcion: 'Jehová es uno.' },
      { numero: 3, significado: 'La Trinidad y la resurrección', cita: 'Mateo 12:40', descripcion: 'Tres días y tres noches, como Jonás.' },
      { numero: 6, significado: 'El hombre, imperfección', cita: 'Génesis 1:26-31', descripcion: 'El hombre fue creado en el sexto día.' },
      { numero: 7, significado: 'Perfección y plenitud', cita: 'Génesis 2:2-3', descripcion: 'Dios reposó el séptimo día.' },
      { numero: 12, significado: 'Gobierno de Dios sobre su pueblo', cita: 'Mateo 19:28', descripcion: '12 tribus de Israel, 12 apóstoles.' },
      { numero: 40, significado: 'Prueba y juicio', cita: 'Mateo 4:2', descripcion: '40 días de ayuno de Jesús en el desierto.' },
      { numero: 666, significado: 'Número de la bestia', cita: 'Apocalipsis 13:18', descripcion: 'Número de hombre, para quien tenga entendimiento.' },
    ],
  });

  // Punto de partida — el reino unido y los primeros reyes de la división.
  // Faltan la mayoría de los ~40 reyes de Israel y Judá; se agregan después.
  await prisma.rey.createMany({
    data: [
      { nombre: 'Saúl', reino: 'Israel unido', inicioAc: 1050, finAc: 1010, evaluacion: 'malo', cita: '1 Samuel 10' },
      { nombre: 'David', reino: 'Israel unido', inicioAc: 1010, finAc: 970, evaluacion: 'bueno', cita: '2 Samuel 5' },
      { nombre: 'Salomón', reino: 'Israel unido', inicioAc: 970, finAc: 930, evaluacion: 'mixto', cita: '1 Reyes 3' },
      { nombre: 'Roboam', reino: 'Judá', inicioAc: 930, finAc: 913, evaluacion: 'malo', cita: '1 Reyes 12' },
      { nombre: 'Jeroboam I', reino: 'Israel', inicioAc: 930, finAc: 909, evaluacion: 'malo', cita: '1 Reyes 12:20' },
      { nombre: 'Asa', reino: 'Judá', inicioAc: 911, finAc: 870, evaluacion: 'bueno', cita: '1 Reyes 15:9-11' },
      { nombre: 'Acab', reino: 'Israel', inicioAc: 874, finAc: 853, evaluacion: 'malo', cita: '1 Reyes 16:29-30' },
      { nombre: 'Josías', reino: 'Judá', inicioAc: 640, finAc: 609, evaluacion: 'bueno', cita: '2 Reyes 22:1-2' },
    ],
  });

  await prisma.profeciaMesianica.createMany({
    data: [
      { tema: 'Nacimiento virginal', citaProfecia: 'Isaías 7:14', citaCumplimiento: 'Mateo 1:23' },
      { tema: 'Nacimiento en Belén', citaProfecia: 'Miqueas 5:2', citaCumplimiento: 'Mateo 2:1' },
      { tema: 'Entrada triunfal sobre un asno', citaProfecia: 'Zacarías 9:9', citaCumplimiento: 'Mateo 21:5' },
      { tema: 'Traicionado por 30 piezas de plata', citaProfecia: 'Zacarías 11:12-13', citaCumplimiento: 'Mateo 26:15' },
      { tema: 'Manos y pies horadados', citaProfecia: 'Salmos 22:16', citaCumplimiento: 'Juan 20:25' },
      { tema: 'Resurrección sin ver corrupción', citaProfecia: 'Salmos 16:10', citaCumplimiento: 'Hechos 2:31' },
    ],
  });

  await prisma.juicioJehova.createMany({
    data: [
      { sobre: 'La humanidad (diluvio universal)', estado: 'cumplido', cita: 'Génesis 7:11-12', descripcion: 'Juicio por la maldad extendida de la humanidad.' },
      { sobre: 'Sodoma y Gomorra', estado: 'cumplido', cita: 'Génesis 19:24-25', descripcion: 'Destrucción por fuego y azufre.' },
      { sobre: 'Babilonia histórica', estado: 'cumplido', cita: 'Daniel 5:30', descripcion: 'Caída del imperio babilónico, profetizada en Isaías 13.' },
      { sobre: 'Babilonia la grande (simbólica)', estado: 'por_cumplir', cita: 'Apocalipsis 18:2', descripcion: 'Juicio escatológico sobre el sistema mundial corrupto.' },
    ],
  });

  await prisma.palabraJesus.createMany({
    data: [
      { tipo: 'sermón', cita: 'Mateo 5-7', resumen: 'El Sermón del Monte — las bienaventuranzas y la ética del Reino.' },
      { tipo: 'parábola', cita: 'Lucas 15:11-32', resumen: 'El hijo pródigo — el amor del Padre que recibe al que vuelve.' },
      { tipo: 'dicho', cita: 'Juan 14:6', resumen: '"Yo soy el camino, la verdad y la vida."' },
      { tipo: 'dicho', cita: 'Mateo 28:19-20', resumen: 'La Gran Comisión — id y haced discípulos a todas las naciones.' },
      { tipo: 'señal', cita: 'Juan 6:1-14', resumen: 'La multiplicación de los panes y los peces.' },
    ],
  });

  await prisma.espirituSanto.createMany({
    data: [
      // nombres
      { categoria: 'nombre', titulo: 'Consolador', cita: 'Juan 14:26' },
      { categoria: 'nombre', titulo: 'Espíritu de verdad', cita: 'Juan 16:13' },
      { categoria: 'nombre', titulo: 'Espíritu Santo', cita: 'Lucas 11:13' },
      // obras
      { categoria: 'obra', titulo: 'Convence de pecado', cita: 'Juan 16:8' },
      { categoria: 'obra', titulo: 'Regenera', cita: 'Tito 3:5' },
      { categoria: 'obra', titulo: 'Intercede por nosotros', cita: 'Romanos 8:26' },
      // símbolos
      { categoria: 'simbolo', titulo: 'Paloma', cita: 'Mateo 3:16' },
      { categoria: 'simbolo', titulo: 'Fuego', cita: 'Hechos 2:3' },
      { categoria: 'simbolo', titulo: 'Viento', cita: 'Juan 3:8' },
      { categoria: 'simbolo', titulo: 'Aceite', cita: '1 Samuel 16:13' },
      // dones
      { categoria: 'don', titulo: 'Sabiduría', cita: '1 Corintios 12:8' },
      { categoria: 'don', titulo: 'Fe', cita: '1 Corintios 12:9' },
      { categoria: 'don', titulo: 'Sanidad', cita: '1 Corintios 12:9' },
      // fruto
      { categoria: 'fruto', titulo: 'Amor', cita: 'Gálatas 5:22' },
      { categoria: 'fruto', titulo: 'Gozo', cita: 'Gálatas 5:22' },
      { categoria: 'fruto', titulo: 'Paz', cita: 'Gálatas 5:22' },
      // por libro (ejemplos, no exhaustivo)
      { categoria: 'por_libro', titulo: 'Génesis: se mueve sobre las aguas', cita: 'Génesis 1:2' },
      { categoria: 'por_libro', titulo: 'Hechos: llena a los discípulos en Pentecostés', cita: 'Hechos 2:4' },
    ],
  });

  console.log('Listo — contenido inicial sembrado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
