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
  repoUrl?: string;
  difficulty: Task['difficulty'];
  estimatedTime: number;
  subtasks: string[];
};

// Core 5 (start from very basic)
const coreMCTopics: TopicSpec[] = [
  {
    id: 'mc-button-component',
    title: 'Build a Reusable Button Component',
    description: 'Create a configurable Button with variants, sizes, loading, and disabled states',
    tags: ['component', 'ui', 'accessibility'],
    docUrl: 'https://react.dev/learn',
    blogUrl: 'https://reactpatterns.com/',
    videoUrl: 'https://www.youtube.com/results?search_query=react+reusable+button+component',
    repoUrl: 'https://github.com/topics/react-component',
    difficulty: 'easy',
    estimatedTime: 90,
    subtasks: ['Primary/secondary/ghost variants', 'Sizes (sm/md/lg)', 'Loading/disabled states', 'Icon left/right', 'Keyboard/focus a11y'],
  },
  {
    id: 'mc-input-form-field',
    title: 'Input Field with Validation',
    description: 'Build a controlled Input with label, helper/error text, and validation rules',
    tags: ['forms', 'validation', 'component'],
    docUrl: 'https://react.dev/learn/managing-state',
    blogUrl: 'https://react-hook-form.com/',
    videoUrl: 'https://www.youtube.com/results?search_query=react+input+validation',
    repoUrl: 'https://github.com/react-hook-form/react-hook-form',
    difficulty: 'easy',
    estimatedTime: 100,
    subtasks: ['Label/placeholder', 'Helper and error text', 'Required/min/max rules', 'onBlur/onChange validation', 'Accessible errors'],
  },
  {
    id: 'mc-modal',
    title: 'Modal/Dialog Component',
    description: 'Implement a modal with portal, focus trap, escape/overlay close, and responsive layout',
    tags: ['modal', 'portal', 'a11y'],
    docUrl: 'https://react.dev/learn/escape-hatches#portals',
    blogUrl: 'https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/',
    videoUrl: 'https://www.youtube.com/results?search_query=accessible+modal+react',
    repoUrl: 'https://github.com/radix-ui/primitives',
    difficulty: 'medium',
    estimatedTime: 120,
    subtasks: ['Portal render', 'Focus trap/restore', 'Escape/overlay close', 'Scroll lock', 'Responsive sizing'],
  },
  {
    id: 'mc-todo-crud',
    title: 'Todo App (CRUD + Filter + Persist)',
    description: 'Implement add/edit/delete, filter by status, and persistence with local storage',
    tags: ['crud', 'state', 'storage'],
    docUrl: 'https://react.dev/learn/state-a-components-memory',
    blogUrl: 'https://blog.logrocket.com/creating-crud-app-react-hooks/',
    videoUrl: 'https://www.youtube.com/results?search_query=react+todo+app+crud',
    repoUrl: 'https://github.com/tastejs/todomvc',
    difficulty: 'easy',
    estimatedTime: 140,
    subtasks: ['Add/edit/delete', 'Toggle complete', 'Filter: all/active/done', 'Persist with AsyncStorage/web localStorage', 'Empty/edge states'],
  },
  {
    id: 'mc-list-search-sort-pagination',
    title: 'List with Search, Sort, and Pagination',
    description: 'Build a performant list with client-side search, sorting, and pagination controls',
    tags: ['list', 'search', 'pagination'],
    docUrl: 'https://react.dev/learn/you-might-not-need-an-effect',
    blogUrl: 'https://blog.bitsrc.io/building-search-and-sort-in-react',
    videoUrl: 'https://www.youtube.com/results?search_query=react+list+search+sort+pagination',
    repoUrl: 'https://github.com/facebook/react',
    difficulty: 'medium',
    estimatedTime: 150,
    subtasks: ['Client search (debounced)', 'Sort asc/desc', 'Page size + next/prev', 'Empty/error states', 'Perf: memoization/keys'],
  },
];

