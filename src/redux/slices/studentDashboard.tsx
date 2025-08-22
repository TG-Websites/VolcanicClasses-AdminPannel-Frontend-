import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// Helper for Axios error handling
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// 🔹 Fetch student home data
export const fetchStudentDashboard = createAsyncThunk(
  'studentDashboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/dashboard/student');
      console.log("studentHome", response.data);
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(
        handleAxiosError(error, 'Failed to fetch student home data')
      );
    }
  }
);

// Interfaces
interface Program {
  features: string[];
  mode: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
}

interface PurchasedCourse {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  programs: Program[];
  paymentStatus: string;
}

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Schedule {
  isCancelled: boolean;
  _id: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  mode: string;
  link: string;
  createdAt: string;
  __v: number;
}

interface UpcomingLiveClass {
  course: {
    _id: string;
    title: string;
  };
  schedules: Schedule[];
}


interface StudentHomeData {
  purchasedCourses: PurchasedCourse[];
  upcomingLiveClasses: UpcomingLiveClass[]; 
  announcements: Announcement[];
}


interface StudentHomeState {
  loading: boolean;
  data: StudentHomeData | null;
  error: string | null;
}

const initialState: StudentHomeState = {
  loading: false,
  data: null,
  error: null,
};

const studentHomeSlice = createSlice({
  name: 'studentDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentHomeSlice.reducer;
