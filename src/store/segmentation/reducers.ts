import {
  initialBGNBDResponse,
  initialRFMResponse,
} from "interfaces/segmentation.interface";
import { AnyAction } from "redux";
import * as actions from "./actions";

const initialState = {
  rfmResult: initialRFMResponse,
  bgnbdResult: initialBGNBDResponse,
};

export const segmentationReducers = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actions.UPDATE_RFM_RESULT:
      return Object.assign({}, state, { rfmResult: action.rfmResult });
    case actions.UPDATE_BGNBD_RESULT:
      return Object.assign({}, state, { bgnbdResult: action.bgnbdResult });
    default:
      return state;
  }
};
