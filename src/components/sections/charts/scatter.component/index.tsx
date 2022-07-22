import { getMultipleChartColors } from "const/colors.const";
import { IChartOptions, IScatterDataset } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { getCategoryLabel } from "utils/handleData";
import { getDatasets } from "./helper";

interface Props {
  data: IData;
  chartOptions: IChartOptions;
}

export default function ScatterChart(props: Props): JSX.Element {
  const { data, chartOptions } = props;
  const [datasets, setDatasets] = useState<IScatterDataset[]>([]);

  useEffect(() => {
    setDatasets(getDatasets(data, chartOptions));
  }, [data, chartOptions]);

  return (
    <Scatter
      data={{
        datasets: datasets.map((value, index) => ({
          ...getMultipleChartColors({ index }),
          ...value,
        })),
      }}
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: getCategoryLabel("num_trans"),
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            title: {
              display: true,
              text: getCategoryLabel("total_amount"),
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
                const items = tooltipItems.map((value) => [
                  value.dataset.label,
                  `${getCategoryLabel("num_trans")}: ${value.label}`,
                  `${getCategoryLabel("total_amount")}: ${
                    value.formattedValue
                  }`,
                ]);
                const result: string[] = [];
                items.forEach((lines) => {
                  lines.forEach((line) => line && result.push(line));
                });
                return result;
              },
              label: () => "",
            },
          },
        },
      }}
    />
  );
}
