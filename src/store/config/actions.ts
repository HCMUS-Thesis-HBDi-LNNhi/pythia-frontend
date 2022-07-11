import { AnyAction, Dispatch } from "redux";

export const UPDATE_USER_ID = "[segmentation] update user id";

export const updateUserID =
  (userID: string) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch({ type: UPDATE_USER_ID, userID });
  };
