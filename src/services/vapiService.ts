import axios from 'axios';
import { TranscriptionResponse } from '../types/toDoTypes';

class VapiService {
  private baseUrl = 'https://api.vapi.ai';
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('VAPI_API_KEY environment variable is required');
    }
  }

  async getCall(callId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/call/${callId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching call data:', error);
      throw error;
    }
  }

  async transcribeAudio(callId: string): Promise<TranscriptionResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/call/${callId}`, {
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      const transcript = response.data.transcript || response.data.artifact?.transcript;

      return {
        transcript: transcript || '',
      };
    } catch (error) {
      console.error('Vapi transcript fetch error:', error);
      throw new Error('Failed to fetch transcript');
    }
  }
}

export default new VapiService();