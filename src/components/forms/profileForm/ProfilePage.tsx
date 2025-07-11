import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../common/card/Card";
import Button from "../../common/button/Button";
import InputField from "../../common/inputField/InputField";
import "./ProfilePage.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProfile,
  updateProfile,
} from "../../../store/thunks/thunksProfile";
import { getUserById } from "../../../store/thunks/thunksUser";
import { selectAuthUser } from "../../../store/slices/authSlice";
import {
  selectProfile,
  selectProfileError,
  selectProfileStatus,
} from "../../../store/slices/profileSlice";
import {
  createPost,
  deletePost,
  fetchUserPosts,
  updatePost,
} from "../../../store/thunks/thunksPost";
import Modal from "../../common/modal/Modal";
import {
  Post,
  selectPostError,
  selectPostStatus,
  selectUserPosts,
} from "../../../store/slices/postsSlice";
import PostCard from "../../common/postCard/PostCard";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const profile = useAppSelector(selectProfile);
  const profileError = useAppSelector(selectProfileError);
  const profileStatus = useAppSelector(selectProfileStatus);
  const authUser = useAppSelector(selectAuthUser);
  const postsStatus = useAppSelector(selectPostStatus);
  const postsError = useAppSelector(selectPostError);
  const userPosts = useAppSelector(selectUserPosts);

  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState("");
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");

  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10);
      if (!isNaN(userId)) {
        dispatch(getUserById(userId));
        dispatch(fetchProfile(userId));
        dispatch(fetchUserPosts(userId));
      }
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (profile) {
      setAbout(profile.about);
    }
  }, [profile]);

  const handleSave = async () => {
    if (profile) {
      await dispatch(updateProfile({ about }));
      setIsEditing(false);
    }
  };

  const handleCreatePost = async () => {
    if (authUser) {
      await dispatch(
        createPost({
          title: newPostTitle,
          content: newPostContent,
          author: {
            id: authUser.id,
            nickname: authUser.nickname,
            login: authUser.login,
          },
          comments: [],
          likes: [],
        })
      );
      setIsCreatePostModalOpen(false);
      setNewPostTitle("");
      setNewPostContent("");

      if (id) {
        const userId = parseInt(id, 10);
        dispatch(fetchUserPosts(userId));
      }
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
    setIsEditPostModalOpen(true);
  };

  const handleUpdatePost = async () => {
    if (editingPost && authUser) {
      await dispatch(
        updatePost({
          ...editingPost,
          title: editPostTitle,
          content: editPostContent,
        })
      );
      setIsEditPostModalOpen(false);
      setEditingPost(null);

      if (id) {
        const userId = parseInt(id, 10);
        dispatch(fetchUserPosts(userId));
      }
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost({ id: postId } as Post));

      if (id) {
        const userId = parseInt(id, 10);
        dispatch(fetchUserPosts(userId));
      }
    }
  };

  const isLoading = profileStatus === "loading";
  const isFailed = profileStatus === "failed";
  const isSaving = profileStatus === "loading";

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (isFailed) {
    return (
      <div className="error">
        {profileError}
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  if (!profile) {
    return <div className="not-found">Profile not found</div>;
  }

  return (
    <>
      <Card className="profile-card">
        <div className="profile-header">
          <h2>{profile.user.nickname}</h2>
        </div>

        <div className="profile-section">
          {authUser?.id === profile.userId && (
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="secondary"
              disabled={isSaving}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          )}
          <h3>About</h3>
          {isEditing ? (
            <>
              <InputField
                type="textarea"
                value={about}
                onChange={setAbout}
                placeholder="Tell about yourself"
                disabled={isSaving}
              />
              <Button
                onClick={handleSave}
                isLoading={isSaving}
                className="save-button"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <p className="about-text">
              {profile.about || "No information provided"}
            </p>
          )}
        </div>

        {authUser?.id === profile.userId && (
          <Button
            onClick={() => setIsCreatePostModalOpen(true)}
            className="back-button"
          >
            Create post
          </Button>
        )}
      </Card>

      <div className="user-posts-section">
        <h3 className="posts-title">{`${profile.user.nickname}'s Posts`}</h3>

        {postsStatus === "loading" && (
          <div className="loading">Loading posts...</div>
        )}

        {postsStatus === "failed" && (
          <div className="error">{postsError || "Failed to load posts"}</div>
        )}

        {postsStatus === "succeeded" && userPosts.length === 0 && (
          <p className="no-posts">No posts yet</p>
        )}

        {postsStatus === "succeeded" && userPosts.length > 0 && (
          <div className="posts-list">
            {userPosts.map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
                isOwner={authUser?.id === post.author.id}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        )}
      </div>

      {isCreatePostModalOpen && (
        <Modal
          title="Create New Post"
          onClose={() => setIsCreatePostModalOpen(false)}
          actions={
            <>
              <Button onClick={handleCreatePost}>Create</Button>
              <Button
                variant="secondary"
                onClick={() => setIsCreatePostModalOpen(false)}
              >
                Cancel
              </Button>
            </>
          }
        >
          <InputField
            type="text"
            label="Title"
            value={newPostTitle}
            onChange={setNewPostTitle}
            placeholder="Enter post title"
          />
          <InputField
            type="textarea"
            label="Content"
            value={newPostContent}
            onChange={setNewPostContent}
            placeholder="Write your post content here"
          />
        </Modal>
      )}

      {isEditPostModalOpen && editingPost && (
        <Modal
          title="Edit Post"
          onClose={() => setIsEditPostModalOpen(false)}
          actions={
            <>
              <Button onClick={handleUpdatePost}>Save</Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditPostModalOpen(false)}
              >
                Cancel
              </Button>
            </>
          }
        >
          <InputField
            type="text"
            label="Title"
            value={editPostTitle}
            onChange={setEditPostTitle}
            placeholder="Enter post title"
          />
          <InputField
            type="textarea"
            label="Content"
            value={editPostContent}
            onChange={setEditPostContent}
            placeholder="Write your post content here"
          />
        </Modal>
      )}
    </>
  );
};

export default ProfilePage;
