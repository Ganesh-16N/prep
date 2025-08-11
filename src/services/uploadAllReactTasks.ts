import { firebaseFirestore } from '../config/firebase';
import { Task } from '../types';

type TopicSpec = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  docUrl?: string;
  blogUrl?: string;
  videoUrl?: string;
  difficulty: Task['difficulty'];
  estimatedTime: number;
  subtasks: string[];
};

// Core 5 React topics
const coreReactTopics: TopicSpec[] = [
  {
    id: 'react-basics',
    title: 'React Basics and Component Model',
    description: 'JSX, components, props, state, rendering flow',
    tags: ['jsx', 'components', 'props', 'state'],
    docUrl: 'https://react.dev/learn',
    blogUrl: 'https://overreacted.io/',
    videoUrl: 'https://www.youtube.com/watch?v=dpw9EHDh2bM',
    difficulty: 'easy',
    estimatedTime: 120,
    subtasks: ['JSX and rendering', 'Props vs state', 'Composition over inheritance', 'Keys and lists', 'Conditional rendering'],
  },
  {
    id: 'react-hooks-deep-dive',
    title: 'Hooks Deep Dive',
    description: 'useState, useEffect, useRef, useMemo, useCallback, custom hooks',
    tags: ['hooks', 'useEffect', 'useMemo', 'useCallback', 'useRef'],
    docUrl: 'https://react.dev/reference/react',
    blogUrl: 'https://kentcdodds.com/blog',
    videoUrl: 'https://www.youtube.com/watch?v=Kd0g-5QFQZY',
    difficulty: 'medium',
    estimatedTime: 180,
    subtasks: ['useState patterns', 'useEffect pitfalls and cleanup', 'useRef and DOM', 'Memoization strategies', 'Custom hooks design'],
  },
  {
    id: 'react-state-management-rtk',
    title: 'State Management with Redux Toolkit',
    description: 'Modern Redux with RTK and React-Redux hooks',
    tags: ['redux', 'rtk', 'state'],
    docUrl: 'https://redux-toolkit.js.org/',
    blogUrl: 'https://blog.logrocket.com/tag/redux/',
    videoUrl: 'https://www.youtube.com/watch?v=9zySeP5vH9c',
    difficulty: 'medium',
    estimatedTime: 150,
    subtasks: ['Slices and reducers', 'Async thunks', 'RTK Query overview', 'Immutability and Immer', 'Best practices'],
  },
  {
    id: 'react-performance',
    title: 'Performance Optimization',
    description: 'Reconciliation, memoization, avoiding re-renders',
    tags: ['performance', 'memo', 'reconciliation'],
    docUrl: 'https://react.dev/learn/optimizing-performance',
    blogUrl: 'https://blog.bitsrc.io/tagged/react-performance',
    videoUrl: 'https://www.youtube.com/watch?v=t9c0iAK6f2Y',
    difficulty: 'medium',
    estimatedTime: 150,
    subtasks: ['React.memo and equality', 'useMemo/useCallback usage', 'Virtualization basics', 'Profiling with React DevTools', 'Rendering patterns'],
  },
  {
    id: 'react-patterns',
    title: 'React Patterns and Architecture',
    description: 'Compound components, render props, controlled vs uncontrolled',
    tags: ['patterns', 'architecture'],
    docUrl: 'https://react.dev/learn/thinking-in-react',
    blogUrl: 'https://reactpatterns.com/',
    videoUrl: 'https://www.youtube.com/watch?v=YaZg8wg39QQ',
    difficulty: 'medium',
    estimatedTime: 150,
    subtasks: ['Compound components', 'Render props', 'Controlled vs uncontrolled', 'Container/presentational split', 'Folder structure'],
  },
];

