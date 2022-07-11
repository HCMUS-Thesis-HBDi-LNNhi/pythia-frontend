import { AnyAction, Dispatch } from "redux";

export const RESET = "[root] reset";

export const reset = () => (dispatch: Dispatch<AnyAction>) => {
  return dispatch({ type: RESET });
};
