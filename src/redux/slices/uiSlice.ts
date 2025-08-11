import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDarkMode: boolean;
  isLoading: boolean;
  showResourceModal: boolean;
  selectedTask: string | null;
  showAddTaskModal: boolean;
  showProfileModal: boolean;
  activeTab: string;
}

const initialState: UIState = {
  isDarkMode: true,
  isLoading: false,
  showResourceModal: false,
  selectedTask: null,
  showAddTaskModal: false,
  showProfileModal: false,
  activeTab: 'Home',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showResourceModal: (state, action: PayloadAction<string>) => {
      console.log('uiSlice: showResourceModal called with taskId:', action.payload);
      console.log('uiSlice: previous state - showResourceModal:', state.showResourceModal, 'selectedTask:', state.selectedTask);
      state.showResourceModal = true;
      state.selectedTask = action.payload;
      console.log('uiSlice: new state - showResourceModal:', state.showResourceModal, 'selectedTask:', state.selectedTask);
    },
    hideResourceModal: (state) => {
      console.log('uiSlice: hideResourceModal called');
      console.log('uiSlice: previous state - showResourceModal:', state.showResourceModal, 'selectedTask:', state.selectedTask);
      state.showResourceModal = false;
      state.selectedTask = null;
      console.log('uiSlice: new state - showResourceModal:', state.showResourceModal, 'selectedTask:', state.selectedTask);
    },
    showAddTaskModal: (state) => {
      state.showAddTaskModal = true;
    },
    hideAddTaskModal: (state) => {
      state.showAddTaskModal = false;
    },
    showProfileModal: (state) => {
      state.showProfileModal = true;
    },
    hideProfileModal: (state) => {
      state.showProfileModal = false;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setLoading,
  showResourceModal,
  hideResourceModal,
  showAddTaskModal,
  hideAddTaskModal,
  showProfileModal,
  hideProfileModal,
  setActiveTab,
} = uiSlice.actions;

export default uiSlice.reducer; 