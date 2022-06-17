import {
  ChartType,
  IChartOptions,
  IDataset,
  IScatterDataset,
} from "interfaces/chart.interface";
import { CategoryDataLabels, IData } from "interfaces/data.interface";
import { handle2DData } from "utils/handleData";

export const getLabels = (xKeys: string[], chartOptions: IChartOptions) => {
  switch (chartOptions.x) {
    case "date_key":
      return xKeys.map((value) => `Q${value.replace("_", "/")}`);
    case "dob":
      return ["Teen", "Young adult", "Adult", "Elder"];
    case "gender":
      return ["Female", "Male", "Others"];
    default:
      return xKeys;
  }
};

export const getDatasets = (
  xKeys: string[],
  data: IData,
  chartType: ChartType,
  chartOptions: IChartOptions
): IDataset[] | IScatterDataset[] => {
  // 3D charts
  if (chartOptions.z) {
    //TODO: Implement 3D charts
  }
  // 2D charts
  else {
    const input = handle2DData(data, chartType, chartOptions, xKeys);
    //FIXME: Better scatter chart
    if (chartType === ChartType.scatter) {
      const newDatasets: IScatterDataset[] = [];
      input.forEach((value, key) => {
        newDatasets.push({
          label: key,
          data: [{ x: value[0], y: value[1] }],
        });
      });
      return newDatasets;
    } else {
      const inputValues = Array.from(input.values());
      return [
        {
          label: CategoryDataLabels[chartOptions.x],
          data: inputValues.map((value) => value[0]),
        },
      ];
    }
  }
  return [];
};
