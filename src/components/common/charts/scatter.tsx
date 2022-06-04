import { ChartColor } from "const/chart.const";
import { IDataset } from "interfaces/chart.interface";
import { Scatter } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset[];
  xLabel?: string;
  yLabel?: string;
}

export default function ScatterChart(props: Props): JSX.Element {
  return (
    <Scatter
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
      }}
      data={{
        datasets: props.datasets.map((value, index) => ({
          label: props.labels[index],
          data: [
            {
              x: value.data[1],
              y: value.data[0],
            },
          ],
          backgroundColor: ChartColor[index % ChartColor.length],
        })),
      }}
    />
  );
}
