import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Toy } from "./toyTypes";

export interface ToysState {
  toys: Toy[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ToysState = {
  toys: [],
  status: "idle",
  error: null
};

export const fetchToys = createAsyncThunk<Toy[], void, { rejectValue: string }>(
  "toys/fetchToys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/toys");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data as Toy[]; // Предполагая, что данные находятся в поле `data`
    } catch (err) {
      return rejectWithValue("Failed to fetch toys");
    }
  }
);

const toySlice = createSlice({
  name: "toys",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchToys.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchToys.fulfilled, (state, action: PayloadAction<Toy[]>) => {
        state.status = "succeeded";
        state.toys = action.payload;
      })
      .addCase(
        fetchToys.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch toys";
        }
      );
  }
});

export default toySlice.reducer;
