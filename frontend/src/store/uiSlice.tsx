import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    }
  }
});

export const { toggleNav } = uiSlice.actions;
export default uiSlice.reducer;
