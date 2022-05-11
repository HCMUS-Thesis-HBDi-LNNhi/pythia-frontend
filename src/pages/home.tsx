import { Layout } from "components/common";
import { ChartList, NumberList } from "components/home";
import { IChartData, INumberData } from "interfaces/home.interface";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [numberData, setNumberData] = useState<INumberData[]>([
    { label: "Total records 1", value: 12300, description: "Hello" },
    { label: "Total records 2", value: 12300 },
    { label: "Total records 3", value: 12300 },
    { label: "Total records 4", value: 12300 },
  ]);

  const [chartData, setChartData] = useState<IChartData[]>([
    { label: "Chart A 1", chart: <div>Some chart</div> },
    { label: "Chart A 2", chart: <div>Some chart</div> },
    { label: "Chart A 3", chart: <div>Some chart</div> },
    { label: "Chart A 4", chart: <div>Some chart</div> },
    { label: "Chart A 5", chart: <div>Some chart</div> },
    { label: "Chart A 6", chart: <div>Some chart</div> },
    { label: "Chart A 7", chart: <div>Some chart</div> },
  ]);

  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Home</h1>
      {numberData && (
        <NumberList numberData={numberData} setNumberData={setNumberData} />
      )}
      {chartData && (
        <ChartList chartData={chartData} setChartData={setChartData} />
      )}
    </Layout>
  );
}
