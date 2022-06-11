import { useEffect, useState } from "react";
import { Button, Pane } from "components/common";
import icons from "const/icons.const";
import { FactDataLabels } from "interfaces/data.interface";
import {
  initialRFMResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { fetchRFMResult } from "./fetcher";
import { getDatasets } from "utils/handleData/handleRFMData";
import ScatterChart from "components/common/charts/scatter";

const Header = (props: { label: string }): JSX.Element => (
  <div className="w-full h-fit flex justify-between items-center">
    <div>{props.label}</div>
    <Button className="text-2xl" icon={icons.outline.pin}></Button>
  </div>
);

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
    <>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <Header label="Grouped by number of transactions" />
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
      </Pane>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <Header label="Grouped by Customer Lifetime Value" />
        <ScatterChart
          xLabel={FactDataLabels.total_amount}
          yLabel={FactDataLabels.recency}
          datasets={getDatasets("total_amount", "recency", "clv", rfmResult)}
        />
      </Pane>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <Header label="Grouped by Customer Lifetime Value" />
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.recency}
          datasets={getDatasets("num_trans", "recency", "clv", rfmResult)}
        />
      </Pane>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <Header label="Grouped by Customer Lifetime Value" />
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.total_amount}
          datasets={getDatasets("num_trans", "total_amount", "clv", rfmResult)}
        />
      </Pane>
    </>
  );
}
