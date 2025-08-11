import { firebaseFirestore } from '../config/firebase';
import { Task, SerializedTask } from '../types';
import { serializeTaskDates } from '../utils/dateUtils';
import { allTasks } from './taskData';

// Check if tasks exist in Firebase
export const checkTasksInFirebase = async (): Promise<number> => {
  try {
    const snapshot = await firebaseFirestore.collection('tasks').get();
    console.log(`📊 Found ${snapshot.size} tasks in Firebase`);
    return snapshot.size;
  } catch (error) {
    console.error('❌ Error checking tasks in Firebase:', error);
    return 0;
  }
};

// Test upload with a single task
export const testUploadSingleTask = async () => {
  try {
    console.log('🧪 Testing single task upload...');
    
    const testTask = allTasks[0]; // Get first task
    const firebaseTask = {
      id: testTask.id || '',
      title: testTask.title || '',
      description: testTask.description || '',
      category: testTask.category || '',
      status: testTask.status || 'todo',
      priority: testTask.priority || 'medium',
      difficulty: testTask.difficulty || 'medium',
      estimatedTime: testTask.estimatedTime || 0,
      tags: testTask.tags || [],
      resources: testTask.resources.map(resource => ({
        id: resource.id || '',
        title: resource.title || '',
        url: resource.url || '',
        type: resource.type || 'documentation',
        difficulty: resource.difficulty || 'beginner',
        estimatedReadTime: resource.estimatedReadTime || 0,
        rating: resource.rating || 0,
        lastUpdated: resource.lastUpdated ? resource.lastUpdated.toISOString() : new Date().toISOString(),
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
        helpfulnessScore: resource.helpfulnessScore || 0
      })),
      subtasks: testTask.subtasks.map(subtask => ({
        id: subtask.id || '',
        title: subtask.title || '',
        completed: subtask.completed || false,
        estimatedTime: subtask.estimatedTime || 0,
        resources: subtask.resources || [],
        notes: subtask.notes || ''
      })),
      prerequisites: testTask.prerequisites || [],
      followUpTasks: testTask.followUpTasks || [],
      masteryLevel: testTask.masteryLevel || 'learning',
      reviewSchedule: {
        nextReview: testTask.reviewSchedule?.nextReview ? testTask.reviewSchedule.nextReview.toISOString() : new Date().toISOString(),
        reviewCount: testTask.reviewSchedule?.reviewCount || 0,
        interval: testTask.reviewSchedule?.interval || 7,
        retentionScore: testTask.reviewSchedule?.retentionScore || 0
      },
      timeTracking: {
        estimatedTime: testTask.timeTracking?.estimatedTime || 0,
        totalTimeSpent: testTask.timeTracking?.totalTimeSpent || 0,
        sessions: testTask.timeTracking?.sessions?.map(session => ({
          id: session.id || '',
          startTime: session.startTime ? session.startTime.toISOString() : new Date().toISOString(),
          endTime: session.endTime ? session.endTime.toISOString() : null,
          duration: session.duration || 0,
          sessionType: session.sessionType || 'study',
          focusRating: session.focusRating || 0,
          notes: session.notes || ''
        })) || []
      },
      createdAt: testTask.createdAt ? testTask.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: testTask.updatedAt ? testTask.updatedAt.toISOString() : new Date().toISOString(),
      completedAt: testTask.completedAt ? testTask.completedAt.toISOString() : null
    };
    
    await firebaseFirestore.collection('tasks').doc(testTask.id).set(firebaseTask);
    console.log(`✅ Test task uploaded successfully: ${testTask.title}`);
    return true;
  } catch (error) {
    console.error('❌ Test upload failed:', error);
    throw error;
  }
};

