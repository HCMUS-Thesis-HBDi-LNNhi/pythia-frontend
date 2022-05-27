import {
  Layout,
  Pane,
  ChartHeader,
  ChartBody,
  ChartOptions,
} from "components/common";
import { ChartType, IChartOptions } from "interfaces/common.interface";
import React, { useState } from "react";

const labels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function Charts(): JSX.Element {
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [_chartOptions, setChartOptions] = useState<IChartOptions>();

  return (
    <Layout title="Charts">
      <main className="w-full h-[90%] mt-4 flex">
        <Pane width="w-4/5" className="space-y-4">
          <ChartHeader
            chosenChart={chartType}
            setChosenChart={setChartType}
            allowPin
          />
          <ChartBody
            chartType={chartType}
            chartTitle="Charts"
            categoricalData={labels}
            quantitativeData={labels.map(() => Math.random() * 100)}
            scatterData={labels.map(() => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
            }))}
          />
        </Pane>
        <Pane width="w-1/5 ml-4">
          <ChartOptions setChartOptions={setChartOptions} />
        </Pane>
      </main>
    </Layout>
  );
}
