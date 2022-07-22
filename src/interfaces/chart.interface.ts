import MAP_JSON from "const/map.const";
import { ReactNode } from "react";

export type IIcons = { [key: string]: ReactNode };

export type MAP_JSON_KEY = keyof typeof MAP_JSON;

export enum ChartType {
  bar = "bar",
  pie = "pie",
  line = "line",
  scatter = "scatter",
  geo = "geo",
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
  x: string;
  y: string;
  z?: string;
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

export interface IScatterDataset {
  label: string;
  data: { x: number; y: number }[];
}
