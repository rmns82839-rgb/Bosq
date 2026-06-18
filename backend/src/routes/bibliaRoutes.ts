import { Router } from 'express';
import { buscarVersiculo, versiculoAleatorio } from '../controllers/bibliaController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);
router.get('/buscar/*', buscarVersiculo);
router.get('/random', versiculoAleatorio);
export default router;
