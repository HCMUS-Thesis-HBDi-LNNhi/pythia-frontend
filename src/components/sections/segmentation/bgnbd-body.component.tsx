import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { Pane } from "components/common";
import { ScatterChart } from "./charts";

import Errors from "const/error.const";

import { IBGNBD, IBGNBDResult } from "interfaces/segmentation.interface";

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
  const [bgnbdResult, setBGNBDResult] = useState<IBGNBDResult>();
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  const fetchData = useCallback(() => {
    if (!props.userID) {
      handleErrors(Errors[401], router);
      return;
    }
    fetchBGNBDResult(props.userID, props.setLoading, router).then((value) => {
      if (!value) return;
      switch (value.status) {
        case "done":
          setBGNBDResult(value.bg_nbd_result);
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
          break;
        case "in progress":
          setTimeout(() => fetchData(), 5000);
          break;
        default:
          break;
      }
      props.setStatus(value.status);
    });
    // eslint-disable-next-line
  }, [props.userID]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [props.userID, fetchData]);

  useEffect(() => {
    if (!bgnbdResult) return;
    const labels = Object.values(bgnbdResult.bgnbd).map(
      (v) => "Customer " + v.id
    );
    setTooltipLabels([...labels]);
  }, [bgnbdResult]);

  const getMap = (key: keyof IBGNBD, results: IBGNBDResult) => {
    const map = new Map<number, [number, number][]>();
    results.bgnbd.forEach((value) => {
      if (key === "id") return;
      let mapKey = Math.floor((value.x + 1) / DIVIDER);
      const mapValue = map.get(mapKey) ?? [];
      map.set(mapKey, [...mapValue, [value.predict, value[key]]]);
    });
    return Array.from(map)
      .sort((a, b) => a[0] - b[0])
      .map((value) => {
        return {
          label: `Over ${value[0]} transaction(s)`,
          data: value[1],
        };
      });
  };

  return (
    <>
      {bgnbdResult && (
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
              datasets={getMap("T", bgnbdResult)}
              tooltip={(tooltipItems) =>
                tooltipLabels[tooltipItems[0].dataIndex]
              }
            />
          </BGNBDItems>
          <BGNBDItems label="Grouped by number of transactions">
            <ScatterChart
              xLabel="Prediction"
              yLabel="Time of last transaction"
              datasets={getMap("t_x", bgnbdResult)}
              tooltip={(tooltipItems) =>
                tooltipLabels[tooltipItems[0].dataIndex]
              }
            />
          </BGNBDItems>
        </div>
      )}
    </>
  );
}
