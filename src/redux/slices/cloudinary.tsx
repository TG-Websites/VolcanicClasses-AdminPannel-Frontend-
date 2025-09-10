// redux/slices/cloudinary.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadImage = createAsyncThunk<{ url: string, key: string }, { file: File, key: string }>(
  'cloudinary/uploadImage',
  async (fileWithKey: { file: File, key: string }, thunkAPI) => {
    const formData = new FormData();
    formData.append('file', fileWithKey.file);
    formData.append('upload_preset', 'unsigned_upload'); // replace with your actual preset

    const response = await fetch('https://api.cloudinary.com/v1_1/djjoxhbmr/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.secure_url) {
      return thunkAPI.rejectWithValue(data.error?.message || 'Upload failed');
    }

    return { url: data.secure_url, key: fileWithKey.key };
  }
);

interface CloudinaryState {
  url: string | null;
  key: string | null,
  uploading: boolean;
  error: string | null;
}

const initialState: CloudinaryState = {
  url: null,
  key: null,
  uploading: false,
  error: null,
};

const cloudinary = createSlice({
  name: 'cloudinary',
  initialState,
  reducers: {
    resetImageState: (state) => {
      state.url = null;
      state.uploading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.url = action.payload.url;
        state.key = action.payload.key;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetImageState } = cloudinary.actions;
export default cloudinary.reducer;
