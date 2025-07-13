import { createAppAsyncThunk } from "../store";
import { api } from "../../api/api";
import { User } from "../slices/usersSlice";
import {
  addFollowing,
  removeFollowing,
  setError,
  setFollowers,
  setFollowing,
  setStatus,
} from "../slices/followerSlice";

export const fetchFollowers = createAppAsyncThunk(
  "follower/fetchFollowers",
  async (userId: number, { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      const response = await api.get<User[]>(`/followers/${userId}/followers`);
      dispatch(setFollowers(response.data));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(setError("Failed to fetch followers"));
      dispatch(setStatus("failed"));
    }
  }
);

export const fetchFollowing = createAppAsyncThunk(
  "follower/fetchFollowing",
  async (userId: number, { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      const response = await api.get<User[]>(`/followers/${userId}/following`);
      console.log(response);
      dispatch(setFollowing(response.data));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(setError("Failed to fetch following"));
      dispatch(setStatus("failed"));
    }
  }
);

export const followUser = createAppAsyncThunk(
  "follower/followUser",
  async (followerId: number, { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      const response = await api.post<User>(`/followers`, { followerId });
      dispatch(addFollowing(response.data));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(setError("Failed to follow user"));
      dispatch(setStatus("failed"));
      throw error;
    }
  }
);

export const unfollowUser = createAppAsyncThunk(
  "follower/unfollowUser",
  async (followerId: number, { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      await api.delete(`/followers/${followerId}`);
      dispatch(removeFollowing(followerId));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(setError("Failed to unfollow user"));
      dispatch(setStatus("failed"));
      throw error;
    }
  }
);
