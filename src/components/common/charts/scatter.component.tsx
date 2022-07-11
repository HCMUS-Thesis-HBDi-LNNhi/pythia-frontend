import { getSingleChartColor } from "const/colors.const";
import { IDataset, XAxisType } from "interfaces/chart.interface";
import { Scatter } from "react-chartjs-2";
import { getCategoryLabels } from "utils/category.utils";

interface Props {
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
  tooltipLabels?: string[];
  category?: XAxisType;
}

export default function ScatterChart(props: Props): JSX.Element {
  return (
    <Scatter
      data={{
        datasets: props.datasets.map((value) => ({
          ...getSingleChartColor(),
          label: getCategoryLabels(value.label),
          data: [
            {
              x: value.data[0],
              y: value.data[1],
            },
          ],
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
