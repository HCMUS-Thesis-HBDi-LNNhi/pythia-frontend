import { Scatter } from "react-chartjs-2";

interface Props {
  chartTitle: string;
  data: { x: number; y: number }[];
}

export default function ScatterChart(props: Props): JSX.Element {
  return (
    <Scatter
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      data={{
        datasets: [
          {
            label: props.chartTitle,
            data: props.data,
            backgroundColor: "#5880A2",
          },
        ],
      }}
    />
  );
}
