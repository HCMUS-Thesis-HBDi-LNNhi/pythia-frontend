import { Line } from "react-chartjs-2";

interface Props {
  labels: unknown[];
  chartTitle: string;
  data: unknown[];
}

export default function LineChart(props: Props): JSX.Element {
  return (
    <Line
      data={{
        labels: props.labels,
        datasets: [
          {
            label: props.chartTitle,
            data: props.data,
            borderColor: "#5880A2",
            backgroundColor: "#5880A2",
          },
        ],
      }}
    />
  );
}
