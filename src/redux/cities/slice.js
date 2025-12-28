import { createSlice } from '@reduxjs/toolkit';
import { fetchCities } from './operations';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    options: [],
    loading: false,
    error: null,
    selectedCity: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    clearCity: (state) => {
      state.selectedCity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCity, clearCity } = citiesSlice.actions;
export default citiesSlice.reducer;
