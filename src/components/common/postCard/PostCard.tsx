import React from "react";
import Card from "../card/Card";
import "./PostCard.css";
import { Post } from "../../../store/slices/postsSlice";

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
            <button className="action-btn edit-btn" onClick={onEdit}>
              ✏️
            </button>
            <button className="action-btn delete-btn" onClick={onDelete}>
              🗑️
            </button>
          </div>
        )}
      </div>

      <h3 className="post-title">{post.title}</h3>

      <div className="post-content">{post.content}</div>

      <div className="post-stats">
        <div className="stat-item">
          <span className="stat-icon">💬</span>
          <span className="stat-count">{post.comments.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">👍</span>
          <span className="stat-count">{post.likes.length}</span>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
