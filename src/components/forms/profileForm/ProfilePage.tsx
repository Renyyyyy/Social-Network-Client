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

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const profile = useAppSelector(selectProfile);
  const profileError = useAppSelector(selectProfileError);
  const profileStatus = useAppSelector(selectProfileStatus);
  const authUser = useAppSelector(selectAuthUser);

  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10);
      if (!isNaN(userId)) {
        dispatch(getUserById(userId));
        dispatch(fetchProfile(userId));
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

      <Button onClick={() => navigate(-1)} className="back-button">
        Back
      </Button>
    </Card>
  );
};

export default ProfilePage;
