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

  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, handlePending)
      .addCase(fetchNews.rejected, handleRejected)
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.isLoading = false;
      });
  },
});

export const { setPage } = newsSlice.actions;

export default newsSlice.reducer;
