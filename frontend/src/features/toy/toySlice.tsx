import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ToyState } from "./toyTypes";

const initialState: ToyState = {
  toys: []
};

const toySlice = createSlice({
  name: "toy",
  initialState,
  reducers: {
    storeToyState(state, action: PayloadAction<ToyState>) {
      const { toys } = action.payload;
      state.toys = toys;
    },
    cleaeToyState(state) {
      state.toys = [];
    }
  }
});

export const { cleaeToyState, storeToyState } = toySlice.actions;
export default toySlice.reducer;
