import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// -------- TYPES --------
export interface Payment {
  _id: string;
  currency: string;
  status: string;
  order: {
    paymentId: string
    razorpayOrderId: string
    _id: string
  };
  transactionId: string;
  amount: number;
  method: string;
  paidAt: string;
  __v?: number;
}

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface PaymentState {
  payments: Payment[];
  payment: Payment | null;
  pagination: Pagination; // 👈 added
  loading: boolean;
  error: string | null;
  success: boolean;
}

// -------- INITIAL STATE --------
const initialState: PaymentState = {
  loading: false,
  error: null,
  success: false,
  payments: [],
  payment: null,
  pagination: { total: 0, page: 1, limit: 10 },
};

// Utility to handle Axios errors
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// -------- ASYNC THUNKS --------

// Get all payments (with pagination + query)
export const getAllPayments = createAsyncThunk<
  { data: Payment[]; pagination: Pagination }, // return type
  string | undefined,                           // arg: query string
  { rejectValue: string }
>(
  'payments/getAll',
  async (query, { rejectWithValue }) => {
    try {
      const url = query ? `/api/payments?${query}` : `/api/payments`;
      const res = await axiosInstance.get<{ data: Payment[]; pagination: Pagination }>(url);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch payments'));
    }
  }
);

// Get payment by ID
export const getPaymentById = createAsyncThunk<
  Payment,
  string,
  { rejectValue: string }
>(
  'payments/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<{ data: Payment }>(`/api/payments/${id}`);
      return res.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Fetch failed'));
    }
  }
);

// -------- SLICE --------
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data;
        state.pagination = action.payload.pagination; // 👈 store pagination
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // GET BY ID
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export default paymentSlice.reducer;
