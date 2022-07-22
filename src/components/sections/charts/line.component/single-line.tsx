import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { getSingleChartColor } from "const/colors.const";

import { IChartOptions, IDataset } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

import { getLabels, getCategoryLabel } from "utils/formatter.utils";

import handle2DData from "../helper";

interface Props {
  data: IData;
  chartOptions: IChartOptions;
}

export default function SingleLineChart(props: Props): JSX.Element {
  const { data, chartOptions } = props;
  const [labels, setLabels] = useState<string[]>(getLabels(data, chartOptions));
  const [datasets, setDatasets] = useState<IDataset[]>(
    handle2DData(data, chartOptions, labels)
  );

  useEffect(() => {
    setLabels(getLabels(data, chartOptions));
    setDatasets(handle2DData(data, chartOptions, labels));
  }, [data, chartOptions, labels]);

  return (
    <Line
      data={{
        labels: labels,
        datasets: datasets.map((value) => ({
          ...value,
          ...getSingleChartColor(),
        })),
      }}
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: getCategoryLabel(chartOptions.x),
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            title: {
              display: true,
              text: getCategoryLabel(chartOptions.y),
              font: {
                weight: "bold",
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems.map(
                  (value) => value.label + ": " + value.formattedValue
                );
              },
              label: () => "",
            },
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
