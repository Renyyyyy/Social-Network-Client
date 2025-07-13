// NewsFeed.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchFollowing } from "../../../store/thunks/thunksFollower";
import { selectFollowing } from "../../../store/slices/followerSlice";
import { selectAuthUser } from "../../../store/slices/authSlice";
import {
  selectPostStatus,
  selectPostError,
  selectNewsFeed,
} from "../../../store/slices/postsSlice";
import "./NewsFeed.css";
import { fetchFollowersPosts } from "../../../store/thunks/thunksPost";
import PostCard from "../../common/postCard/PostCard";

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const following = useAppSelector(selectFollowing);
  const newsFeed = useAppSelector(selectNewsFeed);
  const status = useAppSelector(selectPostStatus);
  const error = useAppSelector(selectPostError);

  useEffect(() => {
    if (authUser) {
      const loadData = async () => {
        try {
          await dispatch(fetchFollowing(authUser.id)).unwrap();
          if (following.length > 0) {
            await dispatch(fetchFollowersPosts(following)).unwrap();
          }
        } catch (err) {
          console.error("Failed to load news feed:", err);
        }
      };
      loadData();
    }
  }, [authUser, dispatch]);

  useEffect(() => {
    if (authUser && following.length > 0) {
      dispatch(fetchFollowersPosts(following));
    }
  }, [following, authUser, dispatch]);

  if (!authUser) {
    return (
      <div className="auth-warning">Please log in to see the news feed</div>
    );
  }

  if (status === "loading") {
    return <div className="loading">Loading news feed...</div>;
  }

  if (status === "failed") {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="news-feed">
      <h2 className="feed-title">Your News Feed</h2>

      {newsFeed.length === 0 ? (
        <p className="no-posts">
          {following.length === 0
            ? "You're not following anyone yet"
            : "No posts from followed users yet"}
        </p>
      ) : (
        <div className="posts-container">
          {newsFeed.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
