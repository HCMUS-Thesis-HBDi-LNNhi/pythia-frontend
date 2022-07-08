import colors from "const/colors.const";
import { IScatterDataset, XAxisType } from "interfaces/chart.interface";
import { Scatter } from "react-chartjs-2";
import { getCategoryLabels } from "utils/category.utils";

interface Props {
  datasets: IScatterDataset[];
  xLabel?: string;
  yLabel?: string;
  tooltipLabels?: string[];
  annotations?: any;
  category?: XAxisType;
}

export default function ScatterChart(props: Props): JSX.Element {
  return (
    <Scatter
      data={{
        datasets: props.datasets.map((value, index) => ({
          ...value,
          label: getCategoryLabels(value.label),
          backgroundColor: colors[index % colors.length],
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
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const tooltipLabels = props.tooltipLabels;
                return tooltipLabels
                  ? tooltipItems.map((_value, index) => tooltipLabels[index])
                  : [];
              },
              label: props.tooltipLabels ? () => "" : undefined,
            },
          },
          annotation: {
            annotations: props.annotations,
          },
          legend: {
            display: props.category !== "job_title",
          },
        },
      }}
    />
  );
}
