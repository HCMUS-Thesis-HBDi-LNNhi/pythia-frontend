import { getMultipleChartColors } from "const/colors.const";
import { XAxisType } from "interfaces/chart.interface";
import { Scatter as ChartJSScatter } from "react-chartjs-2";

interface Props {
  datasets: { label: string; data: [number, number][] }[];
  xLabel?: string;
  yLabel?: string;
  category?: XAxisType;
  tooltip?: (tooltipItems: Array<any>) => string | string[];
}

export default function Scatter(props: Props): JSX.Element {
  return (
    <ChartJSScatter
      data={{
        datasets: props.datasets.map((value, index) => ({
          ...getMultipleChartColors({ index }),
          label: value.label,
          data: value.data.map(([x, y]) => ({ x, y })),
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
        },
      }}
    />
  );
}
