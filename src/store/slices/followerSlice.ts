import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./usersSlice";

type FollowerStatus = "idle" | "loading" | "succeeded" | "failed";

interface FollowerState {
  followers: User[]; // кто подписан на меня
  following: User[]; // на кого подписан я
  status: FollowerStatus;
  error: string | null;
}

const initialState: FollowerState = {
  followers: [],
  following: [],
  status: "idle",
  error: null,
};

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {
    setFollowers: (state, action: PayloadAction<User[]>) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action: PayloadAction<User[]>) => {
      state.following = action.payload;
    },
    addFollowing: (state, action: PayloadAction<User>) => {
      if (!state.following.some((user) => user.id === action.payload.id)) {
        state.following.push(action.payload);
      }
    },
    removeFollowing: (state, action: PayloadAction<number>) => {
      state.following = state.following.filter(
        (user) => user.id !== action.payload
      );
    },
    addFollower: (state, action: PayloadAction<User>) => {
      if (!state.followers.some((user) => user.id === action.payload.id)) {
        state.followers.push(action.payload);
      }
    },
    removeFollower: (state, action: PayloadAction<number>) => {
      state.followers = state.followers.filter(
        (user) => user.id !== action.payload
      );
    },
    setStatus: (state, action: PayloadAction<FollowerStatus>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetFollowerState: () => initialState,
  },
});

export const {
  setFollowers,
  setFollowing,
  addFollowing,
  removeFollowing,
  addFollower,
  removeFollower,
  setStatus,
  setError,
  resetFollowerState,
} = followerSlice.actions;

export const selectFollowers = (state: { follower: FollowerState }) =>
  state.follower.followers;
export const selectFollowing = (state: { follower: FollowerState }) =>
  state.follower.following;
export const selectFollowerStatus = (state: { follower: FollowerState }) =>
  state.follower.status;
export const selectFollowerError = (state: { follower: FollowerState }) =>
  state.follower.error;

export default followerSlice.reducer;
