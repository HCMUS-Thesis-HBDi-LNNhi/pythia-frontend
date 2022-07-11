import {
  IBGNBDResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { AnyAction, Dispatch } from "redux";

export const UPDATE_RFM_RESULT = "[segmentation] update rfm result";
export const UPDATE_BGNBD_RESULT = "[segmentation] update bgnbd result";

export const updateRFMResult =
  (rfmResult: IRFMResponse) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch({ type: UPDATE_RFM_RESULT, rfmResult });
  };

export const updateBGNBDResult =
  (bgnbdResult: IBGNBDResponse) => (dispatch: Dispatch<AnyAction>) => {
    return dispatch({ type: UPDATE_RFM_RESULT, bgnbdResult });
  };
