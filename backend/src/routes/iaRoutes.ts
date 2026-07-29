import { Router } from 'express';
import { preguntarSobre } from '../controllers/iaController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.post('/preguntar', preguntarSobre);

export default router;
