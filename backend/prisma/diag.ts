import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cursos = await prisma.curso.findMany({
    select: { slug: true, nombre: true, activo: true, _count: { select: { lecciones: true } } },
  });
  console.log('=== CURSOS ===');
  console.log(JSON.stringify(cursos, null, 2));

  const lecciones = await prisma.leccion.findMany({
    where: { curso: { slug: 'apocalipsis' } },
    select: { orden: true, titulo: true },
    orderBy: { orden: 'asc' },
  });
  console.log('\n=== LECCIONES DE apocalipsis:', lecciones.length, '===');
  lecciones.forEach((x) => console.log(x.orden, '-', x.titulo));
}

main().finally(() => prisma.$disconnect());