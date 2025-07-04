import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export type ProfileStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface ProfileData {
  id: number;
  nickname: string;
  about: string;
  userId: number;
}

interface ProfileState {
  profile: ProfileData | null;
  status: ProfileStatus;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profile/${userId}`);
      return {
        id: response.data.id,
        nickname: response.data.user.nickname,
        about: response.data.about,
        userId: response.data.userId
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ about }: { about: string }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/profile`, { about });
      return {
        id: response.data.id,
        nickname: response.data.user.nickname,
        about: response.data.about,
        userId: response.data.userId
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;