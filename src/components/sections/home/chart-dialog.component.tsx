import {
  Button,
  ChartBody,
  ChartHeader,
  ChartOptions,
  Dialog,
} from "components/common";
import { ChartType, IChartOptions } from "interfaces/common.interface";
import { IChartData } from "interfaces/home.interface";
import { useState } from "react";

const labels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

interface Props {
  data: IChartData;
  initialData: IChartData;
  handleSubmit: (values: IChartData) => void;
  handleReset: () => void;
}

export default function ChartDialog(props: Props): JSX.Element {
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [_chartOptions, setChartOptions] = useState<IChartOptions>();

  return (
    <Dialog className="w-4/5 h-[90%] p-8 text-primary-500">
      <h1 className="text-center font-bold text-primary-600 text-lg uppercase pb-6">
        Create a chart
      </h1>
      <main className="w-full h-[90%] flex">
        <div className="flex flex-col w-3/4">
          <ChartHeader chosenChart={chartType} setChosenChart={setChartType} />
          <div className="mt-8" />
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
          <div className="flex mt-auto w-full justify-center space-x-4">
            <Button style="highlight">Accept</Button>
            <Button style="failure" onClick={() => props.handleReset()}>
              Cancel
            </Button>
          </div>
        </div>
        <div className="w-1/4 px-4 ml-4 border-l border-primary-400">
          <ChartOptions setChartOptions={setChartOptions} />
        </div>
      </main>
    </Dialog>
  );
}
