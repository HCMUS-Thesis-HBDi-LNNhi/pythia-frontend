import { Bar } from "react-chartjs-2";

import { getSingleChartColor } from "const/colors.const";

import { IDataset } from "interfaces/chart.interface";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
}

export default function BarChart(props: Props): JSX.Element {
  const { labels, datasets, xLabel, yLabel } = props;

  return (
    <Bar
      data={{
        labels,
        datasets: datasets.map((value) => ({
          ...value,
          ...getSingleChartColor(),
        })),
      }}
      options={{
        scales: {
          x: {
            title: {
              display: !!xLabel,
              text: xLabel,
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            title: {
              display: !!yLabel,
              text: yLabel,
              font: {
                weight: "bold",
              },
            },
          },
        },
      }}
    />
  );
}
