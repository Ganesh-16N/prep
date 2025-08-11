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

const coreRNTopics: TopicSpec[] = [
  { id: 'rn-architecture', title: 'RN Architecture & New Architecture (Fabric, TurboModules)', description: 'Understand RN internals, bridge vs JSI, Fabric', tags: ['architecture', 'fabric', 'turbo'], docUrl: 'https://reactnative.dev/architecture/overview', blogUrl: 'https://reactnative.dev/blog', videoUrl: 'https://www.youtube.com/results?search_query=react+native+new+architecture', difficulty: 'hard', estimatedTime: 180, subtasks: ['Bridge vs JSI', 'Fabric renderer', 'TurboModules', 'Hermes engine', 'Migration overview'] },
  { id: 'rn-navigation', title: 'React Navigation v6', description: 'Stack, tabs, drawers, deep linking', tags: ['navigation'], docUrl: 'https://reactnavigation.org/docs/getting-started', blogUrl: 'https://reactnavigation.org/blog/', videoUrl: 'https://www.youtube.com/results?search_query=react+navigation+v6', difficulty: 'medium', estimatedTime: 150, subtasks: ['Stack and Tab navigators', 'Passing params', 'Deep linking', 'Auth/Protected flows', 'Performance tips'] },
  { id: 'rn-performance', title: 'Performance & Profiling', description: 'Hermes, Flipper, memory leaks', tags: ['performance'], docUrl: 'https://reactnative.dev/docs/performance', blogUrl: 'https://blog.logrocket.com/tag/react-native/', videoUrl: 'https://www.youtube.com/results?search_query=react+native+performance', difficulty: 'hard', estimatedTime: 150, subtasks: ['Hermes config', 'Flipper profiling', 'Memory leak detection', 'Image optimization', 'Bundle optimization'] },
  { id: 'rn-gestures-reanimated', title: 'Reanimated 3 & Gesture Handler', description: 'High-performance animations and gestures', tags: ['reanimated', 'gestures'], docUrl: 'https://docs.swmansion.com/react-native-reanimated/', blogUrl: 'https://docs.swmansion.com/react-native-gesture-handler/', videoUrl: 'https://www.youtube.com/@wcandillon', difficulty: 'hard', estimatedTime: 180, subtasks: ['Worklets basics', 'Shared values', 'Layout animations', 'Gesture combinations', 'Performance patterns'] },
  { id: 'rn-native-modules', title: 'Native Modules & Platform APIs', description: 'Integrate native code and platform APIs', tags: ['native-modules'], docUrl: 'https://reactnative.dev/docs/native-modules-intro', blogUrl: 'https://reactnative.dev/docs/native-modules-android', videoUrl: 'https://www.youtube.com/results?search_query=react+native+native+modules', difficulty: 'hard', estimatedTime: 180, subtasks: ['Android/Kotlin module', 'iOS/Swift module', 'Autolinking', 'Permissions', 'Platform-specific code'] },
];

