import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [],
    page: 1,
    perPage: 6,
    totalPages: null,
    isLoading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, handlePending)
      .addCase(fetchNews.rejected, handleRejected)
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // action.payload === { page, perPage, totalPages, results }
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      });
  },
});

export default newsSlice.reducer;
