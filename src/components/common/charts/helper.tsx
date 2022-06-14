import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import {
  ChoroplethController,
  ProjectionScale,
  ColorScale,
  GeoFeature,
} from "chartjs-chart-geo";
import {
  ChartType,
  IChartOptions,
  IDataset,
  IScatterDataset,
} from "interfaces/chart.interface";
import {
  CategoryDataLabels,
  FactDataLabels,
  IData,
} from "interfaces/data.interface";
import { handle2DData } from "utils/handleData";
import BarChart from "./bar";
import GeoChart from "./geo";
import LineChart from "./line";
import PieChart from "./pie";
import ScatterChart from "./scatter";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  ChoroplethController,
  ProjectionScale,
  ColorScale,
  GeoFeature
);

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

export const getChosenChart = (
  chartType: ChartType,
  labels: string[],
  datasets: IDataset[] | IScatterDataset[],
  chartOptions: IChartOptions
) => {
  switch (chartType) {
    case ChartType.bar:
      return (
        <BarChart
          labels={labels}
          //@ts-ignore
          datasets={datasets}
          xLabel={CategoryDataLabels[chartOptions.x]}
          yLabel={FactDataLabels[chartOptions.y]}
        />
      );

    case ChartType.line:
      return (
        <LineChart
          labels={labels}
          //@ts-ignore
          datasets={datasets}
          xLabel={CategoryDataLabels[chartOptions.x]}
          yLabel={FactDataLabels[chartOptions.y]}
        />
      );
    case ChartType.pie:
      return (
        <>
          {datasets.map((dataset) => (
            <PieChart
              labels={labels}
              //@ts-ignore
              datasets={dataset}
              key={dataset.label}
            />
          ))}
        </>
      );
    case ChartType.scatter:
      return (
        <ScatterChart
          //@ts-ignore
          datasets={datasets}
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.total_amount}
        />
      );
    case ChartType.geo:
      return <GeoChart />;
    default:
      return <div>Wrong chart type</div>;
  }
};
