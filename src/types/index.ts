export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  resources: EnhancedResource[];
  subtasks: Subtask[];
  prerequisites: string[]; // task IDs that should be completed first
  followUpTasks: string[]; // suggested next tasks
  masteryLevel: 'learning' | 'practicing' | 'teaching' | 'mastered';
  reviewSchedule: ReviewSchedule;
  timeTracking: TaskTimeTracking;
  learningOrder?: number; // AI sorting order (lower = should be done first)
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// Serialized version for Redux storage (dates as strings)
export interface SerializedTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  resources: SerializedEnhancedResource[];
  subtasks: Subtask[];
  prerequisites: string[]; // task IDs that should be completed first
  followUpTasks: string[]; // suggested next tasks
  masteryLevel: 'learning' | 'practicing' | 'teaching' | 'mastered';
  reviewSchedule: SerializedReviewSchedule;
  timeTracking: SerializedTaskTimeTracking;
  learningOrder?: number; // AI sorting order (lower = should be done first)
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface EnhancedResource {
  id: string;
  title: string;
  url: string;
  type: 'medium' | 'dev.to' | 'leetcode' | 'youtube' | 'github' | 'documentation' | 'course' | 'blog' | 'video' | 'practice' | 'mdn' | 'docs';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // in minutes
  rating: number; // 1-5 stars
  lastUpdated: Date;
  author?: string;
  tags: string[];
  isPremium: boolean;
  language?: 'javascript' | 'typescript' | 'react' | 'general';
  read: boolean;
  bookmarked: boolean;
  progress: number; // 0-100
  notes?: string;
  communityRating: number;
  difficultyAccuracy: number;
  contentFreshness: number;
  userCompletionRate: number;
  helpfulnessScore: number;
}

export interface SerializedEnhancedResource {
  id: string;
  title: string;
  url: string;
  type: 'medium' | 'dev.to' | 'leetcode' | 'youtube' | 'github' | 'documentation' | 'course' | 'blog' | 'video' | 'practice' | 'mdn' | 'docs';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // in minutes
  rating: number; // 1-5 stars
  lastUpdated: string;
  author?: string;
  tags: string[];
  isPremium: boolean;
  language?: 'javascript' | 'typescript' | 'react' | 'general';
  read: boolean;
  bookmarked: boolean;
  progress: number; // 0-100
  notes?: string;
  communityRating: number;
  difficultyAccuracy: number;
  contentFreshness: number;
  userCompletionRate: number;
  helpfulnessScore: number;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  estimatedTime: number;
  resources: EnhancedResource[];
  notes?: string;
}

export interface ReviewSchedule {
  nextReview: Date;
  reviewCount: number;
  interval: number; // days
  retentionScore: number; // 0-100
}

export interface SerializedReviewSchedule {
  nextReview: string;
  reviewCount: number;
  interval: number; // days
  retentionScore: number; // 0-100
}

export interface TaskTimeTracking {
  taskId: string;
  sessions: TimeSession[];
  totalTimeSpent: number;
  estimatedTime: number;
  efficiency: number; // actual vs estimated
  focusScore: number; // based on session patterns
}

export interface SerializedTaskTimeTracking {
  taskId: string;
  sessions: SerializedTimeSession[];
  totalTimeSpent: number;
  estimatedTime: number;
  efficiency: number; // actual vs estimated
  focusScore: number; // based on session patterns
}

export interface TimeSession {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  sessionType: 'study' | 'practice' | 'review';
  focusRating: number; // 1-5
  notes?: string;
}

export interface SerializedTimeSession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  sessionType: 'study' | 'practice' | 'review';
  focusRating: number; // 1-5
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  progress: Progress;
  badges: Badge[];
  streak: number;
  totalTasksCompleted: number;
  learningAnalytics: LearningAnalytics;
  studyPatterns: StudyPatterns;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningAnalytics {
  totalStudyTime: number;
  averageSessionLength: number;
  peakProductivityHours: string[];
  topicMastery: TopicMastery[];
  retentionRate: number;
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
}

export interface TopicMastery {
  topic: string;
  masteryLevel: number; // 0-100
  lastPracticed: Date;
  reviewCount: number;
  confidenceScore: number;
}

export interface WeeklyProgress {
  week: string;
  tasksCompleted: number;
  timeSpent: number;
  focusScore: number;
  topicsCovered: string[];
}

export interface MonthlyProgress {
  month: string;
  tasksCompleted: number;
  timeSpent: number;
  newTopicsLearned: number;
  masteryLevels: TopicMastery[];
}

export interface StudyPatterns {
  preferredStudyTimes: string[];
  averageSessionDuration: number;
  focusScore: number;
  preferredResourceTypes: string[];
  weakAreas: string[];
  strongAreas: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'achievement' | 'streak' | 'mastery' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  dailyGoal: number; // minutes
  focusTime: number; // minutes
  categories: string[];
  preferredResourceTypes: string[];
  studyReminders: boolean;
  reviewReminders: boolean;
  socialFeatures: boolean;
  dataSharing: boolean;
}

export interface Progress {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  weeklyProgress: {
    date: string;
    completed: number;
  }[];
  categoryProgress: {
    category: string;
    completed: number;
    total: number;
  }[];
  timeSpentToday: number;
  timeSpentThisWeek: number;
  focusTimeToday: number;
  efficiencyScore: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  taskCount: number;
  masteryLevel: number;
  lastPracticed: Date;
}

export interface SearchFilters {
  status?: Task['status'];
  category?: string;
  difficulty?: Task['difficulty'];
  priority?: Task['priority'];
  tags?: string[];
  estimatedTime?: {
    min?: number;
    max?: number;
  };
  resourceType?: string;
  masteryLevel?: string;
  hasSubtasks?: boolean;
}

export interface ResourceModal {
  task: Task;
  selectedResource: EnhancedResource;
  quickPreview: string;
  estimatedTime: string;
  difficulty: string;
  prerequisites: string[];
  relatedTopics: string[];
  communityNotes: CommunityNote[];
  bookmarkOption: boolean;
  progressTracking: boolean;
}

export interface CommunityNote {
  id: string;
  author: string;
  content: string;
  rating: number;
  createdAt: Date;
  helpfulCount: number;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  targetRole: string;
  targetCompany?: string;
  tasks: string[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  completionRate: number;
}

export interface StudySession {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  focusRating: number;
  sessionType: 'study' | 'practice' | 'review';
  notes: string;
  resourcesUsed: string[];
  efficiency: number;
} 