import { configureStore } from '@reduxjs/toolkit';
import NewsReducer from './news/slice';
import FriendsReducer from './friends/slice';
import NoticesReducer from './notices/slice';
import AuthReducer from './auth/slice';
import FiltersReducer from './filters/slice';
import FavoritesReducer from './favorites/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'user-token',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['ids'],
};

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  FavoritesReducer,
);

export const store = configureStore({
  reducer: {
    news: NewsReducer,
    friends: FriendsReducer,
    notices: NoticesReducer,
    auth: persistedAuthReducer,
    filters: FiltersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
