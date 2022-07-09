import { getSingleChartColor } from "const/colors.const";
import { IScatterDataset, XAxisType } from "interfaces/chart.interface";
import { Scatter } from "react-chartjs-2";
import { getCategoryLabels } from "utils/category.utils";

interface Props {
  datasets: IScatterDataset[];
  xLabel?: string;
  yLabel?: string;
  tooltipLabels?: string[];
  category?: XAxisType;
}

export default function SingleScatterChart(props: Props): JSX.Element {
  return (
    <Scatter
      data={{
        datasets: props.datasets.map((value) => ({
          ...value,
          ...getSingleChartColor(),
          label: getCategoryLabels(value.label),
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
          legend: {
            display: props.category !== "job_title",
          },
        },
      }}
    />
  );
}
