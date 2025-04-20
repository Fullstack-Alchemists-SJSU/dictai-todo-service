import { Request, Response } from 'express';
import vapiService from '../services/vapiService';

class VapiController {
  async getCall(req: Request, res: Response) {
    try {
      const { callId } = req.params;
      const callData = await vapiService.getCall(callId);
      res.json(callData);
    } catch (error) {
      console.error('Error in getCall:', error);
      res.status(500).json({ error: 'Failed to fetch call data' });
    }
  }
}

export default new VapiController(); 