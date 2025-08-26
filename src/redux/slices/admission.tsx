import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import { RootState } from "../store";

// Common error handler
const handleAxiosError = (err: unknown, defaultMsg: string): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Inquiry structure
export interface Inquire {
  _id: string;
  name: string;
  phone: number;
  email: string;
  courseInterest: {
    _id: string;
    title: string;
  };
  message: string;
  status: 'pending' | 'contacted' | 'converted' | 'lost';
  createdAt: string;
  updatedAt: string;
  followUpNote?: string;
  followUps?: FollowUp[];
}

export interface FollowUp {
  _id: string;
  note: string;
  addedBy: {
    _id: string;
    name: string;
  };
  date: string; // ISO date string
}

// Admission form payload
interface AdmissionFormPayload {
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string;
  status: 'pending' | 'contacted' | 'converted' | 'lost';
}

// Pagination interface
interface Pagination {
  total: number;
  page: number;
  limit: number;
}

// State interface
interface AdmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  inquiries: Inquire[];
  selectedInquiry: Inquire | null; // ✅ new
  pagination: Pagination;
  statusCounts: {
    total: number;
    pending: number;
    contacted: number;
    converted: number;
    lost: number;
  };
}

// Initial state
const initialState: AdmissionState = {
  loading: false,
  success: false,
  error: null,
  inquiries: [],
  selectedInquiry: null,
  pagination: { total: 0, page: 1, limit: 10 },
  statusCounts: { total: 0, pending: 0, contacted: 0, converted: 0, lost: 0 },
};

// ======================= THUNKS ==========================

// Create admission inquiry
export const createAdmissionInquiries = createAsyncThunk<
  void,
  AdmissionFormPayload,
  { rejectValue: string }
>('admission/submitForm', async (formData, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/api/admissions/inquiries', formData);
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Submission failed'));
  }
});

// Get all inquiries
export const getAllInQuiries = createAsyncThunk<
  { data: Inquire[]; pagination: Pagination },
  string | undefined,
  { rejectValue: string }
>('admission/getAllInquires', async (query, { rejectWithValue }) => {
  try {
    const url = query
      ? `/api/admissions/inquiries?${query}`
      : `/api/admissions/inquiries`;

    const response = await axiosInstance.get<{
      data: Inquire[];
      pagination: Pagination;
    }>(url);

    return response.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Fetching failed'));
  }
});

// Get inquiry by ID
export const getInquiryById = createAsyncThunk<
  Inquire,
  string,
  { rejectValue: string }
>('admission/getInquiryById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<{ data: Inquire }>(
      `/api/admissions/inquiries/${id}`
    );
    return response.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Fetching inquiry failed'));
  }
});

// Update inquiry
interface UpdateInquiryPayload {
  id: string;
  updates: Partial<AdmissionFormPayload>;
}

export const updateInquiry = createAsyncThunk<
  Inquire,
  UpdateInquiryPayload,
  { rejectValue: string }
>('admission/updateInquiry', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put<{ data: Inquire }>(
      `/api/admissions/inquiries/${id}`,
      updates
    );
    return response.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Update failed'));
  }
});

// ======================= SLICE ==========================
const admissionSlice = createSlice({
  name: 'admission',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
    clearSelectedInquiry(state) {
      state.selectedInquiry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Inquiry
      .addCase(createAdmissionInquiries.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAdmissionInquiries.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        createAdmissionInquiries.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )

      // Get All Inquiries
      .addCase(getAllInQuiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInQuiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload.data;
        state.pagination = action.payload.pagination;

        // 🔥 Calculate status counts
        const counts = {
          total: action.payload.data.length,
          pending: 0,
          contacted: 0,
          converted: 0,
          lost: 0,
        };

        action.payload.data.forEach((inq) => {
          if (inq.status === "pending") counts.pending++;
          if (inq.status === "contacted") counts.contacted++;
          if (inq.status === "converted") counts.converted++;
          if (inq.status === "lost") counts.lost++;
        });

        state.statusCounts = counts;
      })
      .addCase(
        getAllInQuiries.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )

      // Get Inquiry by ID
      .addCase(getInquiryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInquiryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInquiry = action.payload; // ✅ store in selectedInquiry
      })
      .addCase(
        getInquiryById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )

      // Update Inquiry
      .addCase(updateInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // ✅ update inquiries list
        const index = state.inquiries.findIndex(
          (inq) => inq._id === action.payload._id
        );
        if (index !== -1) {
          state.inquiries[index] = action.payload;
        }

        // ✅ update selected inquiry if it's the same one
        if (state.selectedInquiry?._id === action.payload._id) {
          state.selectedInquiry = action.payload;
        }
      })
      .addCase(
        updateInquiry.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );
  },
});

export const selectStatusCounts = (state: RootState) =>
  state.admission.statusCounts;

export const { resetSuccess, clearSelectedInquiry } = admissionSlice.actions;
export default admissionSlice.reducer;
