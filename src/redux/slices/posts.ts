import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CommentModalProps } from "~/components/CommentModal";

const initialState: { selectedPost: CommentModalProps | null } = {
  selectedPost: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<CommentModalProps | null>) {
      state.selectedPost = action.payload;
    },
  },
});

export const {
  actions: { setSelectedPost },
  reducer,
} = postsSlice;
