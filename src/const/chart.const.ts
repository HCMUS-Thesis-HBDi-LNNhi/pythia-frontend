import { ChartType, IChart, ISelectItem } from "interfaces/common.interface";
import icons from "./icons.const";

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

export const ChartOptions: ISelectItem[] = [
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
