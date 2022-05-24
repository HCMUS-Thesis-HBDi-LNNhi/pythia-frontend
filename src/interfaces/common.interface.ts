import {
  ICustomerDemographic,
  ICustomerTransaction,
} from "interfaces/report.interface";
import React from "react";

export type ViewMode = "guest" | "user";

export type ButtonStyle = "outline" | "solid" | "failure" | "highlight";

export enum ChartType {
  "bar" = "bar",
  "pie" = "pie",
  "line" = "line",
  "scatter" = "scatter",
  "geo" = "geo",
}

export type ScatterDataType = { x: number; y: number };

export type MetricType =
  | keyof ICustomerDemographic
  | keyof ICustomerTransaction;

export enum PageLabels {
  LOGIN = "login",
  HOME = "home",
  CHARTS = "charts",
  PROFILE = "profile",
  SEGMENTATION = "segmentation",
  POTENTIALITY = "potentiality",
}
export interface IMenuItem {
  label: PageLabels | "log out";
  icon: React.ReactNode;
}

export interface ILoginMethod {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export enum TagColor {
  gray,
  red,
  green,
  blue,
}

export interface IChart {
  label: string;
  type: ChartType;
  icon?: React.ReactNode;
  focusIcon?: React.ReactNode;
}

export type SelectValue = string | number | readonly string[] | undefined;
export interface ISelectItem {
  label: string;
  id: string;
  value: SelectValue;
  disabled?: boolean;
}
