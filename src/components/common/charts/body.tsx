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
import { useEffect, useState } from "react";
import { getXKeys, handle2DData } from "utils/handleData";
import BarChart from "./bar";
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
  ArcElement
);

interface Props {
  data: IData;
  chartType: ChartType;
  chartOptions: IChartOptions;
}

export default function ChartBody(props: Props): JSX.Element {
  const { data, chartType, chartOptions } = props;

  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataset[]>([]);
  const [scatterDatasets, setScatterDatasets] = useState<IScatterDataset[]>([]);

  const getLabels = (xKeys: string[], chartOptions: IChartOptions) => {
    switch (chartOptions.x) {
      case "date_key":
        setLabels(xKeys.map((value) => `Q${value.replace("_", "/")}`));
        break;
      case "dob":
        setLabels(["Teen", "Young adult", "Adult", "Elder"]);
        break;
      case "gender":
        setLabels(["Female", "Male", "Others"]);
        break;
      default:
        setLabels(xKeys);
        break;
    }
  };

  const getDatasets = (
    xKeys: string[],
    data: IData,
    chartType: ChartType,
    chartOptions: IChartOptions
  ) => {
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
        setScatterDatasets(newDatasets);
      } else {
        const inputValues = Array.from(input.values());
        setDatasets([
          {
            label: CategoryDataLabels[chartOptions.x],
            data: inputValues.map((value) => value[0]),
          },
        ]);
      }
    }
  };

  useEffect(() => {
    const xKeys = getXKeys(data, chartOptions);
    getLabels(xKeys, chartOptions);
    getDatasets(xKeys, data, chartType, chartOptions);
  }, [data, chartOptions, chartType]);

  switch (chartType) {
    case ChartType.bar:
      return (
        <BarChart
          labels={labels}
          datasets={datasets}
          xLabel={CategoryDataLabels[chartOptions.x]}
          yLabel={FactDataLabels[chartOptions.y]}
        />
      );
    case ChartType.line:
      return (
        <LineChart
          labels={labels}
          datasets={datasets}
          xLabel={CategoryDataLabels[chartOptions.x]}
          yLabel={FactDataLabels[chartOptions.y]}
        />
      );
    case ChartType.pie:
      return (
        <>
          {datasets.map((dataset) => (
            <PieChart labels={labels} datasets={dataset} key={dataset.label} />
          ))}
        </>
      );
    case ChartType.scatter:
      return (
        <ScatterChart
          datasets={scatterDatasets}
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.total_amount}
        />
      );
    case ChartType.geo:
      return <div>WIP</div>;
    default:
      return <div>Wrong chart type</div>;
  }
}
