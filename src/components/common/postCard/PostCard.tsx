import React, { useState } from "react";
import Card from "../card/Card";
import "./PostCard.css";
import { Post } from "../../../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectAuthUser } from "../../../store/slices/authSlice";
import { toggleLike } from "../../../store/thunks/thunksLike";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../../store/thunks/thunksComment";
import CommentCard from "../commentCard/CommentCard";

interface PostCardProps {
  post: Post;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onDelete,
  isOwner = false,
}) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const likeStatus = useAppSelector((state) => state.likes?.status || "idle");
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isProcessingComment, setIsProcessingComment] = useState(false);

  const hasUserLike = post.likes.some(
    (like) => "userId" in like && like.userId === authUser?.id
  );

  const isProcessingLike = likeStatus === "loading";

  const handleLike = () => {
    if (!isProcessingLike && authUser) {
      dispatch(toggleLike(post.id));
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() && authUser) {
      setIsProcessingComment(true);
      try {
        await dispatch(
          createComment({
            postId: post.id,
            content: newComment,
          })
        ).unwrap();
        setNewComment("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      } finally {
        setIsProcessingComment(false);
      }
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    if (authUser) {
      try {
        await dispatch(
          updateComment({
            commentId,
            content: newContent,
            postId: post.id,
          })
        ).unwrap();
      } catch (error) {
        console.error("Failed to update comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (authUser) {
      try {
        await dispatch(deleteComment(commentId)).unwrap();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  return (
    <Card className="post-card">
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">{post.author.nickname.charAt(0)}</div>
          <div>
            <div className="author-nickname">{post.author.nickname}</div>
          </div>
        </div>

        {isOwner && (
          <div className="post-actions">
            <button
              className="action-btn edit-btn"
              onClick={onEdit}
              aria-label="Edit post"
            >
              ✏️
            </button>
            <button
              className="action-btn delete-btn"
              onClick={onDelete}
              aria-label="Delete post"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <h3 className="post-title">{post.title}</h3>

      <div className="post-content">{post.content}</div>

      <div className="post-stats">
        <div
          className="stat-item"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="stat-icon">💬</span>
          <span className="stat-count">{post.comments.length}</span>
        </div>
        <div className="stat-item">
          <button
            className={`like-button ${hasUserLike ? "liked" : ""}`}
            onClick={handleLike}
            disabled={isProcessingLike}
            aria-label={hasUserLike ? "Unlike" : "Like"}
          >
            <span className="stat-icon">👍</span>
          </button>
          <span className="stat-count">{post.likes.length}</span>
        </div>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                postAuthorId={post.author.id}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>

          {authUser && (
            <div className="new-comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={2}
              />
              <button
                onClick={handleAddComment}
                disabled={isProcessingComment || !newComment.trim()}
                className="send-comment-btn"
              >
                {isProcessingComment ? "Posting..." : "Post Comment"}
              </button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
