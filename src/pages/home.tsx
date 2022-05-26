import { Layout } from "components/common";
import { ChartList, NumberList } from "components/sections/home";
import { ChartType } from "interfaces/common.interface";
import { IChartData, INumberData } from "interfaces/home.interface";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [numberData, setNumberData] = useState<INumberData[]>([
    {
      label: "label",
      report: "segmentation",
      metric: "age",
    },
  ]);

  const [chartData, setChartData] = useState<IChartData[]>([
    {
      label: "label",
      report: "segmentation",
      metric: "age",
      chartType: ChartType.pie,
    },
  ]);

  return (
    <Layout title="Home" className="space-y-8 text-primary-700">
      {numberData && (
        <NumberList numberData={numberData} setNumberData={setNumberData} />
      )}
      {chartData && (
        <ChartList chartData={chartData} setChartData={setChartData} />
      )}
    </Layout>
  );
}