// Upload all tasks to Firebase
export const uploadTasksToFirebase = async () => {
  try {
    console.log('Starting task upload to Firebase...');
    
    const batch = firebaseFirestore.batch();
    let successCount = 0;
    let errorCount = 0;
    
    for (const task of allTasks) {
      try {
        // Create a clean task object for Firebase with proper defaults
        const firebaseTask = {
          id: task.id || '',
          title: task.title || '',
          description: task.description || '',
          category: task.category || '',
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
            lastUpdated: resource.lastUpdated ? resource.lastUpdated.toISOString() : new Date().toISOString(),
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
            helpfulnessScore: resource.helpfulnessScore || 0
          })),
          subtasks: task.subtasks.map(subtask => ({
            id: subtask.id || '',
            title: subtask.title || '',
            completed: subtask.completed || false,
            estimatedTime: subtask.estimatedTime || 0,
            resources: subtask.resources || [],
            notes: subtask.notes || ''
          })),
          prerequisites: task.prerequisites || [],
          followUpTasks: task.followUpTasks || [],
          masteryLevel: task.masteryLevel || 'learning',
          reviewSchedule: {
            nextReview: task.reviewSchedule?.nextReview ? task.reviewSchedule.nextReview.toISOString() : new Date().toISOString(),
            reviewCount: task.reviewSchedule?.reviewCount || 0,
            interval: task.reviewSchedule?.interval || 7,
            retentionScore: task.reviewSchedule?.retentionScore || 0
          },
          timeTracking: {
            estimatedTime: task.timeTracking?.estimatedTime || 0,
            totalTimeSpent: task.timeTracking?.totalTimeSpent || 0,
            sessions: task.timeTracking?.sessions?.map(session => ({
              id: session.id || '',
              startTime: session.startTime ? session.startTime.toISOString() : new Date().toISOString(),
              endTime: session.endTime ? session.endTime.toISOString() : null,
              duration: session.duration || 0,
              sessionType: session.sessionType || 'study',
              focusRating: session.focusRating || 0,
              notes: session.notes || ''
            })) || []
          },
          createdAt: task.createdAt ? task.createdAt.toISOString() : new Date().toISOString(),
          updatedAt: task.updatedAt ? task.updatedAt.toISOString() : new Date().toISOString(),
          completedAt: task.completedAt ? task.completedAt.toISOString() : null
        };
        
        // Add to batch
        const taskRef = firebaseFirestore.collection('tasks').doc(task.id);
        batch.set(taskRef, firebaseTask);
        
        successCount++;
        console.log(`✅ Added task: ${task.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding task ${task.title}:`, error);
        console.error('Error details:', error);
      }
    }
    
    // Commit the batch
    await batch.commit();
    
    console.log(`🎉 Upload complete! Success: ${successCount}, Errors: ${errorCount}`);
    return { successCount, errorCount };
    
  } catch (error) {
    console.error('❌ Batch upload failed:', error);
    throw error;
  }
};

// Get all tasks from Firebase only
export const getTasksFromFirebase = async (): Promise<Task[]> => {
  try {
    const snapshot = await firebaseFirestore.collection('tasks').get();
    
    if (snapshot.empty) {
      console.log('📝 No tasks found in Firebase');
      return []; // Return empty array if Firebase is empty
    }
    
    const tasks: Task[] = [];
    snapshot.forEach(doc => {
      const data = doc.data() as SerializedTask;
      // Convert back to Task format
      const task: Task = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
        completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
        resources: data.resources.map(resource => ({
          ...resource,
          lastUpdated: new Date(resource.lastUpdated)
        })),
        reviewSchedule: {
          ...data.reviewSchedule,
          nextReview: new Date(data.reviewSchedule.nextReview)
        },
        timeTracking: {
          ...data.timeTracking,
          sessions: data.timeTracking.sessions.map(session => ({
            ...session,
            startTime: new Date(session.startTime),
            endTime: session.endTime ? new Date(session.endTime) : new Date()
          }))
        }
      };
      tasks.push(task);
    });
    
    console.log(`📊 Retrieved ${tasks.length} tasks from Firebase`);
    return tasks;
    
  } catch (error) {
    console.error('❌ Error fetching tasks from Firebase:', error);
    throw error; // Throw error instead of returning mock data
  }
};

