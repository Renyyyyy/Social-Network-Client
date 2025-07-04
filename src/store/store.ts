import { configureStore, Middleware } from '@reduxjs/toolkit';
import usersReducer from '../store/slices/usersSlice';
import authReducer, { logout } from '../store/slices/authSlice';
import profileReducer from '../store/slices/profileSlice';
import { loginUser, registerUser, checkAuth } from '../store/slices/authSlice';

const authTokenMiddleware: Middleware = (store) => (next) => (action) => {
  if (
    loginUser.fulfilled.match(action) ||
    registerUser.fulfilled.match(action) ||
    checkAuth.fulfilled.match(action)
  ) {
    const token = action.payload.token;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
  }
  
  if (logout.match(action)) {
    localStorage.removeItem('accessToken');
  }
  
  return next(action);
};

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authTokenMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;