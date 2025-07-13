import { api } from "../../api/api";
import { createAppAsyncThunk } from "../store";
import {
  Post,
  setCurrentPost,
  setError,
  setFeedPosts,
  setStatus,
  setUserPosts,
} from "../slices/postsSlice";
import { User } from "../slices/usersSlice";

export const createPost = createAppAsyncThunk(
  "posts/create",
  async (postData: Omit<Post, "id">, { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      const response = await api.post<Post>("/posts", {
        title: postData.title,
        content: postData.content,
      });
      dispatch(setStatus("succeeded"));
      return response.data;
    } catch (error: any) {
      dispatch(setStatus("failed"));
      dispatch(setError(error.message || "Failed to create post"));
      throw error;
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
      dispatch(setError("Failed to update post"));
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
      dispatch(setError("Failed to delete post"));
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
      dispatch(setError("Failed to fetch post"));
    }
  }
);

export const fetchUserPosts = createAppAsyncThunk(
  "posts/fetchUserPosts",
  async (userId: number, { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      const response = await api.get<Post[]>(`/posts/user/${userId}`);
      dispatch(setUserPosts(response.data));
      dispatch(setStatus("succeeded"));
      return response.data;
    } catch (error: any) {
      dispatch(setStatus("failed"));
      dispatch(setError("Failed to fetch user posts"));
      throw error;
    }
  }
);

export const fetchFollowersPosts = createAppAsyncThunk(
  "posts/fetchFollowersPosts",
  async (following: User[], { dispatch }) => {
    dispatch(setStatus("loading"));
    try {
      const postsArrays = await Promise.all(
        following.map((user) =>
          api.get<Post[]>(`/posts/user/${user.id}`).then((res) => res.data)
        )
      );

      const allPosts = postsArrays.flat();
      allPosts.sort((a, b) => b.id - a.id);

      dispatch(setFeedPosts(allPosts));
      dispatch(setStatus("succeeded"));
    } catch (err) {
      dispatch(setError("Failed to load posts from followed users"));
      dispatch(setStatus("failed"));
    }
  }
);
