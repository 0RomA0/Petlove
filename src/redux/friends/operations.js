import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchFriends = createAsyncThunk(
  'friends/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/friends');
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
