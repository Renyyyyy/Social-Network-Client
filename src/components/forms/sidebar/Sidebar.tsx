import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout, selectAuthUser } from "../../../store/slices/authSlice";
import Button from "../../common/button/Button";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to={`/profile/${user?.id}`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to={`/users`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Пользователи
        </NavLink>
      </nav>

      <div className="logout-container">
        <Button
          onClick={handleLogout}
          variant="secondary"
          className="logout-button"
        >
          Выйти
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
