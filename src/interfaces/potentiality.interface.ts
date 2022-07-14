import { IDimCustomer } from "./data.interface";

export interface IClassify {
  customer_id: string;
  labels: number;
}
export interface IResult {
  result: IClassify[];
  customer: IDimCustomer[];
}