// Extended React topics for full coverage
const extraReactTopics: TopicSpec[] = [
  { id: 'react-context', title: 'Context API', description: 'Avoid prop drilling with Context', tags: ['context'], docUrl: 'https://react.dev/reference/react/Context', blogUrl: 'https://kentcdodds.com/blog/how-to-use-react-context-effectively', difficulty: 'easy', estimatedTime: 90, subtasks: ['Create and provide context', 'useContext usage', 'Avoiding over-render', 'Context selector patterns', 'When to prefer RTK'] },
  { id: 'react-forms', title: 'Forms and Validation', description: 'Controlled/uncontrolled, libraries', tags: ['forms'], docUrl: 'https://react.dev/learn/managing-state#updating-objects-and-arrays-in-state', blogUrl: 'https://react-hook-form.com/', difficulty: 'medium', estimatedTime: 120, subtasks: ['Controlled inputs', 'Uncontrolled with refs', 'Validation patterns', 'React Hook Form basics', 'Error UX'] },
  { id: 'react-error-boundaries', title: 'Error Boundaries', description: 'Catching render errors', tags: ['errors'], docUrl: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary', blogUrl: 'https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react', difficulty: 'easy', estimatedTime: 60, subtasks: ['Create boundary', 'Fallback UI', 'Logging', 'Resetting error', 'Async vs render errors'] },
  { id: 'react-refs-forwardref', title: 'Refs and forwardRef', description: 'Imperative handles and focus management', tags: ['refs'], docUrl: 'https://react.dev/reference/react/forwardRef', blogUrl: 'https://blog.logrocket.com/using-react-forwardref/', difficulty: 'medium', estimatedTime: 90, subtasks: ['useRef basics', 'forwardRef', 'useImperativeHandle', 'Focus traps', 'Accessibility'] },
  { id: 'react-suspense', title: 'Suspense and Code Splitting', description: 'Lazy loading and Suspense boundaries', tags: ['suspense', 'lazy'], docUrl: 'https://react.dev/reference/react/Suspense', blogUrl: 'https://web.dev/code-splitting-with-dynamic-imports-in-react/', difficulty: 'medium', estimatedTime: 110, subtasks: ['React.lazy', 'Suspense boundaries', 'Fallback strategies', 'Bundle splitting', 'Route-based splits'] },
  { id: 'react-ssr-next', title: 'SSR/SSG with Next.js (overview)', description: 'Rendering strategies with Next.js', tags: ['nextjs', 'ssr'], docUrl: 'https://nextjs.org/learn', blogUrl: 'https://nextjs.org/docs', difficulty: 'medium', estimatedTime: 120, subtasks: ['SSR vs SSG vs ISR', 'Data fetching patterns', 'Routing basics', 'Env and config', 'Deployment overview'] },
  { id: 'react-testing', title: 'Testing React', description: 'RTL and Jest fundamentals', tags: ['testing'], docUrl: 'https://testing-library.com/docs/react-testing-library/intro/', blogUrl: 'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library', difficulty: 'medium', estimatedTime: 120, subtasks: ['Render and queries', 'User events', 'Async tests', 'Mocking', 'Coverage'] },
  { id: 'react-accessibility', title: 'Accessibility (a11y)', description: 'Accessible components and ARIA', tags: ['a11y'], docUrl: 'https://react.dev/learn/accessibility', blogUrl: 'https://www.w3.org/WAI/standards-guidelines/aria/', difficulty: 'easy', estimatedTime: 90, subtasks: ['ARIA basics', 'Focusable UI', 'Keyboard navigation', 'Color contrast', 'Screen readers'] },
  { id: 'react-typescript', title: 'TypeScript with React', description: 'Props, generics, hooks typing', tags: ['typescript'], docUrl: 'https://react-typescript-cheatsheet.netlify.app/', blogUrl: 'https://blog.bitsrc.io/typescript-with-react', difficulty: 'medium', estimatedTime: 120, subtasks: ['Props typing', 'Component generics', 'Hook typings', 'Context types', 'Redux types'] },
];

const buildTaskFromTopic = (topic: TopicSpec): Task => {
  const now = new Date();
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: 'React',
    status: 'todo',
    priority: 'high',
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    tags: topic.tags,
    resources: [
      {
        id: `${topic.id}-res-1`,
        title: `Docs - ${topic.title}`,
        url: topic.docUrl || 'https://react.dev/learn',
        type: 'documentation',
        difficulty: 'intermediate',
        estimatedReadTime: 30,
        rating: 4.8,
        lastUpdated: now,
        author: 'React Team',
        tags: ['react', ...topic.tags],
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
        title: `In-depth Article - ${topic.title}`,
        url: topic.blogUrl || 'https://kentcdodds.com/blog',
        type: 'blog',
        difficulty: 'intermediate',
        estimatedReadTime: 20,
        rating: 4.6,
        lastUpdated: now,
        author: 'Community',
        tags: ['react', ...topic.tags],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.5,
        difficultyAccuracy: 0.85,
        contentFreshness: 0.9,
        userCompletionRate: 0.8,
        helpfulnessScore: 4.4,
      },
      {
        id: `${topic.id}-res-3`,
        title: `Video - ${topic.title}`,
        url: topic.videoUrl || 'https://www.youtube.com/results?search_query=react+' + encodeURIComponent(topic.title),
        type: 'youtube',
        difficulty: 'intermediate',
        estimatedReadTime: 25,
        rating: 4.7,
        lastUpdated: now,
        author: 'YouTube',
        tags: ['react', ...topic.tags],
        isPremium: false,
        language: 'javascript',
        read: false,
        bookmarked: false,
        progress: 0,
        communityRating: 4.6,
        difficultyAccuracy: 0.9,
        contentFreshness: 0.9,
        userCompletionRate: 0.85,
        helpfulnessScore: 4.5,
      },
    ],
    subtasks: topic.subtasks.map((title, idx) => ({
      id: `${topic.id}-sub-${idx + 1}`,
      title,
      completed: false,
      estimatedTime: Math.max(15, Math.round(topic.estimatedTime / Math.max(5, topic.subtasks.length))),
      resources: [],
      notes: '',
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

const coreReactTasks: Task[] = coreReactTopics.map(buildTaskFromTopic);
const allReactTasks: Task[] = [...coreReactTasks, ...extraReactTopics.map(buildTaskFromTopic)];

export const uploadReactCoreTasks = async () => {
  return uploadTasks('React', coreReactTasks);
};

export const uploadAllReactTasks = async () => {
  return uploadTasks('React', allReactTasks);
};

const uploadTasks = async (label: string, tasks: Task[]) => {
  try {
    console.log(`🚀 Starting ${label} tasks upload... (count=${tasks.length})`);
    const batch = firebaseFirestore.batch();
    let successCount = 0;
    let errorCount = 0;

    for (const task of tasks) {
      try {
        const firebaseTask: any = {
          id: task.id || '',
          title: task.title || '',
          description: task.description || '',
          category: task.category || 'React',
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
            lastUpdated: (resource as any).lastUpdated ? (resource as any).lastUpdated.toISOString() : new Date().toISOString(),
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
            helpfulnessScore: resource.helpfulnessScore || 0,
          })),
          subtasks: task.subtasks.map(subtask => ({
            id: subtask.id || '',
            title: subtask.title || '',
            completed: subtask.completed || false,
            estimatedTime: subtask.estimatedTime || 0,
            resources: subtask.resources || [],
            notes: subtask.notes || '',
          })),
          prerequisites: task.prerequisites || [],
          followUpTasks: task.followUpTasks || [],
          masteryLevel: task.masteryLevel || 'learning',
          reviewSchedule: {
            nextReview: task.reviewSchedule?.nextReview ? task.reviewSchedule.nextReview.toISOString() : new Date().toISOString(),
            reviewCount: task.reviewSchedule?.reviewCount || 0,
            interval: task.reviewSchedule?.interval || 7,
            retentionScore: task.reviewSchedule?.retentionScore || 0,
          },
          timeTracking: {
            taskId: task.timeTracking?.taskId || task.id,
            estimatedTime: task.timeTracking?.estimatedTime || 0,
            totalTimeSpent: task.timeTracking?.totalTimeSpent || 0,
            sessions: task.timeTracking?.sessions?.map(session => ({
              id: session.id || '',
              startTime: (session as any).startTime ? (session as any).startTime.toISOString() : new Date().toISOString(),
              endTime: (session as any).endTime ? (session as any).endTime.toISOString() : null,
              duration: session.duration || 0,
              sessionType: session.sessionType || 'study',
              focusRating: session.focusRating || 0,
              notes: session.notes || '',
            })) || [],
            efficiency: (task.timeTracking as any)?.efficiency || 0,
            focusScore: (task.timeTracking as any)?.focusScore || 0,
          },
          createdAt: task.createdAt ? task.createdAt.toISOString() : new Date().toISOString(),
          updatedAt: task.updatedAt ? task.updatedAt.toISOString() : new Date().toISOString(),
          completedAt: task.completedAt ? (task.completedAt as any).toISOString() : null,
        };

        const taskRef = firebaseFirestore.collection('tasks').doc(task.id);
        batch.set(taskRef, firebaseTask);
        successCount++;
        console.log(`✅ Added React task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding React task ${task.title}:`, error);
      }
    }

    await batch.commit();
    console.log(`🎉 React tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ React tasks batch upload failed:', error);
    throw error;
  }
};

