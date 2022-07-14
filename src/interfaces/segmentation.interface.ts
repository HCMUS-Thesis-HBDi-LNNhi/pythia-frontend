export enum RetainModel {
  bg_nbd,
  rfm,
}

export interface IRFM {
  cluster_id: { [key: number]: number };
  customer_id: { [key: number]: number };
  num_trans: { [key: number]: number };
  recency: { [key: number]: number };
  total_amount: { [key: number]: number };
}

export interface IRFMResults {
  account_id: string;
  clv: number[];
  in_progress: boolean;
  rfm: IRFM;
}

export interface IRFMResponse {
  rfm_result: IRFMResults;
  status: string;
}

export const initRFMResult: IRFMResults = {
  account_id: "",
  clv: [],
  in_progress: true,
  rfm: {
    cluster_id: {},
    customer_id: {},
    num_trans: {},
    recency: {},
    total_amount: {},
  },
};

export interface IBGNBD {
  T: number;
  id: string;
  predict: number;
  t_x: number;
  x: number;
}

export interface IBGNBDResult {
  account_id: string;
  bgnbd: IBGNBD[];
}

export interface IBGNBDResponse {
  bg_nbd_result: IBGNBDResult;
  status: string;
}

export const initBGNBDResult: IBGNBDResult = {
  account_id: "",
  bgnbd: [],
};
