// courseSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

// Helper to handle Axios errors
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Types for payload and course
interface CoursePayload {
    title: string;
    slug: string;
    category: string;
    subtitle: string;
    description: string;
    duration: string;
    successRate: number;
    qualifiedCount: string;
    yearsOfExcellence: number;
    bannerImageUrl: File | null |string;

    floatingHighlights: string[];

    examPattern: {
        questionFormat: string;
        duration: string;
        markingSystem: string;
    };

    topicBreakdown: Array<{
        topic: string;
        percentage: number | '';
    }>;

    programs: Array<{
        mode: string;
        title: string;
        description: string;
        price: number;
        priceLabel: string;
        features: string[];
    }>;

    whyChooseUs: Array<{
        icon: string;
        title: string;
        description: string;
    }>;

    topicCoverage: Array<{
        title: string;
        description: string;
    }>;

    faculty: Array<{
        name: string;
        designation: string;
        bio: string;
        expertise: string[];
        photoUrl: File | null | string;
    }>;

    testimonials: Array<{
        name: string;
        scoreSummary: string;
        subjectScore: string;
        quote: string;
        photoUrl: File | null | string;
    }>;

    showTrialButton: boolean;
    showBrochureButton: boolean;
    brochureUrl: string;

    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    isPublished: boolean;
}

interface Course {
    _id: string;
    title: string;
    slug: string;
    category: string;
    subtitle: string;
    description: string;
    duration: string;
    successRate: number;
    qualifiedCount: string;
    yearsOfExcellence: number;
    bannerImageUrl: string; // Optional: if exists in your backend
    brochureUrl: string;

    floatingHighlights: string[];

    examPattern: {
        questionFormat: string;
        duration: string;
        markingSystem: string;
    };

    topicBreakdown: Array<{
        _id: string;
        topic: string;
        percentage: number;
    }>;

    programs: Array<{
        _id: string;
        mode: string;
        title: string;
        description: string;
        price: number;
        priceLabel: string;
        features: string[];
    }>;

    whyChooseUs: Array<{
        _id: string;
        icon: string;
        title: string;
        description: string;
    }>;

    topicCoverage: Array<{
        _id: string;
        title: string;
        description: string;
    }>;

    faculty: Array<{
        _id: string;
        name: string;
        designation: string;
        bio: string;
        expertise: string[];
        photoUrl: string; // Optional: if stored in DB
    }>;

    testimonials: Array<{
        _id: string;
        name: string;
        scoreSummary: string;
        subjectScore: string;
        quote: string;
        photoUrl: string; // Optional
    }>;

    showTrialButton: boolean;
    showBrochureButton: boolean;

    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];

    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Pagination {
  totalPages: number;   
  page: number;    
  limit: number;   
}

interface CourseState {
  loading: boolean;
  error: string | null;
  success: boolean;
  courses: Course[];
  course: Course | null;
  pagination: Pagination;  
}

const initialState: CourseState = {
  loading: false,
  error: null,
  success: false,
  courses: [],
  course: null,
  pagination: { totalPages: 0, page: 1, limit: 10 },
};

// Async thunks
export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (courseData: CoursePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/courses', courseData);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Course creation failed'));
    }
  }
);

export const getAllCourses = createAsyncThunk(
  'course/getAllCourses',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      const url = query ? `/api/courses?${query}` : `/api/courses`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch courses'));
    }
  }
);



export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/courses/${id}`);
      return id; // returning the id to filter state
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to delete course'));
    }
  }
);

export const getCourseById = createAsyncThunk(
  'course/getCourseById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/courses/${id}`);
      return response.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch course'));
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async (
    { id, courseData }: { id: string; courseData: CoursePayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/api/courses/${id}`, courseData);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Course update failed'));
    }
  }
);

// Slice
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCourse.rejected, (state, ) => {
        state.loading = false;
        state.success = false;
      })

      // Get all courses
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.pagination = action.payload.pagination; 
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.loading = false;
      })

      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.courses = state.courses.filter(course => course._id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state) => {
        state.loading = false;
      })

      // Get course by ID
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default courseSlice.reducer;

