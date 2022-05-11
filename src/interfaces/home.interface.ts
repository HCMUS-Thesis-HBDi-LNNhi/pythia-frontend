import React from "react";

export interface INumberData {
  label: string;
  value: number;
  description?: string;
}

export interface IChartData {
  label: string;
  chart: React.ReactNode;
  description?: string;
}
