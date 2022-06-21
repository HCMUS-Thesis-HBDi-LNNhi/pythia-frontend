import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import icons from "const/icons.const";
import { Button, ChartBody } from "components/common";
import ChartContainer from "./chart-container.component";
import { IChartData, IChartResponse } from "interfaces/chart.interface";
import {
  CategoryDataLabels,
  FactDataLabels,
  IData,
} from "interfaces/data.interface";
import { useRouter } from "next/router";
import { PageLabels } from "interfaces/common.interface";
import Errors from "const/error.const";
import handleErrors from "utils/errors.utils";
import { fetcher } from "utils/fetcher.utils";
import API from "const/api.const";
import { handleDelete, normalizedData } from "utils/charts.utils";

interface Props {
  data: IData;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChartList(props: Props): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const fetchData = async () => {
    if (!userID) {
      handleErrors(Errors[401], router);
      return;
    }
    try {
      props.setLoading(true);
      const response = await fetcher.get(API.GET.getPinnedCharts(userID));
      if (response.status !== 200) throw Errors[response.status] ?? response;
      setChartData(
        response.data.charts.map((item: IChartResponse) => normalizedData(item))
      );
    } catch (error) {
      handleErrors(error, router);
    } finally {
      props.setLoading(false);
    }
  };

  const renderChart = (chartData: IChartData) => {
    const from = chartData.quarters.from + "_" + chartData.years.from;
    const to = chartData.quarters.to + "_" + chartData.years.to;
    const query = `type=${chartData.chartType}&from=${from}&to=${to}&x=${chartData.x}&y=${chartData.y}`;
    return (
      <ChartContainer
        key={chartData.id}
        label={`${FactDataLabels[chartData.y]} of ${
          CategoryDataLabels[chartData.x]
        }`}
        delete={() =>
          handleDelete(chartData.id, props.setLoading, fetchData, router)
        }
        onClick={() => router.push(`/${PageLabels.CHARTS}?${query}`)}
      >
        <ChartBody
          data={props.data}
          chartType={chartData.chartType}
          chartOptions={chartData}
        />
      </ChartContainer>
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      {chartData.map((item) => renderChart(item))}
      <div
        className={[
          "border border-primary-300 rounded-lg text-center m-2 aspect-4/3",
          "flex-1 grid hover:shadow-lg",
        ].join(" ")}
      >
        <Button
          className="text-5xl w-full h-full place-content-center"
          style="outline"
          icon={icons.outline.plus}
          onClick={() => router.push(`/${PageLabels.CHARTS}`)}
        />
      </div>
    </main>
  );
}
