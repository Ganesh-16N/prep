import { firebaseFirestore } from '../config/firebase';
import { Task } from '../types';

// Comprehensive JavaScript tasks for 20 LPA interview preparation
const allJavaScriptTasks: Task[] = [
  // FUNDAMENTALS
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals Deep Dive',
    description: 'Master core JavaScript concepts essential for 20 LPA interviews',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 180,
    tags: ['fundamentals', 'basics', 'core-concepts'],
    resources: [
      {
        id: 'js-fundamentals-1',
        title: 'JavaScript Fundamentals - You Don\'t Know JS',
        url: 'https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 45,
        rating: 4.9,
        lastUpdated: new Date('2024-01-20'),
        author: 'Kyle Simpson',
        tags: ['javascript', 'fundamentals', 'deep-dive'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.7
      },
      {
        id: 'js-fundamentals-2',
        title: 'JavaScript.info - Modern JavaScript Tutorial',
        url: 'https://javascript.info/',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 60,
        rating: 4.8,
        lastUpdated: new Date('2024-01-15'),
        author: 'Ilya Kantor',
        tags: ['javascript', 'tutorial', 'modern-js'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.95,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.6
      },
      {
        id: 'js-fundamentals-3',
        title: 'Eloquent JavaScript - Free Online Book',
        url: 'https://eloquentjavascript.net/',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 90,
        rating: 4.7,
        lastUpdated: new Date('2024-01-10'),
        author: 'Marijn Haverbeke',
        tags: ['javascript', 'eloquent', 'free-book'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.8,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'js-fundamentals-sub-1',
        title: 'Variables, Data Types, and Type Coercion',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Understand var, let, const, primitive types, type coercion, and type conversion'
      },
      {
        id: 'js-fundamentals-sub-2',
        title: 'Functions and Scope',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Function declarations, expressions, arrow functions, scope chain, and hoisting'
      },
      {
        id: 'js-fundamentals-sub-3',
        title: 'Objects and Prototypes',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Object creation, prototype chain, inheritance, and Object methods'
      },
      {
        id: 'js-fundamentals-sub-4',
        title: 'Arrays and Array Methods',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Array methods (map, filter, reduce), spread operator, and array destructuring'
      },
      {
        id: 'js-fundamentals-sub-5',
        title: 'Error Handling and Debugging',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Try-catch blocks, error types, debugging techniques, and console methods'
      },
      {
        id: 'js-fundamentals-sub-6',
        title: 'ES6+ Features Mastery',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Destructuring, template literals, default parameters, and rest/spread'
      }
    ],
    prerequisites: [],
    followUpTasks: ['js-closures', 'js-event-loop'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reviewCount: 0,
      interval: 7,
      retentionScore: 0.8
    },
    timeTracking: {
      taskId: 'js-fundamentals',
      estimatedTime: 180,
      totalTimeSpent: 0,
      sessions: [],
      efficiency: 0,
      focusScore: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },

  // CLOSURES
  {
    id: 'js-closures',
    title: 'Closures and Lexical Scoping',
    description: 'Master closures, lexical scoping, and practical applications for interviews',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'hard',
    estimatedTime: 150,
    tags: ['closures', 'scoping', 'lexical-scope', 'interview'],
    resources: [
      {
        id: 'js-closures-1',
        title: 'Closures - MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 25,
        rating: 4.8,
        lastUpdated: new Date('2024-01-20'),
        author: 'MDN Contributors',
        tags: ['javascript', 'closures', 'mdn'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      },
      {
        id: 'js-closures-2',
        title: 'JavaScript Closures Explained - JavaScript.info',
        url: 'https://javascript.info/closure',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 30,
        rating: 4.9,
        lastUpdated: new Date('2024-01-15'),
        author: 'Ilya Kantor',
        tags: ['javascript', 'closures', 'tutorial'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.95,
        userCompletionRate: 0.9,
        helpfulnessScore: 4.7
      },
      {
        id: 'js-closures-3',
        title: 'Understanding Closures in JavaScript - Medium',
        url: 'https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.7,
        lastUpdated: new Date('2024-01-10'),
        author: 'Eric Elliott',
        tags: ['javascript', 'closures', 'interview'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.8,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'js-closures-sub-1',
        title: 'Lexical Scoping and Scope Chain',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Understand how scope works, scope chain, and variable resolution'
      },
      {
        id: 'js-closures-sub-2',
        title: 'Closure Definition and Creation',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'What closures are, how they\'re created, and their characteristics'
      },
      {
        id: 'js-closures-sub-3',
        title: 'Practical Closure Examples',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Data privacy, factory functions, and module pattern implementations'
      },
      {
        id: 'js-closures-sub-4',
        title: 'Common Closure Patterns',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Currying, partial application, and memoization with closures'
      },
      {
        id: 'js-closures-sub-5',
        title: 'Closure Interview Questions',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Practice common closure questions and edge cases'
      }
    ],
    prerequisites: ['js-fundamentals'],
    followUpTasks: ['js-event-loop', 'js-promises'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reviewCount: 0,
      interval: 7,
      retentionScore: 0.8
    },
    timeTracking: {
      taskId: 'js-closures',
      estimatedTime: 150,
      totalTimeSpent: 0,
      sessions: [],
      efficiency: 0,
      focusScore: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },

  // EVENT LOOP
  {
    id: 'js-event-loop',
    title: 'Event Loop and Asynchronous JavaScript',
    description: 'Master the event loop, call stack, and async programming patterns',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'hard',
    estimatedTime: 200,
    tags: ['event-loop', 'async', 'callbacks', 'interview'],
    resources: [
      {
        id: 'js-event-loop-1',
        title: 'What is the Event Loop? - Node.js Docs',
        url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/',
        type: 'documentation',
        difficulty: 'advanced',
        estimatedReadTime: 40,
        rating: 4.8,
        lastUpdated: new Date('2024-01-20'),
        author: 'Node.js Team',
        tags: ['javascript', 'event-loop', 'nodejs'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.95,
        contentFreshness: 0.9,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.6
      },
      {
        id: 'js-event-loop-2',
        title: 'Event Loop Visualization - YouTube',
        url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
        type: 'video',
        difficulty: 'intermediate',
        estimatedReadTime: 25,
        rating: 4.9,
        lastUpdated: new Date('2024-01-15'),
        author: 'Philip Roberts',
        tags: ['javascript', 'event-loop', 'visualization'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.8,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.7,
        userCompletionRate: 0.9,
        helpfulnessScore: 4.7
      },
      {
        id: 'js-event-loop-3',
        title: 'JavaScript Event Loop Explained - Medium',
        url: 'https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 30,
        rating: 4.6,
        lastUpdated: new Date('2024-01-10'),
        author: 'Alexander Kondov',
        tags: ['javascript', 'event-loop', 'async'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.8,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.4
      }
    ],
    subtasks: [
      {
        id: 'js-event-loop-sub-1',
        title: 'Call Stack and Execution Context',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Understand call stack, execution context, and function execution'
      },
      {
        id: 'js-event-loop-sub-2',
        title: 'Web APIs and Browser Environment',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'setTimeout, setInterval, DOM APIs, and browser environment'
      },
      {
        id: 'js-event-loop-sub-3',
        title: 'Callback Queue and Microtask Queue',
        completed: false,
        estimatedTime: 40,
        resources: [],
        notes: 'Task queue, microtask queue, and priority of execution'
      },
      {
        id: 'js-event-loop-sub-4',
        title: 'setTimeout vs setImmediate vs process.nextTick',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Node.js specific timing functions and their differences'
      },
      {
        id: 'js-event-loop-sub-5',
        title: 'Event Loop Interview Questions',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Practice common event loop questions and scenarios'
      },
      {
        id: 'js-event-loop-sub-6',
        title: 'Debugging Async Code',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Common async bugs, debugging techniques, and best practices'
      }
    ],
    prerequisites: ['js-closures'],
    followUpTasks: ['js-promises', 'js-async-await'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reviewCount: 0,
      interval: 7,
      retentionScore: 0.7
    },
    timeTracking: {
      taskId: 'js-event-loop',
      estimatedTime: 200,
      totalTimeSpent: 0,
      sessions: [],
      efficiency: 0,
      focusScore: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },

  // PROMISES
  {
    id: 'js-promises',
    title: 'Promises and Promise-based Programming',
    description: 'Master promise-based asynchronous programming and error handling',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 160,
    tags: ['promises', 'async', 'error-handling', 'interview'],
    resources: [
      {
        id: 'js-promises-1',
        title: 'JavaScript Promises: An Introduction - Web.dev',
        url: 'https://web.dev/promises/',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 30,
        rating: 4.8,
        lastUpdated: new Date('2024-01-20'),
        author: 'Jake Archibald',
        tags: ['javascript', 'promises', 'web-dev'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.95,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      },
      {
        id: 'js-promises-2',
        title: 'Promise Chain Patterns - JavaScript.info',
        url: 'https://javascript.info/promise-chaining',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 35,
        rating: 4.7,
        lastUpdated: new Date('2024-01-15'),
        author: 'Ilya Kantor',
        tags: ['javascript', 'promises', 'chaining'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.9,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5
      },
      {
        id: 'js-promises-3',
        title: 'Promise.all() vs Promise.allSettled() - Medium',
        url: 'https://medium.com/javascript-in-plain-english/promise-all-vs-promise-allsettled-6c4b6b3f0b1',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 25,
        rating: 4.6,
        lastUpdated: new Date('2024-01-10'),
        author: 'Dmitri Pavlutin',
        tags: ['javascript', 'promises', 'comparison'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.8,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.4
      }
    ],
    subtasks: [
      {
        id: 'js-promises-sub-1',
        title: 'Promise Basics and States',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Promise constructor, states (pending, fulfilled, rejected), and lifecycle'
      },
      {
        id: 'js-promises-sub-2',
        title: 'Promise Methods: then, catch, finally',
        completed: false,
        estimatedTime: 35,
        resources: [],
        notes: 'Promise chaining, error handling, and cleanup with finally'
      },
      {
        id: 'js-promises-sub-3',
        title: 'Promise.all() and Promise.race()',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Parallel execution, race conditions, and error handling patterns'
      },
      {
        id: 'js-promises-sub-4',
        title: 'Promise.allSettled() and Promise.any()',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Modern promise methods for complex async scenarios'
      },
      {
        id: 'js-promises-sub-5',
        title: 'Converting Callbacks to Promises',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Promisification techniques and utility functions'
      },
      {
        id: 'js-promises-sub-6',
        title: 'Promise Interview Questions',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Practice common promise questions and edge cases'
      }
    ],
    prerequisites: ['js-event-loop'],
    followUpTasks: ['js-async-await'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reviewCount: 0,
      interval: 7,
      retentionScore: 0.8
    },
    timeTracking: {
      taskId: 'js-promises',
      estimatedTime: 160,
      totalTimeSpent: 0,
      sessions: [],
      efficiency: 0,
      focusScore: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },

  // ASYNC/AWAIT
  {
    id: 'js-async-await',
    title: 'Async/Await and Modern Async Patterns',
    description: 'Master async/await syntax and modern asynchronous programming',
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    estimatedTime: 140,
    tags: ['async-await', 'es6', 'modern-js', 'interview'],
    resources: [
      {
        id: 'js-async-await-1',
        title: 'Async/Await in JavaScript - JavaScript.info',
        url: 'https://javascript.info/async-await',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 35,
        rating: 4.8,
        lastUpdated: new Date('2024-01-20'),
        author: 'Ilya Kantor',
        tags: ['javascript', 'async-await', 'tutorial'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.95,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6
      },
      {
        id: 'js-async-await-2',
        title: 'Async/Await Best Practices - Medium',
        url: 'https://blog.bitsrc.io/async-await-best-practices-6b0b0b0b0b0b',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 25,
        rating: 4.6,
        lastUpdated: new Date('2024-01-15'),
        author: 'John Doe',
        tags: ['javascript', 'async-await', 'best-practices'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.8,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.4
      },
      {
        id: 'js-async-await-3',
        title: 'Error Handling with Async/Await - MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#error_handling',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 30,
        rating: 4.7,
        lastUpdated: new Date('2024-01-10'),
        author: 'MDN Contributors',
        tags: ['javascript', 'async-await', 'error-handling'],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.9,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5
      }
    ],
    subtasks: [
      {
        id: 'js-async-await-sub-1',
        title: 'Async Function Basics',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Async function declaration, return values, and execution'
      },
      {
        id: 'js-async-await-sub-2',
        title: 'Await Keyword and Promise Resolution',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Using await, promise resolution, and error handling'
      },
      {
        id: 'js-async-await-sub-3',
        title: 'Error Handling with Try-Catch',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Try-catch blocks, error propagation, and cleanup'
      },
      {
        id: 'js-async-await-sub-4',
        title: 'Parallel vs Sequential Execution',
        completed: false,
        estimatedTime: 30,
        resources: [],
        notes: 'Promise.all, sequential execution, and performance optimization'
      },
      {
        id: 'js-async-await-sub-5',
        title: 'Converting Promise Chains to Async/Await',
        completed: false,
        estimatedTime: 25,
        resources: [],
        notes: 'Refactoring techniques and migration strategies'
      }
    ],
    prerequisites: ['js-promises'],
    followUpTasks: ['js-modules'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reviewCount: 0,
      interval: 7,
      retentionScore: 0.8
    },
    timeTracking: {
      taskId: 'js-async-await',
      estimatedTime: 140,
      totalTimeSpent: 0,
      sessions: [],
      efficiency: 0,
      focusScore: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

// Additional Modern JavaScript topics for comprehensive 20 LPA prep
type TopicSpec = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  jsInfoSlug?: string;
  mdnUrl?: string;
  mediumUrl?: string;
  difficulty: Task['difficulty'];
  estimatedTime: number;
  subtasks: string[];
};

const extraJavaScriptTopics: TopicSpec[] = [
  {
    id: 'js-this-binding',
    title: 'this Binding, Call, Apply, Bind',
    description: 'Master this binding rules and call/apply/bind patterns',
    tags: ['this', 'call', 'apply', 'bind', 'context'],
    jsInfoSlug: 'bind',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this',
    mediumUrl: 'https://medium.com/better-programming/mastering-this-in-javascript-10f7ca7a2f74',
    difficulty: 'medium',
    estimatedTime: 120,
    subtasks: [
      'this in global vs function vs arrow functions',
      'call vs apply vs bind',
      'Method borrowing and partial application',
      'Common pitfalls with this',
      'Interview exercises'
    ],
  },
  {
    id: 'js-prototype-inheritance',
    title: 'Prototype, Inheritance, and the new Operator',
    description: 'Understand prototypes, inheritance chains, and object creation patterns',
    tags: ['prototype', 'inheritance', 'oop', 'new'],
    jsInfoSlug: 'prototype-inheritance',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
    mediumUrl: 'https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-classical-and-prototypal-inheritance-5dd2bce9432d',
    difficulty: 'hard',
    estimatedTime: 150,
    subtasks: [
      'Prototype chain and __proto__',
      'Constructor functions and new',
      'hasOwnProperty and property lookup',
      'Composition vs inheritance',
      'Interview exercises'
    ],
  },
  {
    id: 'js-classes',
    title: 'ES6 Classes, Fields, and Inheritance',
    description: 'Use modern class syntax, fields, and extends correctly',
    tags: ['class', 'extends', 'constructor', 'super'],
    jsInfoSlug: 'classes',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes',
    mediumUrl: 'https://blog.bitsrc.io/understanding-classes-in-javascript-ecma2015-9b3b4a01d3b9',
    difficulty: 'medium',
    estimatedTime: 120,
    subtasks: [
      'Class syntax and fields',
      'Public vs private fields (#)',
      'Extends, super, and overriding',
      'Static methods and properties',
      'Pitfalls vs functions/prototypes'
    ],
  },
  {
    id: 'js-modules',
    title: 'ES Modules: import/export, Tree Shaking',
    description: 'Master ES module system, default vs named exports, and bundling',
    tags: ['modules', 'esm', 'import', 'export'],
    jsInfoSlug: 'modules-intro',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
    mediumUrl: 'https://medium.com/@mattburgess/modules-in-javascript-ecmascript-6-8ee5b5e07b3',
    difficulty: 'medium',
    estimatedTime: 110,
    subtasks: [
      'Default vs named exports',
      'Live bindings and circular deps',
      'Dynamic import()',
      'Tree shaking basics',
      'Interop with CommonJS'
    ],
  },
  {
    id: 'js-hoisting',
    title: 'Hoisting, TDZ, var/let/const',
    description: 'Understand hoisting behavior and temporal dead zone',
    tags: ['hoisting', 'tdz', 'variables'],
    jsInfoSlug: 'var',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
    mediumUrl: 'https://medium.com/javascript-in-plain-english/understanding-hoisting-in-javascript-7d3b0c8f6e73',
    difficulty: 'easy',
    estimatedTime: 80,
    subtasks: [
      'Function vs variable hoisting',
      'TDZ with let/const',
      'Best practices',
      'Common pitfalls',
      'Interview questions'
    ],
  },
  {
    id: 'js-coercion-equality',
    title: 'Type Coercion, == vs ===, Truthy/Falsy',
    description: 'Deeply understand coercion rules and equality pitfalls',
    tags: ['coercion', 'equality', 'truthy', 'falsy'],
    jsInfoSlug: 'comparison',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness',
    mediumUrl: 'https://betterprogramming.pub/equality-in-javascript-97a3a4a3d7b4',
    difficulty: 'medium',
    estimatedTime: 110,
    subtasks: [
      'Abstract equality vs strict',
      'Truthy/falsy gotchas',
      'Nullish coalescing vs OR',
      'Optional chaining behavior',
      'Interview exercises'
    ],
  },
  {
    id: 'js-destructuring-rest-spread',
    title: 'Destructuring, Rest, and Spread',
    description: 'Use destructuring, rest params, and spread effectively',
    tags: ['destructuring', 'rest', 'spread'],
    jsInfoSlug: 'destructuring-assignment',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    mediumUrl: 'https://medium.com/@madasamy/understanding-spread-and-rest-operators-in-javascript-2d1ad27c91f0',
    difficulty: 'easy',
    estimatedTime: 90,
    subtasks: [
      'Array and object destructuring',
      'Default values and renaming',
      'Rest parameters',
      'Spread for arrays/objects',
      'Practical patterns'
    ],
  },
  {
    id: 'js-collections',
    title: 'Map, Set, WeakMap, WeakSet',
    description: 'Choose the right collection for performance and semantics',
    tags: ['map', 'set', 'weakmap', 'weakset'],
    jsInfoSlug: 'map-set',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections',
    mediumUrl: 'https://blog.logrocket.com/understanding-es6-collections-map-set/',
    difficulty: 'medium',
    estimatedTime: 100,
    subtasks: [
      'When to use Map/Set',
      'Weak collections and GC',
      'Iterating and performance',
      'Real-world use cases',
      'Interview exercises'
    ],
  },
  {
    id: 'js-iterators-generators',
    title: 'Iterators, Generators, and for...of',
    description: 'Build custom iterables and leverage generators',
    tags: ['iterator', 'generator', 'for-of'],
    jsInfoSlug: 'iterable',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators',
    mediumUrl: 'https://medium.com/dailyjs/how-to-use-generators-for-asynchronous-programming-in-javascript-ff83d0e4f0da',
    difficulty: 'hard',
    estimatedTime: 130,
    subtasks: [
      'Iterator protocol',
      'Generator functions and yield',
      'Async generators',
      'Practical streaming patterns',
      'Interview questions'
    ],
  },
  {
    id: 'js-symbols',
    title: 'Symbols and Well-known Symbols',
    description: 'Use Symbols for meta-programming and unique keys',
    tags: ['symbol', 'metaprogramming'],
    jsInfoSlug: 'symbol',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
    mediumUrl: 'https://blog.bitsrc.io/understanding-symbols-in-javascript-4003f8b2c7a9',
    difficulty: 'medium',
    estimatedTime: 80,
    subtasks: [
      'Creating symbols and registries',
      'Well-known symbols (iterator, toStringTag, etc.)',
      'Hiding properties',
      'Interoperability',
      'Interview exercises'
    ],
  },
  {
    id: 'js-proxy-reflect',
    title: 'Proxy and Reflect',
    description: 'Intercept operations with Proxy and use Reflect API',
    tags: ['proxy', 'reflect', 'metaprogramming'],
    jsInfoSlug: 'proxy',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy',
    mediumUrl: 'https://blog.bitsrc.io/understanding-proxy-and-reflect-in-javascript-f1e7d4a6c48f',
    difficulty: 'hard',
    estimatedTime: 140,
    subtasks: [
      'Traps and handlers',
      'Reflect methods',
      'Validation and virtualization',
      'Performance considerations',
      'Interview exercises'
    ],
  },
  {
    id: 'js-object-descriptors',
    title: 'Property Descriptors, Getters, Setters',
    description: 'Fine-tune object properties with descriptors and accessors',
    tags: ['defineProperty', 'getters', 'setters'],
    jsInfoSlug: 'property-descriptors',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#properties',
    mediumUrl: 'https://medium.com/@js_tut/property-descriptors-in-javascript-3b2b3f8a9d11',
    difficulty: 'medium',
    estimatedTime: 100,
    subtasks: [
      'Writable, enumerable, configurable',
      'Getters and setters',
      'Immutability patterns',
      'Sealing and freezing',
      'Interview exercises'
    ],
  },
  {
    id: 'js-regexp',
    title: 'Regular Expressions Deep Dive',
    description: 'Master regex for parsing, validation, and matching',
    tags: ['regex', 'pattern'],
    jsInfoSlug: 'regexp-introduction',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions',
    mediumUrl: 'https://blog.bitsrc.io/regular-expressions-demystified-6b2f0c7a4d3e',
    difficulty: 'medium',
    estimatedTime: 120,
    subtasks: [
      'Basic tokens and groups',
      'Lookaheads/lookbehinds',
      'Flags and performance',
      'Common patterns',
      'Interview tasks'
    ],
  },
  {
    id: 'js-date-intl',
    title: 'Date, Time, and Intl APIs',
    description: 'Work with dates, times, locales, and formatting',
    tags: ['date', 'intl', 'i18n'],
    jsInfoSlug: 'date',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl',
    mediumUrl: 'https://blog.bitsrc.io/formatting-dates-internationalization-in-javascript-6c2d0e9f7c9b',
    difficulty: 'easy',
    estimatedTime: 90,
    subtasks: [
      'Date quirks and UTC vs local',
      'Intl.DateTimeFormat',
      'Number and currency formatting',
      'Plural rules',
      'Interview exercises'
    ],
  },
  {
    id: 'js-numbers-precision',
    title: 'Numbers, BigInt, and Precision',
    description: 'Handle floating point precision and big integers',
    tags: ['number', 'bigint', 'precision'],
    jsInfoSlug: 'number',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
    mediumUrl: 'https://medium.com/front-end-weekly/handling-floating-point-precision-in-javascript-514d748a926b',
    difficulty: 'medium',
    estimatedTime: 90,
    subtasks: [
      'Floating point pitfalls',
      'BigInt basics',
      'Parsing and formatting',
      'Math methods',
      'Interview problems'
    ],
  },
  {
    id: 'js-strings-arrays',
    title: 'Strings and Advanced Array Methods',
    description: 'Fluent with string APIs and array transformations',
    tags: ['string', 'array', 'map', 'reduce'],
    jsInfoSlug: 'array-methods',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    mediumUrl: 'https://blog.bitsrc.io/array-methods-in-javascript-bfceccb17f11',
    difficulty: 'easy',
    estimatedTime: 100,
    subtasks: [
      'String APIs and templating',
      'map, filter, reduce mastery',
      'find, some, every, flatMap',
      'Immutability patterns',
      'Performance considerations'
    ],
  },
  {
    id: 'js-functional-programming',
    title: 'Functional Programming in JavaScript',
    description: 'Write robust code with FP principles and patterns',
    tags: ['fp', 'immutability', 'pure-functions'],
    jsInfoSlug: 'array-methods#functional-methods',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Functional_programming',
    mediumUrl: 'https://medium.com/@vrcodedev/functional-programming-in-javascript-4e7b1d9f9b7a',
    difficulty: 'medium',
    estimatedTime: 120,
    subtasks: [
      'Pure functions and immutability',
      'Higher-order functions and composition',
      'Currying and partial application',
      'Point-free style',
      'Interview exercises'
    ],
  },
  {
    id: 'js-error-handling',
    title: 'Error Handling, try/catch, and Custom Errors',
    description: 'Design robust error flows and custom error types',
    tags: ['errors', 'try-catch', 'custom-errors'],
    jsInfoSlug: 'try-catch',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
    mediumUrl: 'https://blog.logrocket.com/error-handling-node-js/',
    difficulty: 'easy',
    estimatedTime: 90,
    subtasks: [
      'try/catch/finally patterns',
      'Creating custom errors',
      'Async error handling',
      'Error boundaries concept (React)',
      'Interview questions'
    ],
  },
  {
    id: 'js-debounce-throttle',
    title: 'Debounce and Throttle Patterns',
    description: 'Control execution rate for performance-sensitive code',
    tags: ['debounce', 'throttle', 'performance'],
    jsInfoSlug: 'debounce',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/Performance',
    mediumUrl: 'https://css-tricks.com/debouncing-throttling-explained-examples/',
    difficulty: 'easy',
    estimatedTime: 70,
    subtasks: [
      'Implement debounce',
      'Implement throttle',
      'When to use which',
      'RN/React examples',
      'Interview exercises'
    ],
  },
  {
    id: 'js-fetch-abort',
    title: 'Fetch API, AbortController, and Timeouts',
    description: 'Master fetch patterns, cancellation, and retries',
    tags: ['fetch', 'abortcontroller', 'http'],
    jsInfoSlug: 'fetch',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
    mediumUrl: 'https://blog.logrocket.com/understanding-abortcontroller-javascript/',
    difficulty: 'medium',
    estimatedTime: 110,
    subtasks: [
      'Fetch basics and JSON',
      'AbortController and cancellation',
      'Retry with backoff',
      'Timeouts and races',
      'Interview exercises'
    ],
  },
  {
    id: 'js-performance-gc',
    title: 'Performance, Memory, and Garbage Collection',
    description: 'Write performant code and avoid memory leaks',
    tags: ['performance', 'memory', 'gc'],
    jsInfoSlug: 'garbage-collection',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management',
    mediumUrl: 'https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-7f64d9f0b7b8',
    difficulty: 'hard',
    estimatedTime: 140,
    subtasks: [
      'GC algorithms basics',
      'Detecting memory leaks',
      'Avoiding accidental retention',
      'Perf profiling basics',
      'Interview exercises'
    ],
  }
];

const buildTaskFromTopic = (topic: TopicSpec): Task => {
  const now = new Date();
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: 'JavaScript',
    status: 'todo',
    priority: 'high',
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    tags: topic.tags,
    resources: [
      {
        id: `${topic.id}-res-1`,
        title: `JavaScript.info - ${topic.title}`,
        url: topic.jsInfoSlug ? `https://javascript.info/${topic.jsInfoSlug}` : 'https://javascript.info/',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 30,
        rating: 4.8,
        lastUpdated: now,
        author: 'Ilya Kantor',
        tags: ['javascript', ...topic.tags],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.7,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.95,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.6,
      },
      {
        id: `${topic.id}-res-2`,
        title: `MDN - ${topic.title}`,
        url: topic.mdnUrl || 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 25,
        rating: 4.7,
        lastUpdated: now,
        author: 'MDN Contributors',
        tags: ['javascript', ...topic.tags],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.9,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.5,
      },
      {
        id: `${topic.id}-res-3`,
        title: `In-depth: ${topic.title}`,
        url: topic.mediumUrl || 'https://medium.com/tag/javascript',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.6,
        lastUpdated: now,
        author: 'Community',
        tags: ['javascript', ...topic.tags],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.85,
        userCompletionRate: 0.75,
        helpfulnessScore: 4.4,
      },
    ],
    subtasks: topic.subtasks.map((title, idx) => ({
      id: `${topic.id}-sub-${idx + 1}`,
      title,
      completed: false,
      estimatedTime: Math.max(15, Math.round(topic.estimatedTime / Math.max(5, topic.subtasks.length))),
      resources: [],
      notes: ''
    })),
    prerequisites: [],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reviewCount: 0,
      interval: 7,
      retentionScore: 0.8,
    },
    timeTracking: {
      taskId: topic.id,
      estimatedTime: topic.estimatedTime,
      totalTimeSpent: 0,
      sessions: [],
      efficiency: 0,
      focusScore: 0,
    },
    createdAt: now,
    updatedAt: now,
    completedAt: undefined,
  };
};

const generatedJavaScriptTasks: Task[] = extraJavaScriptTopics.map(buildTaskFromTopic);

export const uploadAllJavaScriptTasks = async () => {
  try {
    console.log('🚀 Starting comprehensive JavaScript tasks upload...');
    const batch = firebaseFirestore.batch();
    let successCount = 0;
    let errorCount = 0;

    const allTasksToUpload: Task[] = [...allJavaScriptTasks, ...generatedJavaScriptTasks];

    for (const task of allTasksToUpload) {
      try {
        // Create a clean task object for Firebase with proper defaults
        const firebaseTask = {
          id: task.id || '',
          title: task.title || '',
          description: task.description || '',
          category: task.category || '',
          status: task.status || 'todo',
          priority: task.priority || 'medium',
          difficulty: task.difficulty || 'medium',
          estimatedTime: task.estimatedTime || 0,
          tags: task.tags || [],
          resources: task.resources.map(resource => ({
            id: resource.id || '',
            title: resource.title || '',
            url: resource.url || '',
            type: resource.type || 'documentation',
            difficulty: resource.difficulty || 'beginner',
            estimatedReadTime: resource.estimatedReadTime || 0,
            rating: resource.rating || 0,
            lastUpdated: resource.lastUpdated ? resource.lastUpdated.toISOString() : new Date().toISOString(),
            author: resource.author || '',
            tags: resource.tags || [],
            isPremium: resource.isPremium || false,
            language: resource.language || 'javascript',
            read: resource.read || false,
            bookmarked: resource.bookmarked || false,
            progress: resource.progress || 0,
            communityRating: resource.communityRating || 0,
            difficultyAccuracy: resource.difficultyAccuracy || 0,
            contentFreshness: resource.contentFreshness || 0,
            userCompletionRate: resource.userCompletionRate || 0,
            helpfulnessScore: resource.helpfulnessScore || 0
          })),
          subtasks: task.subtasks.map(subtask => ({
            id: subtask.id || '',
            title: subtask.title || '',
            completed: subtask.completed || false,
            estimatedTime: subtask.estimatedTime || 0,
            resources: subtask.resources || [],
            notes: subtask.notes || ''
          })),
          prerequisites: task.prerequisites || [],
          followUpTasks: task.followUpTasks || [],
          masteryLevel: task.masteryLevel || 'learning',
          reviewSchedule: {
            nextReview: task.reviewSchedule?.nextReview ? task.reviewSchedule.nextReview.toISOString() : new Date().toISOString(),
            reviewCount: task.reviewSchedule?.reviewCount || 0,
            interval: task.reviewSchedule?.interval || 7,
            retentionScore: task.reviewSchedule?.retentionScore || 0
          },
          timeTracking: {
            estimatedTime: task.timeTracking?.estimatedTime || 0,
            totalTimeSpent: task.timeTracking?.totalTimeSpent || 0,
            sessions: task.timeTracking?.sessions?.map(session => ({
              id: session.id || '',
              startTime: session.startTime ? session.startTime.toISOString() : new Date().toISOString(),
              endTime: session.endTime ? session.endTime.toISOString() : null,
              duration: session.duration || 0,
              sessionType: session.sessionType || 'study',
              focusRating: session.focusRating || 0,
              notes: session.notes || ''
            })) || []
          },
          createdAt: task.createdAt ? task.createdAt.toISOString() : new Date().toISOString(),
          updatedAt: task.updatedAt ? task.updatedAt.toISOString() : new Date().toISOString(),
          completedAt: task.completedAt ? task.completedAt.toISOString() : null
        };

        const taskRef = firebaseFirestore.collection('tasks').doc(task.id);
        batch.set(taskRef, firebaseTask);
        successCount++;
        console.log(`✅ Added JavaScript task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding JavaScript task ${task.title}:`, error);
      }
    }

    await batch.commit();
    console.log(`🎉 Comprehensive JavaScript tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ Comprehensive JavaScript tasks batch upload failed:', error);
    throw error;
  }
}; 