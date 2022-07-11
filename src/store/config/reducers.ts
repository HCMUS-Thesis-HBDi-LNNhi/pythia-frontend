import { AnyAction } from "redux";
import * as actions from "./actions";

const initialState = {
  userID: "",
};

export const configReducers = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.UPDATE_USER_ID:
      return Object.assign({}, state, { userID: action.userID });
    default:
      return state;
  }
};
