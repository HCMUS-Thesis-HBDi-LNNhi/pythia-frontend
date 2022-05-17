import React from "react";

export interface INumberData {
  label: string;
  value: number;
  report: string;
  key: string;
  description?: string;
}

export interface IChartData {
  label: string;
  chart: React.ReactNode;
  description?: string;
}
