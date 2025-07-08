import { createSlice } from "@reduxjs/toolkit";

export type UsersStatus = "idle" | "loading" | "succeeded" | "failed";

export interface User {
  id: number;
  nickname: string;
  login: string;
}

export interface UsersState {
  user: User | User[];
  status: UsersStatus;
  error: string | null;
}

export const initialState: UsersState = {
  user: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: { payload: User[] }) => {
      state.user = action.payload;
    },
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
    setStatus: (state, action: { payload: UsersStatus }) => {
      state.status = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setError, setUsers, setUser } = usersSlice.actions;

export const selectUser = (state: { users: UsersState }) => state.users.user;
export const selectUserStatus = (state: { users: UsersState }) => state.users.status;
export const selectUserError = (state: { users: UsersState }) => state.users.error;

export default usersSlice.reducer;
