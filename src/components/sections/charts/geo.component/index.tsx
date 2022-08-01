import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

import MAP_JSON from "const/map.const";

import { IChartOptions, IFeature } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

import { formatFeatures, getDataset, zoomIn } from "./helper";
import { getMap } from "utils/map.utils";

interface Props {
  data: IData;
  chartOptions: IChartOptions;
  setChartOptions?: (value: IChartOptions) => void;
  isPinned?: boolean;
}

export default function GeoChart(props: Props) {
  const { data, chartOptions, setChartOptions, isPinned } = props;

  const router = useRouter();
  const chartRef = useRef<ChartJSOrUndefined<any>>(undefined);

  const [datasets, setDatasets] = useState(getDataset(data, chartOptions));
  const [initFeatures, setInitFeatures] = useState<IFeature[]>();

  const updateChart = useCallback(
    (features: IFeature[]) => {
      if (!chartRef.current) return;
      const chart = chartRef.current;
      chart.data = formatFeatures(chartOptions.x, datasets, features);
      chart.update();
    },
    [chartOptions]
  );

  const handleFetch = useCallback(async () => {
    const features = await getMap(MAP_JSON[chartOptions.x], router);
    updateChart(features);
    setInitFeatures(features);
  }, [chartOptions, router, updateChart]);

  useEffect(() => {
    handleFetch();
  }, [chartOptions, router, updateChart, handleFetch]);

  useEffect(() => {
    setDatasets(getDataset(data, chartOptions));
  }, [data, chartOptions]);

  return (
    <Chart
      ref={chartRef}
      type="choropleth"
      data={
        initFeatures
          ? formatFeatures(chartOptions.x, datasets, initFeatures)
          : {
              labels: [],
              datasets: [],
            }
      }
      options={{
        showOutline: true,
        showGraticule: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          xy: {
            projection: "naturalEarth1",
          },
          color: {
            beginAtZero: true,
            interpolate: "ylGn",
            display: !isPinned,
          },
        },
      }}
      onClick={(event: any) => {
        const { current: chart } = chartRef;
        if (!chart || !setChartOptions) return;
        // @ts-ignore
        const chosen = getElementAtEvent(chart, event)[0]?.element.feature;
        setChartOptions({
          ...chartOptions,
          x: zoomIn(chartOptions.x, chosen),
        });
      }}
    />
  );
}
