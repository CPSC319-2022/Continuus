import { configureStore, type PreloadedState } from "@reduxjs/toolkit";
import { reducer } from "./slices";
// Create the root reducer independently to obtain the RootState type
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
