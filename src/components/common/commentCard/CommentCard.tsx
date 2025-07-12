import React, { useState } from "react";
import { Comment } from "../../../store/slices/postsSlice";
import { useAppSelector } from "../../../store/hooks";
import { selectAuthUser } from "../../../store/slices/authSlice";

interface CommentCardProps {
  comment: Comment;
  postAuthorId: number;
  onEdit: (commentId: number, newContent: string) => void;
  onDelete: (commentId: number) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  postAuthorId,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const authUser = useAppSelector(selectAuthUser);

  const isCommentOwner = authUser?.id === comment.userId;
  const isPostOwner = authUser?.id === postAuthorId;
  const canEditOrDelete = isCommentOwner || isPostOwner;

  const handleSave = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-author-avatar">
          {comment.user.nickname.charAt(0)}
        </div>
        <div className="comment-author-name">{comment.user.nickname}</div>
      </div>

      {isEditing ? (
        <div className="comment-edit-form">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={3}
          />
          <div className="comment-edit-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}

      {canEditOrDelete && !isEditing && (
        <div className="comment-actions">
          {isCommentOwner && (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
          )}
          <button onClick={() => onDelete(comment.id)} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
