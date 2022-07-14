import { toast } from "components/common";
import { getSingleChartColor } from "const/colors.const";
import { IDataset } from "interfaces/chart.interface";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
  tooltip?: (tooltipItems: Array<any>) => string | string[];
}

export default function SingleBarChart(props: Props): JSX.Element {
  useEffect(() => {
    if (props.labels.length > 10) {
      toast(
        "For charts with more than 10 values, we recommend using SCATTER chart.",
        "general"
      );
    }
  }, [props.labels]);

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
        scales: {
          x: {
            title: {
              display: !!props.xLabel,
              text: props.xLabel,
              font: {
                weight: "bold",
              },
            },
            ticks: {
              display: props.labels.length <= 10,
            },
            grid: {
              display: props.labels.length <= 10,
            },
          },
          y: {
            title: {
              display: !!props.yLabel,
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
