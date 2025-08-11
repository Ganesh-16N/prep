import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'note' | 'video' | 'link';
  url?: string;
  filePath?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface ResourcesState {
  resources: Resource[];
  loading: boolean;
  error: string | null;
}

const initialState: ResourcesState = {
  resources: [],
  loading: false,
  error: null,
};

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async (userId: string) => {
    const resourcesRef = collection(db, 'resources');
    const snapshot = await getDocs(resourcesRef);
    const resources = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Resource))
      .filter(resource => resource.userId === userId);
    return resources;
  }
);

export const addResource = createAsyncThunk(
  'resources/addResource',
  async (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    const resourcesRef = collection(db, 'resources');
    const newResource = {
      ...resource,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(resourcesRef, newResource);
    return { id: docRef.id, ...newResource } as Resource;
  }
);

export const updateResource = createAsyncThunk(
  'resources/updateResource',
  async ({ id, updates }: { id: string; updates: Partial<Resource> }) => {
    const resourceRef = doc(db, 'resources', id);
    await updateDoc(resourceRef, { ...updates, updatedAt: new Date() });
    return { id, ...updates };
  }
);

export const deleteResource = createAsyncThunk(
  'resources/deleteResource',
  async (id: string) => {
    const resourceRef = doc(db, 'resources', id);
    await deleteDoc(resourceRef);
    return id;
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resources';
      })
      .addCase(addResource.fulfilled, (state, action) => {
        state.resources.push(action.payload);
      })
      .addCase(updateResource.fulfilled, (state, action) => {
        const index = state.resources.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = { ...state.resources[index], ...action.payload };
        }
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.resources = state.resources.filter(r => r.id !== action.payload);
      });
  },
});

export const { clearError } = resourcesSlice.actions;
export default resourcesSlice.reducer; 