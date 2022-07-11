import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BarChart, Pane, ScatterChart } from "components/common";
import { FactDataLabels } from "interfaces/data.interface";
import { IRFMResponse } from "interfaces/segmentation.interface";
import { IState } from "interfaces/store.interface";
import { getDatasets } from "utils/handleData/handleRFMData";

const getNoCustomerPerCLV = (rfmResult: IRFMResponse, clv: number) => {
  return Object.values(rfmResult.rfm.cluster_id).filter(
    (value) => value === clv
  ).length;
};

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
  displayGrid: boolean;
  setLoading: (value: boolean) => void;
}

export default function RFMBody(props: Props): JSX.Element {
  const rfmResult = useSelector(
    (state: IState) => state.segmentation.rfmResult
  );
  const [tooltipLabels] = useState<string[]>(
    Object.values(rfmResult.rfm.customer_id).map((v) => "Customer ID: " + v)
  );

  return (
    <div className={props.displayGrid ? "grid grid-cols-2 gap-2" : ""}>
      <RFMItems label="Grouped by Customer Lifetime Value">
        <BarChart
          labels={Object.keys(rfmResult.clv).map((_, i) => "Group " + (i + 1))}
          datasets={[
            {
              label: "CLV",
              data: Object.values(rfmResult.clv),
            },
          ]}
          options={{
            plugins: {
              legend: false,
              tooltip: {
                callbacks: {
                  title: (items: any) => {
                    return [
                      "CLV Points: " + items[0].formattedValue,
                      "Number of customers: " +
                        getNoCustomerPerCLV(rfmResult, items[0].dataIndex),
                    ].join("\n");
                  },
                  label: () => "",
                },
              },
            },
          }}
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
