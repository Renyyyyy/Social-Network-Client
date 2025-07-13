import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  resetFollowerState,
  selectFollowerError,
  selectFollowerStatus,
  selectFollowing,
  setFollowing,
  setStatus,
} from "../../../../store/slices/followerSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchFollowing,
  unfollowUser,
} from "../../../../store/thunks/thunksFollower";
import Card from "../../../common/card/Card";
import Button from "../../../common/button/Button";
import "../UsersComponent.css";
import { selectAuthUser } from "../../../../store/slices/authSlice";

const FollowingList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectFollowerStatus);
  const error = useAppSelector(selectFollowerError);
  const following = useAppSelector(selectFollowing);
  const authUser = useAppSelector(selectAuthUser);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    dispatch(setStatus("idle"));
    return () => {
      dispatch(resetFollowerState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle" && !initialLoad && authUser) {
      dispatch(fetchFollowing(authUser.id));
      setInitialLoad(true);
    }

    if (status === "failed" && authUser) {
      dispatch(fetchFollowing(authUser.id));
    }
  }, [status, dispatch, initialLoad, authUser]);

  const handleUnfollow = async (userId: number) => {
    try {
      await dispatch(unfollowUser(userId)).unwrap();
      dispatch(setFollowing(following.filter((user) => user.id !== userId)));
    } catch (err) {
      console.error("Ошибка при отписке:", err);
    }
  };

  return (
    <div className="users-container">
      <h1 className="users-title">Мои подписки</h1>

      {status === "loading" && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка подписок...</p>
        </div>
      )}

      {status === "failed" && (
        <Card className="error-card">
          <h3>Ошибка загрузки</h3>
          <p className="error-message">{error}</p>
          <Button
            onClick={() => {
              const currentUserId = localStorage.getItem("userId");
              if (currentUserId) {
                dispatch(fetchFollowing(parseInt(currentUserId)));
              }
            }}
            variant="primary"
            className="retry-button"
          >
            Повторить попытку
          </Button>
        </Card>
      )}

      {status === "succeeded" && (
        <div className="users-grid">
          {following.length === 0 ? (
            <Card className="empty-card">
              <h3>Вы пока ни на кого не подписаны</h3>
              <p>
                Найдите интересных людей на странице &quot;Пользователи&quot;
              </p>
            </Card>
          ) : (
            following.map((user) => (
              <Card
                key={user.id}
                className="user-card"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <div className="user-header">
                  <h2 className="user-nickname">{user.nickname}</h2>
                  <span className="user-id">ID: {user.id}</span>
                </div>
                <div className="user-footer">
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleUnfollow(user.id);
                    }}
                    className="unfollow-button"
                  >
                    Отписаться
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/profile/${user.id}`);
                    }}
                  >
                    Профиль
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FollowingList;
