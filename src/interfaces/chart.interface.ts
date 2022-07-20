import { ReactNode } from "react";
import { IDimCustomer, IFactData } from "./data.interface";

export type IIconsList<T> = { [key in keyof T]: ReactNode };

export type XAxisType = keyof IDimCustomer;
export type YAxisType = keyof IFactData;
export type ZAxisType = keyof IDimCustomer;

export enum ChartType {
  bar = "bar",
  pie = "pie",
  line = "line",
  scatter = "scatter",
  geo = "geo",
}

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
