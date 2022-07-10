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
  const formatLabels = () => {
    return props.labels.map((label) => {
      if (label === "n/a" || label === "") return "Others";
      if (label.length > 5) return label;
      return label;
    });
  };
  return (
    <Bar
      data={{
        labels: formatLabels(),
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
                return tooltipItems.map(
                  (value) => value.label + ": " + value.formattedValue
                );
              },
              label: () => "",
            },
          },
        },
        ...props.options,
      }}
    />
  );
}
