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
    'auth/registration',
    async ({ nickname, login, password }: RegistrationData, { dispatch }) => {
      debugger
      dispatch(setStatus('loading'));
      dispatch(setError(''));
      try {
        const response = await api.post<{token: string}>(`${API_URL}/auth/registration`, {
          nickname,
          login,
          password,
        });
        dispatch(setStatus('succeeded'));
        const token = response.data.token;
        dispatch(setToken(token));
        localStorage.setItem('accessToken', token);
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
      
      dispatch(setStatus('loading'));
      try {
        const token = localStorage.getItem('accessToken')
        if (token) {
          dispatch(setStatus('succeeded'));
          dispatch(setIsAuth(true));
          debugger
          const response = await api.get<{user: User}>('/auth/me');
          dispatch(setUser(response.data.user));
          if (!response.data?.user) {
            throw new Error('User data not found');
          }
        } else {
          dispatch(setIsAuth(false));
          throw new Error('Token not found');
        }
        
        
        
      } catch (error: any) {
        localStorage.removeItem('accessToken');
        dispatch(setStatus('failed'));
        dispatch(setError('Auth error'));
      }
    }
  );