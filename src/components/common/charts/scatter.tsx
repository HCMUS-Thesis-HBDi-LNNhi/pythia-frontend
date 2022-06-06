import { ChartColor } from "const/chart.const";
import { IScatterDataset } from "interfaces/chart.interface";
import { Scatter } from "react-chartjs-2";

interface Props {
  datasets: IScatterDataset[];
  xLabel?: string;
  yLabel?: string;
}

export default function ScatterChart(props: Props): JSX.Element {
  return (
    <Scatter
      data={{
        datasets: props.datasets.map((value, index) => ({
          ...value,
          backgroundColor: ChartColor[index % ChartColor.length],
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
      }}
    />
  );
}
