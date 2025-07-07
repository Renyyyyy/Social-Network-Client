import { createSlice } from '@reduxjs/toolkit';

export type UsersStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface User {
  id: number;
  nickname: string;
  login: string;
}

export interface UsersState {
  users: User[];
  status: UsersStatus;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: {payload: User[]}) => {
      state.users = action.payload;
    },
    setStatus: (state, action: {payload: UsersStatus}) => {
      state.status = action.payload;
    },
    setError: (state, action: {payload: string}) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setError, setUsers } = usersSlice.actions;

export default usersSlice.reducer;