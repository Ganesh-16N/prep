import { firebaseAuth, firebaseFirestore } from '../config/firebase';
import { Task, User, EnhancedResource } from '../types';

// Authentication Services
export const authService = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser: () => {
    return firebaseAuth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: any) => void) => {
    return firebaseAuth.onAuthStateChanged(callback);
  }
};

// Task Services
export const taskService = {
  // Get all tasks for a user
  getTasks: async (userId: string): Promise<Task[]> => {
    try {
      const snapshot = await firebaseFirestore
        .collection('tasks')
        .where('userId', '==', userId)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  },

  // Add a new task
  addTask: async (task: Omit<Task, 'id'>): Promise<string> => {
    try {
      const docRef = await firebaseFirestore.collection('tasks').add(task);
      return docRef.id;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId: string, status: Task['status']): Promise<void> => {
    try {
      await firebaseFirestore
        .collection('tasks')
        .doc(taskId)
        .update({ 
          status,
          updatedAt: new Date().toISOString(),
          completedAt: status === 'done' ? new Date().toISOString() : null
        });
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  // Update subtask completion
  updateSubtask: async (taskId: string, subtaskId: string, completed: boolean): Promise<void> => {
    try {
      const taskRef = firebaseFirestore.collection('tasks').doc(taskId);
      const taskDoc = await taskRef.get();
      
      if (!taskDoc.exists) {
        throw new Error('Task not found');
      }

      const taskData = taskDoc.data() as Task;
      const updatedSubtasks = taskData.subtasks.map(subtask =>
        subtask.id === subtaskId ? { ...subtask, completed } : subtask
      );

      await taskRef.update({
        subtasks: updatedSubtasks,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating subtask:', error);
      throw error;
    }
  }
};

// User Services
export const userService = {
  // Get user profile
  getUser: async (userId: string): Promise<User | null> => {
    try {
      const doc = await firebaseFirestore.collection('users').doc(userId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Create or update user profile
  updateUser: async (userId: string, userData: Partial<User>): Promise<void> => {
    try {
      await firebaseFirestore
        .collection('users')
        .doc(userId)
        .set(userData, { merge: true });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Resource Services
export const resourceService = {
  // Get resources for a task
  getTaskResources: async (taskId: string): Promise<EnhancedResource[]> => {
    try {
      const snapshot = await firebaseFirestore
        .collection('resources')
        .where('taskId', '==', taskId)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EnhancedResource[];
    } catch (error) {
      console.error('Error getting resources:', error);
      throw error;
    }
  },

  // Update resource bookmark status
  updateResourceBookmark: async (resourceId: string, bookmarked: boolean): Promise<void> => {
    try {
      await firebaseFirestore
        .collection('resources')
        .doc(resourceId)
        .update({ bookmarked });
    } catch (error) {
      console.error('Error updating resource bookmark:', error);
      throw error;
    }
  },

  // Update resource progress
  updateResourceProgress: async (resourceId: string, progress: number): Promise<void> => {
    try {
      await firebaseFirestore
        .collection('resources')
        .doc(resourceId)
        .update({ progress });
    } catch (error) {
      console.error('Error updating resource progress:', error);
      throw error;
    }
  }
}; 