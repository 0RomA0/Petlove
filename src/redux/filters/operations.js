import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/notices/categories');

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchSex = createAsyncThunk('sex/fetch', async (_, thunkAPI) => {
  try {
    const res = await api.get('/notices/sex');

    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const fetchSpecies = createAsyncThunk(
  'species/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/notices/species');

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
