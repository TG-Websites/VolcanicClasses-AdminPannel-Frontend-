import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

// Helper for Axios error handling
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

export const fetchAdminDashboard = createAsyncThunk(
  'adminDashboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/dashboard/admin');
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(handleAxiosError(error, 'Failed to fetch admin dashboard data'));
    }
  }
);

interface LiveClass {
  isCancelled: boolean;
  _id: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  mode: string;
  link: string;
  createdAt: string;
}

interface AdminDashboardData {
  courseCount: number;
  liveClassCount: number;
  unresolvedInquiryCount: number;
  totalRevenue: number;
  upcomingLiveClasses: LiveClass[];
}

interface AdminDashboardState {
  loading: boolean;
  data: AdminDashboardData | null;
  error: string | null;
}

const initialState: AdminDashboardState = {
  loading: false,
  data: null,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminDashboardSlice.reducer;
