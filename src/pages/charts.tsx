import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { Layout, Pane } from "components/common";
import {
  ChartHeader,
  ChartOptions,
  ChartBody,
  handleFetchData,
} from "components/sections/charts";

import { initialChartOptions } from "const/chart.const";
import MAP_JSON from "const/map.const";

import { ChartType } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

import { handleCreateChart } from "utils/charts.utils";
import { formatChartsParams } from "utils/formatter.utils";

export default function Charts(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);

  useEffect(() => {
    handleFetchData(userID, router, setLoading).then((res) => {
      const params = router.query;
      if (!res) return;
      setData(res);

      if (Object.keys(params).length === 0) {
        const sortedYears = res.dim_dates.sort((a, b) => a.year - b.year);
        setChartOptions({
          ...chartOptions,
          years: {
            from: sortedYears[0].year,
            to: sortedYears[sortedYears.length - 1].year,
          },
        });
        return;
      }

      setChartType(params.type as ChartType);
      setChartOptions({ ...chartOptions, ...formatChartsParams(params) });

      router.replace(router.pathname, undefined, { shallow: true });
    });
  }, [userID]);

  useEffect(() => {
    switch (chartType) {
      case ChartType.line:
        setChartOptions({
          ...chartOptions,
          x:
            chartOptions.x !== "date_key" && chartOptions.x !== "dob"
              ? "date_key"
              : chartOptions.x,
        });
        return;
      case ChartType.geo:
        setChartOptions({
          ...chartOptions,
          x: MAP_JSON[chartOptions.x] ? chartOptions.x : "world_continents",
        });
        return;
      default:
        setChartOptions({ ...chartOptions, x: "dob" });
        return;
    }
  }, [chartType]);

  return (
    <Layout title="Charts" isLoading={isLoading}>
      <main className="w-full lg:h-[90%] mt-4 flex flex-col-reverse lg:flex-row">
        <Pane width="w-full lg:w-4/5" className="space-y-4">
          <ChartHeader
            chosenChart={chartType}
            setChosenChart={setChartType}
            allowPin
            createChart={() =>
              handleCreateChart(
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
                setChartOptions={setChartOptions}
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
