import { Bar } from "react-chartjs-2";

import { getSingleChartColor } from "const/colors.const";

import { IDataset } from "interfaces/chart.interface";

interface Props {
  labels: string[];
  datasets: IDataset[];
  tooltip: (item: any) => string;
}

export default function BarChart(props: Props): JSX.Element {
  const { labels, datasets, tooltip } = props;

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
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return tooltip(tooltipItems);
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
