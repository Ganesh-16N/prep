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
  leetUrl?: string;
  difficulty: Task['difficulty'];
  estimatedTime: number;
  subtasks: string[];
};

// Core 5: start from problem solving patterns (as requested)
const coreDSATopics: TopicSpec[] = [
  {
    id: 'dsa-two-pointers',
    title: 'Two Pointers Pattern',
    description: 'Master opposite and same-direction two-pointer techniques',
    tags: ['two-pointers', 'arrays', 'strings'],
    docUrl: 'https://leetcode.com/explore/learn/card/array-and-string/204/conclusion/1182/',
    blogUrl: 'https://www.geeksforgeeks.org/two-pointers-technique/',
    videoUrl: 'https://www.youtube.com/watch?v=On03HToZ0_Y',
    leetUrl: 'https://leetcode.com/tag/two-pointers/',
    difficulty: 'easy',
    estimatedTime: 120,
    subtasks: ['Opposite ends technique', 'Window expansion/shrink', 'Skip duplicates', 'Palindrome check', 'Sorted arrays merge'],
  },
  {
    id: 'dsa-sliding-window',
    title: 'Sliding Window Pattern',
    description: 'Fixed and variable window techniques for subarray problems',
    tags: ['sliding-window', 'arrays'],
    docUrl: 'https://leetcode.com/tag/sliding-window/',
    blogUrl: 'https://www.geeksforgeeks.org/window-sliding-technique/',
    videoUrl: 'https://www.youtube.com/watch?v=MK-NZ4hN7rs',
    leetUrl: 'https://leetcode.com/tag/sliding-window/',
    difficulty: 'medium',
    estimatedTime: 140,
    subtasks: ['Fixed window average/sum', 'Variable window min length', 'Longest substring with k distinct', 'Anagram check window', 'Max sum subarray of size k'],
  },
  {
    id: 'dsa-prefix-sum',
    title: 'Prefix Sum & Difference Array',
    description: 'Use prefix sums and difference arrays for range queries/updates',
    tags: ['prefix-sum', 'arrays', 'range'],
    docUrl: 'https://leetcode.com/tag/prefix-sum/',
    blogUrl: 'https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/',
    videoUrl: 'https://www.youtube.com/watch?v=ODwCh1DY0Ao',
    leetUrl: 'https://leetcode.com/tag/prefix-sum/',
    difficulty: 'medium',
    estimatedTime: 120,
    subtasks: ['Build prefix sums', 'Range sum queries', 'Subarray sum equals k', 'Difference array updates', '2D prefix sums basics'],
  },
  {
    id: 'dsa-hashmap-frequency',
    title: 'Hash Map Frequency Pattern',
    description: 'Count frequencies and use hash maps to optimize lookups',
    tags: ['hashmap', 'counting'],
    docUrl: 'https://leetcode.com/tag/hash-table/',
    blogUrl: 'https://www.geeksforgeeks.org/java-util-hashmap-in-java-with-examples/',
    videoUrl: 'https://www.youtube.com/watch?v=6I5TrR0zC18',
    leetUrl: 'https://leetcode.com/tag/hash-table/',
    difficulty: 'easy',
    estimatedTime: 100,
    subtasks: ['Build frequency maps', 'Top k frequent elements', 'Group anagrams', 'Two sum with map', 'First unique char'],
  },
  {
    id: 'dsa-binary-search',
    title: 'Binary Search Patterns',
    description: 'Classic and advanced binary search on answers/monotonic functions',
    tags: ['binary-search', 'sorted', 'monotonic'],
    docUrl: 'https://leetcode.com/explore/learn/card/binary-search/',
    blogUrl: 'https://www.geeksforgeeks.org/binary-search/',
    videoUrl: 'https://www.youtube.com/watch?v=GU7DpgHINWQ',
    leetUrl: 'https://leetcode.com/tag/binary-search/',
    difficulty: 'medium',
    estimatedTime: 140,
    subtasks: ['Lower/upper bound', 'Search in rotated array', 'Binary search on answer', 'Peak element', 'Square root via BS'],
  },
];

