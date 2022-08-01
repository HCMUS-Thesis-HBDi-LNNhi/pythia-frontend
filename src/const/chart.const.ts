import icons from "./icons.const";

import {
  ChartType,
  IChart,
  IChartOptions,
  IIcons,
} from "interfaces/chart.interface";
import { DateToNumber } from "utils/formatter.utils";

const CURRENT_YEAR = new Date().getFullYear();

export const initialChartOptions: IChartOptions = {
  y: "num_trans",
  x: "dob",
  years: { from: CURRENT_YEAR, to: CURRENT_YEAR },
  quarters: { from: 1, to: 4 },
};

export const ChartTypes: IChart[] = [
  {
    label: "Bar chart",
    type: ChartType.bar,
    icon: icons.outline.bar_chart,
    focusIcon: icons.solid.bar_chart,
  },
  {
    label: "Pie chart",
    type: ChartType.pie,
    icon: icons.outline.pie_chart,
    focusIcon: icons.solid.pie_chart,
  },
  {
    label: "Scatter chart",
    type: ChartType.scatter,
    icon: icons.outline.scatter_chart,
    focusIcon: icons.outline.scatter_chart,
  },
  {
    label: "Line chart",
    type: ChartType.line,
    icon: icons.outline.line_chart,
    focusIcon: icons.solid.line_chart,
  },
  {
    label: "Geo chart",
    type: ChartType.geo,
    icon: icons.outline.geo_chart,
    focusIcon: icons.solid.geo_chart,
  },
];

export const initCustomerIcons: IIcons = {
  dob: icons.outline.age,
  gender: icons.outline.gender,
  country: icons.outline.country,
  city: icons.outline.city,
  job_title: icons.outline.job_title,
  job_industry: icons.outline.job_industry,
  wealth_segment: icons.outline.wealth_segmentation,
  date_key: icons.outline.calendar,
};

export const initTransactionIcons: IIcons = {
  num_trans: icons.outline.transactions,
  total_amount: icons.outline.money,
};

export const transactionHeader =
  "customer_id,transaction_date,transaction_amount";
export const demographicHeader =
  "id,dob,gender,country,city,job_title,job_industry,wealth_segment";

export const DEFAULT_PREDICT_TIME = 365;
export const DEFAULT_END_DATE = DateToNumber(new Date());
