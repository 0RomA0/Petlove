import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

const setAuthHeader = (values) => {
  api.defaults.headers.common.Authorization = values;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (values, thunkAPI) => {
    try {
      const res = await api.post('/users/signup', values);

      setAuthHeader(`Bearer ${res.data.token}`);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logInUser = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const res = await api.post('/users/signin', values);

      setAuthHeader(`Bearer ${res.data.token}`);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/users/signout');
      api.defaults.headers.common.Authorization = '';
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userToken = state.auth.token;

    setAuthHeader(`Bearer ${userToken}`);

    try {
      const response = await api.get('/users/current');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();

      return state.auth.token !== null;
    },
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUserFull',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/users/current');
      // console.log('Current user:', data);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const getCurrentUserFull = createAsyncThunk(
  'auth/getCurrentUserFull',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/users/current/full');
      // console.log('Current user full:', data);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const AddPet = createAsyncThunk(
  'auth/AddPet',
  async (petData, thunkAPI) => {
    try {
      const data = await api.post('/users/current/pets/add', petData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deletePet = createAsyncThunk(
  'auth/DeletePet',
  async (id, thunkAPI) => {
    try {
      const data = await api.delete(`/users/current/pets/remove/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
