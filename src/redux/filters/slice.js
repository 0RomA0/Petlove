import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchSex, fetchSpecies } from './operations';
const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    query: '',
    categories: [],
    sex: [],
    species: [],
    isLoading: false,
    error: null,

    selectedCategory: '',
    selectedSex: '',
    selectedSpecies: '',
  },
  reducers: {
    changeFilter: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setGender: (state, action) => {
      state.selectedSex = action.payload;
    },
    setSpecies: (state, action) => {
      state.selectedSpecies = action.payload;
    },

    resetFilters: (state) => {
      state.selectedCategory = '';
      state.selectedSex = '';
      state.selectedSpecies = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.rejected, handleRejected)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSex.pending, handlePending)
      .addCase(fetchSex.rejected, handleRejected)
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.sex = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSpecies.pending, handlePending)
      .addCase(fetchSpecies.rejected, handleRejected)
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setCategory,
  setGender,
  setSpecies,
  resetFilters,
  changeFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
