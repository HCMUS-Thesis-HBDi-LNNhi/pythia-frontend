import {
  initialBGNBDResponse,
  initialRFMResponse,
} from "interfaces/segmentation.interface";
import { ISegmentation } from "interfaces/store.interface";
import { AnyAction } from "redux";
import * as actions from "./actions";

export const segmentationInitialState: ISegmentation = {
  rfmResult: initialRFMResponse,
  bgnbdResult: initialBGNBDResponse,
};

export const segmentationReducers = (
  state = segmentationInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actions.UPDATE_RFM_RESULT:
      return { ...state, rfmResult: action.rfmResult };
    case actions.UPDATE_BGNBD_RESULT:
      return { ...state, bgnbdResult: action.bgnbdResult };
    default:
      return state;
  }
};
