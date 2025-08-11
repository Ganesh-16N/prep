// Free ChatGPT API integration
// Using a free alternative to OpenAI's API

interface ChatGPTResponse {
  response: string;
  error?: string;
}

class ChatGPTService {
  private baseUrl = 'https://api.freegpt4.com/v1/chat/completions'; // Example free API
  private apiKey = ''; // Will be set from environment or config

  constructor() {
    // You can set your API key here or load from environment
    this.apiKey = process.env.CHATGPT_API_KEY || '';
  }

  async getExplanation(query: string, context: string = ''): Promise<ChatGPTResponse> {
    try {
      // For now, let's use a mock response since we need to set up the actual API
      // In production, you would use a real free ChatGPT API
      
      const prompt = `Please explain the following ${context} in a clear and concise way: "${query}"`;
      
      // Mock response for demonstration
      const mockResponses = {
        'JavaScript': 'JavaScript is a programming language that enables interactive web pages. It\'s essential for modern web development and runs in browsers.',
        'React': 'React is a JavaScript library for building user interfaces, particularly single-page applications. It uses components and a virtual DOM.',
        'React Native': 'React Native is a framework for building native mobile applications using React and JavaScript. It allows code sharing between iOS and Android.',
        'System Design': 'System Design involves creating scalable and efficient software architectures. It includes database design, API design, and infrastructure planning.',
        'DSA': 'Data Structures and Algorithms (DSA) are fundamental concepts in computer science for organizing and processing data efficiently.',
        'Machine Coding': 'Machine Coding involves writing code to solve specific problems, often in interview settings with time constraints.'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return mock response based on context
      const response = mockResponses[context as keyof typeof mockResponses] || 
        `Here's an explanation of "${query}": This is a programming concept that involves understanding core principles and best practices. It's important to practice regularly and understand the underlying concepts.`;

      return { response };

    } catch (error) {
      console.error('ChatGPT API Error:', error);
      return { 
        response: 'Sorry, I couldn\'t get an explanation right now. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Alternative: Use a different free API
  async getExplanationAlternative(query: string, context: string = ''): Promise<ChatGPTResponse> {
    try {
      // You can integrate with other free APIs like:
      // - Hugging Face Inference API
      // - Cohere API (free tier)
      // - Local models
      
      const prompt = `Explain this ${context}: ${query}`;
      
      // For now, return a helpful response
      const response = `Here's an explanation of "${query}": This is a fundamental concept in programming that you should understand thoroughly. Practice implementing it and read documentation for deeper understanding.`;
      
      return { response };

    } catch (error) {
      console.error('Alternative API Error:', error);
      return { 
        response: 'Unable to get explanation at the moment.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const chatGPTService = new ChatGPTService();
export default chatGPTService; 