
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// ─── CATÁLOGO DE CURSOS ──────────────────────────────────────────
// Solo los cursos publicados (activo=true), con el conteo de lecciones.
export const getCursos = async (_req: Request, res: Response) => {
  try {
    const cursos = await prisma.curso.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
      include: { _count: { select: { lecciones: true } } },
    });
    res.json(cursos);
  } catch (error) {
    console.error('Error fetching cursos:', error);
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

// ─── UN CURSO CON SU ÍNDICE DE LECCIONES ─────────────────────────
// Por slug ("apocalipsis"). Trae la lista de lecciones (solo lo del
// índice: orden, semana, título, tema, pasaje), no el contenido completo.
export const getCursoPorSlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const curso = await prisma.curso.findUnique({
      where: { slug },
      include: {
        lecciones: {
          orderBy: { orden: 'asc' },
          select: {
            id: true,
            orden: true,
            semana: true,
            titulo: true,
            tema: true,
            pasajeBase: true,
          },
        },
      },
    });
    if (!curso) {
      res.status(404).json({ error: 'Curso no encontrado' });
      return;
    }
    res.json(curso);
  } catch (error) {
    console.error('Error fetching curso por slug:', error);
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};

// ─── UNA LECCIÓN COMPLETA ────────────────────────────────────────
// Todo el contenido de estudio + las preguntas del examen SIN revelar
// cuál opción es la correcta (esCorrecta se queda en el servidor).
export const getLeccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leccion = await prisma.leccion.findUnique({
      where: { id },
      include: {
        curso: { select: { id: true, slug: true, nombre: true } },
        versiculosMemoria: { orderBy: { orden: 'asc' } },
        interpretaciones: { orderBy: { orden: 'asc' } },
        simbolos: { orderBy: { orden: 'asc' } },
        tipologias: { orderBy: { orden: 'asc' } },
        profecias: { orderBy: { orden: 'asc' } },
        ciudades: { orderBy: { orden: 'asc' } },
        preguntas: {
          orderBy: { orden: 'asc' },
          select: {
            id: true,
            enunciado: true,
            orden: true,
            // ⚠️ Nunca 'esCorrecta': el frontend solo ve texto y orden.
            opciones: {
              orderBy: { orden: 'asc' },
              select: { id: true, texto: true, orden: true },
            },
          },
        },
      },
    });
    if (!leccion) {
      res.status(404).json({ error: 'Lección no encontrada' });
      return;
    }
    res.json(leccion);
  } catch (error) {
    console.error('Error fetching leccion:', error);
    res.status(500).json({ error: 'Error al obtener la lección' });
  }
};

const MAX_INTENTOS = 3;
const NOTA_APROBACION = 70; // %

