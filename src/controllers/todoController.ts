import { Request, Response } from 'express';
import vapiService from '../services/vapiService';
import openAIService from '../services/openAIService';

class TodoController {
  async extractTodosFromAudio(req: Request, res: Response) {
    try {
      const { audioUrl } = req.body;

      // 1. Transcribe audio using Vapi
      const transcription = await vapiService.transcribeAudio(audioUrl);

      // 2. Extract todos using OpenAI
      const todos = await openAIService.extractTodos(transcription.transcript);

      res.json({
        success: true,
        data: {
          todos,
          transcription: transcription.transcript
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