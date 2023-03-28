import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: { selectedPost: string | null } = {
  selectedPost: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<string | null>) {
      state.selectedPost = action.payload;
    },
  },
});

export const {
  actions: { setSelectedPost },
  reducer,
} = postsSlice;
