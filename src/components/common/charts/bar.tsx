import { Bar } from "react-chartjs-2";

interface Props {
  labels: unknown[];
  chartTitle: string;
  data: unknown[];
}

export default function BarChart(props: Props): JSX.Element {
  return (
    <Bar
      data={{
        labels: props.labels,
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
