import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// Types
interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  bannerImageUrl: string;
}

export interface ClassItem {
  _id: string;
  course: Course | null;
  instructor: string | null;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  link: string;
  isCancelled: boolean;
  createdAt: string;
}

export interface ClassPayload {
  course: string;
  instructor: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  link: string;
  isCancelled: boolean;
}

export interface ClassState {
  loading: boolean;
  error: string | null;
  success: boolean;
  classes: ClassItem[];
  selectedClass: ClassItem | null;
}

// Error handler
const handleAxiosError = (err: unknown, defaultMsg: string): string => {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { message?: string })?.message || defaultMsg;
  }
  return defaultMsg;
};

// Initial state
const initialState: ClassState = {
  loading: false,
  error: null,
  success: false,
  classes: [],
  selectedClass: null,
};

// Create Class
export const createClass = createAsyncThunk<void, ClassPayload, { rejectValue: string }>(
  'liveClass/create',
  async (classData, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/api/schedules', classData);
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to create class'));
    }
  }
);

// Get All Classes
export const getAllClasses = createAsyncThunk<ClassItem[], void, { rejectValue: string }>(
  'liveClass/getAllClasses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/schedules');
      return response.data.data as ClassItem[];
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch classes'));
    }
  }
);

// Fetch Class by ID
export const fetchClassById = createAsyncThunk<ClassItem, string, { rejectValue: string }>(
  'liveClass/fetchById',
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/schedules/${classId}`);
      return response.data.data as ClassItem;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch class'));
    }
  }
);

// Update Class
export const updateClass = createAsyncThunk<ClassItem, { classId: string; updatedData: Partial<ClassPayload> }, { rejectValue: string }>(
  'liveClass/update',
  async ({ classId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/schedules/${classId}`, updatedData);
      return response.data.data as ClassItem;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to update class'));
    }
  }
);

// Delete Class
export const deleteClass = createAsyncThunk<string, string, { rejectValue: string }>(
  'liveClass/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/schedules/${id}`);
      return id;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to delete class'));
    }
  }
);

// Slice
const classSlice = createSlice({
  name: 'liveClass',
  initialState,
  reducers: {
    resetClassState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.selectedClass = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createClass.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.success = false;
      })

      // Get All
      .addCase(getAllClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClasses.fulfilled, (state, action: PayloadAction<ClassItem[]>) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(getAllClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Fetch by ID
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action: PayloadAction<ClassItem>) => {
        state.loading = false;
        state.selectedClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Update
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateClass.fulfilled, (state, action: PayloadAction<ClassItem>) => {
        state.loading = false;
        state.success = true;

        const index = state.classes.findIndex((cls) => cls._id === action.payload._id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }

        if (state.selectedClass?. _id === action.payload._id) {
          state.selectedClass = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.success = false;
      })

      // Delete
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.classes = state.classes.filter((cls) => cls._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { resetClassState } = classSlice.actions;
export default classSlice.reducer;
