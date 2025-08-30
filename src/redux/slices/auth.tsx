import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

interface LoginPayload {
  email: string;
  password: string;
}

interface StudentLoginPayload {
  email: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface Course {
  _id: string;
  course: string;        
  paymentStatus: string;
}

interface User {
  email: string;
  courses:Course[]
  name: string;
  role: string;
}

export interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
  isLogin: boolean;
  isStudentLogin: boolean;
}

const initialState: AuthState = {
  email: '',
  password: '',
  loading: true,
  error: null,
  token: null,
  user: null,
  isLogin: false,
  isStudentLogin: false,
};

interface ApiResponse {
  success: boolean;
  message: string;
}

// ✅ Reusable error handler
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

export const login = createAsyncThunk<
  { token: string; email: string },
  LoginPayload,
  { rejectValue: string }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    localStorage.setItem('token', response.data.data.token);
    return response.data.data;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'Login failed'));
  }
});

export const Studentlogin = createAsyncThunk<
  ApiResponse,                // success return type
  StudentLoginPayload,        // argument type
  { rejectValue: string }     // rejected payload type
>(
  "auth/studentLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        "/api/student/login",
        credentials
      );
      return response.data; // success response
    } catch (err: unknown) {
      // handleAxiosError should return a string message
      return rejectWithValue(handleAxiosError(err, "Student login failed"));
    }
  }
);

export const verifyOtp = createAsyncThunk<
  { token: string; email: string ;user:User},
  VerifyOtpPayload,
  { rejectValue: string }
>('auth/verifyStudentOtp', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/student/verify-otp', data);
    // suppose response = { token, email }
    localStorage.setItem('token', response.data.data.token);
    return response.data;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'OTP verification failed'));
  }
});


export const gotme = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/gotme', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data.data;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'Fetch user failed'));
  }
});

export const logoutUser = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('studentEmail');
    return response.data.message;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'Logout failed'));
  }
});

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout(state) {
      state.email = '';
      state.password = '';
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Normal login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; email: string }>) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isLogin = true;
        state.isStudentLogin = false; 

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      // Student login
      .addCase(Studentlogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Studentlogin.fulfilled, (state) => {
        state.loading = false;
        state.isLogin = true;
      })
      .addCase(Studentlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      // Step 2: Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ token: string; email: string ;user:User}>) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user = action.payload.user;
        state.isStudentLogin=true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      // gotme
      .addCase(gotme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(gotme.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isStudentLogin = true;
      state.isLogin = true;
      state.loading = false;
    })
    .addCase(gotme.rejected, (state) => {
      state.isLogin = false;
      state.user = null;
      state.loading = false;
    })

    // logout
    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.isLogin = false;
      state.isStudentLogin = false; // ✅ reset
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Unknown error';
    });
}
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
