// redux/slices/announcementSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

interface AnnouncementPayload {
  title: string;
  content: string;
}

interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface AnnouncementState {
  loading: boolean;
  error: string | null;
  success: boolean;
  announcements: Announcement[];
  announcement?: Announcement | null;
  pagination : Pagination;
}


interface Pagination {
  total: number;   
  page: number;   
  limit: number;   
}


const initialState: AnnouncementState = {
  loading: false,
  error: null,
  success: false,
  announcements: [],
  announcement: null,
  pagination: { total: 0, page: 1, limit: 10 },
};

const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Create Announcement
export const createAnnouncement = createAsyncThunk<
  Announcement, // return type
  AnnouncementPayload, // argument type
  { rejectValue: string } // reject value type
>('announcement/createAnnouncement', async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/announcements', formData);
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Announcement creation failed');
    return rejectWithValue(msg);
  }
});

// Get All Announcements
export const getAllAnnouncement = createAsyncThunk<
  { data: Announcement[]; pagination: Pagination },
  string | undefined, // query string (e.g. "page=2&limit=10")
  { rejectValue: string }
>(
  'announcement/getAllAnnouncement',
  async (query, { rejectWithValue }) => {
    try {
      const url = query ? `/api/announcements?${query}` : `/api/announcements`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: unknown) {
      const msg = handleAxiosError(err, 'Failed to fetch announcements');
      return rejectWithValue(msg);
    }
  }
);


// Delete Announcement
export const deleteAnnouncement = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('announcement/deleteAnnouncement', async (announcementId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/api/announcements/${announcementId}`);
    return announcementId;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Failed to delete announcement');
    return rejectWithValue(msg);
  }
});

// Get Announcement By ID
export const getAnnouncementById = createAsyncThunk<
  Announcement,
  string,
  { rejectValue: string }
>('announcement/getAnnouncementById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/announcements/${id}`);
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Failed to fetch announcement');
    return rejectWithValue(msg);
  }
});

// Update Announcement
export const updateAnnouncement = createAsyncThunk<
  Announcement,
  { id: string; formData: AnnouncementPayload },
  { rejectValue: string }
>('announcement/updateAnnouncement', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/api/announcements/${id}`, formData);
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Announcement update failed');
    return rejectWithValue(msg);
  }
});

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    resetAnnouncementState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAnnouncement.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      // Get All
      .addCase(getAllAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload.data;
        state.pagination = action.payload.pagination
      })
      .addCase(getAllAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      // Delete
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.announcements = state.announcements.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      // Get By ID
      .addCase(getAnnouncementById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.announcement = null;
      })
      .addCase(getAnnouncementById.fulfilled, (state, action: PayloadAction<Announcement>) => {
        state.loading = false;
        state.announcement = action.payload;
      })
      .addCase(getAnnouncementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
        state.announcement = null;
      })

      // Update
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAnnouncement.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export const { resetAnnouncementState } = announcementSlice.actions;
export default announcementSlice.reducer;
