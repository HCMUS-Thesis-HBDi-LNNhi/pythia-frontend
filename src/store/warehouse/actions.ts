import { IData } from "interfaces/data.interface";
import { AnyAction, Dispatch } from "redux";

export const UPDATE_WAREHOUSE = "[warehouse] update";

export const updateWarehouse =
  (warehouse: IData) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch({ type: UPDATE_WAREHOUSE, warehouse });
  };
