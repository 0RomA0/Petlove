import { createSlice } from '@reduxjs/toolkit';
import { fetchFriends } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, handlePending)
      .addCase(fetchFriends.rejected, handleRejected)
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      });
  },
});

export default friendsSlice.reducer;
