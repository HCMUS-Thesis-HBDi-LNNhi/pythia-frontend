import { IData } from "./data.interface";
import { IBGNBDResponse, IRFMResponse } from "./segmentation.interface";

export interface ISegmentation {
  rfmResult: IRFMResponse;
  bgnbdResult: IBGNBDResponse;
}

export interface IConfig {
  userID: string;
}

export interface IState {
  warehouse: IData;
  segmentation: ISegmentation;
  config: IConfig;
}
