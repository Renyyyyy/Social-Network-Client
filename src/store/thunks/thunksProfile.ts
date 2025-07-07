import { api } from "../../api/api";
import { ProfileData, ProfileState, setError, setProfile, setStatus } from "../slices/profileSlice";
import { createAppAsyncThunk } from "../store";

const API_URL = 'http://localhost:7000/api';

export const fetchProfile = createAppAsyncThunk(
    'profile/fetchProfile',
    async (userId: number, { dispatch}) => {
        dispatch(setStatus('loading'))
        try {
            const response = await api.get<ProfileData>(`${API_URL}/profile/${userId}`);
            console.log(response.data)
            debugger
            if (response.data) {
              dispatch(setProfile(response.data));
              dispatch(setStatus('succeeded'));
            } else {
              dispatch(setError('Profile not found'));
              dispatch(setStatus('failed'));
           }
        } catch (error: any) {
            dispatch(setError('Profile get error'));
            dispatch(setStatus('failed'));
        }
    }
  );
  
  export const updateProfile = createAppAsyncThunk(
    'profile/updateProfile',
    async ({ about }: { about: string }, { dispatch }) => {
        dispatch(setStatus('loading'));
        try {
          const response = await api.put<ProfileData>(`/profile`, { about });
          dispatch(setProfile(response.data));
          dispatch(setStatus('succeeded'));
        } catch (error: any) {
          dispatch(setError('Failed to update profile'));
          dispatch(setStatus('failed'));
        }
    }
  );