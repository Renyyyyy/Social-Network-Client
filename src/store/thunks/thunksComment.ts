import { createAppAsyncThunk } from "../store";
import { api } from "../../api/api";
import {
  addCommentToPost,
  updateCommentInPost,
  removeCommentFromPost,
} from "../slices/postsSlice";
import { Comment } from "../slices/postsSlice";

export const createComment = createAppAsyncThunk(
  "comments/create",
  async (
    { postId, content }: { postId: number; content: string },
    { dispatch }
  ) => {
    try {
      const response = await api.post<Comment>("/comments", {
        postId,
        content,
      });
      dispatch(
        addCommentToPost({
          postId,
          comment: response.data,
        })
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
);

export const updateComment = createAppAsyncThunk(
  "comments/update",
  async (
    {
      commentId,
      content,
      postId,
    }: { commentId: number; content: string; postId: number },
    { dispatch }
  ) => {
    try {
      await api.put(`/comments`, { id: commentId, content });
      dispatch(
        updateCommentInPost({
          postId,
          commentId,
          content,
        })
      );
    } catch (error: any) {
      throw error;
    }
  }
);

export const deleteComment = createAppAsyncThunk(
  "comments/delete",
  async (commentId: number, { dispatch, getState }) => {
    try {
      await api.delete(`/comments/${commentId}`);

      const state = getState();
      const post =
        state.posts.userPosts.find((p) =>
          p.comments.some((c) => c.id === commentId)
        ) ||
        state.posts.feedsPosts.find((p) =>
          p.comments.some((c) => c.id === commentId)
        ) ||
        (state.posts.currentPost?.comments.some((c) => c.id === commentId)
          ? state.posts.currentPost
          : null);

      if (post) {
        dispatch(
          removeCommentFromPost({
            postId: post.id,
            commentId,
          })
        );
      }
    } catch (error: any) {
      throw error;
    }
  }
);
