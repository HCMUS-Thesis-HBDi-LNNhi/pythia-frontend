import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { configReducers } from "./config/reducers";
import { segmentationReducers } from "./segmentation/reducers";
import { warehouseReducers } from "./warehouse/reducers";

const persistConfig = {
  key: "store",
  storage,
};

const reducers = combineReducers({
  warehouse: warehouseReducers,
  segmentation: segmentationReducers,
  config: configReducers,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const wrapper = createWrapper(() => store);
