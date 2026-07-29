// Agregar esta función a backend/src/controllers/bibliaEstudiosController.ts
// (junto a getAngeles, getTitulosMesias, etc.)

export const getJesusEnLibros = async (_req: Request, res: Response) => {
  try {
    const libros = await prisma.jesusEnLibro.findMany({ orderBy: { orden: 'asc' } });
    res.json(libros);
  } catch (error) {
    console.error('Error fetching jesus en libros:', error);
    res.status(500).json({ error: 'Error al obtener el contenido de Jesús en cada libro' });
  }
};