// ─── ENVIAR EXAMEN ───────────────────────────────────────────────
// Recibe { respuestas: { [preguntaId]: opcionId } }. Todo el cálculo y
// el control de intentos ocurre en el servidor; las respuestas correctas
// nunca salen (salvo al agotar los intentos, para retroalimentar).
export const enviarExamen = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user.id;
    const { id: leccionId } = req.params;
    const respuestas: Record<string, string> = req.body?.respuestas || {};

    const intentosPrevios = await prisma.intentoExamen.count({
      where: { usuarioId, leccionId },
    });

    const yaAprobo = await prisma.intentoExamen.findFirst({
      where: { usuarioId, leccionId, aprobado: true },
    });
    if (yaAprobo) {
      res.status(409).json({ error: 'Ya aprobaste este examen.', aprobado: true });
      return;
    }
    if (intentosPrevios >= MAX_INTENTOS) {
      res.status(409).json({ error: 'Ya usaste tus 3 intentos.', intentosAgotados: true });
      return;
    }

    const preguntas = await prisma.pregunta.findMany({
      where: { leccionId },
      include: { opciones: { select: { id: true, esCorrecta: true } } },
    });
    if (preguntas.length === 0) {
      res.status(404).json({ error: 'Esta lección no tiene examen.' });
      return;
    }

    let aciertos = 0;
    const detalle = preguntas.map((preg) => {
      const correcta = preg.opciones.find((o) => o.esCorrecta);
      const marcada = respuestas[preg.id] || null;
      const acerto = !!correcta && marcada === correcta.id;
      if (acerto) aciertos++;
      return { preguntaId: preg.id, acerto, correctaId: correcta?.id || null };
    });

    const puntaje = Math.round((aciertos / preguntas.length) * 100);
    const aprobado = puntaje >= NOTA_APROBACION;
    const numeroIntento = intentosPrevios + 1;

    await prisma.intentoExamen.create({
      data: { usuarioId, leccionId, numeroIntento, puntaje, aprobado, respuestas },
    });

    const intentosRestantes = MAX_INTENTOS - numeroIntento;
    const revelarCorrectas = aprobado || intentosRestantes <= 0;

    res.json({
      puntaje,
      aprobado,
      aciertos,
      totalPreguntas: preguntas.length,
      numeroIntento,
      intentosRestantes,
      detalle: detalle.map((d) => ({
        preguntaId: d.preguntaId,
        acerto: d.acerto,
        correctaId: revelarCorrectas ? d.correctaId : undefined,
      })),
    });
  } catch (error) {
    console.error('Error enviando examen:', error);
    res.status(500).json({ error: 'Error al calificar el examen' });
  }
};

// ─── ESTADO DEL EXAMEN (para el usuario) ─────────────────────────
export const getEstadoExamen = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user.id;
    const { id: leccionId } = req.params;

    const intentos = await prisma.intentoExamen.findMany({
      where: { usuarioId, leccionId },
      orderBy: { numeroIntento: 'asc' },
      select: { numeroIntento: true, puntaje: true, aprobado: true, creadoEn: true },
    });

    const aprobado = intentos.some((i) => i.aprobado);
    const mejorPuntaje = intentos.reduce((m, i) => Math.max(m, i.puntaje), 0);

    res.json({
      intentosUsados: intentos.length,
      intentosRestantes: Math.max(0, MAX_INTENTOS - intentos.length),
      aprobado,
      mejorPuntaje,
      intentos,
    });
  } catch (error) {
    console.error('Error obteniendo estado del examen:', error);
    res.status(500).json({ error: 'Error al obtener el estado del examen' });
  }
};

// ─── MARCAR LECCIÓN COMPLETADA (progreso, manual) ────────────────
export const completarLeccion = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user.id;
    const { id: leccionId } = req.params;

    const progreso = await prisma.progreso.upsert({
      where: { usuarioId_leccionId: { usuarioId, leccionId } },
      update: { estado: 'completada', completadaEn: new Date() },
      create: { usuarioId, leccionId, estado: 'completada', completadaEn: new Date() },
    });

    res.json(progreso);
  } catch (error) {
    console.error('Error completando leccion:', error);
    res.status(500).json({ error: 'Error al marcar la lección como completada' });
  }
};

// ─── PROGRESO DEL USUARIO EN UN CURSO ────────────────────────────
export const getProgresoCurso = async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.user.id;
    const { slug } = req.params;

    const curso = await prisma.curso.findUnique({
      where: { slug },
      include: { lecciones: { select: { id: true } } },
    });
    if (!curso) {
      res.status(404).json({ error: 'Curso no encontrado' });
      return;
    }

    const leccionIds = curso.lecciones.map((l) => l.id);
    const progresos = await prisma.progreso.findMany({
      where: { usuarioId, leccionId: { in: leccionIds } },
    });
    const intentos = await prisma.intentoExamen.findMany({
      where: { usuarioId, leccionId: { in: leccionIds } },
      select: { leccionId: true, puntaje: true, aprobado: true },
    });

    res.json({ progresos, intentos, totalLecciones: leccionIds.length });
  } catch (error) {
    console.error('Error obteniendo progreso del curso:', error);
    res.status(500).json({ error: 'Error al obtener el progreso' });
  }
};