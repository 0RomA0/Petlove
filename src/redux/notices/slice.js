import { createSlice } from '@reduxjs/toolkit';
import { fetchNotices } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const noticeSlice = createSlice({
  name: 'notices',
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
      .addCase(fetchNotices.pending, handlePending)
      .addCase(fetchNotices.rejected, handleRejected)
      .addCase(fetchNotices.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.items = action.payload.results;
        } else {
          state.items = [...state.items, ...action.payload.results];
        }
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.isLoading = false;
      });
  },
});

export default noticeSlice.reducer;
