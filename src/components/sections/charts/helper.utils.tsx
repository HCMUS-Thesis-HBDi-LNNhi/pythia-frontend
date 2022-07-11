import { ChartType, IChartOptions, IDataset } from "interfaces/chart.interface";
import { CategoryDataLabels, IData } from "interfaces/data.interface";
import { handle2DData } from "utils/handleData";

export const getLabels = (xKeys: string[], chartOptions: IChartOptions) => {
  switch (chartOptions.x) {
    case "date_key":
      return xKeys.map((value) => `Q${value.replace("_", "/")}`);
    case "dob":
      return ["Under 18", "18 to 25", "26 to 65", "Over 65"];
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
): IDataset[] => {
  const input = handle2DData(data, chartType, chartOptions, xKeys);
  const entries = Array.from(input.entries());
  if (chartType === ChartType.scatter || chartType === ChartType.geo) {
    return entries.map(([label, data]) => ({ label, data }));
  } else {
    return [
      {
        label: CategoryDataLabels[chartOptions.x],
        data: entries.map(([_, data]) => data[0]),
      },
    ];
  }
};

// TODO: Handle get 3D datasets
export const get3DDatasets = () => {
  return [];
};
