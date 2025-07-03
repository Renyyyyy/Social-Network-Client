import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../store/slices/usersSlice';
import authReducer from '../store/slices/authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;