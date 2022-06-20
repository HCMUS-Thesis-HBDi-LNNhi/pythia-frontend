import { Pane } from "components/common";
import ScatterChart from "components/common/charts/scatter";
import {
  IBGNBDResponse,
  IBGNBDResult,
  initialBGNBDResponse,
} from "interfaces/segmentation.interface";
import { ReactNode, useEffect, useState } from "react";
import { fetchBGNBDResult } from "./fetcher";

const BGNBDItems = (props: {
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

export default function BGNBDBody(props: Props): JSX.Element {
  const [bgnbdResult, setBGNBDResult] =
    useState<IBGNBDResponse>(initialBGNBDResponse);
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!props.userID) return;
    fetchBGNBDResult(props.userID, props.setLoading).then(
      (value) => value && setBGNBDResult(value)
    );
    // eslint-disable-next-line
  }, [props.userID]);

  useEffect(() => {
    setTooltipLabels(
      Object.values(bgnbdResult.bgnbd).map((v) => "Customer ID: " + v.id)
    );
  }, [bgnbdResult]);

  const getMap = (key: keyof IBGNBDResult) => {
    const map = new Map();
    bgnbdResult.bgnbd
      .filter((value) => value[key] !== 0)
      .forEach((value) => {
        const mapKey = value.x + 1;
        const mapValue = map.get(mapKey) ?? [];
        map.set(mapKey, [...mapValue, { x: value.predict, y: value[key] }]);
      });
    return map;
  };

  return (
    <div className={props.displayGrid ? "grid grid-cols-2 gap-2" : ""}>
      <BGNBDItems label="Grouped by number of transactions">
        <ScatterChart
          xLabel="Prediction"
          yLabel="Total observation time"
          datasets={Array.from(getMap("T"))
            .sort((a, b) => a[0] - b[0])
            .map((value) => {
              return { label: value[0], data: value[1] };
            })}
          tooltipLabels={tooltipLabels}
        />
      </BGNBDItems>
      <BGNBDItems label="Grouped by number of transactions">
        <ScatterChart
          xLabel="Prediction"
          yLabel="Time of last transaction"
          datasets={Array.from(getMap("t_x"))
            .sort((a, b) => a[0] - b[0])
            .map((value) => {
              return { label: value[0], data: value[1] };
            })}
          tooltipLabels={tooltipLabels}
        />
      </BGNBDItems>
    </div>
  );
}
