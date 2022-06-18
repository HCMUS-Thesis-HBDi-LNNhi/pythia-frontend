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

export const get2DDatasets = (
  xKeys: string[],
  data: IData,
  chartType: ChartType,
  chartOptions: IChartOptions
): IDataset[] | IScatterDataset[] => {
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
  } else if (chartType === ChartType.geo) {
    return Array.from(input.entries()).map((value) => ({
      label: value[0],
      data: value[1],
    }));
  } else {
    const inputValues = Array.from(input.values());
    return [
      {
        label: CategoryDataLabels[chartOptions.x],
        data: inputValues.map((value) => value[0]),
      },
    ];
  }
};

// TODO: Handle get 3D datasets
export const get3DDatasets = () => {
  return [];
};
