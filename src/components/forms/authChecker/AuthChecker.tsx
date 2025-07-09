import React, { useEffect, useState } from "react";
import "./AuthChecker.css";
import LoginForm from "../loginForm/LoginForm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import RegistrationForm from "../registartionForm/RegistrationForm";
import { checkAuth } from "../../../store/thunks/thunksAuth";

import {
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthUser,
} from "../../../store/slices/authSlice";
import usePingBackend from "./usePingBackend";

interface AuthCheckerProps {
  form?: "login" | "registration";
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ form = "login" }) => {
  const [activeForm, setActiveForm] = useState<"login" | "registration">(form);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authStatus = useAppSelector(selectAuthStatus);
  const authUser = useAppSelector(selectAuthUser);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const allowedRoutes = ["/login", "/registration", "/"];
      if (allowedRoutes.includes(location.pathname)) {
        const userId = authUser?.id;
        navigate(`/profile/${userId}`);
      }
    } else {
      if (location.pathname.startsWith("/profile/")) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate, authUser, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveForm("login");
    } else if (location.pathname === "/registration") {
      setActiveForm("registration");
    }
  }, [location]);

  const status = usePingBackend();

  const handleFormSwitch = (newForm: "login" | "registration") => {
    navigate(newForm === "login" ? "/login" : "/registration");
  };

  if (status === "offline") {
    return (
      <div className="status-message error">
        <h3>Ошибка соединения</h3>
        <p>Сервер недоступен. Пожалуйста, попробуйте позже.</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (status === "checking" || authStatus === "loading") {
    return (
      <div className="auth-checker-container">
        <div className="status-message">
          <div className="loader"></div>
          <p>Проверка соединения с сервером...</p>
        </div>
      </div>
    );
  }

  if (
    isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/registration"
  ) {
    return <Outlet />;
  }

  return (
    <div className="auth-checker-container">
      {activeForm === "login" ? (
        <LoginForm onSignUpClick={() => handleFormSwitch("registration")} />
      ) : (
        <RegistrationForm onBackToLogin={() => handleFormSwitch("login")} />
      )}
    </div>
  );
};

export default AuthChecker;
