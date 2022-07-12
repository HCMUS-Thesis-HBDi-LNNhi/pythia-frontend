import { useState } from "react";

import {
  BarChart,
  ChartHeader,
  ChartOptions,
  Pane,
  PieChart,
} from "components/common";
import { initialChartOptions } from "const/chart.const";
import { ChartType } from "interfaces/chart.interface";
import { IResult } from "interfaces/potentiality.interface";

const disabledTypes = [ChartType.scatter, ChartType.geo, ChartType.line];

interface Props {
  displayGrid: boolean;
  result: IResult;
}

export default function Body(props: Props): JSX.Element {
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  const [chartType, setChartType] = useState(ChartType.bar);

  const renderChart = (chartType: ChartType, classifyResult: number[]) => {
    let nonPotential = 0;
    let potential = 0;
    classifyResult.forEach((value) =>
      value === 0 ? nonPotential++ : potential++
    );

    const props = {
      labels: ["Non potential customers", "Potential customers"],
      yLabel: "Number of customers",
      datasets: [{ label: "Total", data: [nonPotential, potential] }],
    };

    if (chartType === ChartType.bar)
      return (
        <BarChart
          {...props}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      );
    return <PieChart {...props} />;
  };

  return (
    <div className="w-full lg:h-[90%] mt-4 flex flex-col-reverse lg:flex-row">
      <Pane width="w-full lg:w-4/5" className="space-y-4">
        <ChartHeader
          chosenChart={chartType}
          setChosenChart={setChartType}
          disabledTypes={disabledTypes}
        />
        <div className="grid place-content-center h-[90%]">
          {renderChart(chartType, props.result.result)}
        </div>
      </Pane>
      <Pane width="mb-2 lg:mb-0 lg:ml-4 lg:w-1/5">
        <ChartOptions
          initialValues={chartOptions}
          setChartOptions={setChartOptions}
          chartType={chartType}
        />
      </Pane>
    </div>
  );
}
