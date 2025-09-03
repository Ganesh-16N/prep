// Google Gemini API integration
// Using Google's free Gemini API for AI explanations

interface GeminiResponse {
  response: string;
  error?: string;
}

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiAPIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    avgLogprobs?: number;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion?: string;
  responseId?: string;
  error?: {
    message: string;
  };
}

class GeminiService {
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private apiKey = ''; // Will be set from environment or config

  constructor() {
    // You can set your API key here or load from environment
    this.apiKey = process.env.GEMINI_API_KEY || 'AIzaSyCGHG5rrUB_vShY6H_FrLslpK1BNV9xhAY';
  }

  async getExplanation(query: string, context: string = ''): Promise<GeminiResponse> {
    try {
      // If no API key is set, return a helpful message
      if (!this.apiKey) {
        return {
          response: 'Please set your Gemini API key in the environment variables (GEMINI_API_KEY) to get AI explanations.',
          error: 'API key not configured'
        };
      }

      const prompt = this.buildPrompt(query, context);
      
      const requestBody: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      };

      console.log('Making request to Gemini API:', `${this.baseUrl}?key=${this.apiKey.substring(0, 10)}...`);
      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      let response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // If the new model fails, try the older model
      if (!response.ok && response.status === 404) {
        console.log('Trying fallback model...');
        const fallbackUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        response = await fetch(`${fallbackUrl}?key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        console.log('Fallback response status:', response.status);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data: GeminiAPIResponse = await response.json();
      
      console.log('Gemini API Response:', JSON.stringify(data, null, 2));

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini API');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      console.log('Extracted response text:', responseText);
      
      return { response: responseText };

    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback to comprehensive mock responses if API fails
      const mockResponses = {
        'JavaScript': `🎯 **JavaScript - Core Concepts**

📚 **What is JavaScript?**
JavaScript is a dynamic, interpreted programming language that powers modern web applications. It's essential for frontend development and increasingly popular for backend (Node.js).

💻 **Key Features:**
• Dynamic typing and automatic memory management
• First-class functions and closures
• Prototypal inheritance
• Event-driven programming
• Asynchronous execution with Promises/async-await

🎯 **Common Interview Questions:**
1. Explain closures and their use cases
2. Difference between var, let, and const
3. How does the event loop work?
4. Explain prototypal inheritance
5. What are Promises and async/await?

🏋️ **Practice Exercise:**
\`\`\`javascript
// Implement a debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
\`\`\`

💡 **Best Practices:**
• Use const by default, let when needed, avoid var
• Prefer arrow functions for callbacks
• Use async/await over raw Promises
• Implement proper error handling

⚠️ **Common Pitfalls:**
• Hoisting misconceptions
• this binding issues
• Memory leaks with closures
• Callback hell

📈 **Advanced Topics for 20+ LPA:**
• Design patterns in JavaScript
• Performance optimization
• Memory management
• Advanced async patterns`,

        'React': `🎯 **React - Modern UI Development**

📚 **What is React?**
React is a declarative, component-based JavaScript library for building user interfaces. It uses a virtual DOM for efficient rendering and state management.

💻 **Core Concepts:**
• Components (Functional & Class)
• Props and State
• Virtual DOM
• JSX syntax
• Hooks (useState, useEffect, useContext)

🎯 **Interview Questions:**
1. Explain the component lifecycle
2. Difference between props and state
3. How does React's reconciliation work?
4. Explain useEffect dependencies
5. Performance optimization techniques

🏋️ **Practice Exercise:**
\`\`\`jsx
// Custom Hook Example
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
\`\`\`

💡 **Best Practices:**
• Use functional components with hooks
• Implement proper dependency arrays
• Optimize with React.memo and useMemo
• Follow component composition patterns

⚠️ **Common Pitfalls:**
• Infinite re-renders
• Missing dependency arrays
• Prop drilling
• Memory leaks in useEffect

📈 **Advanced Topics:**
• Context API and state management
• Performance optimization
• Server-side rendering
• React 18 features`,

        'React Native': `🎯 **React Native - Cross-Platform Mobile**

📚 **What is React Native?**
React Native is a framework for building native mobile applications using React and JavaScript. It allows code sharing between iOS and Android platforms.

💻 **Key Features:**
• Native performance with JavaScript
• Platform-specific components
• Hot reloading for development
• Access to native APIs
• Third-party library ecosystem

🎯 **Interview Questions:**
1. How does React Native bridge work?
2. Difference between React and React Native
3. Platform-specific code handling
4. Performance optimization techniques
5. Navigation patterns

🏋️ **Practice Exercise:**
\`\`\`jsx
// Custom Hook for API calls
function useApiCall(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

💡 **Best Practices:**
• Use FlatList for large lists
• Implement proper error boundaries
• Optimize bundle size
• Handle platform differences

⚠️ **Common Pitfalls:**
• Memory leaks in navigation
• Performance issues with large lists
• Platform-specific bugs
• Bundle size bloat

📈 **Advanced Topics:**
• Native module development
• Performance profiling
• CI/CD for mobile apps
• App store optimization`,

        'System Design': `🎯 **System Design - Scalable Architecture**

📚 **What is System Design?**
System Design is the process of defining the architecture, components, and interfaces of a system to meet specific requirements for scalability, reliability, and performance.

💻 **Key Components:**
• Load Balancers
• Caching (Redis, Memcached)
• Databases (SQL, NoSQL)
• Message Queues
• CDN and Edge Computing

🎯 **Interview Questions:**
1. Design a URL shortener
2. Design a chat application
3. Design a recommendation system
4. Handle high availability
5. Database scaling strategies

🏋️ **Practice Exercise:**
\`\`\`
// Basic Load Balancer Algorithm
class RoundRobinLoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }
  
  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}
\`\`\`

💡 **Best Practices:**
• Start with requirements clarification
• Consider scalability from day one
• Implement proper monitoring
• Design for failure

⚠️ **Common Pitfalls:**
• Over-engineering solutions
• Ignoring non-functional requirements
• Not considering data consistency
• Poor capacity planning

📈 **Advanced Topics:**
• Microservices architecture
• Event-driven systems
• Distributed systems
• Cloud-native design`,

        'DSA': `🎯 **Data Structures & Algorithms**

📚 **Core Concepts:**
DSA is the foundation of efficient programming, involving organizing and processing data effectively to solve computational problems.

💻 **Essential Data Structures:**
• Arrays and Strings
• Linked Lists
• Stacks and Queues
• Trees and Graphs
• Hash Tables
• Heaps

🎯 **Interview Questions:**
1. Implement a LRU Cache
2. Find the longest palindromic substring
3. Design a data structure for O(1) operations
4. Graph traversal algorithms
5. Dynamic programming problems

🏋️ **Practice Exercise:**
\`\`\`javascript
// LRU Cache Implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
\`\`\`

💡 **Best Practices:**
• Always consider time and space complexity
• Start with brute force, then optimize
• Use appropriate data structures
• Practice pattern recognition

⚠️ **Common Pitfalls:**
• Not handling edge cases
• Ignoring space complexity
• Over-optimizing prematurely
• Not testing with examples

📈 **Advanced Topics:**
• Advanced algorithms (Dijkstra, Floyd-Warshall)
• Competitive programming techniques
• Algorithm optimization
• Parallel algorithms`,

        'Machine Coding': `🎯 **Machine Coding - Practical Implementation**

📚 **What is Machine Coding?**
Machine Coding involves implementing real-world features and systems from scratch, testing your ability to write clean, maintainable code under time constraints.

💻 **Key Skills:**
• Clean code principles
• Design patterns
• Error handling
• Testing strategies
• Performance optimization

🎯 **Common Problems:**
1. Implement a parking lot system
2. Design a snake game
3. Build a file system
4. Create a chat application
5. Implement a cache system

🏋️ **Practice Exercise:**
\`\`\`javascript
// Parking Lot System
class ParkingLot {
  constructor(floors, spotsPerFloor) {
    this.floors = floors;
    this.spotsPerFloor = spotsPerFloor;
    this.parkingSpots = Array(floors).fill().map(() => 
      Array(spotsPerFloor).fill(null)
    );
  }
  
  park(vehicleId) {
    for (let floor = 0; floor < this.floors; floor++) {
      for (let spot = 0; spot < this.spotsPerFloor; spot++) {
        if (!this.parkingSpots[floor][spot]) {
          this.parkingSpots[floor][spot] = vehicleId;
          return { floor, spot };
        }
      }
    }
    return null; // No space available
  }
  
  leave(vehicleId) {
    for (let floor = 0; floor < this.floors; floor++) {
      for (let spot = 0; spot < this.spotsPerFloor; spot++) {
        if (this.parkingSpots[floor][spot] === vehicleId) {
          this.parkingSpots[floor][spot] = null;
          return { floor, spot };
        }
      }
    }
    return null;
  }
}
\`\`\`

💡 **Best Practices:**
• Follow SOLID principles
• Write comprehensive tests
• Handle edge cases
• Document your code
• Consider scalability

⚠️ **Common Pitfalls:**
• Not clarifying requirements
• Poor error handling
• Ignoring edge cases
• Not testing thoroughly
• Over-complicating solutions

📈 **Advanced Topics:**
• System design principles
• Performance optimization
• Security considerations
• Deployment strategies`
      };

      const fallbackResponse = mockResponses[context as keyof typeof mockResponses] || 
        `🎯 **Comprehensive Programming Guide**

📚 **Core Concepts**: ${query}
This is a fundamental programming concept that requires deep understanding for senior-level positions.

💻 **Key Points**:
• Understand the underlying principles
• Practice implementation regularly
• Study real-world applications
• Master related technologies

🎯 **Interview Preparation**:
• Review common interview questions
• Practice coding problems
• Understand system design implications
• Prepare for behavioral questions

🏋️ **Practice Strategy**:
• Build projects using this concept
• Solve related coding challenges
• Study open-source implementations
• Participate in code reviews

💡 **Best Practices**:
• Follow industry standards
• Write clean, maintainable code
• Consider performance implications
• Implement proper error handling

⚠️ **Common Mistakes**:
• Not understanding fundamentals
• Ignoring edge cases
• Poor documentation
• Lack of testing

📈 **Advanced Topics**:
• Performance optimization
• Scalability considerations
• Integration patterns
• Industry trends`;

      return { 
        response: fallbackResponse,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private buildPrompt(query: string, context: string = ''): string {
    const basePrompt = `You are an expert programming tutor preparing students for high-paying tech interviews (20+ LPA packages). Provide comprehensive, detailed explanations with practical examples. Format your response like ChatGPT with clean, readable text optimized for dark theme display.`;

    if (context) {
      return `${basePrompt}

**Topic**: ${context}
**Query**: ${query}

Please provide a detailed explanation including:

**Core Concepts**: Fundamental principles and theory
**Code Examples**: Practical implementation with syntax
**Interview Questions**: Common questions asked in top companies
**Practice Exercises**: Hands-on coding problems
**Best Practices**: Industry standards and optimization tips
**Common Pitfalls**: Mistakes to avoid
**Advanced Topics**: For senior-level positions

Format your response with:
- Clean, readable text optimized for dark theme
- Clear sections with bold headers
- Code blocks with proper syntax highlighting
- Bullet points for key takeaways
- Practical examples that demonstrate real-world usage
- Use proper spacing and formatting
- Ensure good contrast for dark backgrounds

Make it comprehensive enough for someone targeting 20+ LPA positions.`;
    }

    return `${basePrompt}

**Query**: ${query}

Please provide a detailed explanation including:

**Core Concepts**: Fundamental principles and theory
**Code Examples**: Practical implementation with syntax
**Interview Questions**: Common questions asked in top companies
**Practice Exercises**: Hands-on coding problems
**Best Practices**: Industry standards and optimization tips
**Common Pitfalls**: Mistakes to avoid
**Advanced Topics**: For senior-level positions

Format your response with:
- Clean, readable text optimized for dark theme
- Clear sections with bold headers
- Code blocks with proper syntax highlighting
- Bullet points for key takeaways
- Practical examples that demonstrate real-world usage
- Use proper spacing and formatting
- Ensure good contrast for dark backgrounds

Make it comprehensive enough for someone targeting 20+ LPA positions.`;
  }

  // Method to set API key dynamically
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Method to check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const geminiService = new GeminiService();
export default geminiService; 