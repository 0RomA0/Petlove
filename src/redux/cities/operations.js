import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchCities = createAsyncThunk(
  'cities/fetch',
  async (keyword, thunkAPI) => {
    try {
      if (!keyword || keyword.length < 3) return [];
      const { data } = await api.get(`/cities`, {
        params: { keyword },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
