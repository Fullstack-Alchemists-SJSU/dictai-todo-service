import { Router } from 'express';
import todoController from '../controllers/todoController';

const router = Router();
router.post('/create', todoController.extractTodosFromAudio);
export default router;
