import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  selectUserError,
  selectUsers,
  selectUserStatus,
} from "../../../store/slices/usersSlice";
import { getAll } from "../../../store/thunks/thunksUser";
import Card from "../../common/card/Card";
import Button from "../../common/button/Button";
import "./UsersComponent.css";

const UsersComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAll());
    }
  }, [status, dispatch]);

  return (
    <div className="users-container">
      <h1 className="users-title">Список пользователей</h1>

      {status === "loading" && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка пользователей...</p>
        </div>
      )}

      {status === "failed" && (
        <Card className="error-card">
          <h3>Ошибка загрузки</h3>
          <p className="error-message">{error}</p>
          <Button
            onClick={() => dispatch(getAll())}
            variant="primary"
            className="retry-button"
          >
            Повторить попытку
          </Button>
        </Card>
      )}

      {status === "succeeded" && (
        <div className="users-grid">
          {users.map((user) => (
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
                <Button variant="outline">Посмотреть профиль</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersComponent;
