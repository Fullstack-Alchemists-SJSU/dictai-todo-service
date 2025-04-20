import { Router } from 'express';
import todoController from '../controllers/todoController';

const router = Router();
router.post('/voice', todoController.extractTodosFromAudio);
export default router;
