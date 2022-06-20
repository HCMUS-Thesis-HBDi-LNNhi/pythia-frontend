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
import { get2DDatasets, get3DDatasets, getLabels } from "./helper";
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
    const newDatasets = chartOptions.z
      ? get3DDatasets()
      : get2DDatasets(xKeys, data, chartType, chartOptions);
    setDatasets(newDatasets);
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
      //@ts-ignore
      return <GeoChart datasets={datasets} />;
    default:
      return <div>Wrong chart type</div>;
  }
}
