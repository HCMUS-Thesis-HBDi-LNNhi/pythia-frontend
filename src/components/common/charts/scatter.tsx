import { ChartColor } from "const/chart.const";
import { ScatterDataType } from "interfaces/chart.interface";
import { Scatter } from "react-chartjs-2";

interface Props {
  datasets: ScatterDataType[];
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
