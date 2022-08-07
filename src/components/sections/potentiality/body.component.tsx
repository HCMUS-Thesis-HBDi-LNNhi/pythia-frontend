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
    </div>
  );
}
