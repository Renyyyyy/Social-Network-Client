import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./usersSlice";

export type PostsStatus = "idle" | "loading" | "succeeded" | "failed";

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  user: {
    id: number;
    nickname: string;
  };
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
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
  feedsPosts: Post[];
  status: PostsStatus;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const initialState: PostsState = {
  currentPost: null,
  userPosts: [],
  feedsPosts: [],
  status: "idle",
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  },
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
    setFeedPosts: (state, action: { payload: Post[] }) => {
      state.feedsPosts = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{
        currentPage: number;
        totalPages: number;
        totalItems: number;
      }>
    ) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
    addLikeToPost: (
      state,
      action: { payload: { postId: number; like: Like } }
    ) => {
      const { postId, like } = action.payload;
      const post = state.userPosts.find((p) => p.id === postId);
      if (post) {
        post.likes.push(like);
      }

      const feedPost = state.feedsPosts.find((p) => p.id === postId);
      if (feedPost) {
        feedPost.likes.push(like);
      }
    },
    removeLikeFromPost: (
      state,
      action: { payload: { postId: number; likeId: number } }
    ) => {
      const { postId, likeId } = action.payload;
      const post = state.userPosts.find((p) => p.id === postId);
      if (post) {
        post.likes = post.likes.filter((l) => l.id !== likeId);
      }

      const feedPost = state.feedsPosts.find((p) => p.id === postId);
      if (feedPost) {
        feedPost.likes = feedPost.likes.filter((l) => l.id !== likeId);
      }
    },
    addCommentToPost: (
      state,
      action: { payload: { postId: number; comment: Comment } }
    ) => {
      const { postId, comment } = action.payload;
      const post = state.userPosts.find((p) => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }

      const feedPost = state.feedsPosts.find((p) => p.id === postId);
      if (feedPost) {
        feedPost.comments.push(comment);
      }
    },
    updateCommentInPost: (
      state,
      action: {
        payload: { postId: number; commentId: number; content: string };
      }
    ) => {
      const { postId, commentId, content } = action.payload;
      const post = state.userPosts.find((p) => p.id === postId);
      if (post) {
        const comment = post.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.content = content;
        }
      }

      const feedPost = state.feedsPosts.find((p) => p.id === postId);
      if (feedPost) {
        const comment = feedPost.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.content = content;
        }
      }
    },
    removeCommentFromPost: (
      state,
      action: { payload: { postId: number; commentId: number } }
    ) => {
      const { postId, commentId } = action.payload;
      const post = state.userPosts.find((p) => p.id === postId);
      if (post) {
        post.comments = post.comments.filter((c) => c.id !== commentId);
      }

      const feedPost = state.feedsPosts.find((p) => p.id === postId);
      if (feedPost) {
        feedPost.comments = feedPost.comments.filter((c) => c.id !== commentId);
      }
    },
    resetPostState: (state) => {
      state.currentPost = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setPagination,
  setFeedPosts,
  setUserPosts,
  setCurrentPost,
  setStatus,
  setError,
  resetPostState,
  addLikeToPost,
  removeLikeFromPost,
  addCommentToPost,
  updateCommentInPost,
  removeCommentFromPost,
} = postsSlice.actions;

export const selectCurrentPost = (state: { posts: PostsState }) =>
  state.posts.currentPost;
export const selectPostStatus = (state: { posts: PostsState }) =>
  state.posts.status;
export const selectPostError = (state: { posts: PostsState }) =>
  state.posts.error;
export const selectUserPosts = (state: { posts: PostsState }) =>
  state.posts.userPosts;
export const selectNewsFeed = (state: { posts: PostsState }) =>
  state.posts.feedsPosts;

export default postsSlice.reducer;
