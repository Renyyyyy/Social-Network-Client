import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  resetFollowerState,
  selectFollowerError,
  selectFollowers,
  selectFollowerStatus,
  setStatus,
} from "../../../../store/slices/followerSlice";
import { fetchFollowers } from "../../../../store/thunks/thunksFollower";
import Card from "../../../common/card/Card";
import Button from "../../../common/button/Button";
import "../UsersComponent.css";
import { selectAuthUser } from "../../../../store/slices/authSlice";

const FollowersList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectFollowerStatus);
  const error = useAppSelector(selectFollowerError);
  const followers = useAppSelector(selectFollowers);
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
      dispatch(fetchFollowers(authUser.id));
      setInitialLoad(true);
    }

    if (status === "failed" && authUser) {
      dispatch(fetchFollowers(authUser.id));
    }
  }, [status, dispatch, initialLoad, authUser]);

  return (
    <div className="users-container">
      <h1 className="users-title">Мои подписчики</h1>

      {status === "loading" && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка подписчиков...</p>
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
                dispatch(fetchFollowers(parseInt(currentUserId)));
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
          {followers.length === 0 ? (
            <Card className="empty-card">
              <h3>Пока нет подписчиков</h3>
              <p>
                Ваши подписчики появятся здесь, когда кто-то подпишется на вас
              </p>
            </Card>
          ) : (
            followers.map((follower) => (
              <Card
                key={follower.id}
                className="user-card"
                onClick={() => navigate(`/profile/${follower.id}`)}
              >
                <div className="user-header">
                  <h2 className="user-nickname">{follower.nickname}</h2>
                  <span className="user-id">ID: {follower.id}</span>
                </div>
                <div className="user-footer">
                  <Button variant="outline">Посмотреть профиль</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FollowersList;
