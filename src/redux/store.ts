import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks for now
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 