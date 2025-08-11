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

// Core 5 System Design topics
const coreSDTopics: TopicSpec[] = [
  {
    id: 'sd-foundations',
    title: 'System Design Foundations',
    description: 'Scalability, availability, consistency, latency vs throughput, SLAs/SLOs',
    tags: ['foundations', 'scalability', 'availability', 'consistency'],
    docUrl: 'https://github.com/donnemartin/system-design-primer',
    blogUrl: 'https://highscalability.com/',
    videoUrl: 'https://www.youtube.com/results?search_query=system+design+intro',
    difficulty: 'medium',
    estimatedTime: 180,
    subtasks: [
      'Latency vs throughput tradeoffs',
      'Availability and consistency basics',
      'SLA, SLO, SLI definitions',
      'Back-of-the-envelope estimates',
      'Bottleneck identification'
    ],
  },
  {
    id: 'sd-load-balancing',
    title: 'Load Balancing & Reverse Proxy',
    description: 'Layer 4/7 load balancers, health checks, sticky sessions, reverse proxies',
    tags: ['load-balancer', 'proxy'],
    docUrl: 'https://nginx.org/en/docs/',
    blogUrl: 'https://aws.amazon.com/elasticloadbalancing/features/',
    videoUrl: 'https://www.youtube.com/results?search_query=load+balancer+reverse+proxy',
    difficulty: 'medium',
    estimatedTime: 140,
    subtasks: [
      'Layer 4 vs Layer 7',
      'Health checks and failover',
      'Sticky sessions and hashing',
      'Reverse proxy and TLS termination',
      'Blue/green and canary basics'
    ],
  },
  {
    id: 'sd-caching-cdn',
    title: 'Caching & CDN',
    description: 'CDNs, cache hierarchies, invalidation, TTL, consistency',
    tags: ['caching', 'cdn'],
    docUrl: 'https://redis.io/docs/',
    blogUrl: 'https://developers.cloudflare.com/cache/',
    videoUrl: 'https://www.youtube.com/results?search_query=cdn+caching+system+design',
    difficulty: 'medium',
    estimatedTime: 150,
    subtasks: ['Read-through vs write-through', 'Write-back caching', 'TTL and eviction', 'Cache stampede prevention', 'CDN edge strategies'],
  },
  {
    id: 'sd-databases',
    title: 'Databases: SQL, NoSQL, Sharding, Replication',
    description: 'Choosing databases, partitioning, replication, indexes, transactions',
    tags: ['database', 'sql', 'nosql', 'sharding', 'replication'],
    docUrl: 'https://www.postgresql.org/docs/',
    blogUrl: 'https://aws.amazon.com/nosql/',
    videoUrl: 'https://www.youtube.com/results?search_query=database+sharding+replication',
    difficulty: 'hard',
    estimatedTime: 180,
    subtasks: ['Normalization vs denormalization', 'Indexing strategies', 'Leader/follower replication', 'Sharding strategies', 'Transactions and isolation'],
  },
  {
    id: 'sd-queues-streams',
    title: 'Message Queues & Streams',
    description: 'Kafka, RabbitMQ, SQS, pub/sub, ordering, delivery semantics',
    tags: ['kafka', 'queue', 'pubsub', 'stream'],
    docUrl: 'https://kafka.apache.org/documentation/',
    blogUrl: 'https://www.cloudamqp.com/blog/',
    videoUrl: 'https://www.youtube.com/results?search_query=kafka+system+design',
    difficulty: 'medium',
    estimatedTime: 150,
    subtasks: ['At-most/least/exactly-once', 'Idempotency', 'Consumer groups', 'Ordering and partitions', 'Backpressure handling'],
  },
];

