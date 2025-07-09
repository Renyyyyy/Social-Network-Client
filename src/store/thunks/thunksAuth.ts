import { api } from "../../api/api";
import {
  LoginData,
  RegistrationData,
  setError,
  setIsAuth,
  setStatus,
  setToken,
  setUser,
} from "../slices/authSlice";
import { User } from "../slices/usersSlice";
import { createAppAsyncThunk } from "../store";

export const loginUser = createAppAsyncThunk(
  "auth/login",
  async ({ login, password }: LoginData, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.post<{ token: string }>(`/auth/login`, {
        login,
        password,
      });
      dispatch(setStatus("succeeded"));
      const token = response.data.token;
      localStorage.setItem("accessToken", token);
      dispatch(setToken(token));
      const userResponse = await api.get<User>(`/auth/me`);
      dispatch(setUser(userResponse.data));
      dispatch(setIsAuth(true));
    } catch (error: unknown) {
      dispatch(setStatus("failed"));
      dispatch(setError("Login error"));
    }
  }
);

export const registerUser = createAppAsyncThunk(
  "auth/registration",
  async ({ nickname, login, password }: RegistrationData, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.post<{ token: string }>(`/auth/registration`, {
        nickname,
        login,
        password,
      });
      dispatch(setStatus("succeeded"));
      const token = response.data.token;
      localStorage.setItem("accessToken", token);
      dispatch(setToken(token));
      const userResponse = await api.get<User>(`/auth/me`);
      dispatch(setUser(userResponse.data));
      dispatch(setIsAuth(true));
    } catch (error: any) {
      dispatch(setStatus("failed"));
      dispatch(setError("Registration error"));
    }
  }
);

export const checkAuth = createAppAsyncThunk(
  "auth/check",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await api.get<User>(`/auth/me`);
        dispatch(setUser(response.data));
        dispatch(setIsAuth(true));
        if (!response.data) {
          throw new Error("User data not found");
        }
      } else {
        dispatch(setIsAuth(false));
        throw new Error("Token not found");
      }
    } catch (error: any) {
      if (error.response?.status !== 401) {
        dispatch(setStatus("failed"));
        dispatch(setError("Auth error"));
      }
    }
  }
);
