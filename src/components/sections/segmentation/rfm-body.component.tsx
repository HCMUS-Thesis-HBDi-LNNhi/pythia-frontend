import { ReactNode, useEffect, useState } from "react";
import { BarChart, Button, Pane, ScatterChart } from "components/common";
import icons from "const/icons.const";
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
      <div className="w-full h-fit flex justify-between items-center">
        <h2>{props.label}</h2>
        <Button className="text-2xl" icon={icons.outline.pin}></Button>
      </div>
      {props.children}
    </Pane>
  );
};

interface Props {
  userID: string | null;
  setLoading: (value: boolean) => void;
}

export default function RFMBody(props: Props): JSX.Element {
  const [rfmResult, setRFMResult] = useState<IRFMResponse>(initialRFMResponse);

  useEffect(() => {
    if (!props.userID) return;
    fetchRFMResult(props.userID, props.setLoading).then(
      (value) => value && setRFMResult(value)
    );
    // eslint-disable-next-line
  }, [props.userID]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <RFMItems label="Grouped by Customer Lifetime Value">
        <BarChart
          labels={["CLV"]}
          datasets={Object.entries(rfmResult.clv).map((v) => ({
            label: "Group " + v[0],
            data: [v[1]],
          }))}
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
        />
      </RFMItems>
      <RFMItems label="Grouped by Customer Lifetime Value">
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.recency}
          datasets={getDatasets("num_trans", "recency", "clv", rfmResult)}
        />
      </RFMItems>
      <RFMItems label="Grouped by Customer Lifetime Value">
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.total_amount}
          datasets={getDatasets("num_trans", "total_amount", "clv", rfmResult)}
        />
      </RFMItems>
    </div>
  );
}
