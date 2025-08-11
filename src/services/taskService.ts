import { Task, EnhancedResource, Subtask, ReviewSchedule, TaskTimeTracking, TimeSession } from '../types';

// Enhanced sample resources with comprehensive data
const sampleResources: Record<string, EnhancedResource[]> = {
  'javascript-closures': [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
  ]
};

// Sample subtasks for tasks
const sampleSubtasks: Record<string, Subtask[]> = {
  'javascript-closures': [
    {
      id: 'sub-1',
      title: 'Understand lexical scoping',
      completed: false,
      estimatedTime: 10,
      resources: [],
      notes: 'Learn how variables are scoped in JavaScript'
    },
    {
      id: 'sub-2',
      title: 'Practice closure examples',
      completed: false,
      estimatedTime: 15,
      resources: [],
      notes: 'Write your own closure functions'
    },
    {
      id: 'sub-3',
      title: 'Solve closure interview questions',
      completed: false,
      estimatedTime: 20,
      resources: [],
      notes: 'Practice common closure problems'
    }
  ]
};

// Enhanced sample tasks with all new features
const sampleTasks: Task[] = [
  {
    id: 'javascript-closures',
    title: 'Understanding Closures in JavaScript',
    description: 'Master the concept of closures and lexical scoping with practical examples and interview questions',
    status: 'todo',
    category: 'JavaScript',
    difficulty: 'medium',
    estimatedTime: 45,
    priority: 'high',
    tags: ['javascript', 'fundamentals', 'closures', 'interview'],
    resources: sampleResources['javascript-closures'],
    subtasks: sampleSubtasks['javascript-closures'],
    prerequisites: [],
    followUpTasks: ['javascript-event-loop'],
    masteryLevel: 'learning',
    reviewSchedule: {
      nextReview: new Date('2024-01-22T10:00:00'),
      reviewCount: 0,
      interval: 7,
      retentionScore: 85
    },
    timeTracking: {
      taskId: 'javascript-closures',
      sessions: [],
      totalTimeSpent: 0,
      estimatedTime: 45,
      efficiency: 0,
      focusScore: 0
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'react-performance',
    title: 'React Performance Optimization',
    description: 'Master React.memo, useMemo, useCallback, and other optimization techniques',
    status: 'in-progress',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 60,
    priority: 'high',
    tags: ['react', 'performance', 'optimization', 'hooks'],
    resources: sampleResources['javascript-closures'], // Reusing resources for now
    subtasks: [
      {
        id: 'sub-4',
        title: 'Learn React.memo',
        completed: true,
        estimatedTime: 15,
        resources: [],
        notes: 'Understand component memoization'
      },
      {
        id: 'sub-5',
        title: 'Master useMemo',
        completed: false,
        estimatedTime: 20,
        resources: [],
        notes: 'Optimize expensive calculations'
      }
    ],
    prerequisites: ['javascript-closures'],
    followUpTasks: ['react-hooks'],
    masteryLevel: 'practicing',
    reviewSchedule: {
      nextReview: new Date('2024-01-25T14:00:00'),
      reviewCount: 1,
      interval: 5,
      retentionScore: 70
    },
    timeTracking: {
      taskId: 'react-performance',
      sessions: [
        {
          id: 'session-1',
          startTime: new Date('2024-01-15T10:00:00'),
          endTime: new Date('2024-01-15T11:00:00'),
          duration: 60,
          sessionType: 'study',
          focusRating: 4,
          notes: 'Good progress on React.memo'
        }
      ],
      totalTimeSpent: 60,
      estimatedTime: 60,
      efficiency: 1.0,
      focusScore: 4.0
    },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'machine-coding-trello',
    title: 'Build Trello Clone in 2 Hours',
    description: 'Create a drag-and-drop task management app with React',
    status: 'done',
    category: 'Machine Coding',
    difficulty: 'hard',
    estimatedTime: 120,
    priority: 'medium',
    tags: ['machine-coding', 'react', 'drag-drop', 'project'],
    resources: sampleResources['javascript-closures'], // Reusing resources for now
    subtasks: [
      {
        id: 'sub-6',
        title: 'Set up project structure',
        completed: true,
        estimatedTime: 10,
        resources: [],
        notes: 'Create React app and install dependencies'
      },
      {
        id: 'sub-7',
        title: 'Implement drag and drop',
        completed: true,
        estimatedTime: 45,
        resources: [],
        notes: 'Add react-dnd functionality'
      },
      {
        id: 'sub-8',
        title: 'Add card management',
        completed: true,
        estimatedTime: 35,
        resources: [],
        notes: 'Create, edit, and delete cards'
      }
    ],
    prerequisites: ['react-performance'],
    followUpTasks: ['machine-coding-calendar'],
    masteryLevel: 'mastered',
    reviewSchedule: {
      nextReview: new Date('2024-02-01T10:00:00'),
      reviewCount: 2,
      interval: 14,
      retentionScore: 95
    },
    timeTracking: {
      taskId: 'machine-coding-trello',
      sessions: [
        {
          id: 'session-2',
          startTime: new Date('2024-01-10T09:00:00'),
          endTime: new Date('2024-01-10T11:00:00'),
          duration: 120,
          sessionType: 'practice',
          focusRating: 5,
          notes: 'Excellent focus, completed all features'
        }
      ],
      totalTimeSpent: 120,
      estimatedTime: 120,
      efficiency: 1.0,
      focusScore: 5.0
    },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-10'),
    completedAt: new Date('2024-01-10')
  }
];

export const fetchTasks = async (): Promise<Task[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return sampleTasks;
};

export const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const taskIndex = sampleTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    sampleTasks[taskIndex].status = status;
    sampleTasks[taskIndex].updatedAt = new Date();
    if (status === 'done') {
      sampleTasks[taskIndex].completedAt = new Date();
    }
  }
};

export const searchTasks = async (query: string): Promise<Task[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return sampleTasks.filter(task => 
    task.title.toLowerCase().includes(query.toLowerCase()) ||
    task.description.toLowerCase().includes(query.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};

export const getTasksByCategory = async (category: string): Promise<Task[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return sampleTasks.filter(task => task.category === category);
};

export const getTasksByStatus = async (status: Task['status']): Promise<Task[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return sampleTasks.filter(task => task.status === status);
};

export const updateSubtaskStatus = async (taskId: string, subtaskId: string, completed: boolean): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const taskIndex = sampleTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const subtaskIndex = sampleTasks[taskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);
    if (subtaskIndex !== -1) {
      sampleTasks[taskIndex].subtasks[subtaskIndex].completed = completed;
      sampleTasks[taskIndex].updatedAt = new Date();
    }
  }
};

export const bookmarkResource = async (taskId: string, resourceId: string, bookmarked: boolean): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const taskIndex = sampleTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const resourceIndex = sampleTasks[taskIndex].resources.findIndex(resource => resource.id === resourceId);
    if (resourceIndex !== -1) {
      sampleTasks[taskIndex].resources[resourceIndex].bookmarked = bookmarked;
      sampleTasks[taskIndex].updatedAt = new Date();
    }
  }
}; 