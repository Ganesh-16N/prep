import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Clipboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Task } from '../types';
import { theme } from '../utils/theme';
import ExplanationModal from './ExplanationModal';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onStatusChange: (status: Task['status']) => void;
  onSubtaskToggle: (taskId: string, subtaskId: string) => void;
}

const { width } = Dimensions.get('window');

const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onStatusChange, onSubtaskToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<Task['status'] | null>(null);
  const [optimisticSubtasks, setOptimisticSubtasks] = useState<Set<string>>(new Set());
  const [updatingStatus, setUpdatingStatus] = useState<Task['status'] | null>(null);
  const [updatingSubtask, setUpdatingSubtask] = useState<string | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [explanationQuery, setExplanationQuery] = useState('');
  const [explanationContext, setExplanationContext] = useState('');

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return theme.colors.textSecondary;
      case 'in-progress': return theme.colors.warning;
      case 'done': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const getDifficultyColor = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case 'easy': return theme.colors.success;
      case 'medium': return theme.colors.warning;
      case 'hard': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return theme.colors.textSecondary;
      case 'medium': return theme.colors.warning;
      case 'high': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getMasteryLevelColor = (masteryLevel: Task['masteryLevel']) => {
    switch (masteryLevel) {
      case 'learning': return theme.colors.warning;
      case 'practicing': return theme.colors.primary;
      case 'teaching': return theme.colors.success;
      case 'mastered': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const getMasteryLevelIcon = (masteryLevel: Task['masteryLevel']) => {
    switch (masteryLevel) {
      case 'learning': return 'school';
      case 'practicing': return 'fitness-center';
      case 'teaching': return 'person';
      case 'mastered': return 'star';
      default: return 'help';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'JavaScript': return theme.colors.javascript;
      case 'React': return theme.colors.react;
      case 'React Native': return theme.colors.reactNative;
      case 'System Design': return theme.colors.systemDesign;
      case 'DSA': return theme.colors.dsa;
      case 'Machine Coding': return theme.colors.machineCoding;
      default: return theme.colors.primary;
    }
  };

  const getSubtaskProgress = () => {
    if (task.subtasks.length === 0) return 0;
    let completed = task.subtasks.filter(subtask => subtask.completed).length;
    
    // Add optimistic updates
    task.subtasks.forEach(subtask => {
      const isOptimisticallyCompleted = optimisticSubtasks.has(subtask.id);
      if (isOptimisticallyCompleted && !subtask.completed) {
        completed++;
      } else if (!isOptimisticallyCompleted && subtask.completed) {
        completed--;
      }
    });
    
    return Math.round((completed / task.subtasks.length) * 100);
  };

  const getTimeTrackingEfficiency = () => {
    if (task.timeTracking.estimatedTime === 0) return 0;
    return Math.round((task.timeTracking.totalTimeSpent / task.timeTracking.estimatedTime) * 100);
  };

  const getNextReviewText = () => {
    const now = new Date();
    const nextReview = new Date(task.reviewSchedule.nextReview);
    const diffTime = nextReview.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Review now';
    if (diffDays === 1) return 'Review tomorrow';
    return `Review in ${diffDays} days`;
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    // Optimistic update - update UI immediately
    setOptimisticStatus(newStatus);
    setUpdatingStatus(newStatus);
    
    try {
      // Call the API in the background
      await onStatusChange(newStatus);
    } catch (error) {
      // Revert on error
      setOptimisticStatus(null);
      console.error('Status update failed:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleCopySubtask = (subtaskTitle: string) => {
    Clipboard.setString(subtaskTitle);
    // Alert.alert('Copied!', 'Subtask copied to clipboard');
  };

  const handleGetExplanation = (query: string, context: string = '') => {
    setExplanationQuery(query);
    setExplanationContext(context);
    setShowExplanationModal(true);
  };

  const handleCloseExplanationModal = () => {
    setShowExplanationModal(false);
    setExplanationQuery('');
    setExplanationContext('');
  };

  const handleSubtaskToggle = async (subtaskId: string) => {
    // Optimistic update - update UI immediately
    const newOptimisticSubtasks = new Set(optimisticSubtasks);
    const isCurrentlyCompleted = task.subtasks.find(s => s.id === subtaskId)?.completed || false;
    const isOptimisticallyCompleted = optimisticSubtasks.has(subtaskId);
    
    // Determine the final state
    const willBeCompleted = isCurrentlyCompleted ? !isOptimisticallyCompleted : isOptimisticallyCompleted;
    
    if (willBeCompleted) {
      newOptimisticSubtasks.add(subtaskId);
    } else {
      newOptimisticSubtasks.delete(subtaskId);
    }
    
    setOptimisticSubtasks(newOptimisticSubtasks);
    setUpdatingSubtask(subtaskId);
    
    try {
      // Call the API in the background
      await onSubtaskToggle(task.id, subtaskId);
    } catch (error) {
      // Revert on error
      setOptimisticSubtasks(new Set(optimisticSubtasks));
      console.error('Subtask toggle failed:', error);
    } finally {
      setUpdatingSubtask(null);
    }
  };

  // Helper functions for optimistic subtask updates
  const getSubtaskCompleted = (subtaskId: string) => {
    const subtask = task.subtasks.find(s => s.id === subtaskId);
    if (!subtask) return false;
    
    const isOptimisticallyCompleted = optimisticSubtasks.has(subtaskId);
    return subtask.completed ? !isOptimisticallyCompleted : isOptimisticallyCompleted;
  };

  const getSubtaskIcon = (subtaskId: string) => {
    return getSubtaskCompleted(subtaskId) ? 'check-circle' : 'radio-button-unchecked';
  };

  const getSubtaskColor = (subtaskId: string) => {
    return getSubtaskCompleted(subtaskId) ? theme.colors.success : theme.colors.textSecondary;
  };

  console.log('TaskCard rendering for task:', task.id, 'with resources:', task.resources.length);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title} numberOfLines={2}>
            {task.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.explanationButton}
            onPress={(e) => {
              e.stopPropagation();
              handleGetExplanation(task.title, task.category);
            }}
          >
            <Icon name="psychology" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.expandButton} 
            onPress={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
          >
            <Icon
              name={expanded ? 'expand-less' : 'expand-more'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.metaInfo}>
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(task.category) }]} />
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(optimisticStatus || task.status) }]} />
          <Text style={styles.statusText}>{(optimisticStatus || task.status).replace('-', ' ')}</Text>
        </View>

        <View style={styles.difficultyContainer}>
          <Icon name="trending-up" size={14} color={getDifficultyColor(task.difficulty)} />
          <Text style={[styles.difficultyText, { color: getDifficultyColor(task.difficulty) }]}>
            {task.difficulty}
          </Text>
        </View>

        <View style={styles.priorityContainer}>
          <Icon name="flag" size={14} color={getPriorityColor(task.priority)} />
          <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
            {task.priority}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <View style={styles.progressItem}>
            <Icon name="schedule" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.progressText}>{task.estimatedTime} min</Text>
          </View>
          <View style={styles.progressItem}>
            <Icon name="book" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.progressText}>{task.resources.length} resources</Text>
          </View>
          {task.subtasks.length > 0 && (
            <View style={styles.progressItem}>
              <Icon name="checklist" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.progressText}>{getSubtaskProgress()}% subtasks</Text>
            </View>
          )}
        </View>

        {task.subtasks.length > 0 && (
          <View style={styles.subtaskProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${getSubtaskProgress()}%` }
                ]}
              />
            </View>
          </View>
        )}
      </View>

      {/* Clickable Resources Section */}
      <TouchableOpacity 
        style={styles.resourcesSection}
        onPress={() => {
          console.log('Resources section clicked for task:', task.id, task.title);
          console.log('Task resources:', task.resources);
          onPress();
        }}
      >
        <View style={styles.resourcesHeader}>
          <Icon name="link" size={12} color={theme.colors.primary} />
          <Text style={styles.resourcesTitle}>Resources ({task.resources.length})</Text>
          <Icon name="chevron-right" size={12} color={theme.colors.primary} />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedContent}>
          {/* Mastery Level */}
          <View style={styles.masterySection}>
            <View style={styles.masteryHeader}>
              <Icon
                name={getMasteryLevelIcon(task.masteryLevel)}
                size={16}
                color={getMasteryLevelColor(task.masteryLevel)}
              />
              <Text style={[styles.masteryText, { color: getMasteryLevelColor(task.masteryLevel) }]}>
                {task.masteryLevel.charAt(0).toUpperCase() + task.masteryLevel.slice(1)}
              </Text>
            </View>
          </View>

          {/* Time Tracking */}
          {task.timeTracking.totalTimeSpent > 0 && (
            <View style={styles.timeTrackingSection}>
              <Text style={styles.sectionTitle}>Time Tracking</Text>
              <View style={styles.timeTrackingRow}>
                <View style={styles.timeItem}>
                  <Icon name="timer" size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.timeText}>{task.timeTracking.totalTimeSpent} min spent</Text>
                </View>
                <View style={styles.timeItem}>
                  <Icon name="trending-up" size={14} color={theme.colors.textSecondary} />
                  <Text style={styles.timeText}>{getTimeTrackingEfficiency()}% efficiency</Text>
                </View>
              </View>
            </View>
          )}

          {/* Review Schedule */}
          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>Review Schedule</Text>
            <View style={styles.reviewRow}>
              <Icon name="schedule" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.reviewText}>{getNextReviewText()}</Text>
            </View>
            <View style={styles.reviewRow}>
              <Icon name="refresh" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.reviewText}>
                {task.reviewSchedule.reviewCount} reviews completed
              </Text>
            </View>
          </View>

          {/* Subtasks */}
          {task.subtasks.length > 0 && (
            <View style={styles.subtasksSection}>
              <Text style={styles.sectionTitle}>Subtasks ({task.subtasks.length})</Text>
              {task.subtasks.map((subtask, index) => (
                <TouchableOpacity
                  key={subtask.id}
                  style={styles.subtaskItem}
                  onPress={() => handleSubtaskToggle(subtask.id)}
                >
                  {updatingSubtask === subtask.id ? (
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                  ) : (
                    <Icon
                      name={getSubtaskIcon(subtask.id)} 
                      size={16}
                      color={getSubtaskColor(subtask.id)}
                    />
                  )}
                  <Text style={[
                    styles.subtaskText,
                    getSubtaskCompleted(subtask.id) && styles.subtaskCompleted
                  ]}>
                    {subtask.title}
                  </Text>
                  <Text style={styles.subtaskTime}>{subtask.estimatedTime} min</Text>
                  <TouchableOpacity
                    style={styles.explanationButtonSmall}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleGetExplanation(subtask.title, task.category);
                    }}
                  >
                    <Icon name="psychology" size={14} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleCopySubtask(subtask.title);
                    }}
                  >
                    <Icon name="content-copy" size={14} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tags */}
          {task.tags.length > 0 && (
            <View style={styles.tagsSection}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsContainer}>
                {task.tags.map((tag, index) => (
                  <View key={index} style={styles.tagChip}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Status Actions */}
          <View style={styles.statusActions}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                (optimisticStatus || task.status) === 'todo' && styles.statusButtonActive
              ]}
              onPress={(e) => {
                e.stopPropagation();
                handleStatusChange('todo');
              }}
            >
              {updatingStatus === 'todo' ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                <Text style={[
                  styles.statusButtonText,
                  (optimisticStatus || task.status) === 'todo' && styles.statusButtonTextActive
                ]}>
                  To Do
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                (optimisticStatus || task.status) === 'in-progress' && styles.statusButtonActive
              ]}
              onPress={(e) => {
                e.stopPropagation();
                handleStatusChange('in-progress');
              }}
            >
              {updatingStatus === 'in-progress' ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                <Text style={[
                  styles.statusButtonText,
                  (optimisticStatus || task.status) === 'in-progress' && styles.statusButtonTextActive
                ]}>
                  In Progress
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                (optimisticStatus || task.status) === 'done' && styles.statusButtonActive
              ]}
              onPress={(e) => {
                e.stopPropagation();
                handleStatusChange('done');
              }}
            >
              {updatingStatus === 'done' ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                <Text style={[
                  styles.statusButtonText,
                  (optimisticStatus || task.status) === 'done' && styles.statusButtonTextActive
                ]}>
                  Done
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ExplanationModal
        isVisible={showExplanationModal}
        onClose={handleCloseExplanationModal}
        title="AI Explanation"
        query={explanationQuery}
        context={explanationContext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  explanationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanationButtonSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  expandButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  difficultyText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  priorityText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '500',
  },
  progressSection: {
    gap: theme.spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  progressText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  subtaskProgress: {
    gap: theme.spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  expandedContent: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  masterySection: {
    gap: theme.spacing.xs,
  },
  masteryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  masteryText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  timeTrackingSection: {
    gap: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  timeTrackingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  timeText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  reviewSection: {
    gap: theme.spacing.xs,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  reviewText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  subtasksSection: {
    gap: theme.spacing.xs,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  subtaskText: {
    flex: 1,
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textPrimary,
  },
  subtaskCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  subtaskTime: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
  },
  copyButton: {
    padding: theme.spacing.xs,
  },
  tagsSection: {
    gap: theme.spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  tagChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  tagText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
  },
  statusActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statusButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  statusButtonText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: theme.colors.white,
    fontWeight: '600',
  },

  resourcesSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 0.5,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  resourcesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourcesTitle: {
    fontSize: theme.typography.small.fontSize,
    fontWeight: '500',
    color: theme.colors.primary,
    flex: 1,
    textAlign: 'center',
  },
});

export default TaskCard; 