import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  Layout,
  Pane,
  ChartHeader,
  ChartBody,
  ChartOptions,
} from "components/common";
import { initialChartOptions } from "const/chart.const";
import Errors from "const/error.const";
import { ChartType, IChartOptions } from "interfaces/chart.interface";
import { IDimCustomer, IFactData } from "interfaces/data.interface";
import { IState } from "interfaces/store.interface";
import { handleCreateChart } from "utils/charts.utils";
import handleErrors from "utils/errors.utils";
import { handleFetchData } from "utils/handleData";
import { updateWarehouse } from "store/warehouse/actions";

export default function Charts(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const userID = useSelector((state: IState) => state.config.userID);
  const data = useSelector((state: IState) => state.warehouse);
  const [isLoading, setLoading] = useState(false);
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [chartOptions, setChartOptions] =
    useState<IChartOptions>(initialChartOptions);

  const normalizedQuery = useCallback(() => {
    const params = router.query;
    if (!params) return;
    if (params.type) setChartType(params.type as ChartType);
    if (params.from && params.to && params.x && params.y) {
      const from =
        typeof params.from === "string"
          ? params.from?.split("_").map((v) => parseInt(v))
          : [];
      const to =
        typeof params.to === "string"
          ? params.to?.split("_").map((v) => parseInt(v))
          : [];
      setChartOptions({
        x: params.x as keyof IDimCustomer | "date_key",
        y: params.y as keyof IFactData,
        quarters: { from: from[0], to: to[0] },
        years: { from: from[1], to: to[1] },
      });
    }
  }, [router.query]);

  useEffect(() => {
    !userID
      ? handleErrors(Errors[401], router)
      : handleFetchData(userID, setLoading, router).then(
          (res) => res && updateWarehouse(res)(dispatch)
        );
  }, [userID, router]);

  useEffect(() => {
    normalizedQuery();
  }, [normalizedQuery]);

  return (
    <Layout title="Charts" isLoading={isLoading}>
      <main className="w-full lg:h-[90%] mt-4 flex flex-col-reverse lg:flex-row">
        <Pane width="w-full lg:w-4/5" className="space-y-4">
          <ChartHeader
            chosenChart={chartType}
            setChosenChart={setChartType}
            allowPin
            createChart={() =>
              !userID
                ? handleErrors(Errors[401], router)
                : handleCreateChart(
                    userID,
                    chartOptions,
                    chartType,
                    setLoading,
                    router
                  )
            }
          />
          {data && (
            <div className="grid place-content-center h-[90%]">
              <ChartBody
                data={data}
                chartType={chartType}
                chartOptions={chartOptions}
              />
            </div>
          )}
        </Pane>
        <Pane width="mb-2 lg:mb-0 lg:ml-4 lg:w-1/5">
          <ChartOptions
            initialValues={chartOptions}
            setChartOptions={setChartOptions}
            chartType={chartType}
          />
        </Pane>
      </main>
    </Layout>
  );
}
