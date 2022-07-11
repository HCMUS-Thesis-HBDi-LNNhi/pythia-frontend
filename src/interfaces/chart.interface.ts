import { IDimCustomer, IFactData } from "./data.interface";

export type MetricType =
  | keyof ICustomerDemographic
  | keyof ICustomerTransaction;

export enum ChartType {
  bar = "bar",
  pie = "pie",
  line = "line",
  scatter = "scatter",
  geo = "geo",
}

export type ScatterDataType = { x: number; y: number };

export interface IMapJson {
  [key: string]: {
    url: string;
    objectsKey: string;
    propertiesKey: string;
  };
}

export interface IFeature {
  geometry: { type: string; coordinates: any };
  id: string;
  properties: { [key: string]: string };
  type: string;
}

export interface IChart {
  label: string;
  type: ChartType;
  icon?: React.ReactNode;
  focusIcon?: React.ReactNode;
}

export interface IChartYear {
  from: number;
  to: number;
}

export type XAxisType = keyof IDimCustomer | "date_key";
export type YAxisType = keyof IFactData;
export type ZAxisType = keyof IDimCustomer;

export interface IChartOptions {
  x: XAxisType;
  y: YAxisType;
  z?: ZAxisType;
  years: IChartYear;
  quarters: IChartYear;
}

export interface IChartData extends IChartOptions {
  id: string;
  chartType: ChartType;
}

export interface IChartPayload {
  user_id: string;
  chart_type: ChartType;
  from_date: string;
  to_date: string;
  x: string;
  y: string;
  z?: string;
}

export interface IChartResponse extends IChartPayload {
  id: string;
}

export interface IDataset {
  label: string;
  data: number[];
}

export interface ICustomerDemographic {
  customerID: string;
  // dob: Date; => receive dob from DB & calculate age ???
  age: number;
  gender: number;
  country: string;
  city: string;
  jobTitle: string;
  jobIndustry: string;
  wealthSegment: string;
}

export interface ICustomerTransaction {
  customerID: string;
  transactionDate: Date;
  transactionAmount: number;
}

export interface IReport {
  segmentation: ICustomerDemographic | ICustomerTransaction;
  potentiality: ICustomerDemographic;
}

export enum ReportLabel {
  segmentation = "Segmentation Report",
  potentiality = "Potentiality Report",
}
