
export type Author = 'user' | 'bot';

export interface Message {
  author: Author;
  content: string;
}

export type Personality = 'Friendly' | 'Professional' | 'Creative' | 'Witty';

export interface PromptCategory {
  name: string;
  prompts: string[];
}

export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  email: string;
}

export type ViewMode = 'chat' | 'preview';
