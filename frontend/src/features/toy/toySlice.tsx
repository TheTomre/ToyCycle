import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Toy } from "./toyTypes";

export interface ToysState {
  toys: Toy[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
}

const initialState: ToysState = {
  toys: [],
  status: "idle",
  error: null,
  currentPage: 1,
  resultsPerPage: 10,
  totalPages: 1,
  totalResults: 0
};

export const fetchToys = createAsyncThunk<
  { toys: Toy[]; totalPages: number; totalResults: number },
  { page: number; limit: number },
  { rejectValue: string }
>("toys/fetchToys", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/toys?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      toys: data.data,
      totalPages: data.totalPages,
      totalResults: data.total
    };
  } catch (err) {
    return rejectWithValue("Failed to fetch toys");
  }
});

const toySlice = createSlice({
  name: "toys",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setResultsPerPage: (state, action: PayloadAction<number>) => {
      state.resultsPerPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchToys.pending, state => {
        state.status = "loading";
      })
      .addCase(
        fetchToys.fulfilled,
        (
          state,
          action: PayloadAction<{
            toys: Toy[];
            totalPages: number;
            totalResults: number;
          }>
        ) => {
          state.status = "succeeded";
          state.toys = action.payload.toys;
          state.totalPages = action.payload.totalPages;
          state.totalResults = action.payload.totalResults;
        }
      )
      .addCase(
        fetchToys.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch toys";
        }
      );
  }
});

export const { setPage, setResultsPerPage } = toySlice.actions;

export default toySlice.reducer;
