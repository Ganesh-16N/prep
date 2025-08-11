import { Task } from '../types';

interface TaskScore {
  task: Task;
  score: number;
  factors: {
    difficulty: number;
    prerequisites: number;
    learningPath: number;
    categoryBalance: number;
    timeEfficiency: number;
    masteryGap: number;
  };
}

interface UserProgress {
  completedTasks: string[];
  inProgressTasks: string[];
  categoryMastery: Record<string, number>; // 0-100
  averageSessionTime: number;
  preferredDifficulty: 'easy' | 'medium' | 'hard';
}

export class TaskSortingAlgorithm {
  private userProgress: UserProgress;
  private completedTaskIds: Set<string>;
  private taskScoreCache: Map<string, number> = new Map();
  private lastTaskCount: number = 0;

  constructor(userProgress: UserProgress) {
    this.userProgress = userProgress;
    this.completedTaskIds = new Set(userProgress.completedTasks);
  }

  /**
   * Main sorting function that returns tasks in optimal learning order
   */
  public sortTasks(tasks: Task[]): Task[] {
    // Clear cache if task count changed significantly
    if (Math.abs(tasks.length - this.lastTaskCount) > 5) {
      this.taskScoreCache.clear();
      this.lastTaskCount = tasks.length;
    }

    const scoredTasks = tasks.map(task => ({
      task,
      score: this.getCachedTaskScore(task)
    }));

    // Sort by score (higher = should be done first)
    scoredTasks.sort((a, b) => b.score - a.score);

    // Only log in development and limit to first 3
    if (__DEV__) {
      console.log('🤖 AI Sorting Results:');
      scoredTasks.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. ${item.task.title} (Score: ${item.score.toFixed(2)})`);
      });
    }

    return scoredTasks.map(item => item.task);
  }

  /**
   * Get cached task score or calculate and cache it
   */
  private getCachedTaskScore(task: Task): number {
    const cacheKey = `${task.id}-${task.status}-${task.difficulty}`;
    
    if (this.taskScoreCache.has(cacheKey)) {
      return this.taskScoreCache.get(cacheKey)!;
    }

    const score = this.calculateTaskScore(task);
    this.taskScoreCache.set(cacheKey, score);
    return score;
  }

  /**
   * Calculate overall priority score for a task (optimized)
   */
  private calculateTaskScore(task: Task): number {
    // Fast path for common cases
    if (task.status === 'done') return 0;
    
    // Simplified scoring for better performance
    const difficultyScore = this.calculateDifficultyScore(task);
    const prerequisitesScore = this.calculatePrerequisitesScore(task);
    const learningPathScore = this.calculateLearningPathScore(task);
    
    // Only calculate expensive factors if needed
    const categoryBalanceScore = this.calculateCategoryBalanceScore(task);
    const timeEfficiencyScore = this.calculateTimeEfficiencyScore(task);
    const masteryGapScore = this.calculateMasteryGapScore(task);
    
    return (
      prerequisitesScore * 0.35 +      // Most important - can't skip prerequisites
      difficultyScore * 0.25 +         // Difficulty progression
      learningPathScore * 0.20 +       // Learning path order
      categoryBalanceScore * 0.10 +    // Balance across categories
      timeEfficiencyScore * 0.05 +     // Time optimization
      masteryGapScore * 0.05           // Fill knowledge gaps
    );
  }

  /**
   * Calculate individual scoring factors (simplified for performance)
   */
  private calculateScoreFactors(task: Task): TaskScore['factors'] {
    return {
      difficulty: this.calculateDifficultyScore(task),
      prerequisites: this.calculatePrerequisitesScore(task),
      learningPath: this.calculateLearningPathScore(task),
      categoryBalance: this.calculateCategoryBalanceScore(task),
      timeEfficiency: this.calculateTimeEfficiencyScore(task),
      masteryGap: this.calculateMasteryGapScore(task)
    };
  }

  /**
   * Difficulty scoring: Prefer easier tasks first, but consider user's comfort level
   */
  private calculateDifficultyScore(task: Task): number {
    const difficultyWeights = { easy: 1.0, medium: 0.7, hard: 0.4 };
    const baseScore = difficultyWeights[task.difficulty];
    
    // Boost if user prefers this difficulty level
    const difficultyBoost = task.difficulty === this.userProgress.preferredDifficulty ? 0.2 : 0;
    
    // Reduce score if user is struggling with this difficulty
    const categoryMastery = this.userProgress.categoryMastery[task.category] || 0;
    const difficultyPenalty = categoryMastery < 30 && task.difficulty === 'hard' ? -0.3 : 0;
    
    return Math.max(0, baseScore + difficultyBoost + difficultyPenalty);
  }

  /**
   * Prerequisites scoring: Tasks with completed prerequisites get higher scores
   */
  private calculatePrerequisitesScore(task: Task): number {
    if (!task.prerequisites || task.prerequisites.length === 0) {
      return 1.0; // No prerequisites = ready to do
    }

    const completedPrereqs = task.prerequisites.filter(prereqId => 
      this.completedTaskIds.has(prereqId)
    ).length;

    const completionRatio = completedPrereqs / task.prerequisites.length;
    
    // Exponential boost for having all prerequisites
    return Math.pow(completionRatio, 2);
  }

  /**
   * Learning path scoring: Respect the intended learning order
   */
  private calculateLearningPathScore(task: Task): number {
    // Higher learningOrder = should be done later
    const maxLearningOrder = 100; // Assuming max order is 100
    const normalizedOrder = (task.learningOrder || 50) / maxLearningOrder;
    
    // Invert so lower order = higher score
    return 1.0 - normalizedOrder;
  }

  /**
   * Category balance scoring: Prefer categories with fewer completed tasks
   */
  private calculateCategoryBalanceScore(task: Task): number {
    // Simplified calculation for performance
    const categoryMastery = this.userProgress.categoryMastery[task.category] || 0;
    return 1.0 - (categoryMastery / 100);
  }

  /**
   * Time efficiency scoring: Prefer tasks that fit user's session patterns
   */
  private calculateTimeEfficiencyScore(task: Task): number {
    const userAvgSession = this.userProgress.averageSessionTime;
    const taskTime = task.estimatedTime;
    
    // Prefer tasks that can be completed in one session
    if (taskTime <= userAvgSession) {
      return 1.0;
    } else if (taskTime <= userAvgSession * 1.5) {
      return 0.8;
    } else {
      return 0.5;
    }
  }

  /**
   * Mastery gap scoring: Prefer tasks that fill knowledge gaps
   */
  private calculateMasteryGapScore(task: Task): number {
    const categoryMastery = this.userProgress.categoryMastery[task.category] || 0;
    
    // Prefer tasks in categories where user has low mastery
    const masteryGap = 1.0 - (categoryMastery / 100);
    
    // But don't recommend very hard tasks if mastery is very low
    if (categoryMastery < 20 && task.difficulty === 'hard') {
      return masteryGap * 0.5;
    }
    
    return masteryGap;
  }

  /**
   * Get recommended next task based on current progress
   */
  public getRecommendedNextTask(tasks: Task[]): Task | null {
    const availableTasks = tasks.filter(task => 
      task.status === 'todo' && 
      this.calculatePrerequisitesScore(task) > 0.8
    );

    if (availableTasks.length === 0) return null;

    const sortedTasks = this.sortTasks(availableTasks);
    return sortedTasks[0];
  }

  /**
   * Get learning path recommendations
   */
  public getLearningPathRecommendations(tasks: Task[]): {
    immediate: Task[];
    next: Task[];
    later: Task[];
  } {
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const sortedTasks = this.sortTasks(todoTasks);
    
    return {
      immediate: sortedTasks.slice(0, 3),
      next: sortedTasks.slice(3, 8),
      later: sortedTasks.slice(8)
    };
  }
}

/**
 * Factory function to create sorting algorithm with user progress
 */
export const createTaskSorter = (userProgress: UserProgress): TaskSortingAlgorithm => {
  return new TaskSortingAlgorithm(userProgress);
};

/**
 * Default user progress for new users
 */
export const getDefaultUserProgress = (): UserProgress => ({
  completedTasks: [],
  inProgressTasks: [],
  categoryMastery: {
    'JavaScript': 0,
    'React': 0,
    'React Native': 0,
    'System Design': 0,
    'DSA': 0,
    'Machine Coding': 0
  },
  averageSessionTime: 45, // minutes
  preferredDifficulty: 'medium'
});

/**
 * Calculate user progress from tasks
 */
export const calculateUserProgress = (tasks: Task[]): UserProgress => {
  const completedTasks = tasks.filter(t => t.status === 'done').map(t => t.id);
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').map(t => t.id);
  
  // Calculate category mastery based on completed tasks
  const categoryMastery: Record<string, number> = {};
  const categories = ['JavaScript', 'React', 'React Native', 'System Design', 'DSA', 'Machine Coding'];
  
  categories.forEach(category => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const completedInCategory = categoryTasks.filter(t => t.status === 'done').length;
    const totalInCategory = categoryTasks.length;
    
    categoryMastery[category] = totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0;
  });
  
  // Calculate average session time (simplified)
  const completedTaskTimes = tasks
    .filter(t => t.status === 'done' && t.timeTracking?.totalTimeSpent)
    .map(t => t.timeTracking!.totalTimeSpent);
  
  const averageSessionTime = completedTaskTimes.length > 0 
    ? completedTaskTimes.reduce((a, b) => a + b, 0) / completedTaskTimes.length
    : 45;
  
  // Determine preferred difficulty
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
  tasks.filter(t => t.status === 'done').forEach(task => {
    difficultyCounts[task.difficulty]++;
  });
  
  const preferredDifficulty = difficultyCounts.medium >= difficultyCounts.easy && difficultyCounts.medium >= difficultyCounts.hard
    ? 'medium'
    : difficultyCounts.easy >= difficultyCounts.hard ? 'easy' : 'hard';
  
  return {
    completedTasks,
    inProgressTasks,
    categoryMastery,
    averageSessionTime,
    preferredDifficulty
  };
}; 