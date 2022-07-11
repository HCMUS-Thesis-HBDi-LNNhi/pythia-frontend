import { IState } from "interfaces/store.interface";
import { AnyAction } from "redux";
import { configInitialState } from "store/config/reducers";
import { segmentationInitialState } from "store/segmentation/reducers";
import { warehouseInitialState } from "store/warehouse/reducers";
import { RESET } from "./actions";

const rootInitialState: IState = {
  warehouse: warehouseInitialState,
  segmentation: segmentationInitialState,
  config: configInitialState,
};

export const rootReducers = (state = rootInitialState, action: AnyAction) => {
  switch (action.type) {
    case RESET:
      return rootInitialState;
    default:
      return state;
  }
};
