import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Toy } from "./toyTypes";

export interface ToysState {
  toys: Toy[];
  selectedToy: Toy | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  loading: boolean;
}

const initialState: ToysState = {
  toys: [],
  selectedToy: null,
  status: "idle",
  error: null,
  currentPage: 1,
  resultsPerPage: 10,
  totalPages: 1,
  totalResults: 0,
  loading: false
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

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

export const fetchToyDetails = createAsyncThunk<
  Toy,
  string,
  { rejectValue: string }
>("toys/fetchToyDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/toys/${id}`);
    return response.data.data as Toy;
  } catch (error) {
    let message = "Failed to fetch toy details";
    if (error instanceof AxiosError && error.response) {
      message = error.response.data?.message || message;
    }
    return rejectWithValue(message);
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
      .addCase(fetchToys.pending, function fetchToysPending(state) {
        state.status = "loading";
        state.loading = true;
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
          state.loading = false;
        }
      )
      .addCase(
        fetchToys.rejected,
        function fetchToysRejected(
          state,
          action: PayloadAction<string | undefined>
        ) {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch toys";
          state.loading = false;
        }
      )
      .addCase(fetchToyDetails.pending, function fetchToyDetailsPending(state) {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(
        fetchToyDetails.fulfilled,
        function fetchToyDetailsFulfilled(state, action: PayloadAction<Toy>) {
          state.status = "succeeded";
          state.selectedToy = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchToyDetails.rejected,
        function fetchToyDetailsRejected(
          state,
          action: PayloadAction<string | undefined>
        ) {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch toy details";
          state.loading = false;
        }
      );
  }
});

export const { setPage, setResultsPerPage } = toySlice.actions;

export default toySlice.reducer;
