import { IData } from "interfaces/data.interface";
import { AnyAction } from "redux";
import * as actions from "./actions";

export const warehouseInitialState: IData = {
  fact_transactions: {},
  dim_customers: [],
  dim_dates: [],
};

export const warehouseReducers = (
  state = warehouseInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actions.UPDATE_WAREHOUSE:
      return Object.assign({}, state, action.warehouse);
    default:
      return state;
  }
};
