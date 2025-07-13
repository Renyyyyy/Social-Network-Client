import { createAppAsyncThunk } from "../store";
import { api } from "../../api/api";
import { addLikeToPost, removeLikeFromPost } from "../slices/postsSlice";
import { Like } from "../slices/postsSlice";
import { setError, setStatus } from "../slices/likeSlice";

export const toggleLike = createAppAsyncThunk(
  "likes/toggle",
  async (postId: number, { dispatch, getState }) => {
    dispatch(setStatus("loading"));
    try {
      const state = getState();
      const currentUser = state.auth.user;
      if (!currentUser) throw new Error("User not authenticated");

      const post =
        state.posts.userPosts.find((p) => p.id === postId) ||
        state.posts.feedsPosts.find((p) => p.id === postId) ||
        (state.posts.currentPost?.id === postId
          ? state.posts.currentPost
          : null);

      if (!post) throw new Error("Post not found");

      const userLike = post.likes.find(
        (like) => like.userId === currentUser.id
      );

      if (userLike) {
        await api.delete(`/likes/${userLike.id}`);
        dispatch(
          removeLikeFromPost({
            postId,
            likeId: userLike.id,
          })
        );
      } else {
        const response = await api.post<Like>("/likes", { postId });
        dispatch(
          addLikeToPost({
            postId,
            like: response.data,
          })
        );
      }

      dispatch(setStatus("succeeded"));
      return postId;
    } catch (error: any) {
      dispatch(setStatus("failed"));
      const message = error.response?.data?.message || error.message;
      dispatch(setError(message));
      throw error;
    }
  }
);
