import { createSlice } from "@reduxjs/toolkit";

type LikesStatus = "idle" | "loading" | "succeeded" | "failed";

interface LikesState {
  status: LikesStatus;
  error: string | null;
}

const initialState: LikesState = {
  status: "idle",
  error: null,
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setStatus: (state, action: { payload: LikesStatus }) => {
      state.status = action.payload;
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setError } = likesSlice.actions;
export const selectLikeStatus = (state: { likes: LikesState }) =>
  state.likes.status;
export const selectLikeError = (state: { likes: LikesState }) =>
  state.likes.error;

export default likesSlice.reducer;
