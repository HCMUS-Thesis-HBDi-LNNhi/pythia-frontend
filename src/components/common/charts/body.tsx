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
import { ChartType, IChartOptions } from "interfaces/chart.interface";
import {
  CategoryDataLabels,
  FactDataLabels,
  IData,
} from "interfaces/data.interface";
import { getCategoryLabels } from "utils/category";
import { normalizedData } from "utils/handleData";
import BarChart from "./bar";
import LineChart from "./line";
import PieChart from "./pie";

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
  const input = normalizedData(props.data, props.chartType, props.chartOptions);
  const labels = input.xKeys;
  const datasets: { label: string; data: number[] }[] = [];
  input.result.forEach((value, key) =>
    datasets.push({
      label: getCategoryLabels(
        props.chartOptions.x === "date_key" ? "gender" : props.chartOptions.x,
        key
      ),
      data: Object.values(value),
    })
  );

  switch (props.chartType) {
    case ChartType.bar:
      return (
        <BarChart
          labels={labels}
          datasets={datasets}
          xLabel={CategoryDataLabels[props.chartOptions.x]}
          yLabel={FactDataLabels[props.chartOptions.y]}
        />
      );
    case ChartType.line:
      return (
        <LineChart
          labels={labels}
          datasets={datasets}
          xLabel={CategoryDataLabels[props.chartOptions.x]}
          yLabel={FactDataLabels[props.chartOptions.y]}
        />
      );
    case ChartType.pie:
      return <PieChart labels={labels} datasets={datasets} />;
    case ChartType.scatter:
    case ChartType.geo:
      return <div>WIP</div>;
    default:
      return <div>Wrong chart type</div>;
  }
}
