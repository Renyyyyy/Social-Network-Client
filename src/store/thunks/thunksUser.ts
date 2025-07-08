import { api } from "../../api/api";
import { createAppAsyncThunk } from "../store";
import {
  setError,
  setStatus,
  setUser,
  setUsers,
  User,
  UsersState,
} from "../slices/usersSlice";

export const getAll = createAppAsyncThunk(
  "users/getAll",
  async (_, { dispatch }) => {
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.get<User[]>(`/users`);
      dispatch(setStatus('succeeded'));
      dispatch(setUsers(response.data));
    } catch (error) {
        dispatch(setStatus('failed'));
        dispatch(setError('Failed to fetch users'));
    }
  }
);

export const getUserById = createAppAsyncThunk(
  "users/getUserById",
  async (userId: number, { dispatch }) => {
    ;
    dispatch(setStatus("loading"));
    dispatch(setError(""));
    try {
      const response = await api.get<User>(`/users/${userId}`);
      dispatch(setUser(response.data));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(setStatus("failed"));
      dispatch(setError("Failed to fetch users"));
    }
  }
);

export const setCurrentUser = (
  state: UsersState,
  action: { payload: User }
) => {
  state.user = action.payload;
};
