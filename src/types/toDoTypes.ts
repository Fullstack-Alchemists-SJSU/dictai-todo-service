export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
  }
  
  export interface TranscriptionResponse {
    text: string;
    duration: number;
  }
  
  export interface TodoExtractionResponse {
    todos: TodoItem[];
    context: string;
  }
  