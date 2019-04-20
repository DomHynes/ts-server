import { Router } from 'express';
import MeController from '../controllers/MeController';

const router = Router();

router.get('/details', MeController.details);

export default router;
