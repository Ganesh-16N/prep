import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  // Theme and UI
  isDarkMode: boolean;
  primaryColor: string;
  
  // User preferences
  notificationsEnabled: boolean;
  autoSave: boolean;
  
  // Study settings
  studySessionDuration: number; // in minutes
  breakDuration: number; // in minutes
  
  // Actions
  toggleDarkMode: () => void;
  setPrimaryColor: (color: string) => void;
  toggleNotifications: () => void;
  setAutoSave: (enabled: boolean) => void;
  setStudySessionDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isDarkMode: false,
      primaryColor: '#3b82f6',
      notificationsEnabled: true,
      autoSave: true,
      studySessionDuration: 25,
      breakDuration: 5,
      
      // Actions
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setPrimaryColor: (color: string) => set({ primaryColor: color }),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      setAutoSave: (enabled: boolean) => set({ autoSave: enabled }),
      setStudySessionDuration: (duration: number) => set({ studySessionDuration: duration }),
      setBreakDuration: (duration: number) => set({ breakDuration: duration }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 