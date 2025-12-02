import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchNews = createAsyncThunk(
  'news/fetchAll',
  async ({ page = 1, limit = 6, keyword = '' } = {}, thunkAPI) => {
    try {
      const res = await api.get('/news', {
        params: { page, limit, keyword },
      });
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
