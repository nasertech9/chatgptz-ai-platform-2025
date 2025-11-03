
import { Personality, PromptCategory } from './types';

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    name: "Writing",
    prompts: [
      "Write a short story about a robot who discovers music.",
      "Summarize the plot of 'Hamlet' in three sentences.",
      "Generate five creative blog post titles about productivity.",
    ],
  },
  {
    name: "Code",
    prompts: [
      "Write a Python function to check if a string is a palindrome.",
      "Explain the concept of closures in JavaScript.",
      "Generate a boilerplate HTML5 document.",
    ],
  },
  {
    name: "Website",
    prompts: [
      "Generate HTML and CSS for a modern landing page for a tech startup.",
      "Create a simple portfolio website layout with a header, gallery, and footer.",
      "Design a product card component with an image, title, price, and 'Add to Cart' button using HTML and CSS.",
    ]
  },
  {
    name: "Art & Creativity",
    prompts: [
      "Describe a futuristic city in vivid detail.",
      "Suggest a color palette for a website about nature.",
      "Come up with a concept for a surrealist painting.",
    ],
  },
  {
    name: "Business",
    prompts: [
      "Draft a professional email to a client requesting feedback.",
      "Brainstorm three marketing slogans for a new coffee brand.",
      "Outline a business plan for a subscription box service.",
    ],
  },
];

export const PERSONALITY_PROMPTS: Record<Personality, string> = {
  Friendly: "You are ChatGPTZ, a friendly and helpful AI assistant. Your responses should be encouraging and easy to understand. Use emojis occasionally.",
  Professional: "You are ChatGPTZ, a professional AI assistant. Your responses should be formal, precise, and well-structured. Avoid slang and colloquialisms.",
  Creative: "You are ChatGPTZ, a highly creative AI. Your responses should be imaginative, inspiring, and think outside the box. Use vivid language and metaphors.",
  Witty: "You are ChatGPTZ, a witty and humorous AI. Your responses should be clever, sarcastic, and entertaining, but always remain helpful.",
};
