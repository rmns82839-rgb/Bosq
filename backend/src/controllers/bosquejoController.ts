import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBosquejos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const bosquejos = await prisma.bosquejo.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } });
    res.json(bosquejos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener bosquejos' });
  }
};

export const getBosquejoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const bosquejo = await prisma.bosquejo.findFirst({ where: { id, userId } });
    if (!bosquejo) return res.status(404).json({ error: 'Bosquejo no encontrado' });
    res.json(bosquejo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener bosquejo' });
  }
};

export const createBosquejo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { titulo, cita, introduccion, aplicacion, conclusion, puntos } = req.body;
    const bosquejo = await prisma.bosquejo.create({
      data: { titulo, cita, introduccion, aplicacion, conclusion, puntos: puntos || [], userId }
    });
    res.status(201).json(bosquejo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear bosquejo' });
  }
};

export const updateBosquejo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const { titulo, cita, introduccion, aplicacion, conclusion, puntos } = req.body;
    const existing = await prisma.bosquejo.findFirst({ where: { id, userId } });
    if (!existing) return res.status(404).json({ error: 'Bosquejo no encontrado' });
    const bosquejo = await prisma.bosquejo.update({
      where: { id },
      data: { titulo, cita, introduccion, aplicacion, conclusion, puntos: puntos || [] }
    });
    res.json(bosquejo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar bosquejo' });
  }
};

export const deleteBosquejo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const existing = await prisma.bosquejo.findFirst({ where: { id, userId } });
    if (!existing) return res.status(404).json({ error: 'Bosquejo no encontrado' });
    await prisma.bosquejo.delete({ where: { id } });
    res.json({ message: 'Bosquejo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar bosquejo' });
  }
};
