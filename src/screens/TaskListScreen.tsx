import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, RefreshControl, Dimensions, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTasks, searchTasks, setFilters, clearFilters, updateTaskStatus, toggleSubtask } from '../redux/slices/tasksSlice';
import { showResourceModal as showResourceModalAction, hideResourceModal as hideResourceModalAction } from '../redux/slices/uiSlice';
import { theme } from '../utils/theme';
import TaskCard from '../components/TaskCard';
import ResourcePopup from '../components/ResourcePopup';
import SkeletonLoader from '../components/SkeletonLoader';
import { Task, SerializedTask } from '../types';
import { deserializeTaskDates } from '../utils/dateUtils';
import { createTaskSorter, calculateUserProgress } from '../utils/taskSortingAlgorithm';
import { useMemo, useCallback } from 'react';

const { width } = Dimensions.get('window');

const TaskListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks: serializedTasks, loading, filteredTasks: serializedFilteredTasks } = useSelector((state: RootState) => state.tasks);
  const { showResourceModal, selectedTask } = useSelector((state: RootState) => state.ui as any);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Task['status'] | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Task['difficulty'] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [useAISorting, setUseAISorting] = useState(true);
  const [isAIToggling, setIsAIToggling] = useState(false);

  // Convert serialized tasks to regular tasks for components
  const tasks: Task[] = serializedTasks.map(deserializeTaskDates);
  const filteredTasks: Task[] = serializedFilteredTasks.map(deserializeTaskDates);
  
  const selectedTaskData = selectedTask ? tasks.find(task => task.id === selectedTask) : null;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks());
    setRefreshing(false);
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    await dispatch(searchTasks(query));
  }, [dispatch]);

  const handleCategoryFilter = useCallback((category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      dispatch(clearFilters());
    } else {
      setSelectedCategory(category);
      dispatch(setFilters({ category }));
    }
  }, [selectedCategory, dispatch]);

  const handleStatusFilter = useCallback((status: Task['status']) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
      dispatch(clearFilters());
    } else {
      setSelectedStatus(status);
      dispatch(setFilters({ status }));
    }
  }, [selectedStatus, dispatch]);

  const handleDifficultyFilter = useCallback((difficulty: Task['difficulty']) => {
    if (selectedDifficulty === difficulty) {
      setSelectedDifficulty(null);
      dispatch(clearFilters());
    } else {
      setSelectedDifficulty(difficulty);
      dispatch(setFilters({ difficulty }));
    }
  }, [selectedDifficulty, dispatch]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedStatus(null);
    setSelectedDifficulty(null);
    dispatch(clearFilters());
  }, [dispatch]);

  const handleTaskPress = useCallback((task: Task) => {
    dispatch(showResourceModalAction(task.id));
  }, [dispatch]);

  const handleTaskStatusChange = useCallback(async (taskId: string, status: Task['status']) => {
    await dispatch(updateTaskStatus({ taskId, status }));
  }, [dispatch]);

  const handleSubtaskToggle = useCallback(async (taskId: string, subtaskId: string) => {
    await dispatch(toggleSubtask({ taskId, subtaskId }));
  }, [dispatch]);

  const handleCloseResourceModal = useCallback(() => {
    dispatch(hideResourceModalAction());
  }, [dispatch]);

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

  const getCategories = useMemo(() => {
    const categories = ['JavaScript', 'React', 'React Native', 'System Design', 'DSA', 'Machine Coding'];
    return categories.map(category => ({
      name: category,
      count: tasks.filter(task => task.category === category).length,
      color: getCategoryColor(category)
    }));
  }, [tasks]);

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

  // Memoize user progress calculation
  const userProgress = useMemo(() => calculateUserProgress(tasks), [tasks]);

  // Memoize task sorter
  const taskSorter = useMemo(() => createTaskSorter(userProgress), [userProgress]);

  // Apply AI sorting if enabled with memoization
  const displayTasks = useMemo(() => {
    if (!useAISorting) return filteredTasks;
    return taskSorter.sortTasks(filteredTasks);
  }, [useAISorting, filteredTasks, taskSorter]);

  if (loading) {
    return <SkeletonLoader type="task" />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.subtitle}>
              {displayTasks.length} tasks available
              {useAISorting && (
                <Text style={styles.aiSortingIndicator}> • AI Sorted</Text>
              )}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={[styles.toggleButton, useAISorting && styles.aiSortingActive]}
              onPress={() => {
                if (isAIToggling) return;
                setIsAIToggling(true);
                setUseAISorting(!useAISorting);
                setTimeout(() => setIsAIToggling(false), 500);
              }}
              disabled={isAIToggling}
            >
              <Icon 
                name="psychology" 
                size={20} 
                color={useAISorting ? theme.colors.success : theme.colors.primary} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.toggleButton}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Icon 
                name={showFilters ? 'expand-less' : 'expand-more'} 
                size={20} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>
            {(selectedCategory || selectedStatus || selectedDifficulty || searchQuery) && (
              <TouchableOpacity style={styles.clearAllButton} onPress={clearAllFilters}>
                <Icon name="clear" size={16} color={theme.colors.error} />
              </TouchableOpacity>
            )}
            {(selectedCategory || selectedStatus || selectedDifficulty) && (
              <View style={styles.activeFiltersIndicator}>
                <Icon name="filter-list" size={16} color={theme.colors.primary} />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Quick Filter Summary - When collapsed and filters are active */}
      {!showFilters && (selectedCategory || selectedStatus || selectedDifficulty) && (
        <View style={styles.quickFilterSummary}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedCategory && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterText}>{selectedCategory}</Text>
              </View>
            )}
            {selectedStatus && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterText}>{selectedStatus.replace('-', ' ')}</Text>
              </View>
            )}
            {selectedDifficulty && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterText}>{selectedDifficulty}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks, topics, or tags..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearSearchButton}>
              <Icon name="close" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters - Collapsible */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          {/* Category Filters */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {getCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterChip,
                    selectedCategory === category.name && styles.filterChipActive
                  ]}
                  onPress={() => handleCategoryFilter(category.name)}
                >
                  <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                  <Text style={[
                    styles.filterChipText,
                    selectedCategory === category.name && styles.filterChipTextActive
                  ]}>
                    {category.name}
                  </Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{category.count}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Status & Difficulty Filters */}
          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Status</Text>
              <View style={styles.filterButtons}>
                {(['todo', 'in-progress', 'done'] as Task['status'][]).map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusButton,
                      selectedStatus === status && styles.statusButtonActive
                    ]}
                    onPress={() => handleStatusFilter(status)}
                  >
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(status) }]} />
                    <Text style={[
                      styles.statusButtonText,
                      selectedStatus === status && styles.statusButtonTextActive
                    ]}>
                      {status.replace('-', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Difficulty</Text>
              <View style={styles.filterButtons}>
                {(['easy', 'medium', 'hard'] as Task['difficulty'][]).map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.difficultyButton,
                      selectedDifficulty === difficulty && styles.difficultyButtonActive
                    ]}
                    onPress={() => handleDifficultyFilter(difficulty)}
                  >
                    <Text style={[
                      styles.difficultyButtonText,
                      selectedDifficulty === difficulty && styles.difficultyButtonTextActive
                    ]}>
                      {difficulty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Tasks List */}
      <ScrollView 
        style={styles.tasksContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {displayTasks.length > 0 ? (
          <View style={styles.tasksList}>
            {displayTasks.map((task, index) => (
              <View key={task.id} style={styles.taskWrapper}>
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() => handleTaskPress(task)}
                  onStatusChange={(status) => handleTaskStatusChange(task.id, status)}
                  onSubtaskToggle={handleSubtaskToggle}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Icon name="search-off" size={64} color={theme.colors.textSecondary} />
            </View>
            <Text style={styles.emptyStateTitle}>
              {searchQuery.trim() ? 'No tasks found' : 'No tasks available'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {searchQuery.trim() 
                ? 'Try adjusting your search or filters'
                : 'Upload tasks to Firebase to get started'
              }
            </Text>
            {searchQuery.trim() ? (
              <TouchableOpacity style={styles.resetButton} onPress={clearAllFilters}>
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.uploadButton}
                onPress={() => {
                  Alert.alert(
                    'Upload Tasks to Firebase',
                    'This will upload 50 comprehensive tasks with detailed subtasks. Continue?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { 
                        text: 'Upload', 
                        onPress: () => {
                          import('../services/firebaseTaskService').then(({ uploadTasksToFirebase }) => {
                            uploadTasksToFirebase().then(result => {
                              Alert.alert(
                                'Upload Complete',
                                `Successfully uploaded ${result.successCount} tasks!\nErrors: ${result.errorCount}`
                              );
                              dispatch(fetchTasks());
                            }).catch(error => {
                              Alert.alert('Upload Failed', `Error: ${error.message}`);
                            });
                          });
                        }
                      }
                    ]
                  );
                }}
              >
                <Text style={styles.uploadButtonText}>Upload Tasks</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Resource Modal */}
      <ResourcePopup
        isVisible={showResourceModal}
        resources={selectedTaskData?.resources || []}
        taskTitle={selectedTaskData?.title || ''}
        onClose={handleCloseResourceModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    // paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  toggleButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  clearAllButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  clearAllText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    ...theme.shadows.small,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
  clearSearchButton: {
    padding: theme.spacing.xs,
  },
  filtersContainer: {
    backgroundColor: theme.colors.surface,
    paddingBottom: theme.spacing.sm, 
  },
  filterSection: {
    marginBottom: theme.spacing.sm,
  },
  filterSectionTitle: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  filterScroll: {
    paddingHorizontal: theme.spacing.lg,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.sm,
    ...theme.shadows.small,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  filterChipText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  countBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.xs,
  },
  countText: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  filterRow: {
    paddingHorizontal: theme.spacing.lg,
  },
  filterGroup: {
    marginBottom: theme.spacing.md,
  },
  filterGroupTitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    flex: 1,
    justifyContent: 'center',
  },
  statusButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: theme.spacing.xs,
  },
  statusButtonText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  difficultyButton: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  difficultyButtonText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  difficultyButtonTextActive: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  tasksContainer: {
    flex: 1,
  },
  tasksList: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  taskWrapper: {
    marginBottom: theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
    paddingHorizontal: theme.spacing.lg,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  emptyStateTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
  },
  resetButtonText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.white,
    fontWeight: '600',
  },
  activeFiltersIndicator: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  quickFilterSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
  },
  activeFilterText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.white,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
  },
  uploadButtonText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  aiSortingActive: {
    backgroundColor: theme.colors.success + '20',
    borderRadius: theme.borderRadius.sm,
  },
  aiSortingIndicator: {
    color: theme.colors.success,
    fontWeight: '600',
  },
});

export default TaskListScreen; 