import { IData } from "./data.interface";
import { IBGNBDResponse, IRFMResponse } from "./segmentation.interface";

export interface IState {
  warehouse: IData;
  segmentation: {
    rfmResult: IRFMResponse;
    bgnbdResult: IBGNBDResponse;
  };
  config: {
    userID: string;
  };
}
