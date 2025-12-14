import { createSlice } from '@reduxjs/toolkit';
import {
  addFavorite,
  removeFavorite,
  fetchFavoriteNotices,
} from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: [],
    items: [],
    isLoading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, handlePending)
      .addCase(addFavorite.rejected, handleRejected)
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.ids = action.payload;
      })
      .addCase(removeFavorite.pending, handlePending)
      .addCase(removeFavorite.rejected, handleRejected)
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.ids = action.payload;
        state.items = state.items.filter((item) =>
          state.ids.includes(item._id),
        );
      })
      .addCase(fetchFavoriteNotices.pending, handlePending)
      .addCase(fetchFavoriteNotices.rejected, handleRejected)
      .addCase(fetchFavoriteNotices.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      });
  },
});

export default favoriteSlice.reducer;
