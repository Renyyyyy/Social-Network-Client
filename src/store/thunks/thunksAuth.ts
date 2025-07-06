import { api } from "../../api/api";
import { LoginData, RegistrationData, setError, setIsAuth, setStatus, setToken, setUser } from "../slices/authSlice";
import { User } from "../slices/usersSlice";
import { createAppAsyncThunk } from "../store";

const API_URL = 'http://localhost:7000/api';

export const loginUser = createAppAsyncThunk(
    'auth/login',
    async ({ login, password }: LoginData, { dispatch }) => {
      debugger
      dispatch(setStatus('loading'));
      dispatch(setError(''));
      try {
        const response = await api.post<{token: string}>(`${API_URL}/auth/login`, {
          login,
          password,
        });
        dispatch(setStatus('succeeded'));
        const token = response.data.token;
        dispatch(setToken(token));
        localStorage.setItem('accessToken', token);
        dispatch(setIsAuth(true));
      } catch (error: unknown) {
        dispatch(setStatus('failed'));
        dispatch(setError('Login error'));
      }
    }
  );
  
  export const registerUser = createAppAsyncThunk(
    'auth/register',
    async ({ name, login, password }: RegistrationData, { dispatch }) => {
      debugger
      dispatch(setStatus('loading'));
      dispatch(setError(''));
      try {
        const response = await api.post<{token: string, user: User}>(`${API_URL}/auth/register`, {
          name,
          login,
          password,
        });
        dispatch(setStatus('succeeded'));
        const token = response.data.token;
        dispatch(setToken(token));
        localStorage.setItem('accessToken', token);
        dispatch(setUser(response.data.user));
        dispatch(setIsAuth(true));
      } catch (error: any) {
        dispatch(setStatus('failed'));
        dispatch(setError('Registration error'));
      }
    }
  );
  
  export const checkAuth = createAppAsyncThunk(
    'auth/check',
    async (_, { dispatch  }) => {
      debugger
      dispatch(setStatus('loading'));
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No token');
        
        const response = await api.get<{user: User}>('/auth/me');
        
        if (response.data.user) {
          dispatch(setStatus('succeeded'));
          dispatch(setUser(response.data.user));
          dispatch(setIsAuth(true));
        } else {
          dispatch(setIsAuth(false));
        }
        if (!response.data?.user) {
          throw new Error('User data not found');
        }
        
      } catch (error: any) {
        localStorage.removeItem('accessToken');
        dispatch(setStatus('failed'));
        dispatch(setError('Auth error'));
      }
    }
  );