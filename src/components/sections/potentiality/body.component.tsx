import { useState } from "react";

import { Pane } from "components/common";
import { BarChart, PieChart } from "./charts";
import { ChartHeader } from "../charts";

import { ChartType } from "interfaces/chart.interface";
import { IClassify, IResult } from "interfaces/potentiality.interface";

const disabledTypes = [ChartType.scatter, ChartType.geo, ChartType.line];

interface Props {
  // displayGrid: boolean;
  result: IResult;
}

export default function Body(props: Props): JSX.Element {
  // const [chartOptions, setChartOptions] = useState(initialChartOptions);
  const [chartType, setChartType] = useState(ChartType.bar);

  const renderChart = (chartType: ChartType, classifyResult: IClassify[]) => {
    let nonPotential = 0;
    let potential = 0;
    classifyResult.forEach((value) =>
      value.labels == 0 ? nonPotential++ : potential++
    );
    if (chartType === ChartType.bar)
      return (
        <BarChart
          labels={["Non potential customers", "Potential customers"]}
          yLabel="Number of customers"
          datasets={[{ label: "Total", data: [nonPotential, potential] }]}
        />
      );
    return (
      <PieChart
        labels={["Non potential customers", "Potential customers"]}
        datasets={{ label: "Total", data: [nonPotential, potential] }}
      />
    );
  };

  return (
    <div className="w-full mt-4 flex flex-col-reverse lg:flex-row">
      <Pane width="w-full" className="space-y-8 pb-4">
        <ChartHeader
          chosenChart={chartType}
          setChosenChart={setChartType}
          disabledTypes={disabledTypes}
        />
        <div className="grid place-content-center">
          {renderChart(chartType, props.result.result)}
        </div>
      </Pane>
      {/* <Pane width="mb-2 lg:mb-0 lg:ml-4 lg:w-1/5">
        <ChartOptions
          initialValues={chartOptions}
          setChartOptions={setChartOptions}
          chartType={chartType}
        />
      </Pane> */}
    </div>
  );
}
