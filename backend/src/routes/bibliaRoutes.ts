import { Router } from 'express';
import { buscarVersiculo, versiculoAleatorio } from '../controllers/bibliaController';
import {
  getAngeles,
  getTitulosMesias,
  getNumerosBiblicos,
  getReyes,
  getProfecias,
  getJuicios,
  getPalabrasJesus,
  getNombresEspiritu,
  getObrasEspiritu,
  getSimbolosEspiritu,
  getDonesEspiritu,
  getFrutoEspiritu,
  getEspirituPorLibro,
} from '../controllers/bibliaEstudiosController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Versículo puntual (ya existía)
router.get('/buscar/*', buscarVersiculo);
router.get('/random', versiculoAleatorio);

// Módulos de estudio (reconstruidos — guardan solo la cita, no el texto)
router.get('/angeles', getAngeles);
router.get('/titulos-mesias', getTitulosMesias);
router.get('/numeros-biblicos', getNumerosBiblicos);
router.get('/reyes', getReyes);
router.get('/profecias', getProfecias);
router.get('/juicios', getJuicios);
router.get('/palabras-jesus', getPalabrasJesus);
router.get('/nombres-espiritu', getNombresEspiritu);
router.get('/obras-espiritu', getObrasEspiritu);
router.get('/simbolos-espiritu', getSimbolosEspiritu);
router.get('/dones-espiritu', getDonesEspiritu);
router.get('/fruto-espiritu', getFrutoEspiritu);
router.get('/espiritu-por-libro', getEspirituPorLibro);

export default router;
