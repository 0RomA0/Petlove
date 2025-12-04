import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchNotices = createAsyncThunk(
  'notices/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/notices', {});
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
