import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScatterChart from "components/common/charts/scatter";
import { Pane } from "components/common";
import { IBGNBDResult } from "interfaces/segmentation.interface";
import { IState } from "interfaces/store.interface";

const getMiddleValue = (
  value: { min: number; max: number },
  startMin: boolean
) => {
  const mid = Math.ceil(((value.max - value.min) / 2) * 100) / 100;
  return startMin ? value.min + mid : value.max - mid;
};

const annotations = {
  box1: {
    type: "box",
    xMin: (ctx: any) => ctx.chart.scales.x.min,
    xMax: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.x }, true),
    yMin: (ctx: any) => ctx.chart.scales.y.min,
    yMax: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.y }, true),
    backgroundColor: "rgba(150, 0, 0, 0.1)",
    borderWidth: 0,
    label: {
      content: "New customer",
      enabled: true,
      position: { x: "start", y: "end" },
    },
  },
  box2: {
    type: "box",
    xMin: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.x }, true),
    xMax: (ctx: any) => ctx.chart.scales.x.max,
    yMin: (ctx: any) => ctx.chart.scales.y.min,
    yMax: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.y }, true),
    backgroundColor: "rgba(0, 150, 0, 0.1)",
    borderWidth: 0,
    label: {
      content: "Potential loyalist",
      enabled: true,
      position: { x: "end", y: "end" },
    },
  },
  box3: {
    type: "box",
    xMin: (ctx: any) => ctx.chart.scales.x.min,
    xMax: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.x }, true),
    yMin: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.y }, true),
    yMax: (ctx: any) => ctx.chart.scales.y.max,
    backgroundColor: "rgba(0, 0, 150, 0.1)",
    borderWidth: 0,
    label: {
      content: "About to sleep",
      enabled: true,
      position: { x: "start", y: "start" },
    },
  },
  box4: {
    type: "box",
    xMin: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.x }, true),
    xMax: (ctx: any) => ctx.chart.scales.x.max,
    yMin: (ctx: any) => getMiddleValue({ ...ctx.chart.scales.y }, true),
    yMax: (ctx: any) => ctx.chart.scales.y.max,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderWidth: 0,
    label: {
      content: "Loyal customer",
      enabled: true,
      position: { x: "end", y: "start" },
    },
  },
};

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
  displayGrid: boolean;
  setLoading: (value: boolean) => void;
}

export default function BGNBDBody(props: Props): JSX.Element {
  const bgnbdResult = useSelector(
    (state: IState) => state.segmentation.bgnbdResult
  );
  const [tooltipLabels] = useState<string[]>(
    Object.values(bgnbdResult.bgnbd).map((v) => "Customer ID: " + v.id)
  );

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
          annotations={annotations}
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
          annotations={annotations}
        />
      </BGNBDItems>
    </div>
  );
}
