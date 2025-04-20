import axios from 'axios';
import { TranscriptionResponse } from '../types/toDoTypes';

class VapiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.VAPI_API_KEY!;
    this.baseUrl = 'https://api.vapi.ai/v1';
  }

  async transcribeAudio(audioUrl: string): Promise<TranscriptionResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/transcribe`, {
        audio_url: audioUrl
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        text: response.data.text,
        duration: response.data.duration
      };
    } catch (error) {
      console.error('Vapi transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }
}

export default new VapiService();