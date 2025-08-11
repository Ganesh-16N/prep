import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, Progress } from '../../types';

interface UserState {
  user: User | null;
  progress: Progress;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  progress: {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0,
    weeklyProgress: [],
    categoryProgress: [],
    timeSpentToday: 0,
    timeSpentThisWeek: 0,
    focusTimeToday: 0,
    efficiencyScore: 0,
  },
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    // TODO: Replace with actual API call
    const response = await new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          name: 'Interview Prep User',
          email: 'user@example.com',
          avatar: undefined,
          preferences: {
            darkMode: true,
            notifications: true,
            dailyGoal: 180, // 3 hours in minutes
            focusTime: 25,
            categories: ['JavaScript', 'React', 'System Design'],
            preferredResourceTypes: ['medium', 'dev.to', 'documentation'],
            studyReminders: true,
            reviewReminders: true,
            socialFeatures: false,
            dataSharing: false,
          },
          progress: {
            totalTasks: 0,
            completedTasks: 0,
            inProgressTasks: 0,
            todoTasks: 0,
            weeklyProgress: [],
            categoryProgress: [],
            timeSpentToday: 0,
            timeSpentThisWeek: 0,
            focusTimeToday: 0,
            efficiencyScore: 0,
          },
          badges: [],
          streak: 5,
          totalTasksCompleted: 12,
          learningAnalytics: {
            totalStudyTime: 480,
            averageSessionLength: 45,
            peakProductivityHours: ['09:00', '14:00', '20:00'],
            topicMastery: [],
            retentionRate: 85,
            weeklyProgress: [],
            monthlyProgress: [],
          },
          studyPatterns: {
            preferredStudyTimes: ['09:00', '14:00', '20:00'],
            averageSessionDuration: 45,
            focusScore: 4.2,
            preferredResourceTypes: ['medium', 'dev.to', 'documentation'],
            weakAreas: ['System Design', 'Machine Coding'],
            strongAreas: ['JavaScript', 'React'],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }, 1000);
    });
    return response;
  }
);

export const updateProgress = createAsyncThunk(
  'user/updateProgress',
  async (progress: Partial<Progress>) => {
    return progress;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },
    incrementStreak: (state) => {
      if (state.user) {
        state.user.streak += 1;
        state.progress.currentStreak = state.user.streak;
        if (state.user.streak > state.progress.longestStreak) {
          state.progress.longestStreak = state.user.streak;
        }
      }
    },
    resetStreak: (state) => {
      if (state.user) {
        state.user.streak = 0;
        state.progress.currentStreak = 0;
      }
    },
    addBadge: (state, action: PayloadAction<{ id: string; name: string; description: string; icon: string; category: string; rarity: string }>) => {
      if (state.user) {
        state.user.badges.push({
          ...action.payload,
          earnedAt: new Date(),
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.progress = { ...state.progress, ...action.payload };
      });
  },
});

export const {
  setUser,
  updateUserPreferences,
  incrementStreak,
  resetStreak,
  addBadge,
} = userSlice.actions;

export default userSlice.reducer; 