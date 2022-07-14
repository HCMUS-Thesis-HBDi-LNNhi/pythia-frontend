import { ChartType, IChartOptions, IDataset } from "interfaces/chart.interface";
import {
  IData,
  CategoryDataLabels,
  FactDataLabels,
} from "interfaces/data.interface";
import { useEffect, useState } from "react";
import { SingleBarChart } from "./bar.component";
import { SingleLineChart } from "./line.component";
import PieChart from "./pie.component";
import ScatterChart from "./scatter.component";
import GeoChart from "./geo.component";
import { getLabels, handle2DData } from "utils/handleData";

interface Props {
  data: IData;
  chartType: ChartType;
  chartOptions: IChartOptions;
}

export default function ChartBody(props: Props): JSX.Element {
  const { data, chartType, chartOptions } = props;
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataset[]>([]);

  function renderChart(): JSX.Element {
    switch (chartType) {
      case ChartType.bar:
        return (
          <SingleBarChart
            labels={labels}
            datasets={datasets}
            xLabel={CategoryDataLabels[chartOptions.x]}
            yLabel={FactDataLabels[chartOptions.y]}
          />
        );

      case ChartType.line:
        return (
          <SingleLineChart
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
              <PieChart
                labels={labels}
                datasets={dataset}
                key={dataset.label}
              />
            ))}
          </>
        );
      case ChartType.scatter:
        return (
          <ScatterChart
            datasets={datasets}
            xLabel={FactDataLabels.num_trans}
            yLabel={FactDataLabels.total_amount}
            category={chartOptions.x}
          />
        );
      case ChartType.geo:
        return <GeoChart datasets={datasets} />;
      default:
        return <div>Wrong chart type</div>;
    }
  }

  useEffect(() => {
    const keys = getLabels(data, chartOptions);
    setLabels(keys);
    const formattedDatasets = handle2DData(data, chartType, chartOptions, keys);
    setDatasets(formattedDatasets);
  }, [data, chartOptions, chartType]);

  return renderChart();
}
