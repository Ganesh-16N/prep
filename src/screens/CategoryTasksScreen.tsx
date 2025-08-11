import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTasks, updateTaskStatus, toggleSubtask } from '../redux/slices/tasksSlice';
import { showResourceModal as showResourceModalAction, hideResourceModal as hideResourceModalAction } from '../redux/slices/uiSlice';
import { theme } from '../utils/theme';
import TaskCard from '../components/TaskCard';
import ResourcePopup from '../components/ResourcePopup';
import SkeletonLoader from '../components/SkeletonLoader';
import { Task } from '../types';
import { deserializeTaskDates } from '../utils/dateUtils';

type CategoryTasksScreenRouteProp = RouteProp<{
  CategoryTasks: { category: string };
}, 'CategoryTasks'>;

const CategoryTasksScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<CategoryTasksScreenRouteProp>();
  const { category } = route.params;
  
  const { tasks: serializedTasks, loading } = useSelector((state: RootState) => state.tasks);
  const { showResourceModal, selectedTask } = useSelector((state: RootState) => state.ui as any);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'in-progress' | 'todo'>('all');

  const tasks: Task[] = serializedTasks.map(deserializeTaskDates);
  const categoryTasks = tasks.filter(t => t.category === category);
  
  // Filter tasks based on selected filter
  const filteredTasks = categoryTasks.filter(task => {
    switch (selectedFilter) {
      case 'completed':
        return task.status === 'done';
      case 'in-progress':
        return task.status === 'in-progress';
      case 'todo':
        return task.status === 'todo';
      default:
        return true; // 'all' - show all tasks
    }
  });
  
  const selectedTaskData = selectedTask ? tasks.find(task => task.id === selectedTask) : null;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks());
    setRefreshing(false);
  };

  const handleTaskPress = (task: Task) => {
    dispatch(showResourceModalAction(task.id));
  };

  const handleTaskStatusChange = async (taskId: string, status: Task['status']) => {
    await dispatch(updateTaskStatus({ taskId, status }));
  };

  const handleSubtaskToggle = async (taskId: string, subtaskId: string) => {
    await dispatch(toggleSubtask({ taskId, subtaskId }));
  };

  const handleCloseResourceModal = () => {
    dispatch(hideResourceModalAction());
  };

  const getCategoryStats = () => {
    const total = categoryTasks.length;
    const completed = categoryTasks.filter(task => task.status === 'done').length;
    const inProgress = categoryTasks.filter(task => task.status === 'in-progress').length;
    const todo = categoryTasks.filter(task => task.status === 'todo').length;
    
    return { total, completed, inProgress, todo };
  };

  const stats = getCategoryStats();

  if (loading) {
    return <SkeletonLoader type="category" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={[styles.statItem, selectedFilter === 'all' && styles.statItemActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.statNumber, selectedFilter === 'all' && styles.statNumberActive]}>{stats.total}</Text>
            <Text style={[styles.statLabel, selectedFilter === 'all' && styles.statLabelActive]}>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statItem, selectedFilter === 'completed' && styles.statItemActive]}
            onPress={() => setSelectedFilter('completed')}
          >
            <Text style={[styles.statNumber, { color: theme.colors.success }, selectedFilter === 'completed' && styles.statNumberActive]}>{stats.completed}</Text>
            <Text style={[styles.statLabel, selectedFilter === 'completed' && styles.statLabelActive]}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statItem, selectedFilter === 'in-progress' && styles.statItemActive]}
            onPress={() => setSelectedFilter('in-progress')}
          >
            <Text style={[styles.statNumber, { color: theme.colors.warning }, selectedFilter === 'in-progress' && styles.statNumberActive]}>{stats.inProgress}</Text>
            <Text style={[styles.statLabel, selectedFilter === 'in-progress' && styles.statLabelActive]}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statItem, selectedFilter === 'todo' && styles.statItemActive]}
            onPress={() => setSelectedFilter('todo')}
          >
            <Text style={[styles.statNumber, { color: theme.colors.textSecondary }, selectedFilter === 'todo' && styles.statNumberActive]}>{stats.todo}</Text>
            <Text style={[styles.statLabel, selectedFilter === 'todo' && styles.statLabelActive]}>To Do</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <View key={task.id} style={styles.cardWrapper}>
              <TaskCard
                task={task}
                onPress={() => handleTaskPress(task)}
                onStatusChange={(status) => handleTaskStatusChange(task.id, status)}
                onSubtaskToggle={handleSubtaskToggle}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              {categoryTasks.length === 0 
                ? `No tasks in ${category}` 
                : `No ${selectedFilter === 'all' ? '' : selectedFilter} tasks in ${category}`
              }
            </Text>
            <Text style={styles.emptySubtitle}>
              {categoryTasks.length === 0 
                ? 'Tasks for this category will appear here.' 
                : 'Try selecting a different filter.'
              }
            </Text>
          </View>
        )}
      </ScrollView>

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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
  },
  statLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  statItemActive: {
    backgroundColor: theme.colors.primary + '20',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
  },
  statNumberActive: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  statLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    marginTop: 10
  },
  cardWrapper: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
});

export default CategoryTasksScreen; 