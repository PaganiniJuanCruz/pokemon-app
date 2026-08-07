import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { pokemonApi } from "../api/pokemonApi";
import favoritesReducer from "../features/favorites/favoritesSlice";
import filtersReducer from "../features/filters/filtersSlice";

const apiCacheTransform = createTransform(
  (inboundState) => {
    const rest = { ...inboundState };
    delete rest.subscriptions;
    return rest;
  },
  (outboundState) => ({
    ...outboundState,
    subscriptions: {},
  }),
  { whitelist: [pokemonApi.reducerPath] },
);

const apiPersistConfig = {
  key: pokemonApi.reducerPath,
  storage,
  transforms: [apiCacheTransform],
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: persistReducer(
    apiPersistConfig,
    pokemonApi.reducer,
  ),
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
