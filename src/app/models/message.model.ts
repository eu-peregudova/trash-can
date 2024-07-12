export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ParsedMessage {
  tasksPresent: boolean;
  text: string;
  tasks: string[];
}
