import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// -------- TYPES --------
export interface UserPayload {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'manager' | 'telecaller' | 'user';
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'manager' | 'telecaller' | 'user';
  mobileNumber:string;
  createdAt:string
}

interface UserState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
  pagination:Pagination
}

interface Pagination {
  total: number;   
  page: number;   
  limit: number;   
}

// -------- INITIAL STATE --------
const initialState: UserState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  success: false,
  pagination: { total: 0, page: 1, limit: 10 },
};

// -------- ERROR HANDLER --------
const handleAxiosError = (err: unknown, defaultMsg: string) =>
  axios.isAxiosError(err) ? err.response?.data?.message || defaultMsg : defaultMsg;

// -------- ASYNC THUNKS --------
export const createUser = createAsyncThunk<User, UserPayload, { rejectValue: string }>(
  'user/create',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<User>('/api/users', values);
      return data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err, 'Create failed'));
    }
  }
);

// users.ts (slice)
export const getAllUsers = createAsyncThunk<
  { data: User[]; pagination: Pagination },  // response type
  string | undefined,                        // query string
  { rejectValue: string }
>("user/getAllUsers", async (query, { rejectWithValue }) => {
  try {
    const url = query ? `/api/users?${query}` : "/api/users";
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, "Failed to fetch users");
    return rejectWithValue(msg);
  }
});


export const getUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  'user/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<{ data: User }>(`/api/users/${id}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err, 'Fetch failed'));
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  { id: string; formData: UserPayload },
  { rejectValue: string }
>('user/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<User>(`/api/users/${id}`, formData);
    return data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Update failed'));
  }
});

export const deleteUser = createAsyncThunk<{ message: string }, string, { rejectValue: string }>(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete<{ message: string }>(`/api/users/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err, 'Delete failed'));
    }
  }
);

// -------- SLICE --------
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state: UserState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    };

    const rejected = (state: UserState, action: { payload?: string }) => {
      state.loading = false;
      state.error = action.payload || null;
    };

    builder
      // CREATE
      .addCase(createUser.pending, pending)
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, rejected)

      // GET ALL USERS
      .addCase(getAllUsers.pending, pending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllUsers.rejected, rejected)

      // GET BY ID
      .addCase(getUserById.pending, pending)
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, rejected)

      // UPDATE
      .addCase(updateUser.pending, pending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, rejected)

      // DELETE
      .addCase(deleteUser.pending, pending)
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.user = null;
      })
      .addCase(deleteUser.rejected, rejected);
  },
});

export default userSlice.reducer;