// Extended topics for full coverage
const extraSDTopics: TopicSpec[] = [
  { id: 'sd-cap-theorem', title: 'CAP Theorem & Consistency Models', description: 'CAP tradeoffs, strong vs eventual consistency', tags: ['cap', 'consistency'], docUrl: 'https://en.wikipedia.org/wiki/CAP_theorem', blogUrl: 'https://martin.kleppmann.com/', difficulty: 'medium', estimatedTime: 120, subtasks: ['CAP scenarios', 'Consistency models', 'Quorum reads/writes', 'Client vs server consistency', 'Use-case mapping'] },
  { id: 'sd-microservices', title: 'Microservices & Service Discovery', description: 'Service boundaries, discovery, gateway patterns', tags: ['microservices', 'service-discovery'], docUrl: 'https://microservices.io/', blogUrl: 'https://istio.io/latest/docs/', difficulty: 'hard', estimatedTime: 160, subtasks: ['Split monolith', 'Service registry', 'API gateway', 'Sidecars/mesh', 'Observability'] },
  { id: 'sd-api-design', title: 'API Design & Rate Limiting', description: 'REST/GraphQL/gRPC, versioning, throttling', tags: ['api', 'rate-limit'], docUrl: 'https://cloud.google.com/apis/design', blogUrl: 'https://stripe.com/blog', difficulty: 'medium', estimatedTime: 140, subtasks: ['Resource modeling', 'Pagination', 'Idempotency keys', 'Token bucket/leaky bucket', 'Quotas and SLAs'] },
  { id: 'sd-url-shortener', title: 'Design URL Shortener', description: 'High-QPS write/read, unique ID, redirection, analytics', tags: ['url-shortener'], docUrl: 'https://github.com/donnemartin/system-design-primer#url-shortener', blogUrl: 'https://www.hiredintech.com/classrooms/system-design/lesson/52', difficulty: 'easy', estimatedTime: 120, subtasks: ['ID generation', 'Hot key handling', 'Cache and TTL', 'Analytics pipeline', 'Abuse prevention'] },
  { id: 'sd-news-feed', title: 'Design News Feed', description: 'Fanout, ranking, write- vs read-heavy', tags: ['news-feed'], docUrl: 'https://github.com/donnemartin/system-design-primer#design-a-news-feed-system', blogUrl: 'https://medium.com/@interviewingio/how-to-design-a-news-feed-system-8f0a8f6d3f1f', difficulty: 'medium', estimatedTime: 150, subtasks: ['Pull vs push models', 'Feed generation', 'Ranking signals', 'Caching layers', 'Backfill jobs'] },
  { id: 'sd-instagram', title: 'Design Instagram', description: 'Media storage, timelines, fanout, CDN, cache', tags: ['instagram'], docUrl: 'https://github.com/donnemartin/system-design-primer#design-instagram', blogUrl: 'https://highscalability.com/design-of-instagram/', difficulty: 'hard', estimatedTime: 180, subtasks: ['Object storage for media', 'CDN strategy', 'User graph', 'Write amplification control', 'Feed cache'] },
  { id: 'sd-whatsapp', title: 'Design WhatsApp', description: 'Messaging semantics, delivery, sync, presence', tags: ['whatsapp', 'chat'], docUrl: 'https://github.com/donnemartin/system-design-primer#design-a-chat-system', blogUrl: 'https://ably.com/topic/whatsapp', difficulty: 'hard', estimatedTime: 170, subtasks: ['1-1 and group messaging', 'Ordering and delivery', 'Presence', 'Push notifications', 'Media handling'] },
  { id: 'sd-ride-sharing', title: 'Design Ride Sharing', description: 'Matching, geo indexing, surge pricing', tags: ['uber', 'ride-sharing'], docUrl: 'https://github.com/donnemartin/system-design-primer#design-uber', blogUrl: 'https://eng.uber.com/', difficulty: 'hard', estimatedTime: 180, subtasks: ['Geo hashing and search', 'Dispatch', 'ETA calculation', 'Pricing', 'Fraud detection'] },
  { id: 'sd-search-autocomplete', title: 'Search & Autocomplete', description: 'Indexes, ranking, prefix search, typeahead', tags: ['search'], docUrl: 'https://www.elastic.co/guide/index.html', blogUrl: 'https://www.algolia.com/doc/guides/', difficulty: 'medium', estimatedTime: 150, subtasks: ['Inverted index', 'Prefix trees', 'Ranking', 'Spell correction', 'Realtime updates'] },
  { id: 'sd-observability', title: 'Observability: Logging, Metrics, Tracing', description: 'Distributed tracing and SLO monitoring', tags: ['observability'], docUrl: 'https://opentelemetry.io/docs/', blogUrl: 'https://lightstep.com/blog', difficulty: 'medium', estimatedTime: 130, subtasks: ['Structured logging', 'Metrics pipelines', 'Tracing basics', 'SLO dashboards', 'Alerting'] },
  { id: 'sd-security', title: 'Security: OAuth, JWT, TLS', description: 'Auth flows, token security, TLS, secrets', tags: ['security'], docUrl: 'https://oauth.net/2/', blogUrl: 'https://auth0.com/blog/', difficulty: 'medium', estimatedTime: 140, subtasks: ['OAuth flows', 'JWT best practices', 'TLS and certs', 'Secrets management', 'Threat modeling'] },
  { id: 'sd-circuit-breakers', title: 'Resilience: Backpressure & Circuit Breakers', description: 'Protect systems with graceful degradation', tags: ['resilience'], docUrl: 'https://docs.microsoft.com/azure/architecture/patterns/circuit-breaker', blogUrl: 'https://martinfowler.com/bliki/CircuitBreaker.html', difficulty: 'medium', estimatedTime: 120, subtasks: ['Bulkheads', 'Timeouts and retries', 'Shed load', 'Fallbacks', 'Operational playbooks'] },
];

