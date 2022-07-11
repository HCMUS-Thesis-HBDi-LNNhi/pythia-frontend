import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { configReducers } from "./config/reducers";
import { segmentationReducers } from "./segmentation/reducers";
import { warehouseReducers } from "./warehouse/reducers";

export const store = configureStore({
  reducer: combineReducers({
    warehouse: warehouseReducers,
    segmentation: segmentationReducers,
    config: configReducers,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const wrapper = createWrapper(() => store);
