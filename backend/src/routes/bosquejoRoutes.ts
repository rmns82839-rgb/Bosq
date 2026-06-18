import { Router } from 'express';
import { getBosquejos, getBosquejoById, createBosquejo, updateBosquejo, deleteBosquejo } from '../controllers/bosquejoController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);
router.get('/', getBosquejos);
router.get('/:id', getBosquejoById);
router.post('/', createBosquejo);
router.put('/:id', updateBosquejo);
router.delete('/:id', deleteBosquejo);
export default router;
