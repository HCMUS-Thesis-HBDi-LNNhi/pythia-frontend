import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import { Pane } from "components/common";
import { ScatterChart } from "./charts";

import Errors from "const/error.const";

import {
  IBGNBD,
  initBGNBDResult,
  IBGNBDResult,
} from "interfaces/segmentation.interface";

import handleErrors from "utils/errors.utils";

import { fetchBGNBDResult } from "./helper";
import { ICSVData } from "interfaces/utils.interface";

const DIVIDER = 4;

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
  setStatus: (value: string) => void;
  setCSV: (value: ICSVData) => void;
}

export default function BGNBDBody(props: Props): JSX.Element {
  const router = useRouter();
  const [bgnbdResult, setBGNBDResult] = useState<IBGNBDResult>(initBGNBDResult);
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!props.userID) {
      handleErrors(Errors[401], router);
      return;
    }
    fetchBGNBDResult(props.userID, props.setLoading, router).then((value) => {
      if (!value) return;
      setBGNBDResult(value.bg_nbd_result);
      props.setStatus(value.status);
      props.setCSV({
        headers: [
          { label: "Customer ID", key: "customer_id" },
          { label: "Prediction", key: "predict" },
        ],
        data: Object.values(value.bg_nbd_result.bgnbd).map((v) => ({
          customer_id: v.id,
          predict: v.predict,
        })),
      });
    });
    // eslint-disable-next-line
  }, [props.userID]);

  useEffect(() => {
    const labels = Object.values(bgnbdResult.bgnbd).map(
      (v) => "Customer ID: " + v.id
    );
    setTooltipLabels([...labels]);
  }, [bgnbdResult]);

  const getMap = (key: keyof IBGNBD) => {
    const map = new Map<number, [number, number][]>();
    bgnbdResult.bgnbd
      .filter((value) => value[key] !== 0)
      .forEach((value) => {
        if (key === "id") return;
        let mapKey = Math.floor((value.x + 1) / DIVIDER);
        const mapValue = map.get(mapKey) ?? [];
        map.set(mapKey, [...mapValue, [value.predict, value[key]]]);
      });
    return map;
  };

  return (
    <div
      className={[
        "grid gap-2",
        props.displayGrid ? "grid-cols-2 " : "grid-cols-1",
      ].join(" ")}
    >
      <BGNBDItems label="Grouped by number of transactions">
        <ScatterChart
          xLabel="Prediction"
          yLabel="Total observation time"
          datasets={Array.from(getMap("T"))
            .sort((a, b) => a[0] - b[0])
            .map((value) => {
              return {
                label: `Over ${value[0] * DIVIDER} transactions`,
                data: value[1],
              };
            })}
          tooltip={() => tooltipLabels}
        />
      </BGNBDItems>
      <BGNBDItems label="Grouped by number of transactions">
        <ScatterChart
          xLabel="Prediction"
          yLabel="Time of last transaction"
          datasets={Array.from(getMap("t_x"))
            .sort((a, b) => a[0] - b[0])
            .map((value) => {
              return {
                label: `Over ${value[0] * DIVIDER} transactions`,
                data: value[1],
              };
            })}
          tooltip={() => tooltipLabels}
        />
      </BGNBDItems>
    </div>
  );
}
