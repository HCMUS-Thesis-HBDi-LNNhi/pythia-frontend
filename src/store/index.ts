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
import { rootReducers } from "./root/reducers";

const persistConfig = {
  key: "store",
  storage,
};

const reducers = combineReducers({
  root: rootReducers,
  warehouse: warehouseReducers,
  segmentation: segmentationReducers,
  config: configReducers,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const wrapper = createWrapper(() => store);