// Extended essentials (practical MC catalogue)
const extraMCTopics: TopicSpec[] = [
  { id: 'mc-virtualized-list', title: 'Virtualized List (10k rows)', description: 'Use windowing to render large lists efficiently', tags: ['virtualization', 'performance'], docUrl: 'https://reactnative.dev/docs/flatlist', blogUrl: 'https://react-window.vercel.app/', videoUrl: 'https://www.youtube.com/results?search_query=react+virtualized+list', repoUrl: 'https://github.com/bvaughn/react-window', difficulty: 'hard', estimatedTime: 160, subtasks: ['Windowing basics', 'Sticky headers', 'Dynamic row heights', 'Pull-to-refresh (RN)', 'Perf profiling'] },
  { id: 'mc-dnd', title: 'Drag and Drop (Kanban)', description: 'Implement DnD to reorder items/columns', tags: ['drag-drop'], docUrl: 'https://docs.dndkit.com/', blogUrl: 'https://react-dnd.github.io/react-dnd/about', videoUrl: 'https://www.youtube.com/results?search_query=react+drag+and+drop', repoUrl: 'https://github.com/atlassian/react-beautiful-dnd', difficulty: 'medium', estimatedTime: 150, subtasks: ['Accessible DnD', 'Reorder items', 'Reorder columns', 'Drag handle + keyboard', 'Persist layout'] },
  { id: 'mc-file-upload', title: 'File Upload (with Progress)', description: 'Upload files with progress, cancel, and validation', tags: ['upload'], docUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', blogUrl: 'https://axios-http.com/docs/req_config', videoUrl: 'https://www.youtube.com/results?search_query=react+file+upload+axios', repoUrl: 'https://github.com/axios/axios', difficulty: 'medium', estimatedTime: 120, subtasks: ['Select/drag files', 'Progress + cancel (AbortController)', 'Size/type validation', 'Retry on failure', 'Server mock'] },
  { id: 'mc-offline-cache', title: 'Offline Caching (Queue & Sync)', description: 'Queue writes offline and sync when online', tags: ['offline', 'sync'], docUrl: 'https://reactnative.dev/docs/asyncstorage', blogUrl: 'https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration', videoUrl: 'https://www.youtube.com/results?search_query=offline+first+react+native', repoUrl: 'https://github.com/react-native-async-storage/async-storage', difficulty: 'hard', estimatedTime: 160, subtasks: ['Queue outbound requests', 'Replay on reconnect', 'Conflict resolution basics', 'Status indicators', 'Background sync'] },
  { id: 'mc-toast-notifications', title: 'Toast Notifications System', description: 'Add global toasts with queue and auto-dismiss', tags: ['toast', 'notifications'], docUrl: 'https://react.dev/learn/context', blogUrl: 'https://fkhadra.github.io/react-toastify/introduction', videoUrl: 'https://www.youtube.com/results?search_query=react+toast+notifications', repoUrl: 'https://github.com/fkhadra/react-toastify', difficulty: 'easy', estimatedTime: 90, subtasks: ['Context provider', 'Variants (success/error)', 'Queue + maxVisible', 'Auto-dismiss + pause on hover', 'Focus management'] },
  { id: 'mc-accordion-tabs', title: 'Accordion & Tabs', description: 'Implement accessible accordion and tabs', tags: ['accordion', 'tabs', 'a11y'], docUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/', blogUrl: 'https://www.radix-ui.com/primitives/docs/components/accordion', videoUrl: 'https://www.youtube.com/results?search_query=accessible+accordion+tabs+react', repoUrl: 'https://github.com/radix-ui/primitives', difficulty: 'easy', estimatedTime: 90, subtasks: ['ARIA roles/attributes', 'Keyboard interactions', 'Persisted state', 'Lazy mount', 'Animation basics'] },
  { id: 'mc-table', title: 'Data Table (Sort/Filter/Paginate)', description: 'Build a table with sorting, filters, pagination', tags: ['table', 'filter'], docUrl: 'https://tanstack.com/table/latest', blogUrl: 'https://blog.bitsrc.io/building-data-tables-react', videoUrl: 'https://www.youtube.com/results?search_query=react+table+sort+filter', repoUrl: 'https://github.com/TanStack/table', difficulty: 'medium', estimatedTime: 150, subtasks: ['Column defs', 'Sort & filter', 'Pagination server/client', 'Empty/error/loading', 'Perf with memo'] },
  { id: 'mc-calendar-datepicker', title: 'Calendar / Date Picker', description: 'Implement a date picker with keyboard navigation', tags: ['calendar', 'date'], docUrl: 'https://react-day-picker.js.org/', blogUrl: 'https://blog.logrocket.com/react-datepicker-tutorial-examples/', videoUrl: 'https://www.youtube.com/results?search_query=react+date+picker', repoUrl: 'https://github.com/gpbl/react-day-picker', difficulty: 'medium', estimatedTime: 140, subtasks: ['Grid rendering', 'Keyboard nav', 'Range selection', 'Min/max constraints', 'Localization basics'] },
];

const buildTaskFromTopic = (topic: TopicSpec): Task => {
  const now = new Date();
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: 'Machine Coding',
    status: 'todo',
    priority: 'high',
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    tags: topic.tags,
    resources: [
      { id: `${topic.id}-res-1`, title: `Docs - ${topic.title}`, url: topic.docUrl || 'https://react.dev/learn', type: 'documentation', difficulty: 'intermediate', estimatedReadTime: 30, rating: 4.8, lastUpdated: now, author: 'Docs', tags: ['machine-coding', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.7, difficultyAccuracy: 0.9, contentFreshness: 0.95, userCompletionRate: 0.85, helpfulnessScore: 4.6 },
      { id: `${topic.id}-res-2`, title: `Blog - ${topic.title}`, url: topic.blogUrl || 'https://blog.bitsrc.io/', type: 'blog', difficulty: 'intermediate', estimatedReadTime: 20, rating: 4.6, lastUpdated: now, author: 'Community', tags: ['machine-coding', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.5, difficultyAccuracy: 0.85, contentFreshness: 0.9, userCompletionRate: 0.8, helpfulnessScore: 4.4 },
      { id: `${topic.id}-res-3`, title: `Video - ${topic.title}`, url: topic.videoUrl || 'https://www.youtube.com/', type: 'youtube', difficulty: 'intermediate', estimatedReadTime: 25, rating: 4.7, lastUpdated: now, author: 'YouTube', tags: ['machine-coding', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.6, difficultyAccuracy: 0.9, contentFreshness: 0.9, userCompletionRate: 0.85, helpfulnessScore: 4.5 },
    ],
    subtasks: topic.subtasks.map((title, idx) => ({ id: `${topic.id}-sub-${idx + 1}`, title, completed: false, estimatedTime: Math.max(15, Math.round(topic.estimatedTime / Math.max(5, topic.subtasks.length))), resources: [], notes: '' })),
    prerequisites: [],
    followUpTasks: [],
    masteryLevel: 'learning',
    reviewSchedule: { nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), reviewCount: 0, interval: 7, retentionScore: 0.8 },
    timeTracking: { taskId: topic.id, estimatedTime: topic.estimatedTime, totalTimeSpent: 0, sessions: [], efficiency: 0, focusScore: 0 },
    createdAt: now,
    updatedAt: now,
    completedAt: undefined,
  };
};

const coreMCTasks: Task[] = coreMCTopics.map(buildTaskFromTopic);
const allMCTasks: Task[] = [...coreMCTasks, ...extraMCTopics.map(buildTaskFromTopic)];

export const uploadMachineCodingCoreTasks = async () => uploadTasks('Machine Coding', coreMCTasks);
export const uploadAllMachineCodingTasks = async () => uploadTasks('Machine Coding', allMCTasks);

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
          category: task.category || 'Machine Coding',
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
          subtasks: task.subtasks.map(subtask => ({ id: subtask.id || '', title: subtask.title || '', completed: subtask.completed || false, estimatedTime: subtask.estimatedTime || 0, resources: subtask.resources || [], notes: subtask.notes || '' })),
          prerequisites: task.prerequisites || [],
          followUpTasks: task.followUpTasks || [],
          masteryLevel: task.masteryLevel || 'learning',
          reviewSchedule: { nextReview: task.reviewSchedule?.nextReview ? task.reviewSchedule.nextReview.toISOString() : new Date().toISOString(), reviewCount: task.reviewSchedule?.reviewCount || 0, interval: task.reviewSchedule?.interval || 7, retentionScore: task.reviewSchedule?.retentionScore || 0 },
          timeTracking: { taskId: task.timeTracking?.taskId || task.id, estimatedTime: task.timeTracking?.estimatedTime || 0, totalTimeSpent: task.timeTracking?.totalTimeSpent || 0, sessions: task.timeTracking?.sessions?.map(session => ({ id: session.id || '', startTime: (session as any).startTime ? (session as any).startTime.toISOString() : new Date().toISOString(), endTime: (session as any).endTime ? (session as any).endTime.toISOString() : null, duration: session.duration || 0, sessionType: session.sessionType || 'study', focusRating: session.focusRating || 0, notes: session.notes || '' })) || [], efficiency: (task.timeTracking as any)?.efficiency || 0, focusScore: (task.timeTracking as any)?.focusScore || 0 },
          createdAt: task.createdAt ? task.createdAt.toISOString() : new Date().toISOString(),
          updatedAt: task.updatedAt ? task.updatedAt.toISOString() : new Date().toISOString(),
          completedAt: task.completedAt ? (task.completedAt as any).toISOString() : null,
        };

        const taskRef = firebaseFirestore.collection('tasks').doc(task.id);
        batch.set(taskRef, firebaseTask);
        successCount++;
        console.log(`✅ Added Machine Coding task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding Machine Coding task ${task.title}:`, error);
      }
    }

    await batch.commit();
    console.log(`🎉 Machine Coding tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ Machine Coding tasks batch upload failed:', error);
    throw error;
  }
};

