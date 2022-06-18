import colors from "const/colors.const";
import { IDataset } from "interfaces/chart.interface";
import { Bar } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
}

export default function BarChart(props: Props): JSX.Element {
  return (
    <Bar
      data={{
        labels: props.labels,
        datasets: props.datasets.map((value, index) => ({
          ...value,
          backgroundColor: index < colors.length ? colors[index] : "#5880A2",
          borderColor: index < colors.length ? colors[index] : "#5880A2",
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
      }}
    />
  );
}
