import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  logInUser,
  logOutUser,
  refreshUser,
  getCurrentUserFull,
  updateUser,
  // getCurrentUser,
  AddPet,
  deletePet,
} from './operations';
const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    pets: [],
    noticesFavorites: [],
    noticesViewed: [],
    loading: false,
    error: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logInUser.pending, handlePending)
      .addCase(logInUser.rejected, handleRejected)
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOutUser.pending, handlePending)
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(getCurrentUserFull.pending, handlePending)
      .addCase(getCurrentUserFull.rejected, handleRejected)
      .addCase(getCurrentUserFull.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.noticesFavorites = action.payload.noticesFavorites;
        state.noticesViewed = action.payload.noticesViewed;
        state.pets = action.payload.pets;
      })
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(AddPet.pending, handlePending)
      .addCase(AddPet.rejected, handleRejected)
      .addCase(AddPet.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.pets.push(action.payload);
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter((pet) => pet._id !== action.payload);
      });
    // .addCase(getCurrentUser.pending, handlePending)
    //   .addCase(getCurrentUser.rejected, handleRejected)
    //   .addCase(getCurrentUser.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = null;
    //     state.user = action.payload;
    //     state.noticesFavorites = action.payload.noticesFavorites;
    //     state.noticesViewed = action.payload.noticesViewed;
    //   });
  },
});

export default usersSlice.reducer;
