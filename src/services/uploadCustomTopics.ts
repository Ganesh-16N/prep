import { firebaseFirestore } from '../config/firebase';
import { Task } from '../types';

type TopicSpec = {
  id: string;
  category: 'React' | 'React Native';
  title: string;
  description: string;
  tags: string[];
  difficulty: Task['difficulty'];
  estimatedTime: number;
  resources: Array<{ title: string; url: string; type: 'documentation' | 'mdn' | 'blog' | 'youtube' | 'github' | 'course' | 'video' | 'docs' }>;
  subtasks: string[];
};

const topics: TopicSpec[] = [
  {
    id: 'react-all-hooks-catalog',
    category: 'React',
    title: 'React Hooks: Complete Catalog and Patterns',
    description: 'Deep-dive into all core hooks, their pitfalls, patterns, and advanced usage.',
    tags: ['react', 'hooks', 'advanced'],
    difficulty: 'hard',
    estimatedTime: 240,
    resources: [
      { title: 'React Docs: Hooks API Reference', url: 'https://react.dev/reference/react', type: 'documentation' },
      { title: 'Kent C. Dodds: Advanced React Hooks', url: 'https://kentcdodds.com/blog/application-state-management-with-react', type: 'blog' },
      { title: 'YouTube: Advanced Hooks & Patterns', url: 'https://www.youtube.com/results?search_query=advanced+react+hooks+patterns', type: 'youtube' },
    ],
    subtasks: [
      'useState: batching, functional updates, pitfalls',
      'useEffect vs useLayoutEffect: timing, cleanup, race conditions',
      'useRef and useImperativeHandle: imperative escape hatches',
      'useMemo and useCallback: memoization strategy and costs',
      'useReducer: complex local state and lazy init',
      'useContext: avoiding re-renders and context selectors',
      'useId, useTransition, useDeferredValue: concurrency-friendly hooks',
      'useSyncExternalStore, useInsertionEffect: special use-cases',
      'Designing robust custom hooks',
    ],
  },
  {
    id: 'react-rerendering-and-optimization',
    category: 'React',
    title: 'React Re-rendering: Causes and Optimization',
    description: 'Understand what triggers renders and how to prevent unnecessary updates.',
    tags: ['react', 'performance', 'rendering'],
    difficulty: 'medium',
    estimatedTime: 180,
    resources: [
      { title: 'React Docs: Optimizing Performance', url: 'https://react.dev/learn/optimizing-performance', type: 'documentation' },
      { title: 'Overreacted: A Complete Guide to useEffect', url: 'https://overreacted.io/a-complete-guide-to-useeffect/', type: 'blog' },
      { title: 'YouTube: Fixing Slow React Renders', url: 'https://www.youtube.com/results?search_query=react+fix+slow+render+memo+usecallback', type: 'youtube' },
    ],
    subtasks: [
      'Render cycle: when and why React re-renders',
      'Props identity and referential equality (objects/functions)',
      'React.memo and custom comparison traps',
      'List rendering: keys, virtualization basics',
      'Profiling re-renders and flamegraphs',
    ],
  },
  {
    id: 'rn-memory-cache-performance',
    category: 'React Native',
    title: 'React Native Performance: RAM, Cache, and Memory Management',
    description: 'Improve RN performance with caching, memory strategies, and profiling.',
    tags: ['react-native', 'performance', 'memory', 'cache'],
    difficulty: 'hard',
    estimatedTime: 200,
    resources: [
      { title: 'RN Docs: Performance', url: 'https://reactnative.dev/docs/performance', type: 'documentation' },
      { title: 'Flipper: Performance/Memory Tools', url: 'https://fbflipper.com/docs/features/performance/', type: 'documentation' },
      { title: 'YouTube: RN Performance Optimization', url: 'https://www.youtube.com/results?search_query=react+native+performance+optimization', type: 'youtube' },
    ],
    subtasks: [
      'RAM vs JS heap vs Native heap in RN',
      'Avoiding memory leaks: timers, subscriptions, refs',
      'Image caching strategies and sizes',
      'FlatList tuning: getItemLayout, keyExtractor, windowSize',
      'Hermes, JSI, and startup time considerations',
    ],
  },
  {
    id: 'rn-architecture-detailed',
    category: 'React Native',
    title: 'React Native Architecture: Fabric, TurboModules, JSI (Deep Dive)',
    description: 'End-to-end deep dive into RN New Architecture, migration and best practices.',
    tags: ['react-native', 'architecture', 'fabric', 'turbo', 'jsi'],
    difficulty: 'hard',
    estimatedTime: 220,
    resources: [
      { title: 'RN Docs: Architecture Overview', url: 'https://reactnative.dev/architecture/overview', type: 'documentation' },
      { title: 'RN New Architecture Docs', url: 'https://reactnative.dev/docs/the-new-architecture/landing-page', type: 'documentation' },
      { title: 'YouTube: React Native New Architecture', url: 'https://www.youtube.com/results?search_query=react+native+new+architecture+fabric+turbo+modules', type: 'youtube' },
    ],
    subtasks: [
      'Old vs New Architecture: bridging vs JSI',
      'Fabric render pipeline and threading model',
      'TurboModules and Codegen basics',
      'Autolinking, build config, and migration path',
      'Performance implications and best practices',
    ],
  },
];

