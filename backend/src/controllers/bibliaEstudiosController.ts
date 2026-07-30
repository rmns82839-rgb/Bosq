import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── ANGELOLOGÍA ────────────────────────────────────────────────
export const getAngeles = async (_req: Request, res: Response) => {
  try {
    const angeles = await prisma.angel.findMany({ orderBy: { nombre: 'asc' } });
    res.json(angeles);
  } catch (error) {
    console.error('Error fetching angeles:', error);
    res.status(500).json({ error: 'Error al obtener ángeles' });
  }
};

// ─── CRISTOLOGÍA ────────────────────────────────────────────────
export const getTitulosMesias = async (_req: Request, res: Response) => {
  try {
    const titulos = await prisma.tituloMesias.findMany({ orderBy: { titulo: 'asc' } });
    res.json(titulos);
  } catch (error) {
    console.error('Error fetching titulos mesias:', error);
    res.status(500).json({ error: 'Error al obtener títulos del Mesías' });
  }
};

// ─── NUMEROLOGÍA ────────────────────────────────────────────────
export const getNumerosBiblicos = async (_req: Request, res: Response) => {
  try {
    const numeros = await prisma.numeroBiblico.findMany({ orderBy: { numero: 'asc' } });
    res.json(numeros);
  } catch (error) {
    console.error('Error fetching numeros biblicos:', error);
    res.status(500).json({ error: 'Error al obtener números bíblicos' });
  }
};

// ─── REYES DE ISRAEL Y JUDÁ ─────────────────────────────────────
export const getReyes = async (_req: Request, res: Response) => {
  try {
    const reyes = await prisma.rey.findMany({ orderBy: { inicioAc: 'desc' } });
    res.json(reyes);
  } catch (error) {
    console.error('Error fetching reyes:', error);
    res.status(500).json({ error: 'Error al obtener reyes' });
  }
};

// ─── PROFECÍAS MESIÁNICAS ───────────────────────────────────────
export const getProfecias = async (_req: Request, res: Response) => {
  try {
    const profecias = await prisma.profeciaMesianica.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(profecias);
  } catch (error) {
    console.error('Error fetching profecias:', error);
    res.status(500).json({ error: 'Error al obtener profecías' });
  }
};

// ─── JUICIOS DE JEHOVÁ ───────────────────────────────────────────
export const getJuicios = async (_req: Request, res: Response) => {
  try {
    const juicios = await prisma.juicioJehova.findMany({ orderBy: { estado: 'asc' } });
    res.json(juicios);
  } catch (error) {
    console.error('Error fetching juicios:', error);
    res.status(500).json({ error: 'Error al obtener juicios de Jehová' });
  }
};

// ─── PALABRAS DE JESÚS ───────────────────────────────────────────
export const getPalabrasJesus = async (_req: Request, res: Response) => {
  try {
    const palabras = await prisma.palabraJesus.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(palabras);
  } catch (error) {
    console.error('Error fetching palabras de jesus:', error);
    res.status(500).json({ error: 'Error al obtener palabras de Jesús' });
  }
};

// ─── ESPÍRITU SANTO (6 categorías, una tabla, filtradas por `categoria`) ──
function getEspirituPorCategoria(categoria: string, porOrden = false) {
  return async (_req: Request, res: Response) => {
    try {
      const items = await prisma.espirituSanto.findMany({
        where: { categoria },
        // `por_libro` y `fruto` llevan un orden propio (canónico y el de
        // Gálatas 5); el resto se ordena alfabéticamente.
        orderBy: porOrden ? { orden: 'asc' } : { titulo: 'asc' },
      });
      res.json(items);
    } catch (error) {
      console.error(`Error fetching espiritu santo (${categoria}):`, error);
      res.status(500).json({ error: 'Error al obtener contenido del Espíritu Santo' });
    }
  };
}

export const getNaturalezaEspiritu = getEspirituPorCategoria('naturaleza');
export const getNombresEspiritu = getEspirituPorCategoria('nombre');
export const getObrasEspiritu = getEspirituPorCategoria('obra');
export const getSimbolosEspiritu = getEspirituPorCategoria('simbolo');
export const getDonesEspiritu = getEspirituPorCategoria('don');
export const getFrutoEspiritu = getEspirituPorCategoria('fruto', true);
export const getEspirituPorLibro = getEspirituPorCategoria('por_libro', true);

// ─── JESÚS EN CADA LIBRO ──────────────────────────────────────────
export const getJesusEnLibros = async (_req: Request, res: Response) => {
  try {
    const libros = await prisma.jesusEnLibro.findMany({ orderBy: { orden: 'asc' } });
    res.json(libros);
  } catch (error) {
    console.error('Error fetching jesus en libros:', error);
    res.status(500).json({ error: 'Error al obtener el contenido de Jesús en cada libro' });
  }
};

// ─── PATRONES BÍBLICOS ────────────────────────────────────────────
export const getPatronesBiblicos = async (_req: Request, res: Response) => {
  try {
    const patrones = await prisma.patronBiblico.findMany({ orderBy: { categoria: 'asc' } });
    res.json(patrones);
  } catch (error) {
    console.error('Error fetching patrones biblicos:', error);
    res.status(500).json({ error: 'Error al obtener patrones bíblicos' });
  }
};

// ─── ESPÍRITU SANTO: todo el estudio en una sola llamada ─────────
// Más simple que nueve endpoints separados: la página filtra por
// categoría del lado del cliente.
export const getEspirituSantoTodo = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.espirituSanto.findMany({ orderBy: { id: 'asc' } });
    res.json(items);
  } catch (error) {
    console.error('Error fetching espiritu santo:', error);
    res.status(500).json({ error: 'Error al obtener el estudio del Espíritu Santo' });
  }
};
