import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userTypes";

const initialState: UserState = {
  email: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserState(state, action: PayloadAction<UserState>) {
      const { email } = action.payload;
      state.email = email;
    },
    clearUserState(state) {
      state.email = "";
    }
  }
});

export const { storeUserState, clearUserState } = userSlice.actions;
export default userSlice.reducer;
