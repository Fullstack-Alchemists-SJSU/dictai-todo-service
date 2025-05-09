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
            content: `You are a task extraction assistant. Your job is to extract actionable todo items from the provided text.

              Instructions:
              - Carefully read the input text.
              - Identify all actionable todo items.
              - For each todo item, extract:
                  1. Task description (what needs to be done)
                  2. Priority (choose one: high, medium, or low; infer if not stated)
                  3. Due date (if explicitly mentioned; otherwise, leave blank)
              - If the text does not contain any actionable todo items, return empty array.

              Output format:
              Return a JSON array of objects, each with the following fields:
              - description: string
              - priority: "high" | "medium" | "low"
              - due_date: string (ISO 8601 format, e.g., "2025-05-08") or null

              Example input:
              """
              Please finish the quarterly report by Friday and send a summary to the team. Also, schedule a follow-up meeting next week.
              """

              Example output:
              [
                {
                  "description": "Finish the quarterly report",
                  "priority": "high",
                  "due_date": "2025-05-09"
                },
                {
                  "description": "Send a summary to the team",
                  "priority": "medium",
                  "due_date": null
                },
                {
                  "description": "Schedule a follow-up meeting",
                  "priority": "low",
                  "due_date": null
                }
              ]
              """

            `
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
    console.log(messageContent);
    if (!messageContent) {
      throw new Error('OpenAI response has no content');
    }
    const todos = JSON.parse(messageContent);
      return todos;
    } catch (error) {
      console.error('OpenAI extraction error:', error);
      throw new Error('Failed to extract todos');
    }
  }

  private parseOpenAIResponse(response: string): TodoItem[] {
    // Implement parsing logic based on your prompt structure
    // This is a simplified example
    if(response === "No todos found"){
      return [];
    }else{
      return response.split('\n').map((line, index) => ({
        id: `todo-${Date.now()}-${index}`,
        text: line.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium' // Default priority
      }));
    }
  }
}

export default new OpenAIService();