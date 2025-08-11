import { firebaseFirestore } from '../config/firebase';
import { Task } from '../types';

// Comprehensive JavaScript tasks for 20 LPA interview preparation
const javascriptTasks: Task[] = [
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
        type: 'book',
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
        type: 'book',
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
      estimatedTime: 180,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
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
        type: 'tutorial',
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
        type: 'article',
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
      estimatedTime: 150,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
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
        type: 'article',
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
      estimatedTime: 200,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
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
        type: 'tutorial',
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
        type: 'article',
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
      estimatedTime: 160,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  },
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
        type: 'tutorial',
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
        type: 'article',
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
      estimatedTime: 140,
      totalTimeSpent: 0,
      sessions: []
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: undefined
  }
];

export const uploadJavaScriptTasks = async () => {
  try {
    console.log('🚀 Starting JavaScript tasks upload...');
    const batch = firebaseFirestore.batch();
    let successCount = 0;
    let errorCount = 0;

    for (const task of javascriptTasks) {
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
    console.log(`🎉 JavaScript tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ JavaScript tasks batch upload failed:', error);
    throw error;
  }
}; 