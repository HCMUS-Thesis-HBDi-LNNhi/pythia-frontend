import { IReport } from "interfaces/report.interface";
import { ChartType, MetricType } from "./common.interface";

export interface INumberData {
  label: string;
  report: keyof IReport;
  metric: MetricType;
}

export interface IChartData {
  label: string;
  report: keyof IReport;
  metric: MetricType;
  chartType: ChartType;
}
