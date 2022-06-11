import {
  ChartType,
  IChart,
  IChartOptions,
  ReportLabel,
} from "interfaces/chart.interface";
import { ISelectItem } from "interfaces/common.interface";
import icons from "./icons.const";

const CURRENT_YEAR = new Date().getFullYear();

export const ChartColor = [
  "red",
  "green",
  "orange",
  "darkblue",
  "gold",
  "brown",
  "turquoise",
  "black",
  "pink",
  "purple",
  "teal",
];

export const initialChartOptions: IChartOptions = {
  y: "total_amount",
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
    label: "Line chart",
    type: ChartType.line,
    icon: icons.outline.line_chart,
    focusIcon: icons.solid.line_chart,
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
    label: "Geo chart",
    type: ChartType.geo,
    icon: icons.outline.geo_chart,
    focusIcon: icons.solid.geo_chart,
  },
];

export const ChartSelectOptions: ISelectItem[] = [
  {
    label: "Bar chart",
    id: ChartType.bar,
    value: ChartType.bar,
  },
  {
    label: "Line chart",
    id: ChartType.line,
    value: ChartType.line,
  },
  {
    label: "Pie chart",
    id: ChartType.pie,
    value: ChartType.pie,
  },
  {
    label: "Scatter chart",
    id: ChartType.scatter,
    value: ChartType.scatter,
  },
  {
    label: "Geo chart",
    id: ChartType.geo,
    value: ChartType.geo,
  },
];

export const ReportOptions: ISelectItem[] = [
  {
    label: ReportLabel.segmentation,
    id: "segmentation",
    value: "segmentation",
  },
  {
    label: ReportLabel.potentiality,
    id: "potentiality",
    value: "potentiality",
  },
];

export const PotentialityOptions: ISelectItem[] = [
  { label: "Age", id: "age", value: "age" },
  { label: "Gender", id: "gender", value: "gender" },
  { label: "Country", id: "country", value: "country" },

  { label: "City", id: "city", value: "city" },
  { label: "Job Title", id: "jobTitle", value: "jobTitle" },
  { label: "Job Industry", id: "jobIndustry", value: "jobIndustry" },
  {
    label: "Wealth Segment",
    id: "wealthSegment",
    value: "wealthSegment",
  },
];

export const SegmentationOptions: ISelectItem[] = [
  ...PotentialityOptions,
  {
    label: "Transaction Date",
    id: "transactionDate",
    value: "transactionDate",
  },
  {
    label: "Transaction Amount",
    id: "transactionAmount",
    value: "transactionAmount",
  },
];
