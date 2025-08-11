import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Task, SerializedTask } from '../../types';
import { serializeTaskDates, deserializeTaskDates } from '../../utils/dateUtils';
import { getTasksFromFirebase, updateTaskInFirebase } from '../../services/firebaseTaskService';

// Async thunk to fetch tasks from Firebase
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    try {
      console.log('🔄 Redux: Starting to fetch tasks...');
      const tasks = await getTasksFromFirebase();
      console.log(`📊 Redux: Fetched ${tasks.length} tasks`);
      return tasks.map(serializeTaskDates);
    } catch (error) {
      console.error('❌ Redux: Error fetching tasks from Firebase:', error);
      throw error;
    }
  }
);

// Async thunk to update task status
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }: { taskId: string; status: Task['status'] }) => {
    try {
      await updateTaskInFirebase(taskId, { status });
      return { taskId, status };
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  }
);

// Async thunk to toggle subtask
export const toggleSubtask = createAsyncThunk(
  'tasks/toggleSubtask',
  async ({ taskId, subtaskId }: { taskId: string; subtaskId: string }) => {
    try {
      // Get current task
      const tasks = await getTasksFromFirebase();
      const task = tasks.find(t => t.id === taskId);
      
      if (!task) {
        throw new Error('Task not found');
      }
      
      // Update subtask
      const updatedSubtasks = task.subtasks.map(subtask =>
        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
      );
      
      await updateTaskInFirebase(taskId, { subtasks: updatedSubtasks });
      
      return { taskId, subtaskId, subtasks: updatedSubtasks };
    } catch (error) {
      console.error('Error toggling subtask:', error);
      throw error;
    }
  }
);

interface TasksState {
  tasks: SerializedTask[];
  filteredTasks: SerializedTask[];
  loading: boolean;
  error: string | null;
  filters: {
    category?: string;
    status?: Task['status'];
    difficulty?: Task['difficulty'];
  };
  searchQuery: string;
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  filters: {},
  searchQuery: '',
};

// Recalculate filteredTasks based on tasks + filters + searchQuery
const applyAllFilters = (state: TasksState) => {
  const query = state.searchQuery.trim().toLowerCase();
  state.filteredTasks = state.tasks.filter((serialized) => {
    const t = deserializeTaskDates(serialized);
    const matchesCategory = !state.filters.category || t.category === state.filters.category;
    const matchesStatus = !state.filters.status || t.status === state.filters.status;
    const matchesDifficulty = !state.filters.difficulty || t.difficulty === state.filters.difficulty;
    const matchesFilters = matchesCategory && matchesStatus && matchesDifficulty;
    if (!matchesFilters) return false;
    if (!query) return true;
    return (
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload.map(serializeTaskDates);
      applyAllFilters(state);
    },
    searchTasks: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload || '';
      applyAllFilters(state);
    },
    setFilters: (state, action: PayloadAction<{ category?: string; status?: Task['status']; difficulty?: Task['difficulty'] }>) => {
      const { category, status, difficulty } = action.payload;
      console.log('🔍 Redux: Setting filters:', { category, status, difficulty });
      console.log('🔍 Redux: Total tasks before filter:', state.tasks.length);
      state.filters = {
        ...state.filters,
        ...(category !== undefined ? { category } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(difficulty !== undefined ? { difficulty } : {}),
      };
      applyAllFilters(state);
      console.log('🔍 Redux: Filtered tasks count:', state.filteredTasks.length);
    },
    clearFilters: (state) => {
      console.log('🔍 Redux: Clearing all filters');
      state.filters = {};
      state.searchQuery = '';
      applyAllFilters(state);
      console.log('🔍 Redux: Restored all tasks:', state.filteredTasks.length);
    },
    unsetFilter: (state, action: PayloadAction<'category' | 'status' | 'difficulty'>) => {
      const key = action.payload;
      const { [key]: _, ...rest } = state.filters as Record<string, unknown>;
      state.filters = rest as TasksState['filters'];
      applyAllFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        applyAllFilters(state);
        console.log(`📊 Redux: Loaded ${action.payload.length} tasks into state`);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const { taskId, status } = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            status,
            completedAt: status === 'done' ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString(),
          };
          
          // Update filtered tasks as well
          const filteredIndex = state.filteredTasks.findIndex(task => task.id === taskId);
          if (filteredIndex !== -1) {
            state.filteredTasks[filteredIndex] = state.tasks[taskIndex];
          }
          
          console.log(`✅ Redux: Updated task ${taskId} status to ${status}`);
        }
      })
      .addCase(toggleSubtask.fulfilled, (state, action) => {
        const { taskId, subtasks } = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            subtasks,
            updatedAt: new Date().toISOString(),
          };
          
          // Update filtered tasks as well
          const filteredIndex = state.filteredTasks.findIndex(task => task.id === taskId);
          if (filteredIndex !== -1) {
            state.filteredTasks[filteredIndex] = state.tasks[taskIndex];
          }
          
          console.log(`✅ Redux: Updated subtasks for task ${taskId}`);
        }
      });
  },
});

export const { setTasks, searchTasks, setFilters, clearFilters } = tasksSlice.actions;

// Helper function to refresh tasks after updates
export const refreshTasksAfterUpdate = () => async (dispatch: AppDispatch) => {
  try {
    await dispatch(fetchTasks());
  } catch (error) {
    console.error('Error refreshing tasks:', error);
  }
};
export default tasksSlice.reducer; 