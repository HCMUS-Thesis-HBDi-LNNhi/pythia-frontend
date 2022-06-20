import { ReactNode, useEffect, useState } from "react";
import { BarChart, Pane, ScatterChart } from "components/common";
import { FactDataLabels } from "interfaces/data.interface";
import {
  initialRFMResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { fetchRFMResult } from "./fetcher";
import { getDatasets } from "utils/handleData/handleRFMData";

const RFMItems = (props: {
  label?: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <Pane height="h-fit" className="space-y-4 overflow-hidden">
      <h2 className="w-full h-fit flex justify-between items-center">
        {props.label}
      </h2>
      <>{props.children}</>
    </Pane>
  );
};

interface Props {
  userID: string | null;
  displayGrid: boolean;
  setLoading: (value: boolean) => void;
}

export default function RFMBody(props: Props): JSX.Element {
  const [rfmResult, setRFMResult] = useState<IRFMResponse>(initialRFMResponse);
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!props.userID) return;
    fetchRFMResult(props.userID, props.setLoading).then(
      (value) => value && setRFMResult(value)
    );
    // eslint-disable-next-line
  }, [props.userID]);

  useEffect(() => {
    setTooltipLabels(
      Object.values(rfmResult.rfm.customer_id).map((v) => "Customer ID: " + v)
    );
  }, [rfmResult]);

  return (
    <div className={props.displayGrid ? "grid grid-cols-2 gap-2" : ""}>
      <RFMItems label="Grouped by Customer Lifetime Value">
        <BarChart
          labels={["CLV"]}
          datasets={Object.entries(rfmResult.clv).map((value, index) => {
            const groupIndex = index + 1;
            return {
              label: "Group " + groupIndex,
              data: [value[1]],
            };
          })}
        />
      </RFMItems>
      <RFMItems label="Grouped by number of transactions">
        <ScatterChart
          xLabel={FactDataLabels.total_amount}
          yLabel={FactDataLabels.recency}
          datasets={getDatasets(
            "total_amount",
            "recency",
            "num_trans",
            rfmResult
          )}
          tooltipLabels={tooltipLabels}
        />
      </RFMItems>
      <RFMItems label="Grouped by Customer Lifetime Value">
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.recency}
          datasets={getDatasets("num_trans", "recency", "clv", rfmResult)}
          tooltipLabels={tooltipLabels}
        />
      </RFMItems>
      <RFMItems label="Grouped by Customer Lifetime Value">
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.total_amount}
          datasets={getDatasets("num_trans", "total_amount", "clv", rfmResult)}
          tooltipLabels={tooltipLabels}
        />
      </RFMItems>
    </div>
  );
}
