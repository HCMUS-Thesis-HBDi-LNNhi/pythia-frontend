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
import { ChartType, ScatterDataType } from "interfaces/common.interface";
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
  chartType: ChartType;
  chartTitle: string;
  categoricalData: string[];
  quantitativeData: number[];
  scatterData?: ScatterDataType[];
}

export default function ChartBody(props: Props): JSX.Element {
  switch (props.chartType) {
    case ChartType.bar:
      return (
        <BarChart
          chartTitle={props.chartTitle}
          labels={props.categoricalData}
          data={props.quantitativeData}
        />
      );
    case ChartType.line:
      return (
        <LineChart
          chartTitle={props.chartTitle}
          labels={props.categoricalData}
          data={props.quantitativeData}
        />
      );
    case ChartType.pie:
      return (
        <PieChart
          chartTitle={props.chartTitle}
          labels={props.categoricalData}
          data={props.quantitativeData}
        />
      );
    case ChartType.scatter:
      return (
        <ScatterChart
          chartTitle={props.chartTitle}
          data={props.scatterData ?? []}
        />
      );
    default:
      return <div>Wrong chart type</div>;
  }
}