const buildTaskFromTopic = (topic: TopicSpec): Task => {
  const now = new Date();
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: 'System Design',
    status: 'todo',
    priority: 'high',
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    tags: topic.tags,
    resources: [
      { id: `${topic.id}-res-1`, title: `Reference - ${topic.title}`, url: topic.docUrl || 'https://github.com/donnemartin/system-design-primer', type: 'documentation', difficulty: 'intermediate', estimatedReadTime: 35, rating: 4.9, lastUpdated: now, author: 'Community', tags: ['system-design', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.8, difficultyAccuracy: 0.9, contentFreshness: 0.95, userCompletionRate: 0.85, helpfulnessScore: 4.7 },
      { id: `${topic.id}-res-2`, title: `In-depth - ${topic.title}`, url: topic.blogUrl || 'https://highscalability.com/', type: 'blog', difficulty: 'intermediate', estimatedReadTime: 25, rating: 4.7, lastUpdated: now, author: 'Community', tags: ['system-design', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.6, difficultyAccuracy: 0.9, contentFreshness: 0.9, userCompletionRate: 0.8, helpfulnessScore: 4.5 },
      { id: `${topic.id}-res-3`, title: `Video - ${topic.title}`, url: topic.videoUrl || 'https://www.youtube.com/results?search_query=system+design+' + encodeURIComponent(topic.title), type: 'youtube', difficulty: 'intermediate', estimatedReadTime: 25, rating: 4.7, lastUpdated: now, author: 'YouTube', tags: ['system-design', ...topic.tags], isPremium: false, language: 'javascript', read: false, bookmarked: false, progress: 0, communityRating: 4.6, difficultyAccuracy: 0.9, contentFreshness: 0.9, userCompletionRate: 0.85, helpfulnessScore: 4.5 },
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

const coreSDTasks: Task[] = coreSDTopics.map(buildTaskFromTopic);
const allSDTasks: Task[] = [...coreSDTasks, ...extraSDTopics.map(buildTaskFromTopic)];

export const uploadSystemDesignCoreTasks = async () => {
  return uploadTasks('System Design', coreSDTasks);
};

export const uploadAllSystemDesignTasks = async () => {
  return uploadTasks('System Design', allSDTasks);
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
          category: task.category || 'System Design',
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
        console.log(`✅ Added System Design task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding System Design task ${task.title}:`, error);
      }
    }

    await batch.commit();
    console.log(`🎉 System Design tasks upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
  } catch (error) {
    console.error('❌ System Design tasks batch upload failed:', error);
    throw error;
  }
};

