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

import { ChartType } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

import { handleCreateChart } from "utils/charts.utils";

export default function Charts(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);

  useEffect(() => {
    handleFetchData(userID, setLoading, router).then((res) => {
      if (!res) return;
      setData(res);
      const sortedYears = res.dim_dates.sort((a, b) => a.year - b.year);
      setChartOptions({
        ...chartOptions,
        years: {
          from: sortedYears[0].year,
          to: sortedYears[sortedYears.length - 1].year,
        },
      });
    });
  }, [userID, router]);

  useEffect(() => {
    switch (chartType) {
      case ChartType.line:
        setChartOptions({ ...chartOptions, x: "date_key" });
        break;
      case ChartType.geo:
        setChartOptions({ ...chartOptions, x: "world_continents" });
        break;
      default:
        setChartOptions({ ...chartOptions, x: "dob" });
        break;
    }
  }, [chartType]);

  useEffect(() => {
    const params = router.query;
    if (Object.keys(params).length === 0) return;
    const from = params.from
      ?.toString()
      .split("_")
      .map((value) => parseInt(value));
    const to = params.to
      ?.toString()
      .split("_")
      .map((value) => parseInt(value));
    setChartType(params.type as ChartType);
    setChartOptions({
      y: params.y?.toString() ?? chartOptions.x,
      x: params.x?.toString() ?? chartOptions.y,
      years: from && to ? { from: from[1], to: to[1] } : chartOptions.years,
      quarters:
        from && to ? { from: from[0], to: to[0] } : chartOptions.quarters,
    });
  }, []);

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
