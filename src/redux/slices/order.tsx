import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import toast from 'react-hot-toast';

// -------- Payment --------
export interface Payment {
  currency: string;
  status: string;
  _id: string;
  order: string;
  transactionId: string;
  amount: number;
  method: string;
  paidAt: string;
  __v: number;
}

// -------- Course Subtypes --------
export interface TopicBreakdown {
  _id: string;
  topic: string;
  percentage: number;
}

export interface Program {
  _id: string;
  mode: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  features: string[];
}

export interface WhyChooseUs {
  _id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TopicCoverage {
  _id: string;
  title: string;
  description: string;
}

export interface Faculty {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  photoUrl: string;
  expertise: string[];
}

export interface Testimonial {
  _id: string;
  name: string;
  scoreSummary: string;
  subjectScore: string;
  quote: string;
  photoUrl: string;
}

export interface ExamPattern {
  questionFormat: string;
  duration: string;
  markingSystem: string;
}

// -------- Course --------
export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  successRate: number;
  qualifiedCount: string;
  yearsOfExcellence: number;
  bannerImageUrl: string;
  showTrialButton: boolean;
  showBrochureButton: boolean;
  isPublished: boolean;
  metaKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  brochureUrl: string;
  examPattern: ExamPattern;
  floatingHighlights: string[];
  topicBreakdown: TopicBreakdown[];
  programs: Program[];
  whyChooseUs: WhyChooseUs[];
  topicCoverage: TopicCoverage[];
  faculty: Faculty[];
  testimonials: Testimonial[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// -------- User --------
export interface User {
  role: string;
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  courses: {
    paymentStatus: string;
    _id: string;
    course: string;
  }[];
  createdAt: string;
  __v: number;
}

// -------- Order --------
export interface Order {
  _id: string;
  paymentStatus: string;
  paymentId: Payment | string;
  className: string;
  amount: number;
  courseType: string;
  course: Course;
  user: User;
  createdAt: string;
  __v: number;
  dueAmount: number;
  paymentMode: string;
  razorpayOrderId: string;
  dueAmountTrack: DueAmountTrack[];
}

interface DueAmountTrack {
  _id: string
  amount: number;
  submitted: string;
}

// -------- Pagination --------
export interface Pagination {
  total: number;
  page: number;
  limit: number;
}

// -------- State --------
interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  pagination: Pagination;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  success: false,
  orders: [],
  order: null,
  pagination: { total: 0, page: 1, limit: 10 },
};

interface updateOrderPayload {
  paidAmount: string;
}

// Utility to handle Axios errors
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};


// -------- Thunks --------

// Get all orders (with optional query string)
export const getAllOrders = createAsyncThunk<
  { data: Order[]; pagination: Pagination },
  string | undefined,
  { rejectValue: string }
>("order/getAll", async (query, { rejectWithValue }) => {
  try {
    const url = query ? `/api/orders?${query}` : `/api/orders`;
    const response = await axiosInstance.get<{ data: Order[]; pagination: Pagination }>(url);
    return response.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, "Fetching failed"));
  }
});

// Get order by ID
export const getOrderById = createAsyncThunk<Order, string, { rejectValue: string }>(
  "order/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<{ data: Order }>(`/api/orders/${id}`);
      return res.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, "Fetch failed"));
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (
    { id, orderData }: { id: string; orderData: updateOrderPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/api/orders/${id}`, orderData);
      toast.success("Student Updation Successful ");
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Course update failed'));
    }
  }
);

// -------- Slice --------
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // GET BY ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export default orderSlice.reducer;
