import { Button, Pane } from "components/common";
import icons from "const/icons.const";
import {
  initialRFMResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { useEffect, useState } from "react";
import { fetchRFMResult } from "../fetcher";
import RFMScatterChart from "./rfm-scatter.component";

interface Props {
  userID: string | null;
  setLoading: (value: boolean) => void;
}

const RFMHeader = (props: { label: string }): JSX.Element => (
  <div className="w-full h-fit flex justify-between items-center">
    <div>{props.label}</div>
    <Button className="text-2xl" icon={icons.outline.pin}></Button>
  </div>
);

export default function RFMBody(props: Props): JSX.Element {
  const [rfmResult, setRFMResult] = useState<IRFMResponse>(initialRFMResponse);

  useEffect(() => {
    if (!props.userID) return;
    fetchRFMResult(props.userID, props.setLoading).then(
      (value) => value && setRFMResult(value)
    );
  }, [props.userID]);

  return (
    <>
      <Pane height="h-fit" className="space-y-4">
        <RFMHeader label="Grouped by number of transactions" />
        <RFMScatterChart
          uniqueKeys={Array.from(
            new Set(Object.values(rfmResult.rfm.num_trans))
          ).sort()}
          rfmResult={rfmResult.rfm}
          xKey="total_amount"
          yKey="recency"
          scatterType="num_trans"
        />
      </Pane>
      <Pane height="h-fit" className="space-y-4">
        <RFMHeader label="Grouped by CLV value" />
        <RFMScatterChart
          uniqueKeys={rfmResult.clv.map(
            (value) => Math.round(value * 100) / 100
          )}
          rfmResult={rfmResult.rfm}
          xKey="total_amount"
          yKey="recency"
          scatterType="clv"
        />
      </Pane>
    </>
  );
}
