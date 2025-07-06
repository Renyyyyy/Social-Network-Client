import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { createAppAsyncThunk } from '../store';

export type ProfileStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProfileData {
  id: number;
  nickname: string;
  about: string;
  userId: number;
}

export interface ProfileState {
  profile: ProfileData | null;
  status: ProfileStatus;
  error: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
      setProfile: (state, action: {payload: ProfileData}) => {
        state.profile = action.payload;
      },
      setStatus: (state, action: {payload: ProfileStatus}) => {
        state.status = action.payload;
      },
      setError: (state, action: {payload: string}) => {
       state.error = action.payload;
      },
  },
});

export const { setStatus, setProfile, setError} = profileSlice.actions;
export default profileSlice.reducer;