// redux/slices/cloudinary.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadImage = createAsyncThunk<string, File>(
  'cloudinary/uploadImage',
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload'); // replace with your actual preset

    const response = await fetch('https://api.cloudinary.com/v1_1/djjoxhbmr/image/upload', {
      method: 'POST',
      body: formData,
    });
    console.log("imageurl",response.url)

    const data = await response.json();

    if (!response.ok || !data.secure_url) {
      return thunkAPI.rejectWithValue(data.error?.message || 'Upload failed');
    }

    return data.secure_url;
  }
);

interface CloudinaryState {
  url: string | null;
  uploading: boolean;
  error: string | null;
}

const initialState: CloudinaryState = {
  url: null,
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
        state.url = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetImageState } = cloudinary.actions;
export default cloudinary.reducer;
