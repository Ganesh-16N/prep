import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTasks, updateTaskStatus } from '../redux/slices/tasksSlice';
import { fetchUser } from '../redux/slices/userSlice';
import { showResourceModal as showResourceModalAction, hideResourceModal as hideResourceModalAction } from '../redux/slices/uiSlice';
import { theme } from '../utils/theme';
import TaskCard from '../components/TaskCard';
import ResourcePopup from '../components/ResourcePopup';
import SkeletonLoader from '../components/SkeletonLoader';
import { Task, SerializedTask } from '../types';
import { deserializeTaskDates } from '../utils/dateUtils';
import { toggleSubtask } from '../redux/slices/tasksSlice';
import { uploadTasksToFirebase, testUploadSingleTask } from '../services/firebaseTaskService';

// Quick Actions removed per user request

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { tasks: serializedTasks, loading } = useSelector((state: RootState) => state.tasks);
  const { user } = useSelector((state: RootState) => state.user as any);
  const { showResourceModal, selectedTask } = useSelector((state: RootState) => state.ui as any);
  const [refreshing, setRefreshing] = useState(false);

  // Convert serialized tasks to regular tasks for components
  const tasks: Task[] = serializedTasks.map(deserializeTaskDates);
  
  const selectedTaskData = selectedTask ? tasks.find(task => task.id === selectedTask) : null;
  
  console.log('=== DEBUG INFO ===');
  console.log('serializedTasks length:', serializedTasks.length);
  console.log('tasks length:', tasks.length);
  console.log('selectedTask:', selectedTask);
  console.log('selectedTaskData:', selectedTaskData);
  console.log('resourceModalVisible:', showResourceModal);
  console.log('First task resources:', tasks[0]?.resources?.length || 0);
  console.log('First task:', tasks[0]?.title, tasks[0]?.status);
  console.log('==================');

  useEffect(() => {
    console.log('🔄 HomeScreen: Fetching tasks...');
    dispatch(fetchTasks());
    dispatch(fetchUser());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks());
    setRefreshing(false);
  };

  const handleTaskPress = (task: Task) => {
    console.log('=== TASK PRESS DEBUG ===');
    console.log('Task pressed:', task.id, task.title);
    console.log('Task resources:', task.resources);
    console.log('Task resources length:', task.resources.length);
    console.log('Dispatching showResourceModal with taskId:', task.id);
    dispatch(showResourceModalAction(task.id));
    console.log('showResourceModal dispatched');
    
    // Check state after dispatch
    setTimeout(() => {
      console.log('=== STATE CHECK ===');
      console.log('resourceModalVisible:', showResourceModal);
      console.log('selectedTask:', selectedTask);
      console.log('selectedTaskData:', selectedTaskData);
      console.log('==================');
    }, 100);
    
    console.log('=======================');
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

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByCategory = (category: string) => {
    return tasks.filter(task => task.category === category);
  };

  const getProgressPercentage = () => {
    if (tasks.length === 0) return 0;
    return Math.round((getTasksByStatus('done').length / tasks.length) * 100);
  };

  const getTodayTasks = () => {
    return tasks.filter(task => task.status !== 'done').slice(0, 5);
  };

  const hasTasks = tasks.length > 0;
  

  /* Quick Actions removed
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'startSession':
        const availableTasks = tasks.filter(task => task.status !== 'done');
        if (availableTasks.length > 0) {
          const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
          Alert.alert(
            'Start Session', 
            `Starting focused session on: "${randomTask.title}"\n\nEstimated time: ${randomTask.estimatedTime} minutes`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Start', onPress: () => {
                Alert.alert('Session Started', 'Timer started! Focus on your task.');
              }}
            ]
          );
        } else {
          Alert.alert('No Tasks Available', 'All tasks are completed! Add new tasks to start a session.');
        }
        break;
      case 'addTask':
        Alert.alert(
          'Add New Task',
          'Choose task type:',
          [
            { text: 'JavaScript', onPress: () => Alert.alert('JavaScript Task', 'Add JavaScript task functionality') },
            { text: 'React', onPress: () => Alert.alert('React Task', 'Add React task functionality') },
            { text: 'System Design', onPress: () => Alert.alert('System Design Task', 'Add System Design task functionality') },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        break;
      case 'applyLearningPath':
        Alert.alert(
          'Apply Learning Path',
          'This will assign a basic→advanced learningOrder to all tasks in Firestore. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Apply',
              onPress: async () => {
                const { applyLearningPathOrder } = await import('../services/applyLearningPathOrder');
                try {
                  const result = await applyLearningPathOrder();
                  Alert.alert('Learning Path Applied', `Total: ${result.total}\nUpdated: ${result.updated}\nUnknown placed: ${result.unknown}`);
                  dispatch(fetchTasks());
                } catch (e: any) {
                  Alert.alert('Failed', e?.message || 'Unknown error');
                }
              }
            }
          ]
        );
        break;
      case 'uploadCustomTopics':
        Alert.alert(
          'Upload 4 Custom Topics',
          'This uploads: (1) All React Hooks Catalog, (2) React Re-rendering & Optimization, (3) RN RAM/Cache/Performance, (4) RN Architecture Deep Dive. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload',
              onPress: async () => {
                const { uploadCustomInterviewTopics } = await import('../services/uploadCustomTopics');
                try {
                  const { successCount, errorCount } = await uploadCustomInterviewTopics();
                  Alert.alert('Custom Upload Complete', `Uploaded ${successCount} topics. Errors: ${errorCount}`);
                  dispatch(fetchTasks());
                } catch (e: any) {
                  Alert.alert('Upload Failed', e?.message || 'Unknown error');
                }
              }
            }
          ]
        );
        break;
      case 'uploadAllCategories':
        Alert.alert(
          'Upload All Categories',
          'This will audit and upload ALL categories (JS, React, RN, System Design, DSA, Machine Coding). Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload',
              onPress: async () => {
                const { auditAndUploadAllCategories } = await import('../services/runFullUploadAudit');
                try {
                  const summaries = await auditAndUploadAllCategories();
                  const report = summaries.map(s => `${s.category}: before ${s.before} → after ${s.after} (uploaded ${s.uploaded}, errors ${s.errors})`).join('\n');
                  Alert.alert('Full Upload Complete', report);
                  dispatch(fetchTasks());
                } catch (e: any) {
                  Alert.alert('Upload Failed', e?.message || 'Unknown error');
                }
              }
            }
          ]
        );
        break;
      case 'uploadMachineCodingTasks':
        Alert.alert(
          'Upload Machine Coding Tasks',
          'Choose what to upload',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload 5 (Core Basics)',
              onPress: () => {
                import('../services/uploadAllMachineCodingTasks').then(({ uploadMachineCodingCoreTasks }) => {
                  uploadMachineCodingCoreTasks().then(result => {
                    Alert.alert('Machine Coding Upload Complete', `Uploaded ${result.successCount} core MC tasks. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            },
            {
              text: 'Upload ALL (MC Essentials)',
              onPress: () => {
                import('../services/uploadAllMachineCodingTasks').then(({ uploadAllMachineCodingTasks }) => {
                  uploadAllMachineCodingTasks().then(result => {
                    Alert.alert('Full Machine Coding Upload Complete', `Uploaded ${result.successCount} MC topics. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            }
          ]
        );
        break;
      case 'uploadDSATasks':
        Alert.alert(
          'Upload DSA Tasks',
          'Choose what to upload',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload 5 (Core Patterns)',
              onPress: () => {
                import('../services/uploadAllDSATasks').then(({ uploadDSACoreTasks }) => {
                  uploadDSACoreTasks().then(result => {
                    Alert.alert('DSA Upload Complete', `Uploaded ${result.successCount} core DSA tasks. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            },
            {
              text: 'Upload ALL (Essential DSA)',
              onPress: () => {
                import('../services/uploadAllDSATasks').then(({ uploadAllDSATasks }) => {
                  uploadAllDSATasks().then(result => {
                    Alert.alert('Full DSA Upload Complete', `Uploaded ${result.successCount} DSA topics. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            }
          ]
        );
        break;
      case 'uploadSystemDesignTasks':
        Alert.alert(
          'Upload System Design Tasks',
          'Choose what to upload',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload 5 (Core)',
              onPress: () => {
                import('../services/uploadAllSystemDesignTasks').then(({ uploadSystemDesignCoreTasks }) => {
                  uploadSystemDesignCoreTasks().then(result => {
                    Alert.alert('System Design Upload Complete', `Uploaded ${result.successCount} core SD tasks. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            },
            {
              text: 'Upload ALL (SD)',
              onPress: () => {
                import('../services/uploadAllSystemDesignTasks').then(({ uploadAllSystemDesignTasks }) => {
                  uploadAllSystemDesignTasks().then(result => {
                    Alert.alert('Full System Design Upload Complete', `Uploaded ${result.successCount} SD topics. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            }
          ]
        );
        break;
      case 'viewProgress':
        const completedTasks = tasks.filter(task => task.status === 'done').length;
        const totalTasks = tasks.length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        Alert.alert(
          'Progress Overview',
          `📊 Your Progress:\n\n✅ Completed: ${completedTasks} tasks\n📝 Total: ${totalTasks} tasks\n📈 Completion Rate: ${completionRate}%\n\n🎯 Keep going!`,
          [{ text: 'OK' }]
        );
        break;
      case 'uploadJavaScriptTasks':
        Alert.alert(
          'Upload JavaScript Tasks',
          'Choose what to upload',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload 5 (Core)',
              onPress: () => {
                import('../services/uploadJavaScriptTasks').then(({ uploadJavaScriptTasks }) => {
                  uploadJavaScriptTasks().then(result => {
                    Alert.alert(
                      'JS Upload Complete',
                      `Uploaded ${result.successCount} core JS tasks. Errors: ${result.errorCount}`
                    );
                    dispatch(fetchTasks());
                  }).catch(error => {
                    Alert.alert('Upload Failed', `Error: ${error.message}`);
                  });
                });
              }
            },
            {
              text: 'Upload ALL (Modern JS)',
              onPress: () => {
                import('../services/uploadAllJavaScriptTasks').then(({ uploadAllJavaScriptTasks }) => {
                  uploadAllJavaScriptTasks().then(result => {
                    Alert.alert(
                      'Full JS Upload Complete',
                      `Uploaded ${result.successCount} JS topics. Errors: ${result.errorCount}`
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
        break;
      case 'uploadReactTasks':
        Alert.alert(
          'Upload React Tasks',
          'Choose what to upload',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload 5 (Core)',
              onPress: () => {
                import('../services/uploadAllReactTasks').then(({ uploadReactCoreTasks }) => {
                  uploadReactCoreTasks().then(result => {
                    Alert.alert('React Upload Complete', `Uploaded ${result.successCount} core React tasks. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            },
            {
              text: 'Upload ALL (React)',
              onPress: () => {
                import('../services/uploadAllReactTasks').then(({ uploadAllReactTasks }) => {
                  uploadAllReactTasks().then(result => {
                    Alert.alert('Full React Upload Complete', `Uploaded ${result.successCount} React topics. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            }
          ]
        );
        break;
      case 'uploadReactNativeTasks':
        Alert.alert(
          'Upload React Native Tasks',
          'Choose what to upload',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Upload 5 (Core)',
              onPress: () => {
                import('../services/uploadAllReactNativeTasks').then(({ uploadReactNativeCoreTasks }) => {
                  uploadReactNativeCoreTasks().then(result => {
                    Alert.alert('RN Upload Complete', `Uploaded ${result.successCount} core RN tasks. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            },
            {
              text: 'Upload ALL (RN)',
              onPress: () => {
                import('../services/uploadAllReactNativeTasks').then(({ uploadAllReactNativeTasks }) => {
                  uploadAllReactNativeTasks().then(result => {
                    Alert.alert('Full RN Upload Complete', `Uploaded ${result.successCount} RN topics. Errors: ${result.errorCount}`);
                    dispatch(fetchTasks());
                  }).catch(error => Alert.alert('Upload Failed', `Error: ${error.message}`));
                });
              }
            }
          ]
        );
        break;
      case 'settings':
        Alert.alert(
          'Settings',
          'Choose setting:',
          [
            { text: 'Dark Mode', onPress: () => Alert.alert('Dark Mode', 'Toggle dark mode functionality') },
            { text: 'Notifications', onPress: () => Alert.alert('Notifications', 'Manage notification settings') },
            { text: 'Study Goals', onPress: () => Alert.alert('Study Goals', 'Set daily study goals') },
            { text: 'Test Firebase', onPress: () => {
              runComprehensiveFirebaseTest().then(results => {
                const message = `Firebase Test Results:\n\n` +
                  `✅ Config: ${results.config ? 'OK' : 'FAIL'}\n` +
                  `🗄️ Firestore: ${results.firestore ? 'OK' : 'FAIL'}\n` +
                  `🔐 Auth: ${results.auth ? 'OK' : 'FAIL'}`;
                Alert.alert('Firebase Test', message);
              });
            }},
            { text: 'Check Firebase Tasks', onPress: () => {
              checkTasksInFirebase().then(count => {
                Alert.alert(
                  'Firebase Tasks Status',
                  `Found ${count} tasks in Firebase\n\nUse "Upload Tasks" to add 50 comprehensive tasks.`
                );
              }).catch(error => {
                Alert.alert('Check Failed', `Error: ${error.message}`);
              });
            }},
            { text: 'Test Single Task Upload', onPress: () => {
              testUploadSingleTask().then(() => {
                Alert.alert('Test Success', 'Single task uploaded successfully!');
                dispatch(fetchTasks());
              }).catch(error => {
                Alert.alert('Test Failed', `Error: ${error.message}`);
              });
            }},
            { text: 'Upload Tasks', onPress: () => {
              Alert.alert(
                'Upload Tasks to Firebase',
                'This will upload 50 comprehensive tasks with detailed subtasks. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Upload', 
                    onPress: () => {
                      uploadTasksToFirebase().then(result => {
                        Alert.alert(
                          'Upload Complete',
                          `Successfully uploaded ${result.successCount} tasks!\nErrors: ${result.errorCount}`
                        );
                        // Refresh tasks after upload
                        dispatch(fetchTasks());
                      }).catch(error => {
                        Alert.alert('Upload Failed', `Error: ${error.message}`);
                      });
                    }
                  }
                ]
              );
            }},
            { text: 'Upload JavaScript Tasks', onPress: () => {
              Alert.alert(
                'Upload JavaScript Tasks',
                'This will upload 5 comprehensive JavaScript tasks with detailed subtasks and best resources. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Upload', 
                    onPress: () => {
                      import('../services/uploadJavaScriptTasks').then(({ uploadJavaScriptTasks }) => {
                        uploadJavaScriptTasks().then(result => {
                          Alert.alert(
                            'JavaScript Upload Complete',
                            `Successfully uploaded ${result.successCount} JavaScript tasks!\nErrors: ${result.errorCount}`
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
            }},
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        break;
      default:
        console.log('Unknown action:', action);
    }
  };
  */

  const getCategoryStats = () => {
    const categories = ['JavaScript', 'React', 'React Native', 'System Design', 'DSA', 'Machine Coding'];
    return categories.map(category => ({
      name: category,
      count: getTasksByCategory(category).length,
      completed: getTasksByCategory(category).filter(task => task.status === 'done').length
    }));
  };

  if (loading) {
    return <SkeletonLoader type="home" />;
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header with Gradient */}
      {/* <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning, {user?.name || 'Prep Warrior'}! 👋</Text>
            <Text style={styles.subtitle}>Ready to crush your interview prep?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient> */}

      {/* Progress Overview */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressCards}>
          <TouchableOpacity style={styles.progressCard} onPress={() => navigation.navigate('CompletedTasks')}>
            <Icon name="check-circle" size={24} color={theme.colors.success} />
            <Text style={styles.progressNumber}>{getTasksByStatus('done').length}</Text>
            <Text style={styles.progressLabel}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.progressCard} onPress={() => navigation.navigate('InProgressTasks')}>
            <Icon name="schedule" size={24} color={theme.colors.warning} />
            <Text style={styles.progressNumber}>{getTasksByStatus('in-progress').length}</Text>
            <Text style={styles.progressLabel}>In Progress</Text>
          </TouchableOpacity>
          <View style={styles.progressCard}>
            <Icon name="assignment" size={24} color={theme.colors.textSecondary} />
            <Text style={styles.progressNumber}>{getTasksByStatus('todo').length}</Text>
            <Text style={styles.progressLabel}>To Do</Text>
          </View>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${getProgressPercentage()}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{getProgressPercentage()}% Complete</Text>
        </View>
      </View>

      {/* Quick Actions removed */}

      {/* Category Stats */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Category Overview</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getCategoryStats().map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryCard}
              onPress={() => navigation.navigate('CategoryTasks', { category: category.name })}
            >
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count} tasks</Text>
              <Text style={styles.categoryCompleted}>{category.completed} completed</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Today's Focus */}
      <View style={styles.todaySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Focus</Text>
          {/* <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity> */}
        </View>
        
        {!hasTasks ? (
          <View style={styles.emptyState}>
            <Icon name="cloud-upload" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>No tasks available</Text>
            <Text style={styles.emptyStateSubtext}>Upload tasks to Firebase to get started!</Text>
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => {
                testUploadSingleTask().then(() => {
                  Alert.alert('Test Success', 'Single task uploaded successfully!');
                  dispatch(fetchTasks());
                }).catch(error => {
                  Alert.alert('Test Failed', `Error: ${error.message}`);
                });
              }}
            >
              <Text style={styles.uploadButtonText}>Test Single Task Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.uploadButton, { marginTop: theme.spacing.sm }]}
              onPress={() => {
                Alert.alert(
                  'Upload Tasks to Firebase',
                  'This will upload 50 comprehensive tasks with detailed subtasks. Continue?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Upload', 
                      onPress: () => {
                        uploadTasksToFirebase().then(result => {
                          Alert.alert(
                            'Upload Complete',
                            `Successfully uploaded ${result.successCount} tasks!\nErrors: ${result.errorCount}`
                          );
                          dispatch(fetchTasks());
                        }).catch(error => {
                          Alert.alert('Upload Failed', `Error: ${error.message}`);
                        });
                      }
                    }
                  ]
                );
              }}
            >
              <Text style={styles.uploadButtonText}>Upload All Tasks</Text>
            </TouchableOpacity>
          </View>
        ) : getTodayTasks().length > 0 ? (
          getTodayTasks().map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() => handleTaskPress(task)}
              onStatusChange={(status) => handleTaskStatusChange(task.id, status)}
              onSubtaskToggle={handleSubtaskToggle}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="celebration" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>All tasks completed! 🎉</Text>
            <Text style={styles.emptyStateSubtext}>Great job on your prep journey!</Text>
          </View>
        )}
      </View>

      {/* Resource Modal */}
      <ResourcePopup
        isVisible={showResourceModal}
        resources={selectedTaskData?.resources || []}
        taskTitle={selectedTaskData?.title || ''}
        onClose={handleCloseResourceModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.white,
    opacity: 0.9,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  progressCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  progressCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  progressNumber: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.xs,
  },
  progressLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  progressBarContainer: {
    marginTop: theme.spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  // Quick Actions styles removed
  categorySection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  categoryCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    minWidth: 120,
  },
  categoryName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  categoryCount: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  categoryCompleted: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.success,
    marginTop: theme.spacing.xs,
  },
  todaySection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  viewAllText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyStateText: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
  },
  emptyStateSubtext: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    textAlign: 'center',
  },
});

export default HomeScreen; 