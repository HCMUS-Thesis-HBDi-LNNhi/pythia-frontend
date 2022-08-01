import { useEffect, useState } from "react";

import { Pane } from "components/common";
import { BarChart, PieChart } from "./charts";

import { IClassify, IResult } from "interfaces/potentiality.interface";

const getDatasets = (classifyResult: IClassify[]) => {
  let nonPotential = 0;
  let potential = 0;
  classifyResult.forEach((value) =>
    value.labels == 0 ? nonPotential++ : potential++
  );
  return { label: "Total", data: [nonPotential, potential] };
};

interface Props {
  displayGrid: boolean;
  result: IResult;
}

export default function Body(props: Props): JSX.Element {
  // const [chartOptions, setChartOptions] = useState(initialChartOptions);
  // const [chartType, setChartType] = useState(ChartType.bar);
  const [labels] = useState(["Non potential customers", "Potential customers"]);
  const [datasets, setDatasets] = useState(getDatasets(props.result.result));

  useEffect(() => {
    setDatasets(getDatasets(props.result.result));
  }, [props.result]);

  return (
    <div
      className={[
        "grid gap-2",
        props.displayGrid ? "grid-cols-2 " : "grid-cols-1",
      ].join(" ")}
    >
      <Pane width="w-full" className="space-y-4">
        {/* <ChartHeader
          chosenChart={chartType}
          setChosenChart={setChartType}
          disabledTypes={disabledTypes}
        /> */}
        <BarChart
          labels={labels}
          yLabel="Number of customers"
          datasets={[datasets]}
        />
      </Pane>
      <Pane width="w-full" className="space-y-4">
        <PieChart
          labels={["Non potential customers", "Potential customers"]}
          datasets={datasets}
        />
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
