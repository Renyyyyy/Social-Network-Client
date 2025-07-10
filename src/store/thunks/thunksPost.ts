import { api } from "../../api/api";
import { createAppAsyncThunk } from "../store";
import {
  Post,
  setCurrentPost,
  setError,
  setStatus,
} from "../slices/postsSlice";

export const createPost = createAppAsyncThunk(
  "posts/create",
  async ({ title, content, author }: Post, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.post<{ post: Post }>(`/posts`, {
        title,
        content,
        author,
      });
      const post = response.data.post;
      dispatch(setCurrentPost(post));
      dispatch(setStatus("succeeded"));
    } catch (error: unknown) {
      dispatch(setStatus("failed"));
      dispatch(setError("Login error"));
    }
  }
);

export const updatePost = createAppAsyncThunk(
  "posts/update",
  async ({ title, content, id }: Post, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.put<{ post: Post }>(`/posts`, {
        title,
        content,
        id,
      });
      dispatch(setStatus("succeeded"));
      const post = response.data.post;
      dispatch(setCurrentPost(post));
    } catch (error: unknown) {
      dispatch(setStatus("failed"));
      dispatch(setError("Login error"));
    }
  }
);

export const deletePost = createAppAsyncThunk(
  "posts/delete",
  async ({ id }: Post, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      await api.delete(`/posts/${id}`);
      dispatch(setStatus("succeeded"));
    } catch (error: unknown) {
      dispatch(setStatus("failed"));
      dispatch(setError("Login error"));
    }
  }
);

export const fetchPostById = createAppAsyncThunk(
  "posts/fetchById",
  async ({ id }: Post, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.get(`/posts/${id}`);
      const post = response.data.post;
      dispatch(setCurrentPost(post));
      dispatch(setStatus("succeeded"));
    } catch (error: unknown) {
      dispatch(setStatus("failed"));
      dispatch(setError("Login error"));
    }
  }
);
