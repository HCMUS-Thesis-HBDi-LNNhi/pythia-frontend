import { ChartColor } from "const/chart.const";
import { IDataset } from "interfaces/chart.interface";
import { Line } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
}

export default function LineChart(props: Props): JSX.Element {
  return (
    <Line
      data={{
        labels: props.labels,
        datasets: props.datasets.map((value, index) => ({
          ...value,
          backgroundColor:
            index < ChartColor.length ? ChartColor[index] : "#5880A2",
          borderColor:
            index < ChartColor.length ? ChartColor[index] : "#5880A2",
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
