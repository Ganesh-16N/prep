import { Task, Subtask, EnhancedResource } from '../types';

// JavaScript Tasks
export const javascriptTasks: Task[] = [
  {
    id: 'js-closures',
    title: 'Master JavaScript Closures',
    description: 'Deep dive into closures, lexical scoping, and practical applications',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 120,
    tags: ['closures', 'scoping', 'functions'],
    resources: [
      {
        id: 'js-closures-1',
        title: 'Understanding Closures in JavaScript',
        url: 'https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36',
        type: 'medium',
        difficulty: 'intermediate',
        estimatedReadTime: 15,
        rating: 4.8,
        lastUpdated: new Date('2024-01-15'),
        author: 'Eric Elliott',
        tags: ['javascript', 'closures', 'interview'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.8,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      },
      {
        id: 'js-closures-2',
        title: 'JavaScript Closures Explained',
        url: 'https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd',
        type: 'dev.to',
        difficulty: 'beginner',
        estimatedReadTime: 12,
        rating: 4.9,
        lastUpdated: new Date('2024-01-10'),
        author: 'Lydia Hallie',
        tags: ['javascript', 'closures', 'visualization'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.9,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.92,
        helpfulnessScore: 4.8
      },
      {
        id: 'js-closures-3',
        title: 'Closures in JavaScript - MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.5,
        lastUpdated: new Date('2024-01-20'),
        author: 'MDN Contributors',
        tags: ['javascript', 'closures', 'documentation'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.98,
        contentFreshness: 0.7,
        userCompletionRate: 0.78,
        helpfulnessScore: 4.4
      }
    ],
    subtasks: [
      {
        id: 'js-closures-sub-1',
        title: 'Understand lexical scoping',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Learn how variables are scoped in JavaScript'
      },
      {
        id: 'js-closures-sub-2',
        title: 'Practice closure examples',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Write your own closure functions'
      },
      {
        id: 'js-closures-sub-3',
        title: 'Solve closure interview questions',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Practice common closure problems'
      },
      {
        id: 'js-closures-sub-4',
        title: 'Build a counter with closures',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Create a counter that maintains state'
      },
      {
        id: 'js-closures-sub-5',
        title: 'Implement module pattern',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Use closures to create private variables'
      }
    ],
    prerequisites: [],
    followUpTasks: ['js-promises', 'js-async-await'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      interval: 7,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 120,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-promises',
    title: 'Master JavaScript Promises',
    description: 'Learn Promise API, async/await, and error handling',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 90,
    tags: ['promises', 'async', 'error-handling'],
    resources: [
      {
        id: 'js-promises-1',
        title: 'JavaScript Promises: An Introduction',
        url: 'https://web.dev/promises/',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 10,
        rating: 4.7,
        lastUpdated: new Date('2024-01-12'),
        author: 'Web.dev',
        tags: ['javascript', 'promises', 'async'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.8,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'js-promises-sub-1',
        title: 'Understand Promise states',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Learn pending, fulfilled, rejected states'
      },
      {
        id: 'js-promises-sub-2',
        title: 'Practice Promise chaining',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Chain multiple promises together'
      },
      {
        id: 'js-promises-sub-3',
        title: 'Handle Promise errors',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Use .catch() and error handling'
      },
      {
        id: 'js-promises-sub-4',
        title: 'Convert callbacks to Promises',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Wrap callback-based APIs in Promises'
      },
      {
        id: 'js-promises-sub-5',
        title: 'Implement Promise.all()',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Handle multiple promises concurrently'
      }
    ],
    prerequisites: ['js-closures'],
    followUpTasks: ['js-async-await'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      interval: 5,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 90,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-event-loop',
    title: 'Understand JavaScript Event Loop',
    description: 'Master the event loop, call stack, and asynchronous execution',
    category: 'JavaScript',
    status: 'todo',
    priority: 'medium',
    difficulty: 'hard',
    estimatedTime: 150,
    tags: ['event-loop', 'async', 'performance'],
    resources: [
      {
        id: 'js-event-loop-1',
        title: 'What is the JavaScript Event Loop?',
        url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 25,
        rating: 4.8,
        lastUpdated: new Date('2024-01-18'),
        author: 'Node.js Team',
        tags: ['javascript', 'event-loop', 'nodejs'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.7
      }
    ],
    subtasks: [
      {
        id: 'js-event-loop-sub-1',
        title: 'Learn call stack mechanism',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Understand how function calls are tracked'
      },
      {
        id: 'js-event-loop-sub-2',
        title: 'Study microtasks vs macrotasks',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Understand Promise vs setTimeout priority'
      },
      {
        id: 'js-event-loop-sub-3',
        title: 'Practice event loop examples',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Solve complex event loop scenarios'
      },
      {
        id: 'js-event-loop-sub-4',
        title: 'Debug async code flow',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Use debugging tools to trace execution'
      },
      {
        id: 'js-event-loop-sub-5',
        title: 'Optimize async performance',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Learn to avoid blocking the event loop'
      }
    ],
    prerequisites: ['js-promises'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      interval: 10,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 150,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-prototypes',
    title: 'Master JavaScript Prototypes',
    description: 'Understand prototypal inheritance and object-oriented patterns',
    category: 'JavaScript',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 100,
    tags: ['prototypes', 'inheritance', 'oop'],
    resources: [
      {
        id: 'js-prototypes-1',
        title: 'JavaScript Prototypes and Inheritance',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 18,
        rating: 4.6,
        lastUpdated: new Date('2024-01-14'),
        author: 'MDN Contributors',
        tags: ['javascript', 'prototypes', 'inheritance'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.92,
        contentFreshness: 0.8,
        userCompletionRate: 0.82,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'js-prototypes-sub-1',
        title: 'Understand prototype chain',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Learn how objects inherit from prototypes'
      },
      {
        id: 'js-prototypes-sub-2',
        title: 'Create custom constructors',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Build constructor functions'
      },
      {
        id: 'js-prototypes-sub-3',
        title: 'Implement inheritance patterns',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Use Object.create() and extends'
      },
      {
        id: 'js-prototypes-sub-4',
        title: 'Override prototype methods',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Modify inherited behavior'
      },
      {
        id: 'js-prototypes-sub-5',
        title: 'Debug prototype issues',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Use instanceof and hasOwnProperty'
      }
    ],
    prerequisites: ['js-closures'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      interval: 8,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 100,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-es6-features',
    title: 'Master ES6+ Features',
    description: 'Learn modern JavaScript features and best practices',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 120,
    tags: ['es6', 'modern-js', 'syntax'],
    resources: [
      {
        id: 'js-es6-1',
        title: 'ES6 Features: A Complete Guide',
        url: 'https://www.freecodecamp.org/news/es6-features-a-complete-guide/',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.7,
        lastUpdated: new Date('2024-01-16'),
        author: 'FreeCodeCamp',
        tags: ['javascript', 'es6', 'modern'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.85,
        userCompletionRate: 0.88,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'js-es6-sub-1',
        title: 'Learn arrow functions',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Understand syntax and this binding'
      },
      {
        id: 'js-es6-sub-2',
        title: 'Master destructuring',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Object and array destructuring patterns'
      },
      {
        id: 'js-es6-sub-3',
        title: 'Use template literals',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'String interpolation and tagged templates'
      },
      {
        id: 'js-es6-sub-4',
        title: 'Implement classes',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'ES6 class syntax and inheritance'
      },
      {
        id: 'js-es6-sub-5',
        title: 'Use modules and imports',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'ES6 module system'
      },
      {
        id: 'js-es6-sub-6',
        title: 'Practice spread/rest operators',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Array and object spreading'
      },
      {
        id: 'js-es6-sub-7',
        title: 'Learn async/await',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Modern async syntax'
      }
    ],
    prerequisites: ['js-promises'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      interval: 6,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 120,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-dom-manipulation',
    title: 'Master DOM Manipulation',
    description: 'Learn to manipulate the DOM efficiently and handle events',
    category: 'JavaScript',
    status: 'todo',
    priority: 'medium',
    difficulty: 'easy',
    estimatedTime: 80,
    tags: ['dom', 'events', 'browser-api'],
    resources: [
      {
        id: 'js-dom-1',
        title: 'DOM Manipulation Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 15,
        rating: 4.5,
        lastUpdated: new Date('2024-01-13'),
        author: 'MDN Contributors',
        tags: ['javascript', 'dom', 'api'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.8,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.4
      }
    ],
    subtasks: [
      {
        id: 'js-dom-sub-1',
        title: 'Select DOM elements',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Use querySelector and getElementById'
      },
      {
        id: 'js-dom-sub-2',
        title: 'Modify element properties',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Change text, attributes, and styles'
      },
      {
        id: 'js-dom-sub-3',
        title: 'Create and append elements',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Build dynamic content'
      },
      {
        id: 'js-dom-sub-4',
        title: 'Handle events',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Add event listeners and handlers'
      },
      {
        id: 'js-dom-sub-5',
        title: 'Traverse DOM tree',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Navigate parent, child, and sibling elements'
      }
    ],
    prerequisites: ['js-es6-features'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      interval: 5,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 80,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-error-handling',
    title: 'Master Error Handling',
    description: 'Learn proper error handling patterns and debugging techniques',
    category: 'JavaScript',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 90,
    tags: ['error-handling', 'debugging', 'try-catch'],
    resources: [
      {
        id: 'js-error-1',
        title: 'JavaScript Error Handling Best Practices',
        url: 'https://blog.bitsrc.io/javascript-error-handling-best-practices-6b7b5b0c5c5c',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 12,
        rating: 4.6,
        lastUpdated: new Date('2024-01-11'),
        author: 'Bit Blog',
        tags: ['javascript', 'error-handling', 'best-practices'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.88,
        contentFreshness: 0.85,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'js-error-sub-1',
        title: 'Use try-catch blocks',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Handle synchronous errors'
      },
      {
        id: 'js-error-sub-2',
        title: 'Handle async errors',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Error handling in Promises and async functions'
      },
      {
        id: 'js-error-sub-3',
        title: 'Create custom error types',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Extend Error class for specific errors'
      },
      {
        id: 'js-error-sub-4',
        title: 'Implement error boundaries',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Graceful error recovery patterns'
      },
      {
        id: 'js-error-sub-5',
        title: 'Debug with console methods',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Use console.log, error, warn, and debug'
      }
    ],
    prerequisites: ['js-promises'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      interval: 7,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 90,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-performance',
    title: 'JavaScript Performance Optimization',
    description: 'Learn to write performant JavaScript code and optimize bottlenecks',
    category: 'JavaScript',
    status: 'todo',
    priority: 'low',
    difficulty: 'hard',
    estimatedTime: 150,
    tags: ['performance', 'optimization', 'profiling'],
    resources: [
      {
        id: 'js-performance-1',
        title: 'JavaScript Performance Optimization',
        url: 'https://web.dev/fast/',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 25,
        rating: 4.8,
        lastUpdated: new Date('2024-01-19'),
        author: 'Web.dev',
        tags: ['javascript', 'performance', 'optimization'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.7,
        helpfulnessScore: 4.7
      }
    ],
    subtasks: [
      {
        id: 'js-performance-sub-1',
        title: 'Profile JavaScript code',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Use Chrome DevTools Performance tab'
      },
      {
        id: 'js-performance-sub-2',
        title: 'Optimize loops and iterations',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Choose efficient loop methods'
      },
      {
        id: 'js-performance-sub-3',
        title: 'Implement memoization',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Cache expensive function results'
      },
      {
        id: 'js-performance-sub-4',
        title: 'Optimize DOM operations',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Batch DOM updates and use DocumentFragment'
      },
      {
        id: 'js-performance-sub-5',
        title: 'Handle memory leaks',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Prevent memory leaks in event listeners and closures'
      }
    ],
    prerequisites: ['js-event-loop', 'js-dom-manipulation'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      interval: 12,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 150,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-testing',
    title: 'JavaScript Testing Fundamentals',
    description: 'Learn unit testing, integration testing, and testing best practices',
    category: 'JavaScript',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 100,
    tags: ['testing', 'jest', 'unit-tests'],
    resources: [
      {
        id: 'js-testing-1',
        title: 'JavaScript Testing with Jest',
        url: 'https://jestjs.io/docs/getting-started',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 15,
        rating: 4.7,
        lastUpdated: new Date('2024-01-17'),
        author: 'Jest Team',
        tags: ['javascript', 'testing', 'jest'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.85,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'js-testing-sub-1',
        title: 'Set up Jest testing environment',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Install and configure Jest'
      },
      {
        id: 'js-testing-sub-2',
        title: 'Write unit tests',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Test individual functions and methods'
      },
      {
        id: 'js-testing-sub-3',
        title: 'Use test doubles',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Implement mocks, stubs, and spies'
      },
      {
        id: 'js-testing-sub-4',
        title: 'Test async code',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Handle Promises and async functions in tests'
      },
      {
        id: 'js-testing-sub-5',
        title: 'Write integration tests',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Test component interactions'
      }
    ],
    prerequisites: ['js-error-handling'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      interval: 8,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 100,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'js-modules',
    title: 'JavaScript Module Systems',
    description: 'Master ES6 modules, CommonJS, and module bundling',
    category: 'JavaScript',
    status: 'todo',
    priority: 'medium',
    difficulty: 'easy',
    estimatedTime: 70,
    tags: ['modules', 'es6', 'bundling'],
    resources: [
      {
        id: 'js-modules-1',
        title: 'ES6 Modules: A Complete Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 12,
        rating: 4.6,
        lastUpdated: new Date('2024-01-15'),
        author: 'MDN Contributors',
        tags: ['javascript', 'modules', 'es6'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.8,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'js-modules-sub-1',
        title: 'Create ES6 modules',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Use import/export syntax'
      },
      {
        id: 'js-modules-sub-2',
        title: 'Understand module bundlers',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Learn Webpack, Rollup, or Vite'
      },
      {
        id: 'js-modules-sub-3',
        title: 'Implement code splitting',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Split code into smaller chunks'
      },
      {
        id: 'js-modules-sub-4',
        title: 'Handle circular dependencies',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Avoid and resolve circular imports'
      }
    ],
    prerequisites: ['js-es6-features'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      interval: 6,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 70,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

// React Tasks (continued)
export const reactTasks: Task[] = [
  {
    id: 'react-components',
    title: 'Master React Components',
    description: 'Learn functional and class components, props, and state management',
    category: 'React',
    status: 'todo',
    priority: 'high',
    difficulty: 'easy',
    estimatedTime: 90,
    tags: ['components', 'props', 'state'],
    resources: [
      {
        id: 'react-components-1',
        title: 'React Components and Props',
        url: 'https://react.dev/learn/passing-props-to-a-component',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 15,
        rating: 4.8,
        lastUpdated: new Date('2024-01-20'),
        author: 'React Team',
        tags: ['react', 'components', 'props'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.95,
        userCompletionRate: 0.9,
        helpfulnessScore: 4.7
      }
    ],
    subtasks: [
      {
        id: 'react-components-sub-1',
        title: 'Create functional components',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Write simple functional components'
      },
      {
        id: 'react-components-sub-2',
        title: 'Pass and receive props',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Understand prop drilling and composition'
      },
      {
        id: 'react-components-sub-3',
        title: 'Manage component state',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Use useState hook for local state'
      },
      {
        id: 'react-components-sub-4',
        title: 'Handle component lifecycle',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Use useEffect for side effects'
      },
      {
        id: 'react-components-sub-5',
        title: 'Create reusable components',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Build component library patterns'
      }
    ],
    prerequisites: ['js-es6-features'],
    followUpTasks: ['react-hooks'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      interval: 5,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 90,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-hooks',
    title: 'Master React Hooks',
    description: 'Learn useState, useEffect, useContext, and custom hooks',
    category: 'React',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 120,
    tags: ['hooks', 'state', 'effects'],
    resources: [
      {
        id: 'react-hooks-1',
        title: 'React Hooks: A Complete Guide',
        url: 'https://react.dev/reference/react',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.9,
        lastUpdated: new Date('2024-01-18'),
        author: 'React Team',
        tags: ['react', 'hooks', 'state'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.9,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.95,
        userCompletionRate: 0.92,
        helpfulnessScore: 4.8
      }
    ],
    subtasks: [
      {
        id: 'react-hooks-sub-1',
        title: 'Master useState hook',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Manage local state with useState'
      },
      {
        id: 'react-hooks-sub-2',
        title: 'Use useEffect for side effects',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Handle API calls, subscriptions, and cleanup'
      },
      {
        id: 'react-hooks-sub-3',
        title: 'Implement useContext',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Share state across components'
      },
      {
        id: 'react-hooks-sub-4',
        title: 'Create custom hooks',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Extract reusable logic into custom hooks'
      },
      {
        id: 'react-hooks-sub-5',
        title: 'Use useRef and useMemo',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Optimize performance with refs and memoization'
      }
    ],
    prerequisites: ['react-components'],
    followUpTasks: ['react-context'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      interval: 6,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 120,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-context',
    title: 'Master React Context',
    description: 'Learn Context API for global state management',
    category: 'React',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 80,
    tags: ['context', 'state-management', 'global-state'],
    resources: [
      {
        id: 'react-context-1',
        title: 'React Context: A Complete Guide',
        url: 'https://react.dev/reference/react/createContext',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 15,
        rating: 4.7,
        lastUpdated: new Date('2024-01-16'),
        author: 'React Team',
        tags: ['react', 'context', 'state'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.9,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'react-context-sub-1',
        title: 'Create Context providers',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Set up Context with createContext'
      },
      {
        id: 'react-context-sub-2',
        title: 'Consume Context in components',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Use useContext hook to access context'
      },
      {
        id: 'react-context-sub-3',
        title: 'Update Context values',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Modify context state from components'
      },
      {
        id: 'react-context-sub-4',
        title: 'Optimize Context performance',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Prevent unnecessary re-renders'
      }
    ],
    prerequisites: ['react-hooks'],
    followUpTasks: ['react-redux'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      interval: 7,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 80,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-performance',
    title: 'React Performance Optimization',
    description: 'Learn to optimize React applications for better performance',
    category: 'React',
    status: 'todo',
    priority: 'medium',
    difficulty: 'hard',
    estimatedTime: 150,
    tags: ['performance', 'optimization', 'memoization'],
    resources: [
      {
        id: 'react-performance-1',
        title: 'React Performance Optimization',
        url: 'https://react.dev/learn/render-and-commit',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 25,
        rating: 4.8,
        lastUpdated: new Date('2024-01-19'),
        author: 'React Team',
        tags: ['react', 'performance', 'optimization'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.7
      }
    ],
    subtasks: [
      {
        id: 'react-performance-sub-1',
        title: 'Use React.memo',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Memoize components to prevent re-renders'
      },
      {
        id: 'react-performance-sub-2',
        title: 'Implement useMemo and useCallback',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Memoize values and functions'
      },
      {
        id: 'react-performance-sub-3',
        title: 'Optimize list rendering',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Use React.Fragment and key props'
      },
      {
        id: 'react-performance-sub-4',
        title: 'Implement code splitting',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Split code into smaller chunks'
      },
      {
        id: 'react-performance-sub-5',
        title: 'Profile React applications',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Use React DevTools Profiler'
      }
    ],
    prerequisites: ['react-hooks'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      interval: 10,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 150,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-testing',
    title: 'React Testing Fundamentals',
    description: 'Learn to test React components with Jest and React Testing Library',
    category: 'React',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 100,
    tags: ['testing', 'jest', 'react-testing-library'],
    resources: [
      {
        id: 'react-testing-1',
        title: 'React Testing Library Guide',
        url: 'https://testing-library.com/docs/react-testing-library/intro/',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 18,
        rating: 4.7,
        lastUpdated: new Date('2024-01-17'),
        author: 'Testing Library Team',
        tags: ['react', 'testing', 'jest'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.85,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'react-testing-sub-1',
        title: 'Set up testing environment',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Install Jest and React Testing Library'
      },
      {
        id: 'react-testing-sub-2',
        title: 'Test component rendering',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Test if components render correctly'
      },
      {
        id: 'react-testing-sub-3',
        title: 'Test user interactions',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Test clicks, form submissions, etc.'
      },
      {
        id: 'react-testing-sub-4',
        title: 'Mock external dependencies',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Mock API calls and external services'
      },
      {
        id: 'react-testing-sub-5',
        title: 'Test async operations',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Test loading states and async data'
      }
    ],
    prerequisites: ['js-testing'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      interval: 8,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 100,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-routing',
    title: 'React Router Mastery',
    description: 'Learn client-side routing with React Router',
    category: 'React',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 90,
    tags: ['routing', 'navigation', 'spa'],
    resources: [
      {
        id: 'react-routing-1',
        title: 'React Router Tutorial',
        url: 'https://reactrouter.com/en/main/start/tutorial',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.6,
        lastUpdated: new Date('2024-01-15'),
        author: 'React Router Team',
        tags: ['react', 'routing', 'navigation'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.85,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'react-routing-sub-1',
        title: 'Set up React Router',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Install and configure React Router'
      },
      {
        id: 'react-routing-sub-2',
        title: 'Create route components',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Build components for different routes'
      },
      {
        id: 'react-routing-sub-3',
        title: 'Implement navigation',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Use Link and useNavigate hooks'
      },
      {
        id: 'react-routing-sub-4',
        title: 'Handle route parameters',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Access URL parameters and query strings'
      },
      {
        id: 'react-routing-sub-5',
        title: 'Implement protected routes',
        completed: false,
        estimatedTime: 10,
        resources: [],
        notes: 'Create authentication-based routing'
      }
    ],
    prerequisites: ['react-components'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      interval: 6,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 90,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-forms',
    title: 'React Form Handling',
    description: 'Learn controlled components, form validation, and form libraries',
    category: 'React',
    status: 'todo',
    priority: 'medium',
    difficulty: 'medium',
    estimatedTime: 110,
    tags: ['forms', 'validation', 'controlled-components'],
    resources: [
      {
        id: 'react-forms-1',
        title: 'React Forms: A Complete Guide',
        url: 'https://react.dev/reference/react-dom/components/form',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 15,
        rating: 4.6,
        lastUpdated: new Date('2024-01-14'),
        author: 'React Team',
        tags: ['react', 'forms', 'validation'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.85,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'react-forms-sub-1',
        title: 'Create controlled components',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Manage form state with useState'
      },
      {
        id: 'react-forms-sub-2',
        title: 'Implement form validation',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Validate form inputs and show errors'
      },
      {
        id: 'react-forms-sub-3',
        title: 'Handle form submission',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Process form data and API calls'
      },
      {
        id: 'react-forms-sub-4',
        title: 'Use form libraries',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Learn React Hook Form or Formik'
      }
    ],
    prerequisites: ['react-hooks'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      interval: 7,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 110,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-hooks-advanced',
    title: 'Advanced React Hooks',
    description: 'Master useReducer, useCallback, useMemo, and custom hooks',
    category: 'React',
    status: 'todo',
    priority: 'medium',
    difficulty: 'hard',
    estimatedTime: 130,
    tags: ['hooks', 'advanced', 'optimization'],
    resources: [
      {
        id: 'react-hooks-advanced-1',
        title: 'Advanced React Hooks',
        url: 'https://react.dev/reference/react/useReducer',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 25,
        rating: 4.7,
        lastUpdated: new Date('2024-01-18'),
        author: 'React Team',
        tags: ['react', 'hooks', 'advanced'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'react-hooks-advanced-sub-1',
        title: 'Master useReducer',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Manage complex state with reducers'
      },
      {
        id: 'react-hooks-advanced-sub-2',
        title: 'Optimize with useCallback',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Memoize functions to prevent re-renders'
      },
      {
        id: 'react-hooks-advanced-sub-3',
        title: 'Use useMemo effectively',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Memoize expensive calculations'
      },
      {
        id: 'react-hooks-advanced-sub-4',
        title: 'Create custom hooks',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Extract reusable logic into custom hooks'
      }
    ],
    prerequisites: ['react-hooks'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      interval: 9,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 130,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-patterns',
    title: 'React Design Patterns',
    description: 'Learn common React patterns and best practices',
    category: 'React',
    status: 'todo',
    priority: 'low',
    difficulty: 'hard',
    estimatedTime: 140,
    tags: ['patterns', 'best-practices', 'architecture'],
    resources: [
      {
        id: 'react-patterns-1',
        title: 'React Design Patterns',
        url: 'https://react.dev/learn/thinking-in-react',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 30,
        rating: 4.8,
        lastUpdated: new Date('2024-01-19'),
        author: 'React Team',
        tags: ['react', 'patterns', 'architecture'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.7,
        helpfulnessScore: 4.7
      }
    ],
    subtasks: [
      {
        id: 'react-patterns-sub-1',
        title: 'Implement compound components',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Create flexible component APIs'
      },
      {
        id: 'react-patterns-sub-2',
        title: 'Use render props pattern',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Share code between components'
      },
      {
        id: 'react-patterns-sub-3',
        title: 'Implement higher-order components',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Enhance components with HOCs'
      },
      {
        id: 'react-patterns-sub-4',
        title: 'Create custom hooks patterns',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Design reusable hook patterns'
      }
    ],
    prerequisites: ['react-hooks-advanced'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      interval: 12,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 140,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
  {
    id: 'react-ssr',
    title: 'React Server-Side Rendering',
    description: 'Learn SSR with Next.js and performance optimization',
    category: 'React',
    status: 'todo',
    priority: 'low',
    difficulty: 'hard',
    estimatedTime: 160,
    tags: ['ssr', 'nextjs', 'performance'],
    resources: [
      {
        id: 'react-ssr-1',
        title: 'Next.js SSR Guide',
        url: 'https://nextjs.org/docs/app/building-your-application/rendering',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 35,
        rating: 4.7,
        lastUpdated: new Date('2024-01-20'),
        author: 'Next.js Team',
        tags: ['react', 'ssr', 'nextjs'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.95,
        userCompletionRate: 0.65,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'react-ssr-sub-1',
        title: 'Set up Next.js project',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Create and configure Next.js app'
      },
      {
        id: 'react-ssr-sub-2',
        title: 'Implement SSR pages',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Create server-side rendered pages'
      },
      {
        id: 'react-ssr-sub-3',
        title: 'Handle data fetching',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Fetch data on server side'
      },
      {
        id: 'react-ssr-sub-4',
        title: 'Optimize performance',
        completed: false,
        estimatedTime: 45,
        resources: [],
        notes: 'Implement caching and optimization'
      },
      {
        id: 'react-ssr-sub-5',
        title: 'Deploy SSR application',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Deploy to Vercel or other platforms'
      }
    ],
    prerequisites: ['react-performance'],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      interval: 15,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 160,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

// React Native Tasks
export const reactNativeTasks: Task[] = [
  {
    id: 'rn-basics',
    title: 'React Native Fundamentals',
    description: 'Learn React Native basics, components, and navigation',
    category: 'React Native',
    status: 'todo',
    priority: 'high',
    difficulty: 'easy',
    estimatedTime: 100,
    tags: ['basics', 'components', 'navigation'],
    resources: [
      {
        id: 'rn-basics-1',
        title: 'React Native Getting Started',
        url: 'https://reactnative.dev/docs/getting-started',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 20,
        rating: 4.8,
        lastUpdated: new Date('2024-01-20'),
        author: 'React Native Team',
        tags: ['react-native', 'basics', 'getting-started'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.95,
        userCompletionRate: 0.9,
        helpfulnessScore: 4.7
      }
    ],
    subtasks: [
      {
        id: 'rn-basics-sub-1',
        title: 'Set up development environment',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Install Node.js, React Native CLI, and Android Studio'
      },
      {
        id: 'rn-basics-sub-2',
        title: 'Create first React Native app',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Use npx react-native init to create project'
      },
      {
        id: 'rn-basics-sub-3',
        title: 'Learn basic components',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Understand View, Text, Image, ScrollView'
      },
      {
        id: 'rn-basics-sub-4',
        title: 'Implement navigation',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Set up React Navigation with stack and tab navigators'
      }
    ],
    prerequisites: ['react-components'],
    followUpTasks: ['rn-styling'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      interval: 5,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 100,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

// Machine Learning Tasks
export const machineLearningTasks: Task[] = [
  {
    id: 'ml-basics',
    title: 'Machine Learning Fundamentals',
    description: 'Learn ML basics, algorithms, and data preprocessing',
    category: 'Machine Learning',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 180,
    tags: ['basics', 'algorithms', 'preprocessing'],
    resources: [
      {
        id: 'ml-basics-1',
        title: 'Machine Learning Basics',
        url: 'https://scikit-learn.org/stable/tutorial/basic/tutorial.html',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 30,
        rating: 4.7,
        lastUpdated: new Date('2024-01-18'),
        author: 'Scikit-learn Team',
        tags: ['machine-learning', 'python', 'basics'],
        isPremium: false,
        language: 'python',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.85,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.6
      }
    ],
    subtasks: [
      {
        id: 'ml-basics-sub-1',
        title: 'Set up Python environment',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Install Python, Jupyter, and ML libraries'
      },
      {
        id: 'ml-basics-sub-2',
        title: 'Learn data preprocessing',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Handle missing data, scaling, and encoding'
      },
      {
        id: 'ml-basics-sub-3',
        title: 'Implement linear regression',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Build and train linear regression models'
      },
      {
        id: 'ml-basics-sub-4',
        title: 'Learn classification algorithms',
        completed: false,
        estimatedTime: 45,
        resources: [],
        notes: 'Implement logistic regression and decision trees'
      },
      {
        id: 'ml-basics-sub-5',
        title: 'Evaluate model performance',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Use metrics like accuracy, precision, recall'
      }
    ],
    prerequisites: [],
    followUpTasks: ['ml-advanced'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      interval: 10,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 180,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

// DSA Tasks
export const dsaTasks: Task[] = [
  {
    id: 'dsa-arrays',
    title: 'Array Data Structures',
    description: 'Master array manipulation, searching, and sorting algorithms',
    category: 'DSA',
    status: 'todo',
    priority: 'high',
    difficulty: 'easy',
    estimatedTime: 120,
    tags: ['arrays', 'searching', 'sorting'],
    resources: [
      {
        id: 'dsa-arrays-1',
        title: 'Array Data Structure',
        url: 'https://www.geeksforgeeks.org/array-data-structure/',
        type: 'documentation',
        difficulty: 'beginner',
        estimatedReadTime: 15,
        rating: 4.6,
        lastUpdated: new Date('2024-01-15'),
        author: 'GeeksforGeeks',
        tags: ['dsa', 'arrays', 'data-structures'],
        isPremium: false,
        language: 'java',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.8,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'dsa-arrays-sub-1',
        title: 'Learn array operations',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Insert, delete, search, and traverse arrays'
      },
      {
        id: 'dsa-arrays-sub-2',
        title: 'Implement linear search',
        completed: false,
        estimatedTime: 15,
        resources: [],
        notes: 'Search for elements in unsorted arrays'
      },
      {
        id: 'dsa-arrays-sub-3',
        title: 'Implement binary search',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Search in sorted arrays efficiently'
      },
      {
        id: 'dsa-arrays-sub-4',
        title: 'Learn sorting algorithms',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Bubble sort, selection sort, insertion sort'
      },
      {
        id: 'dsa-arrays-sub-5',
        title: 'Practice array problems',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Solve common array interview questions'
      }
    ],
    prerequisites: [],
    followUpTasks: ['dsa-linked-lists'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      interval: 7,
      reviewsCompleted: 0
    },
    timeTracking: {
      estimatedTime: 120,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

// Export all tasks
export const allTasks: Task[] = [
  ...javascriptTasks,
  ...reactTasks,
  ...reactNativeTasks,
  ...machineLearningTasks,
  ...dsaTasks
]; 