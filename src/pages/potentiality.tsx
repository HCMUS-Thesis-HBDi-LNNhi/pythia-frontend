import { Header } from "components/sections/potentiality";
import { Layout, Pane, ChartHeader, ChartBody } from "components/common";
import { ChartType } from "interfaces/chart.interface";
import { useState } from "react";

const labels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function Potentiality(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);

  return (
    <Layout
      title="Potentiality"
      className="space-y-8 text-primary-700"
      isLoading={isLoading}
    >
      <Header setLoading={setLoading} />
      <Pane height="h-fit" className="space-y-4">
        <ChartHeader
          chosenChart={chartType}
          setChosenChart={setChartType}
          allowPin
        />
        {/* <ChartBody
          chartType={chartType}
          chartTitle="Charts"
          categoricalData={labels}
          quantitativeData={labels.map(() => Math.random() * 100)}
          scatterData={labels.map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
          }))}
        /> */}
      </Pane>
    </Layout>
  );
}
