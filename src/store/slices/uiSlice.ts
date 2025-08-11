import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDarkMode: boolean;
  isLoading: boolean;
  modalVisible: boolean;
  modalData: any;
}

const initialState: UIState = {
  isDarkMode: false,
  isLoading: false,
  modalVisible: false,
  modalData: null,
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
    showModal: (state, action: PayloadAction<any>) => {
      state.modalVisible = true;
      state.modalData = action.payload;
    },
    hideModal: (state) => {
      state.modalVisible = false;
      state.modalData = null;
    },
  },
});

export const { toggleDarkMode, setDarkMode, setLoading, showModal, hideModal } = uiSlice.actions;
export default uiSlice.reducer; 