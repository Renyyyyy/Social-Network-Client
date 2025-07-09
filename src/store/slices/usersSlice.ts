import { createSlice } from "@reduxjs/toolkit";

export type UsersStatus = "idle" | "loading" | "succeeded" | "failed";

export interface User {
  id: number;
  nickname: string;
  login: string;
}

export interface UsersState {
  users: User[];
  user: User | null;
  status: UsersStatus;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  user: null,
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: { payload: User[] }) => {
      state.users = action.payload;
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
export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectUserStatus = (state: { users: UsersState }) =>
  state.users.status;
export const selectUserError = (state: { users: UsersState }) =>
  state.users.error;

export default usersSlice.reducer;
