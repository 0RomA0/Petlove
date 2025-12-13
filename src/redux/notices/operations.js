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
    } = {},
    thunkAPI,
  ) => {
    try {
      const res = await api.get('/notices', {
        params: { page, limit, keyword, category, sex, species },
      });
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
