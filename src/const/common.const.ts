import { IChartType } from "interfaces/common.interface";
import icons from "./icons.const";

export const ChartTypes: IChartType[] = [
  {
    label: "Bar chart",
    icon: icons.outline.bar_chart,
    focusIcon: icons.solid.bar_chart,
  },
  {
    label: "Line chart",
    icon: icons.outline.line_chart,
    focusIcon: icons.solid.line_chart,
  },
  {
    label: "Pie chart",
    icon: icons.outline.pie_chart,
    focusIcon: icons.solid.pie_chart,
  },
  {
    label: "Scatter chart",
    icon: icons.outline.scatter_chart,
    focusIcon: icons.outline.scatter_chart,
  },
  {
    label: "Geo chart",
    icon: icons.outline.geo_chart,
    focusIcon: icons.solid.geo_chart,
  },
];
