import { Button, Pane } from "components/common";
import ScatterChart from "components/common/charts/scatter";
import icons from "const/icons.const";
import {
  IBGNBDResponse,
  IBGNBDResult,
  initialBGNBDResponse,
} from "interfaces/segmentation.interface";
import { useEffect, useState } from "react";
import { fetchBGNBDResult } from "./fetcher";

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

export default function BGNBDBody(props: Props): JSX.Element {
  const [bgnbdResult, setBGNBDResult] =
    useState<IBGNBDResponse>(initialBGNBDResponse);

  useEffect(() => {
    if (!props.userID) return;
    fetchBGNBDResult(props.userID, props.setLoading).then(
      (value) => value && setBGNBDResult(value)
    );
    // eslint-disable-next-line
  }, [props.userID]);

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
    <>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <Header label="Grouped by number of transactions" />
        <ScatterChart
          xLabel="Prediction"
          yLabel="Total observation time"
          datasets={Array.from(getMap("T"))
            .sort((a, b) => a[0] - b[0])
            .map((value) => {
              return { label: value[0], data: value[1] };
            })}
        />
      </Pane>
      <Pane height="h-fit" className="space-y-4 overflow-hidden">
        <Header label="Grouped by number of transactions" />
        <ScatterChart
          xLabel="Prediction"
          yLabel="Time of last transaction"
          datasets={Array.from(getMap("t_x"))
            .sort((a, b) => a[0] - b[0])
            .map((value) => {
              return { label: value[0], data: value[1] };
            })}
        />
      </Pane>
    </>
  );
}
