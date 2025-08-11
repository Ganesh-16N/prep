import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTasks, updateTaskStatus, toggleSubtask } from '../redux/slices/tasksSlice';
import { showResourceModal as showResourceModalAction, hideResourceModal as hideResourceModalAction } from '../redux/slices/uiSlice';
import { theme } from '../utils/theme';
import TaskCard from '../components/TaskCard';
import ResourcePopup from '../components/ResourcePopup';
import { Task } from '../types';
import { deserializeTaskDates } from '../utils/dateUtils';

const CompletedTasksScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks: serializedTasks, loading } = useSelector((state: RootState) => state.tasks);
  const { showResourceModal, selectedTask } = useSelector((state: RootState) => state.ui as any);
  const [refreshing, setRefreshing] = useState(false);

  const tasks: Task[] = serializedTasks.map(deserializeTaskDates);
  const completedTasks = tasks.filter(t => t.status === 'done');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks</Text>
      <ScrollView
        style={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {completedTasks.length > 0 ? (
          completedTasks.map(task => (
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
            <Text style={styles.emptyTitle}>No completed tasks yet</Text>
            <Text style={styles.emptySubtitle}>Finish tasks to see them here.</Text>
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
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  list: {
    flex: 1,
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

export default CompletedTasksScreen;