// Update a single task in Firebase
export const updateTaskInFirebase = async (taskId: string, updates: Partial<Task>) => {
  try {
    // Create a clean update object for Firebase
    const firebaseUpdates: any = {};
    
    // Handle different types of updates
    if (updates.status !== undefined) {
      firebaseUpdates.status = updates.status;
      firebaseUpdates.updatedAt = new Date().toISOString();
      firebaseUpdates.completedAt = updates.status === 'done' ? new Date().toISOString() : null;
    }
    
    if (updates.subtasks !== undefined) {
      firebaseUpdates.subtasks = updates.subtasks.map(subtask => ({
        id: subtask.id || '',
        title: subtask.title || '',
        completed: subtask.completed || false,
        estimatedTime: subtask.estimatedTime || 0,
        resources: subtask.resources || [],
        notes: subtask.notes || ''
      }));
      firebaseUpdates.updatedAt = new Date().toISOString();
    }
    
    if (updates.timeTracking !== undefined) {
      firebaseUpdates.timeTracking = {
        estimatedTime: updates.timeTracking.estimatedTime || 0,
        totalTimeSpent: updates.timeTracking.totalTimeSpent || 0,
        sessions: updates.timeTracking.sessions?.map(session => ({
          id: session.id || '',
          startTime: session.startTime ? session.startTime.toISOString() : new Date().toISOString(),
          endTime: session.endTime ? session.endTime.toISOString() : null,
          duration: session.duration || 0,
          sessionType: session.sessionType || 'study',
          focusRating: session.focusRating || 0,
          notes: session.notes || ''
        })) || []
      };
      firebaseUpdates.updatedAt = new Date().toISOString();
    }
    
    if (updates.reviewSchedule !== undefined) {
      firebaseUpdates.reviewSchedule = {
        nextReview: updates.reviewSchedule.nextReview ? updates.reviewSchedule.nextReview.toISOString() : new Date().toISOString(),
        reviewCount: updates.reviewSchedule.reviewCount || 0,
        interval: updates.reviewSchedule.interval || 7,
        retentionScore: updates.reviewSchedule.retentionScore || 0
      };
      firebaseUpdates.updatedAt = new Date().toISOString();
    }
    
    // Add any other fields that might be updated
    if (updates.masteryLevel !== undefined) {
      firebaseUpdates.masteryLevel = updates.masteryLevel;
      firebaseUpdates.updatedAt = new Date().toISOString();
    }
    
    if (updates.priority !== undefined) {
      firebaseUpdates.priority = updates.priority;
      firebaseUpdates.updatedAt = new Date().toISOString();
    }
    
    if (updates.difficulty !== undefined) {
      firebaseUpdates.difficulty = updates.difficulty;
      firebaseUpdates.updatedAt = new Date().toISOString();
    }
    
    await firebaseFirestore.collection('tasks').doc(taskId).update(firebaseUpdates);
    console.log(`✅ Updated task: ${taskId}`, firebaseUpdates);
  } catch (error) {
    console.error(`❌ Error updating task ${taskId}:`, error);
    throw error;
  }
};

// Delete a task from Firebase
export const deleteTaskFromFirebase = async (taskId: string) => {
  try {
    await firebaseFirestore.collection('tasks').doc(taskId).delete();
    console.log(`✅ Deleted task: ${taskId}`);
  } catch (error) {
    console.error(`❌ Error deleting task ${taskId}:`, error);
    throw error;
  }
};

// Clear all tasks from Firebase
export const clearAllTasksFromFirebase = async () => {
  try {
    const snapshot = await firebaseFirestore.collection('tasks').get();
    const batch = firebaseFirestore.batch();
    
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`🗑️ Cleared ${snapshot.size} tasks from Firebase`);
  } catch (error) {
    console.error('❌ Error clearing tasks from Firebase:', error);
    throw error;
  }
}; 