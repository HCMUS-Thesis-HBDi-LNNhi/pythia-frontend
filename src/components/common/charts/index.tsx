import ChartHeader from "./header";
import { useState } from "react";
import ChartBody from "./body";
import { ChartType } from "interfaces/common.interface";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Charts(): JSX.Element {
  const [isSelected, setSelected] = useState<ChartType>(ChartType.bar);
  return (
    <div>
      <ChartHeader isSelected={isSelected} setSelected={setSelected} />
      <div className="mt-4" />
      <ChartBody
        chartTitle="Chart"
        labels={labels}
        data={labels.map(() => Math.random() * 100)}
        scatterChartData={labels.map(() => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))}
        chartType={isSelected}
      />
    </div>
  );
}
