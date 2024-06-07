import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../features/user/userSlice";
import toyReducer from "../features/toy/toySlice";
import uiReducer from "./uiSlice";
// import { rtkqApi } from "../api/rtk-api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toy: toyReducer,
    ui: uiReducer

    // [rtkqApi.userPath]: rtkqApi.reducer
  }

  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(rtkqApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
