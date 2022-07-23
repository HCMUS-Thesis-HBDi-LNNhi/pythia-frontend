import { useEffect, useState } from "react";

import { SingleBarChart } from "./bar.component";
import { SingleLineChart } from "./line.component";
import PieChart from "./pie.component";
import ScatterChart from "./scatter.component";
import GeoChart from "./geo.component";

import { ChartType, IChartOptions } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

interface Props {
  data: IData;
  chartType: ChartType;
  chartOptions: IChartOptions;
  setChartOptions?: (value: IChartOptions) => void;
  isPinned?: boolean;
}

export default function ChartBody(props: Props): JSX.Element {
  const { data, chartType, chartOptions, setChartOptions, isPinned } = props;
  const [chartProps, setChartProps] = useState({ data, chartOptions });

  function renderChart(): JSX.Element {
    switch (chartType) {
      case ChartType.bar:
        return <SingleBarChart {...chartProps} />;
      case ChartType.line:
        return <SingleLineChart {...chartProps} />;
      case ChartType.pie:
        return <PieChart {...chartProps} />;
      case ChartType.scatter:
        return <ScatterChart {...chartProps} />;
      case ChartType.geo:
        return (
          <GeoChart
            {...chartProps}
            setChartOptions={setChartOptions}
            isPinned={isPinned}
          />
        );
      default:
        return <div>Wrong chart type</div>;
    }
  }

  useEffect(() => {
    setChartProps({ data, chartOptions });
  }, [props]);

  return renderChart();
}
