import { createSlice } from '@reduxjs/toolkit';

export type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: AuthStatus;
  error: string | null;
}

export interface User {
  id: number;
  name: string;
  login: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegistrationData {
  name: string;
  login: string;
  password: string;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: {payload: string}) => {
      state.token = action.payload;
    },
    setIsAuth: (state, action: {payload: boolean}) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: {payload: User}) => {
      state.user = action.payload;
    },
    setStatus: (state, action: {payload: AuthStatus}) => {
      state.status = action.payload;
    },
    setError: (state, action: {payload: string}) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { logout, setStatus, setUser, setIsAuth, setError, setToken} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;