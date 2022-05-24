import ChartHeader from "./header";
import { useState } from "react";
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

const tmpLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Charts(): JSX.Element {
  const [isSelected, setSelected] = useState<ChartType>(ChartType.bar);

  function renderChart(
    chartTitle: string,
    labels: string[],
    data: unknown[] = [],
    scatterData: ScatterDataType[] = []
  ) {
    switch (isSelected) {
      case ChartType.bar:
        return <BarChart labels={labels} chartTitle={chartTitle} data={data} />;
      case ChartType.line:
        return (
          <LineChart labels={labels} chartTitle={chartTitle} data={data} />
        );
      case ChartType.pie:
        return <PieChart labels={labels} chartTitle={chartTitle} data={data} />;
      case ChartType.scatter:
        return <ScatterChart chartTitle={chartTitle} data={scatterData} />;
      default:
        return <div>Wrong chart type</div>;
    }
  }

  return (
    <div>
      <ChartHeader isSelected={isSelected} setSelected={setSelected} />
      <div className="mt-4" />
      {renderChart(
        "Chart",
        tmpLabels,
        tmpLabels.map(() => Math.random() * 100),
        tmpLabels.map(() => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))
      )}
    </div>
  );
}