export const uploadCustomInterviewTopics = async () => {
  try {
    console.log('🚀 Uploading custom interview topics (4)...');
    const batch = firebaseFirestore.batch();
    let successCount = 0;
    let errorCount = 0;

    topics.forEach(topic => {
      try {
        const now = new Date();
        const task: Task = {
          id: topic.id,
          title: topic.title,
          description: topic.description,
          category: topic.category,
          status: 'todo',
          priority: 'high',
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          tags: topic.tags,
          resources: topic.resources.map((r, idx) => ({
            id: `${topic.id}-res-${idx + 1}`,
            title: r.title,
            url: r.url,
            type: r.type,
            difficulty: 'intermediate',
            estimatedReadTime: 25,
            rating: 4.7,
            lastUpdated: now,
            author: 'Community',
            tags: topic.tags,
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
          })),
          subtasks: topic.subtasks.map((s, i) => ({ id: `${topic.id}-sub-${i + 1}`, title: s, completed: false, estimatedTime: Math.max(15, Math.round(topic.estimatedTime / Math.max(5, topic.subtasks.length))), resources: [], notes: '' })),
          prerequisites: [],
          followUpTasks: [],
          masteryLevel: 'learning',
          reviewSchedule: { nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), reviewCount: 0, interval: 7, retentionScore: 0.8 },
          timeTracking: { taskId: topic.id, estimatedTime: topic.estimatedTime, totalTimeSpent: 0, sessions: [], efficiency: 0, focusScore: 0 },
          createdAt: now,
          updatedAt: now,
          completedAt: undefined,
        };

        const firebaseTask = {
          ...task,
          resources: task.resources.map(res => ({ ...res, lastUpdated: (res as any).lastUpdated.toISOString() })),
          reviewSchedule: { ...task.reviewSchedule, nextReview: (task.reviewSchedule as any).nextReview.toISOString() },
          timeTracking: { ...task.timeTracking, sessions: [] },
          createdAt: (task.createdAt as any).toISOString(),
          updatedAt: (task.updatedAt as any).toISOString(),
          completedAt: null,
        } as any;

        const ref = firebaseFirestore.collection('tasks').doc(task.id);
        batch.set(ref, firebaseTask);
        successCount++;
      } catch (e) {
        errorCount++;
      }
    });

    await batch.commit();
    console.log(`🎉 Custom topics upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ Custom topics upload failed:', error);
    throw error;
  }
};

