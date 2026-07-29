// prisma/seedNumeros.ts
// Amplía la tabla NumeroBiblico. Igual que la nota aclaratoria que ya
// tenías en Numerologia.jsx: solo se incluyen números cuyo significado
// se sostiene en el USO CONSISTENTE del propio texto bíblico, no en
// especulaciones numerológicas externas. Por eso quedan fuera números
// como el 9 o el 13, cuyos "significados" populares no tienen ese
// respaldo textual sólido.
//
// Corre con: npx ts-node prisma/seedNumeros.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Borrando números existentes...');
  await prisma.numeroBiblico.deleteMany({});

  console.log('Sembrando 17 números bíblicos...');

  await prisma.numeroBiblico.createMany({
    data: [
      { numero: 1, significado: 'Unidad de Dios', categoria: 'divino', cita: 'Deuteronomio 6:4', descripcion: 'Jehová es uno.' },
      { numero: 2, significado: 'Testimonio válido', categoria: 'legal', cita: 'Deuteronomio 19:15', descripcion: 'Por boca de dos o tres testigos se establece todo asunto.' },
      { numero: 3, significado: 'La Trinidad y la resurrección', categoria: 'divino', cita: 'Mateo 12:40', descripcion: 'Tres días y tres noches, como Jonás.' },
      { numero: 4, significado: 'Universalidad, alcance completo de la creación', categoria: 'creación', cita: 'Apocalipsis 7:1', descripcion: 'Los cuatro ángeles en las cuatro esquinas de la tierra, los cuatro vientos.' },
      { numero: 5, significado: 'Gracia', categoria: 'gracia', cita: 'Efesios 2:8', descripcion: 'Los cinco libros de Moisés (la Torá) enmarcan la entrega de la ley por gracia.' },
      { numero: 6, significado: 'El hombre, imperfección', categoria: 'humano', cita: 'Génesis 1:26-31', descripcion: 'El hombre fue creado en el sexto día.' },
      { numero: 7, significado: 'Perfección y plenitud', categoria: 'divino', cita: 'Génesis 2:2-3', descripcion: 'Dios reposó el séptimo día. Es el número más repetido con sentido de plenitud en toda la Escritura.' },
      { numero: 8, significado: 'Nuevo comienzo', categoria: 'nuevo_comienzo', cita: 'Génesis 17:12', descripcion: 'La circuncisión al octavo día; ocho personas se salvaron en el arca (2 Pedro 3:20) para empezar de nuevo.' },
      { numero: 10, significado: 'Ley y responsabilidad', categoria: 'legal', cita: 'Éxodo 20:1-17', descripcion: 'Los diez mandamientos.' },
      { numero: 12, significado: 'Gobierno de Dios sobre su pueblo', categoria: 'gobierno', cita: 'Mateo 19:28', descripcion: '12 tribus de Israel, 12 apóstoles.' },
      { numero: 14, significado: 'Doble plenitud (2×7), estructura profética', categoria: 'profético', cita: 'Mateo 1:17', descripcion: 'La genealogía de Jesús se agrupa deliberadamente en tres series de 14 generaciones.' },
      { numero: 40, significado: 'Prueba y juicio', categoria: 'prueba', cita: 'Mateo 4:2', descripcion: '40 días de ayuno de Jesús en el desierto; 40 años de Israel en el desierto; 40 días de lluvia en el diluvio.' },
      { numero: 50, significado: 'Liberación y jubileo', categoria: 'gracia', cita: 'Levítico 25:10', descripcion: 'El año de jubileo cada 50 años; Pentecostés ocurre 50 días después de la Pascua (Hechos 2:1).' },
      { numero: 70, significado: 'Plenitud de tiempo señalado', categoria: 'profético', cita: 'Daniel 9:24', descripcion: 'Las setenta semanas de Daniel; los setenta ancianos de Israel (Éxodo 24:1).' },
      { numero: 144, significado: 'El pueblo de Dios en su totalidad simbólica (12×12)', categoria: 'escatológico', cita: 'Apocalipsis 7:4', descripcion: 'Los 144.000 sellados de las doce tribus de Israel.' },
      { numero: 666, significado: 'Número de la bestia', categoria: 'escatológico', cita: 'Apocalipsis 13:18', descripcion: 'Número de hombre, para quien tenga entendimiento.' },
      { numero: 1000, significado: 'Plenitud, un lapso completo ante Dios', categoria: 'divino', cita: '2 Pedro 3:8', descripcion: 'Para Jehová un día es como mil años, y mil años como un día.' },
    ],
  });

  const total = await prisma.numeroBiblico.count();
  console.log(`Listo — ${total} números sembrados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
