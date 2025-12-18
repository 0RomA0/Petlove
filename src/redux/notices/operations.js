import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchNotices = createAsyncThunk(
  'notices/fetchAll',
  async (
    {
      page = 1,
      limit = 6,
      keyword = '',
      category = '',
      sex = '',
      species = '',
      byPrice = false,
      byPopularity = false,
    } = {},
    thunkAPI,
  ) => {
    try {
      const params = { page, limit, keyword, category, sex, species };

      if (byPrice) params.byPrice = true;
      if (byPopularity) params.byPopularity = true;

      const res = await api.get('/notices', { params });
      // console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addFavorite = (id) => {
  return api.post(`/notices/favorites/add/${id}`);
};

export const removeFavorite = (id) => {
  return api.delete(`/notices/favorites/remove/${id}`);
};
