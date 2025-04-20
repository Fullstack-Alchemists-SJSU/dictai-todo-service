import OpenAI from 'openai';
import { TodoItem } from '../types/toDoTypes';

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!
    });
  }

  async extractTodos(text: string): Promise<TodoItem[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a task extraction assistant. Extract actionable todo items from the given text. 
            For each todo, determine:
            1. The task description
            2. Priority (high/medium/low)
            3. Due date if mentioned
            Return the items in a structured format.`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      // Parse the response and structure it into TodoItems
    const messageContent = response.choices[0].message.content;
    if (!messageContent) {
    throw new Error('OpenAI response has no content');
    }
    const todos = this.parseOpenAIResponse(messageContent);
      return todos;
    } catch (error) {
      console.error('OpenAI extraction error:', error);
      throw new Error('Failed to extract todos');
    }
  }

  private parseOpenAIResponse(response: string): TodoItem[] {
    // Implement parsing logic based on your prompt structure
    // This is a simplified example
    return response.split('\n').map((line, index) => ({
      id: `todo-${Date.now()}-${index}`,
      text: line.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium' // Default priority
    }));
  }
}

export default new OpenAIService();