// Essential extended topics (curated, not everything)
const extraDSATopics: TopicSpec[] = [
  { id: 'dsa-sorting-fundamentals', title: 'Sorting Fundamentals', description: 'Time complexities and when to use which sort', tags: ['sorting'], docUrl: 'https://www.geeksforgeeks.org/sorting-algorithms/', blogUrl: 'https://www.khanacademy.org/computing/computer-science/algorithms', videoUrl: 'https://www.youtube.com/watch?v=kgBjXUE_Nwc', difficulty: 'easy', estimatedTime: 90, subtasks: ['Stable vs unstable', 'Quick/Merge basics', 'Counting sort idea', 'Custom comparator', 'Practical tips'] },
  { id: 'dsa-stack-queue', title: 'Stack & Queue Patterns', description: 'Monotonic stack/queue, classic applications', tags: ['stack', 'queue'], docUrl: 'https://leetcode.com/tag/stack/', blogUrl: 'https://www.interviewbit.com/tutorial/stack-and-queue/', videoUrl: 'https://www.youtube.com/watch?v=8X4u9sca3Io', difficulty: 'medium', estimatedTime: 130, subtasks: ['Valid parentheses', 'Daily temperatures (monotonic)', 'Next greater element', 'Circular array trick', 'Queue with two stacks'] },
  { id: 'dsa-heap-pq', title: 'Heap & Priority Queue', description: 'Top-k problems and scheduling with heaps', tags: ['heap', 'priority-queue'], docUrl: 'https://leetcode.com/tag/heap-priority-queue/', blogUrl: 'https://www.geeksforgeeks.org/heap-data-structure/', videoUrl: 'https://www.youtube.com/watch?v=wptevk0bshY', difficulty: 'medium', estimatedTime: 110, subtasks: ['Top-K elements', 'Kth largest', 'Merge k lists', 'Reorganize string', 'Min/max heap operations'] },
  { id: 'dsa-linked-list', title: 'Linked List (Fast/Slow)', description: 'Fast/slow pointers, cycle detection, middle, reorder', tags: ['linked-list'], docUrl: 'https://leetcode.com/tag/linked-list/', blogUrl: 'https://www.geeksforgeeks.org/data-structures/linked-list/', videoUrl: 'https://www.youtube.com/watch?v=ZwfQfQxwqVQ', difficulty: 'easy', estimatedTime: 100, subtasks: ['Reverse list', 'Detect cycle', 'Middle node', 'Remove nth from end', 'Merge two lists'] },
  { id: 'dsa-trees-traversals', title: 'Trees: Traversals & BST Basics', description: 'DFS/BFS traversals, BST operations', tags: ['tree', 'bst'], docUrl: 'https://leetcode.com/tag/tree/', blogUrl: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/', videoUrl: 'https://www.youtube.com/watch?v=COZK7NATh4k', difficulty: 'medium', estimatedTime: 140, subtasks: ['Inorder/Preorder/Postorder', 'Level order BFS', 'Validate BST', 'Lowest common ancestor', 'BST insert/delete (overview)'] },
  { id: 'dsa-graphs', title: 'Graphs: BFS/DFS Basics', description: 'Traversal, components, shortest paths (BFS)', tags: ['graph', 'bfs', 'dfs'], docUrl: 'https://leetcode.com/tag/graph/', blogUrl: 'https://cp-algorithms.com/graph/', videoUrl: 'https://www.youtube.com/watch?v=pcKY4hjDrxk', difficulty: 'medium', estimatedTime: 150, subtasks: ['Adjacency list/Matrix', 'BFS and DFS templates', 'Cycle detection (undirected)', 'Shortest path unweighted (BFS)', 'Topological sort basics'] },
  { id: 'dsa-dp-1d', title: 'Dynamic Programming (1D basics)', description: 'DP state design for classic 1D problems', tags: ['dp'], docUrl: 'https://leetcode.com/tag/dynamic-programming/', blogUrl: 'https://www.geeksforgeeks.org/dynamic-programming/', videoUrl: 'https://www.youtube.com/watch?v=YBSt1jYwVfU', difficulty: 'medium', estimatedTime: 160, subtasks: ['Fibonacci/Climbing stairs', 'House robber', 'Min cost climbing', 'Coin change (min ways)', 'LIS overview'] },
  { id: 'dsa-intervals', title: 'Intervals Pattern', description: 'Sorting by start/end, merging, scheduling', tags: ['intervals'], docUrl: 'https://leetcode.com/tag/intervals/', blogUrl: 'https://www.geeksforgeeks.org/overlapping-intervals/', videoUrl: 'https://www.youtube.com/watch?v=QhRv0mFJE7U', difficulty: 'medium', estimatedTime: 110, subtasks: ['Merge intervals', 'Non-overlapping intervals', 'Meeting rooms', 'Insert interval', 'Min arrows to burst balloons'] },
  { id: 'dsa-backtracking', title: 'Recursion & Backtracking Basics', description: 'Generate subsets/permutations/combinations', tags: ['recursion', 'backtracking'], docUrl: 'https://leetcode.com/tag/backtracking/', blogUrl: 'https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html#backtracking', videoUrl: 'https://www.youtube.com/watch?v=DKCbsiDBN6c', difficulty: 'medium', estimatedTime: 140, subtasks: ['Subsets', 'Permutations', 'Combination sum', 'N-Queens overview', 'Word search'] },
  { id: 'dsa-bit-manipulation', title: 'Bit Manipulation Essentials', description: 'Bit tricks for parity, swaps, counting, masks', tags: ['bit'], docUrl: 'https://leetcode.com/tag/bit-manipulation/', blogUrl: 'https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/', videoUrl: 'https://www.youtube.com/watch?v=7jkIUgLC29I', difficulty: 'easy', estimatedTime: 90, subtasks: ['Set/clear/toggle bit', 'Count set bits', 'Single number', 'Power of two', 'XOR tricks'] },
];

const buildTaskFromTopic = (topic: TopicSpec): Task => {
  const now = new Date();
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: 'DSA',
    status: 'todo',
    priority: 'high',
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    tags: topic.tags,
    resources: [
      { id: `${topic.id}-res-1`, title: `LeetCode - ${topic.title}`, url: topic.leetUrl || 'https://leetcode.com/problemset/', type: 'leetcode', difficulty: 'intermediate', estimatedReadTime: 25, rating: 4.7, lastUpdated: now, author: 'LeetCode', tags: ['dsa', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.6, difficultyAccuracy: 0.9, contentFreshness: 0.95, userCompletionRate: 0.85, helpfulnessScore: 4.6 },
      { id: `${topic.id}-res-2`, title: `GfG - ${topic.title}`, url: topic.blogUrl || 'https://www.geeksforgeeks.org/', type: 'blog', difficulty: 'intermediate', estimatedReadTime: 20, rating: 4.6, lastUpdated: now, author: 'GeeksforGeeks', tags: ['dsa', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.5, difficultyAccuracy: 0.85, contentFreshness: 0.9, userCompletionRate: 0.8, helpfulnessScore: 4.4 },
      { id: `${topic.id}-res-3`, title: `Video - ${topic.title}`, url: topic.videoUrl || 'https://www.youtube.com/results?search_query=' + encodeURIComponent(topic.title), type: 'youtube', difficulty: 'intermediate', estimatedReadTime: 25, rating: 4.7, lastUpdated: now, author: 'YouTube', tags: ['dsa', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.6, difficultyAccuracy: 0.9, contentFreshness: 0.9, userCompletionRate: 0.85, helpfulnessScore: 4.5 },
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

const coreDSATasks: Task[] = coreDSATopics.map(buildTaskFromTopic);
const allDSATasks: Task[] = [...coreDSATasks, ...extraDSATopics.map(buildTaskFromTopic)];

export const uploadDSACoreTasks = async () => uploadTasks('DSA', coreDSATasks);
export const uploadAllDSATasks = async () => uploadTasks('DSA', allDSATasks);

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
          category: task.category || 'DSA',
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
        console.log(`✅ Added DSA task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding DSA task ${task.title}:`, error);
      }
    }

    await batch.commit();
    console.log(`🎉 DSA tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ DSA tasks batch upload failed:', error);
    throw error;
  }
};

