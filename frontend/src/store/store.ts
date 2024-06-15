import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../features/user/userSlice";
import toyReducer from "../features/toy/toySlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toys: toyReducer,
    ui: uiReducer
  }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
