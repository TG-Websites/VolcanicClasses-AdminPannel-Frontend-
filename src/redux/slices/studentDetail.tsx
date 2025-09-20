import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';


interface Course {
  _id: string;
  title: string;
  bannerImageUrl:string;
}

interface UserCourse {
  paymentStatus: string;
  ordDocId: string;
  _id: string;
  course: Course;
  courseMode: string;
}

interface Order {
  paymentStatus: string;
  paymentId: string | null;
  _id: string;
  className: string;
  amount: number;
  courseType: string;
  course: Course;
  user: string;
  createdAt: string;
  __v: number;
}

interface StudentUser {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  courses: UserCourse[];
  createdAt: string;
  __v: number;
}

interface StudentData {
  user: StudentUser;
  purchasedCoursesCount: number;
  revenueGenerated: number;
  orders: Order[];
}


// Helper for Axios error handling
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};


export const studentById = createAsyncThunk(
  'studentByid/fetch',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/users/student/${id}`);
      return response.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch course'));
    }
  }
);


interface StudentDetailState  {
  loading: boolean;
  data: StudentData | null;
  error: string | null;
}


const initialState: StudentDetailState = {
  loading: false,
  data: null,
  error: null,
};


const studentDetailSlice = createSlice({
  name: 'studentDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(studentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentDetailSlice.reducer;
