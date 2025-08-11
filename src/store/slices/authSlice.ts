import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer; 