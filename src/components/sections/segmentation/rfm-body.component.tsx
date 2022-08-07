import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Pane } from "components/common";
import { ScatterChart, BarChart } from "./charts";

import Errors from "const/error.const";

import { IRFMResults } from "interfaces/segmentation.interface";

import handleErrors from "utils/errors.utils";
import { getCategoryLabel } from "utils/formatter.utils";

import { fetchRFMResult, getDatasets } from "./helper";
import { ICSVData } from "interfaces/utils.interface";

const getNoCustomerPerCLV = (rfmResult: IRFMResults, clv: number) => {
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
  setStatus: (value: string) => void;
  setCSV: (value: ICSVData) => void;
}

export default function RFMBody(props: Props): JSX.Element {
  const router = useRouter();
  const [rfmResult, setRFMResult] = useState<IRFMResults>();
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!props.userID) {
      handleErrors(Errors[401], router);
      return;
    }
    fetchRFMResult(props.userID, props.setLoading, router).then((value) => {
      if (!value) return;
      switch (value.status) {
        case "done":
          setRFMResult(value.rfm_result);
          setTooltipLabels(
            Object.values(value.rfm_result.rfm.customer_id).map(
              (v) => "Customer ID: " + v
            )
          );
          props.setCSV({
            headers: [
              { label: "Customer ID", key: "customer_id" },
              { label: "CLV", key: "clv" },
            ],
            data: Object.values(value.rfm_result.rfm.customer_id).map(
              (v, index) => {
                return {
                  customer_id: v,
                  clv: value.rfm_result.clv[
                    value.rfm_result.rfm.cluster_id[index]
                  ],
                };
              }
            ),
          });
          break;
        case "in progress":
          setTimeout(() => window.location.reload(), 5000);
          break;
        default:
          break;
      }
      props.setStatus(value.status);
    });
    // eslint-disable-next-line
  }, [props.userID]);

  return (
    <>
      {rfmResult && (
        <div
          className={[
            "grid gap-2",
            props.displayGrid ? "grid-cols-2 " : "grid-cols-1",
          ].join(" ")}
        >
          <RFMItems label="Grouped by Customer Lifetime Value">
            <BarChart
              labels={Object.keys(rfmResult.clv).map(
                (_, i) => "Group " + (i + 1)
              )}
              datasets={[
                {
                  label: "CLV",
                  data: Object.values(rfmResult.clv),
                },
              ]}
              tooltip={(items) => {
                return [
                  "CLV Points: " + items[0].formattedValue,
                  "Number of customers: " +
                    getNoCustomerPerCLV(rfmResult, items[0].dataIndex),
                ].join("\n");
              }}
            />
          </RFMItems>
          <RFMItems label="Grouped by number of transactions">
            <ScatterChart
              xLabel={getCategoryLabel("total_amount")}
              yLabel={getCategoryLabel("recency")}
              datasets={getDatasets(
                "total_amount",
                "recency",
                "num_trans",
                rfmResult
              )}
              tooltip={(tooltipItems) =>
                tooltipLabels[tooltipItems[0].dataIndex]
              }
            />
          </RFMItems>
          <RFMItems label="Grouped by Customer Lifetime Value">
            <ScatterChart
              xLabel={getCategoryLabel("num_trans")}
              yLabel={getCategoryLabel("recency")}
              datasets={getDatasets("num_trans", "recency", "clv", rfmResult)}
              tooltip={(tooltipItems) =>
                tooltipLabels[tooltipItems[0].dataIndex]
              }
            />
          </RFMItems>
          <RFMItems label="Grouped by Customer Lifetime Value">
            <ScatterChart
              xLabel={getCategoryLabel("num_trans")}
              yLabel={getCategoryLabel("total_amount")}
              datasets={getDatasets(
                "num_trans",
                "total_amount",
                "clv",
                rfmResult
              )}
              tooltip={(tooltipItems) =>
                tooltipLabels[tooltipItems[0].dataIndex]
              }
            />
          </RFMItems>
        </div>
      )}
    </>
  );
}
