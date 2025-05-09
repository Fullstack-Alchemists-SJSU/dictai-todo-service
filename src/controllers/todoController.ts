import { Request, Response } from 'express';
import openAIService from '../services/openAIService';

class TodoController {
  async extractTodosFromAudio(req: Request, res: Response) {
    try {
      const { transcript } = req.body;

      // 2. Extract todos using OpenAI
      const todos = await openAIService.extractTodos(transcript);

      res.json({
        success: true,
        data: {
          todos,
          transcription: transcript
        }
      });
    } catch (error) {
      console.error('Todo extraction error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to extract todos'
      });
    }
  }
}

export default new TodoController();