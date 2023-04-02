import { combineReducers } from "@reduxjs/toolkit";
import { reducer as postsReducer } from "./posts";

export const reducer = combineReducers({
  posts: postsReducer,
});
