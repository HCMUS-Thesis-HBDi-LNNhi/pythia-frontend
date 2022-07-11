import { ReactNode, useEffect, useState } from "react";
import { SingleBarChart, Pane, ScatterChart } from "components/common";
import { FactDataLabels } from "interfaces/data.interface";
import {
  initialRFMResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { fetchRFMResult } from "./fetcher";
import { getDatasets } from "utils/handleData/handleRFMData";
import { useRouter } from "next/router";
import handleErrors from "utils/errors.utils";
import Errors from "const/error.const";

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
  userID: string | null;
  displayGrid: boolean;
  setLoading: (value: boolean) => void;
}

export default function RFMBody(props: Props): JSX.Element {
  const router = useRouter();
  const [rfmResult, setRFMResult] = useState<IRFMResponse>(initialRFMResponse);
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!props.userID) {
      handleErrors(Errors[401], router);
      return;
    }
    fetchRFMResult(props.userID, props.setLoading, router).then(
      (value) => value && setRFMResult(value)
    );
    // eslint-disable-next-line
  }, [props.userID]);

  useEffect(() => {
    setTooltipLabels(
      Object.values(rfmResult.rfm.customer_id).map((v) => "Customer ID: " + v)
    );
  }, [rfmResult]);

  return (
    <div
      className={[
        "grid gap-2",
        props.displayGrid ? "grid-cols-2 " : "grid-cols-1",
      ].join(" ")}
    >
      <RFMItems label="Grouped by Customer Lifetime Value">
        <SingleBarChart
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
