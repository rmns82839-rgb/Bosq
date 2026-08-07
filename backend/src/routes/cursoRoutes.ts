import { Router } from 'express';
import {
  getCursos,
  getCursoPorSlug,
  getLeccion,
  enviarExamen,
  getEstadoExamen,
  completarLeccion,
  getProgresoCurso,
} from '../controllers/cursoController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Catálogo y navegación
router.get('/cursos', getCursos);
router.get('/cursos/:slug', getCursoPorSlug);
router.get('/lecciones/:id', getLeccion);

// Examen y progreso
router.post('/lecciones/:id/examen', enviarExamen);
router.get('/lecciones/:id/examen/estado', getEstadoExamen);
router.post('/lecciones/:id/completar', completarLeccion);
router.get('/cursos/:slug/progreso', getProgresoCurso);

export default router;