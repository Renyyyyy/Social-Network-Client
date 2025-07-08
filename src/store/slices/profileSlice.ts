import { createSlice } from "@reduxjs/toolkit";
import { User } from "./usersSlice";

export type ProfileStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProfileData {
  id: number;
  user: User;
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
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: { payload: ProfileData }) => {
      state.profile = action.payload;
    },
    setStatus: (state, action: { payload: ProfileStatus }) => {
      state.status = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setProfile, setError } = profileSlice.actions;

export const selectProfileStatus = (state: { profile: ProfileState }) => state.profile.status;
export const selectProfileError = (state: { profile: ProfileState }) => state.profile.error;
export const selectProfile = (state: { profile: ProfileState }) => state.profile.profile;

export default profileSlice.reducer;
