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

import {
  ChartType,
  IChartOptions,
  IDataset,
  IScatterDataset,
} from "interfaces/chart.interface";
import {
  IData,
  CategoryDataLabels,
  FactDataLabels,
} from "interfaces/data.interface";
import { useEffect, useState } from "react";
import { getXKeys } from "utils/handleData";
import { getDatasets, getLabels } from "./helper";
import BarChart from "./bar";
import GeoChart from "./geo";
import LineChart from "./line";
import PieChart from "./pie";
import ScatterChart from "./scatter";

interface Props {
  data: IData;
  chartType: ChartType;
  chartOptions: IChartOptions;
}

export default function ChartBody(props: Props): JSX.Element {
  const { data, chartType, chartOptions } = props;
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataset[] | IScatterDataset[]>([]);

  useEffect(() => {
    const xKeys = getXKeys(data, chartOptions);
    setLabels(getLabels(xKeys, chartOptions));
    setDatasets(getDatasets(xKeys, data, chartType, chartOptions));
  }, [data, chartOptions, chartType]);

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
}
