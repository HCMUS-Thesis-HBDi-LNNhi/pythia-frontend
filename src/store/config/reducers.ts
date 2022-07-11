import { IConfig } from "interfaces/store.interface";
import { AnyAction } from "redux";
import * as actions from "./actions";

export const configInitialState: IConfig = {
  userID: "",
};

export const configReducers = (
  state = configInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actions.UPDATE_USER_ID:
      return Object.assign({}, state, { userID: action.userID });
    default:
      return state;
  }
};
