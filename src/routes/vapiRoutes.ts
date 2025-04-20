import { Router } from 'express';
import vapiController from '../controllers/vapiController';

const router = Router();

router.get('/calls/:callId', vapiController.getCall);

export default router; 