import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

export interface MediaItem {
  _id: string;
  title: string;
  url: string;
  type: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaPayload {
  title: string;
  file: File | null;
  type: string;
  tags: string;
}

export interface MediaState {
  loading: boolean;
  error: string | null;
  success: boolean;
  mediaList: MediaItem[];
  currentMedia: MediaItem | null;
  pagination: Pagination;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

const initialState: MediaState = {
  loading: false,
  error: null,
  success: false,
  mediaList: [],
  currentMedia: null,
  pagination: { total: 0, page: 1, limit: 10 },
};

// Error handler
const handleAxiosError = (err: unknown, defaultMsg: string): string => {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { message?: string })?.message || defaultMsg;
  }
  return defaultMsg;
};

// Upload Media
export const uploadMedia = createAsyncThunk<
  string,               // ✅ return type (response.message)
  MediaPayload,         // ✅ argument type (payload you pass when dispatching)
  { rejectValue: string } // ✅ reject type (custom error)
>(
  "media/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/media/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.message; // ✅ correct return type (string)
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, "Upload failed"));
    }
  }
);


// Get All Media (with pagination)
export const getAllMedia = createAsyncThunk<
  { data: MediaItem[]; pagination: Pagination },
  string | undefined,
  { rejectValue: string }
>(
  'media/getAll',
  async (query, { rejectWithValue }) => {
    try {
      const url = query ? `/api/media?${query}` : `/api/media`;

      const response = await axiosInstance.get<{
        data: MediaItem[];
        pagination: Pagination;
      }>(url);

      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch media'));
    }
  }
);

// Get Media By ID
export const getMediaById = createAsyncThunk<MediaItem, string, { rejectValue: string }>(
  'media/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/media/${id}`);
      return response.data as MediaItem;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch media'));
    }
  }
);

// Delete Media
export const deleteMedia = createAsyncThunk<string, string, { rejectValue: string }>(
  'media/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/media/${id}`);
      return id;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Delete failed'));
    }
  }
);

// Slice
export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadMedia.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? null;
      })

      // Get All
      .addCase(getAllMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaList = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Get By ID
      .addCase(getMediaById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentMedia = null;
      })
      .addCase(getMediaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedia = action.payload;
      })
      .addCase(getMediaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Delete
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaList = state.mediaList.filter((item) => item._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.success = false;
      });
  },
});

export const { resetState } = mediaSlice.actions;
export default mediaSlice.reducer;
