import {
  Layout,
  Pane,
  ChartHeader,
  ChartBody,
  ChartOptions,
  toast,
} from "components/common";
import { handleCreateChart } from "components/sections/home/chart-list/fetcher";
import { initialChartOptions } from "const/chart.const";
import { ChartType, IChartOptions } from "interfaces/chart.interface";
import { PageLabels } from "interfaces/common.interface";
import { IData, IDimCustomer, IFactData } from "interfaces/data.interface";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { handleFetchData } from "utils/handleData";

export default function Charts(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [chartOptions, setChartOptions] =
    useState<IChartOptions>(initialChartOptions);

  useEffect(() => {
    if (!userID) {
      toast("Something went wrong, please login again!", "failure");
      router.push(`/${PageLabels.LOGIN}`);
    } else {
      handleFetchData(userID, setLoading).then((res) => res && setData(res));
    }
  }, [userID]);

  useEffect(() => {
    const params = router.query;
    if (!params) return;
    setChartType(params.type as ChartType);
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
  }, [data]);

  return (
    <Layout title="Charts" isLoading={isLoading}>
      <main className="w-full lg:h-[90%] mt-4 flex flex-col-reverse lg:flex-row">
        <Pane width="w-full lg:w-4/5" className="space-y-4">
          <ChartHeader
            chosenChart={chartType}
            setChosenChart={setChartType}
            allowPin
            createChart={() => {
              if (!userID) {
                toast("Something went wrong, please login again!", "failure");
                router.push(`/${PageLabels.LOGIN}`);
              } else {
                handleCreateChart(
                  userID,
                  chartOptions,
                  chartType,
                  setLoading,
                  () => {
                    toast("Chart is pinned successful", "success");
                  }
                );
              }
            }}
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
          />
        </Pane>
      </main>
    </Layout>
  );
}
