import { configureStore, createAsyncThunk, Middleware } from "@reduxjs/toolkit";
import usersReducer from "../store/slices/usersSlice";
import authReducer from "../store/slices/authSlice";
import profileReducer from "../store/slices/profileSlice";
import postsReducer from "../store/slices/postsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    profile: profileReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStory = typeof store;
export type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

type CreateAsyncThunkParams<InputParams, ReturnValues> = Parameters<
  typeof createAsyncThunk<ReturnValues, InputParams, AsyncThunkConfig>
>;
export const createAppAsyncThunk = <InputParam = void, ReturnValues = void>(
  ...arg: CreateAsyncThunkParams<InputParam, ReturnValues>
) => createAsyncThunk<ReturnValues, InputParam, AsyncThunkConfig>(...arg);
