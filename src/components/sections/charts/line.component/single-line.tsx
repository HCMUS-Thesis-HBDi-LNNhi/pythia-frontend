import { getSingleChartColor } from "const/colors.const";
import { IDataset } from "interfaces/chart.interface";
import { Line } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
  tooltip?: (tooltipItems: Array<any>) => string | string[];
}

export default function SingleLineChart(props: Props): JSX.Element {
  return (
    <Line
      data={{
        labels: props.labels,
        datasets: props.datasets.map((value) => ({
          ...value,
          ...getSingleChartColor(),
        })),
      }}
      options={{
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
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                if (props.tooltip) return props.tooltip(tooltipItems);
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
