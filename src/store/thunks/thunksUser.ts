import { api } from "../../api/api";
import { createAppAsyncThunk } from "../store";
import { setError, setStatus, setUsers } from "../slices/usersSlice";

export const getAll = createAppAsyncThunk('users/getAll', async (_, {getState, dispatch}) => {
    dispatch(setStatus('loading'));
    dispatch(setError(''));
    try {
      const response = await api.get('/users');
      dispatch(setStatus('succeeded'));
      dispatch(setUsers(response.data));
    } catch (error) {
        dispatch(setStatus('failed'));
        dispatch(setError('Failed to fetch users'));
    }
  });