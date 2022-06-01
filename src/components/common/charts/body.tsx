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
  FactDataLabels,
  Gender,
  IData,
  IDimCustomer,
  IFactData,
} from "interfaces/data.interface";
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
  quantitative: keyof IFactData;
  /** User defined */
  categorical: keyof IDimCustomer;
}

const xLabel = "Quarter";

const getCategoryLabels = (category: keyof IDimCustomer, key: string) => {
  switch (category) {
    case "gender":
      switch (key) {
        case "0":
          return "Female";
        case "1":
          return "Male";
        default:
          return "Others";
      }
    case "dob":
      switch (key) {
        case "0":
          return "Teen";
        case "1":
          return "Young adult";
        case "2":
          return "Adult";
        default:
          return "Elder";
      }
    default:
      return key;
  }
};

export default function ChartBody(props: Props): JSX.Element {
  const input = normalizedData(
    props.data,
    props.chartType,
    props.chartOptions,
    props.quantitative,
    props.categorical
  );

  const labels = input.dateKeys.map((value) => `Q${value.replace("_", "/")}`);

  const datasets: { label: string; data: number[] }[] = [];

  input.result.forEach((value, key) =>
    datasets.push({
      label: getCategoryLabels(props.categorical, key),
      data: Object.values(value),
    })
  );

  switch (props.chartType) {
    case ChartType.bar:
      return (
        <BarChart
          labels={labels}
          datasets={datasets}
          xLabel={xLabel}
          yLabel={FactDataLabels[props.quantitative]}
        />
      );
    case ChartType.line:
      return (
        <LineChart
          labels={labels}
          datasets={datasets}
          xLabel={xLabel}
          yLabel={FactDataLabels[props.quantitative]}
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
