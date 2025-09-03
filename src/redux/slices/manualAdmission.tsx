import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// Common error handler
const handleAxiosError = (err: unknown, defaultMsg: string): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Admission form payload
interface AdmissionFormPayload {
  studentName: string;
  email: string;
  mobileNumber: string;
  courseId: string;
  mode: string;      // assuming only these two modes
  paymentMode: "offline"; // assuming only these two
  paidAmount: number;
  className: string;
}


// State interface
interface AdmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

// Initial state
const initialState: AdmissionState = {
  loading: false,
  success: false,
  error: null,
};

// ======================= THUNKS ==========================

// Create admission inquiry
export const createManualAdmission = createAsyncThunk<
  void,
  AdmissionFormPayload,
  { rejectValue: string }
>('admission/submitForm', async (formData, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/api/orders', formData);
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Submission failed'));
  }
});





// ======================= SLICE ==========================
const manualAdmissionSlice = createSlice({
  name: 'manualAdmission',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Inquiry
      .addCase(createManualAdmission.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createManualAdmission.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        createManualAdmission.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )

  },
});


export default manualAdmissionSlice.reducer;
