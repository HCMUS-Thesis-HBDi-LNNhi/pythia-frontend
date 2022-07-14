import { toast } from "components/common";
import { getMultipleChartColors } from "const/colors.const";
import { IDataset, XAxisType } from "interfaces/chart.interface";
import { useEffect } from "react";
import { Scatter } from "react-chartjs-2";

interface Props {
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
  category?: XAxisType;
  tooltip?: (tooltipItems: Array<any>) => string | string[];
  hideLegend?: boolean;
}

export default function ScatterChart(props: Props): JSX.Element {
  useEffect(() => {
    if (props.datasets.length <= 10) {
      toast(
        "For charts with less than 10 values, we recommend using BAR chart or PIE chart.",
        "general"
      );
    }
  }, [props.datasets]);

  return (
    <Scatter
      data={{
        datasets: props.datasets.map((value, index) => ({
          ...getMultipleChartColors({ index }),
          label: value.label,
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
                if (props.tooltip) return props.tooltip(tooltipItems);
                const items = tooltipItems.map((value) => [
                  value.dataset.label,
                  `${props.xLabel ?? ""}: ${value.label}`,
                  `${props.yLabel ?? ""}: ${value.formattedValue}`,
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
          legend: {
            display: props.hideLegend ?? true,
          },
        },
      }}
    />
  );
}