const extraRNTopics: TopicSpec[] = [
  { id: 'rn-testing', title: 'Testing (Jest, Detox)', description: 'Unit and e2e testing in RN', tags: ['testing'], docUrl: 'https://callstack.github.io/react-native-testing-library/', blogUrl: 'https://wix.github.io/Detox/', difficulty: 'medium', estimatedTime: 120, subtasks: ['RTL basics', 'Async tests', 'Mocking native modules', 'Detox config', 'E2E flows'] },
  { id: 'rn-offline', title: 'Offline-first & Sync', description: 'Caching, persistence, and conflict resolution', tags: ['offline'], docUrl: 'https://reactnative.dev/docs/asyncstorage', blogUrl: 'https://redux-toolkit.js.org/rtk-query/usage/cache-behavior', difficulty: 'medium', estimatedTime: 120, subtasks: ['AsyncStorage', 'SQLite/WatermelonDB overview', 'Sync patterns', 'Conflict resolution', 'Background tasks'] },
  { id: 'rn-networking', title: 'Networking & API', description: 'Fetch/axios patterns, retries, file uploads', tags: ['networking'], docUrl: 'https://reactnative.dev/docs/network', blogUrl: 'https://axios-http.com/docs/intro', difficulty: 'easy', estimatedTime: 100, subtasks: ['Fetch/axios basics', 'Cancellation', 'Retry with backoff', 'File upload', 'Security tips'] },
  { id: 'rn-notifications', title: 'Push Notifications', description: 'FCM/APNS setup and handling', tags: ['notifications'], docUrl: 'https://rnfirebase.io/messaging/usage', blogUrl: 'https://rnfirebase.io/', difficulty: 'medium', estimatedTime: 120, subtasks: ['Firebase setup', 'APNS/FCM tokens', 'Foreground/background handling', 'Notification actions', 'Deep links'] },
  { id: 'rn-deployment', title: 'Build, Release, CI/CD', description: 'Android/iOS signing and store release', tags: ['release', 'ci'], docUrl: 'https://reactnative.dev/docs/signed-apk-android', blogUrl: 'https://fastlane.tools/', difficulty: 'medium', estimatedTime: 120, subtasks: ['Signing configs', 'Play/App Store steps', 'Fastlane basics', 'CodePush/OTA', 'CI pipelines'] },
  { id: 'rn-accessibility', title: 'Accessibility (a11y)', description: 'Accessible mobile UI', tags: ['a11y'], docUrl: 'https://reactnative.dev/docs/accessibility', blogUrl: 'https://reactnative.dev/docs/accessibility#best-practices', difficulty: 'easy', estimatedTime: 90, subtasks: ['Accessibility props', 'Role and hints', 'TalkBack/VoiceOver', 'Focus management', 'Contrast and sizing'] },
];

const buildTaskFromTopic = (topic: TopicSpec): Task => {
  const now = new Date();
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: 'React Native',
    status: 'todo',
    priority: 'high',
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    tags: topic.tags,
    resources: [
      { id: `${topic.id}-res-1`, title: `Docs - ${topic.title}`, url: topic.docUrl || 'https://reactnative.dev/', type: 'documentation', difficulty: 'intermediate', estimatedReadTime: 30, rating: 4.8, lastUpdated: now, author: 'React Native Team', tags: ['react-native', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.7, difficultyAccuracy: 0.9, contentFreshness: 0.95, userCompletionRate: 0.85, helpfulnessScore: 4.6 },
      { id: `${topic.id}-res-2`, title: `In-depth - ${topic.title}`, url: topic.blogUrl || 'https://reactnative.dev/blog', type: 'blog', difficulty: 'intermediate', estimatedReadTime: 20, rating: 4.6, lastUpdated: now, author: 'Community', tags: ['react-native', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.5, difficultyAccuracy: 0.85, contentFreshness: 0.9, userCompletionRate: 0.8, helpfulnessScore: 4.4 },
      { id: `${topic.id}-res-3`, title: `Video - ${topic.title}`, url: topic.videoUrl || 'https://www.youtube.com/results?search_query=react+native+' + encodeURIComponent(topic.title), type: 'youtube', difficulty: 'intermediate', estimatedReadTime: 25, rating: 4.7, lastUpdated: now, author: 'YouTube', tags: ['react-native', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.6, difficultyAccuracy: 0.9, contentFreshness: 0.9, userCompletionRate: 0.85, helpfulnessScore: 4.5 },
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

const coreRNTasks: Task[] = coreRNTopics.map(buildTaskFromTopic);
const allRNTasks: Task[] = [...coreRNTasks, ...extraRNTopics.map(buildTaskFromTopic)];

export const uploadReactNativeCoreTasks = async () => {
  return uploadTasks('React Native', coreRNTasks);
};

export const uploadAllReactNativeTasks = async () => {
  return uploadTasks('React Native', allRNTasks);
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
          category: task.category || 'React Native',
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
        console.log(`✅ Added React Native task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding React Native task ${task.title}:`, error);
      }
    }

    await batch.commit();
    console.log(`🎉 React Native tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ React Native tasks batch upload failed:', error);
    throw error;
  }
};

