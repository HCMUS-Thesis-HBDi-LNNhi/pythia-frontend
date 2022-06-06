export enum RetainModel {
  bg_nbd,
  rfm,
}

export interface IRFMResult {
  cluster_id: { [key: number]: number };
  customer_id: { [key: number]: string };
  num_trans: { [key: number]: number };
  recency: { [key: number]: number };
  total_amount: { [key: number]: number };
}

export interface IRFMResponse {
  account_id: string;
  clv: number[];
  in_progress: boolean;
  rfm: IRFMResult;
}

export const initialRFMResponse: IRFMResponse = {
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
