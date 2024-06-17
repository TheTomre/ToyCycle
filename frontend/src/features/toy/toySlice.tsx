import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Toy, ToysState } from "./toyTypes";

const initialState: ToysState = {
  toys: [],
  selectedToy: null,
  relatedToys: [],
  error: null,
  currentPage: 1,
  resultsPerPage: 10,
  totalPages: 1,
  totalResults: 0,
  loading: false,
  ageCategory: [],
  brand: [],
  category: [],
  search: "",
  sort: "name"
};

const axiosInstance = axios.create({
  baseURL: import.meta.env["VITE_API_BASE_URL"],
  headers: {
    "Content-Type": "application/json"
  }
});

const getParams = (params: Record<string, string | number | undefined>) => {
  const definedParams: Record<string, string | number> = {};
  Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, definedParams);
  return definedParams;
};

export const fetchToys = createAsyncThunk<
  { toys: Toy[]; totalPages: number; totalResults: number },
  {
    sort: string;
    page: number;
    limit: number;
    category?: string;
    ageCategory?: string;
    brand?: string;
    search?: string;
  },
  { rejectValue: string }
>(
  "toys/fetchToys",
  async (
    { page, limit, category, ageCategory, brand, search, sort },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/toys`, {
        params: getParams({
          sort,
          page,
          limit,
          category,
          ageCategory,
          brand,
          search
        })
      });
      const { data } = response;
      return {
        toys: data.data,
        totalPages: data.totalPages,
        totalResults: data.totalResults
      };
    } catch (err) {
      let message = "Failed to fetch toys";
      if (err instanceof AxiosError && err.response) {
        message = err.response.data?.message || message;
      }
      return rejectWithValue(message);
    }
  }
);

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

export const fetchRelatedToys = createAsyncThunk<
  Toy[],
  string,
  { rejectValue: string }
>("toys/fetchRelatedToys", async (ownerId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/toys/related/${ownerId}`);
    return response.data.data as Toy[];
  } catch (error) {
    let message = "Failed to fetch related toys";
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
    },
    setCategory: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
    setAgeCategory: (state, action: PayloadAction<string[]>) => {
      state.ageCategory = action.payload;
    },
    setBrandCategory: (state, action: PayloadAction<string[]>) => {
      state.brand = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetToyList: state => {
      state.currentPage = 1;
      state.resultsPerPage = 10;
      state.totalPages = 1;
      state.category = [];
      state.ageCategory = [];
      state.brand = [];
      state.search = "";
      state.sort = "name";
    },
    resetToysFilter: state => {
      state.category = [];
      state.ageCategory = [];
      state.brand = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchToys.pending, state => {
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
          state.toys = action.payload.toys;
          state.totalPages = action.payload.totalPages;
          state.totalResults = action.payload.totalResults;
          state.loading = false;
        }
      )
      .addCase(
        fetchToys.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch toys";
          state.loading = false;
        }
      )
      .addCase(fetchToyDetails.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchToyDetails.fulfilled,
        (state, action: PayloadAction<Toy>) => {
          state.selectedToy = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchToyDetails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch toy details";
          state.loading = false;
        }
      )
      .addCase(fetchRelatedToys.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchRelatedToys.fulfilled,
        (state, action: PayloadAction<Toy[]>) => {
          state.relatedToys = action.payload; // Add this line
          state.loading = false;
        }
      )
      .addCase(
        fetchRelatedToys.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch related toys";
          state.loading = false;
        }
      );
  }
});

export const {
  setSort,
  setPage,
  setResultsPerPage,
  resetToyList,
  setCategory,
  setAgeCategory,
  setBrandCategory,
  resetToysFilter,
  setSearchQuery
} = toySlice.actions;

export default toySlice.reducer;
