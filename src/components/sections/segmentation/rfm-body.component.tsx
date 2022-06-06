import { useEffect, useLayoutEffect, useState } from "react";
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
import { IScatterDataset } from "interfaces/chart.interface";

const RFMHeader = (props: { label: string }): JSX.Element => (
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
  const [numTransDatasets, setNumTransDatasets] = useState<IScatterDataset[]>();
  const [CLVDatasets, setCLVDatasets] = useState<IScatterDataset[]>();

  useEffect(() => {
    if (!props.userID) return;
    fetchRFMResult(props.userID, props.setLoading).then(
      (value) => value && setRFMResult(value)
    );
  }, [props.userID]);

  useLayoutEffect(() => {
    const newNumTransDatasets = getDatasets(
      "total_amount",
      "recency",
      "num_trans",
      rfmResult
    );
    const newCLVDatasets = getDatasets(
      "num_trans",
      "recency",
      "clv",
      rfmResult
    );
    setNumTransDatasets(newNumTransDatasets);
    setCLVDatasets(newCLVDatasets);
  }, [rfmResult]);

  return (
    <>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <RFMHeader label="Grouped by number of transactions" />
        <ScatterChart
          xLabel={FactDataLabels.total_amount}
          yLabel={FactDataLabels.recency}
          datasets={numTransDatasets ?? []}
        />
      </Pane>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <RFMHeader label="Grouped by Customer Lifetime Value" />
        <ScatterChart
          xLabel={FactDataLabels.num_trans}
          yLabel={FactDataLabels.recency}
          datasets={CLVDatasets ?? []}
        />
      </Pane>
    </>
  );
}
