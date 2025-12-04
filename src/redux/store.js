import { configureStore } from '@reduxjs/toolkit';
import NewsReducer from './news/slice';
import FriendsReducer from './friends/slice';
import NoticesReducer from './notices/slice';

// import FiltersReducer from './filters/slice';
// import FavoritesReducer from './favorites/slice';

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

export const store = configureStore({
  reducer: {
    news: NewsReducer,
    friends: FriendsReducer,
    notices: NoticesReducer,
  },
});
