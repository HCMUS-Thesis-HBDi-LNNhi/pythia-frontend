import { getSingleChartColor } from "const/colors.const";
import { IDataset } from "interfaces/chart.interface";
import { Bar } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
  options?: any;
}

export default function SingleBarChart(props: Props): JSX.Element {
  return (
    <Bar
      data={{
        labels: props.labels,
        datasets: props.datasets.map((value) => ({
          ...value,
          ...getSingleChartColor(),
        })),
      }}
      options={{
        ...props.options,
        scales: {
          x: {
            title: {
              display: !!props.xLabel,
              text: props.xLabel,
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            title: {
              display: !!props.xLabel,
              text: props.yLabel,
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
