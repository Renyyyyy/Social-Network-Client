import { api } from "../../api/api";
import { createAppAsyncThunk } from "../store";
import { setError, setStatus, setUsers, User, UsersState } from "../slices/usersSlice";

const API_URL = 'http://localhost:7000/api';

export const getAll = createAppAsyncThunk('users/getAll', async (_, { dispatch }) => {
    dispatch(setStatus('loading'));
    dispatch(setError(''));
    // try {
    //   const response = await api.get<User[]>(`${API_URL}/users`);
    //   console.log(response.data)
    //   dispatch(setStatus('succeeded'));
    //   dispatch(setUsers(response.data));
    // } catch (error) {
    //     dispatch(setStatus('failed'));
    //     dispatch(setError('Failed to fetch users'));
    // }
});

export const getUserById = createAppAsyncThunk('users/getUserById', async (userId: number, { dispatch }) => {
  debugger
    dispatch(setStatus('loading'));
    dispatch(setError(''));
    try {
      const response = await api.get<User>(`${API_URL}/users/${userId}`);
      console.log(response.data)
      dispatch(setUsers(response.data));
      dispatch(setStatus('succeeded'));
      
    } catch (error) {
        dispatch(setStatus('failed'));
        dispatch(setError('Failed to fetch users'));
    }
});

export const setCurrentUser = (state: UsersState, action: {payload: User}) => {
  state.user = action.payload;
};