import { NextRouter } from "next/router";

import { toast } from "components/common";

import API from "const/api.const";
import Errors from "const/error.const";

import * as ChartInterface from "interfaces/chart.interface";

import handleErrors from "utils/errors.utils";
import fetcher from "utils/fetcher.utils";

export function normalizedData(
  data: ChartInterface.IChartResponse
): ChartInterface.IChartData {
  const x = data.x;
  const y = data.y;
  const z = data.z;

  const id = data.id;
  const chartType = data.chart_type;
  if (!data.id) throw { ...data, message: "Missing pinned chart ID" };
  const fromDate = data.from_date.split("_");
  const toDate = data.to_date.split("_");

  const quarters = {
    from: parseInt(fromDate[0]),
    to: parseInt(toDate[0]),
  };
  const years = { from: parseInt(fromDate[1]), to: parseInt(toDate[1]) };
  return {
    x,
    y,
    z,
    id,
    chartType,
    quarters,
    years,
  };
}

export async function handleCreateChart(
  userID: string | null,
  chartOptions: ChartInterface.IChartOptions,
  chartType: ChartInterface.ChartType,
  setLoading: (value: boolean) => void,
  router: NextRouter
): Promise<void> {
  if (!userID) {
    handleErrors(Errors[401], router);
    return;
  }
  try {
    setLoading(true);
    const fromDate = [chartOptions.quarters.from, chartOptions.years.from].join(
      "_"
    );
    const toDate = [chartOptions.quarters.to, chartOptions.years.to].join("_");
    const payload: ChartInterface.IChartPayload = {
      user_id: userID,
      chart_type: chartType,
      from_date: fromDate,
      to_date: toDate,
      x: chartOptions.x,
      y: chartOptions.y,
      z: chartOptions.z,
    };
    const response = await fetcher.post(API.POST.createPinnedChart, payload);
    if (response.status !== 204) throw Errors[response.status] ?? response;
    else toast("Chart is pinned successfully", "success");
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}

export async function handleDelete(
  chartID: string,
  setLoading: (value: boolean) => void,
  reload: () => void,
  router: NextRouter
): Promise<void> {
  try {
    setLoading(true);
    const response = await fetcher.handleDelete(
      API.DELETE.deletePinnedChart(chartID)
    );
    if (response.status !== 204) throw Errors[response.status] ?? response;
    else reload();
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}
