import { createSlice } from "@reduxjs/toolkit";
import { User } from "./usersSlice";

export type PostsStatus = "idle" | "loading" | "succeeded" | "failed";

interface Comment {
  id: number;
  content: string;
}

interface Like {
  id: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  likes: Like[];
}

export interface PostsState {
  currentPost: Post | null;
  userPosts: Post[];
  status: PostsStatus;
  error: string | null;
}

export const initialState: PostsState = {
  currentPost: null,
  userPosts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentPost: (state, action: { payload: Post | null }) => {
      state.currentPost = action.payload;
    },
    setUserPosts: (state, action: { payload: Post[] }) => {
      state.userPosts = action.payload;
    },
    setStatus: (state, action: { payload: PostsStatus }) => {
      state.status = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
    resetPostState: (state) => {
      state.currentPost = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setUserPosts,
  setCurrentPost,
  setStatus,
  setError,
  resetPostState,
} = postsSlice.actions;

export const selectCurrentPost = (state: { posts: PostsState }) =>
  state.posts.currentPost;
export const selectPostStatus = (state: { posts: PostsState }) =>
  state.posts.status;
export const selectPostError = (state: { posts: PostsState }) =>
  state.posts.error;
export const selectUserPosts = (state: { posts: PostsState }) =>
  state.posts.userPosts;

export default postsSlice.reducer;
