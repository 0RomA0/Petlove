import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (id, thunkAPI) => {
    try {
      const res = await api.post(`/notices/favorites/add/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/notices/favorites/remove/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchFavoriteNotices = createAsyncThunk(
  'favorites/fetchNotices',
  async (ids, thunkAPI) => {
    try {
      const requests = ids.map((id) =>
        api.get(`/notices/${id}`).then((res) => res.data),
      );
      return Promise.all(requests);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
