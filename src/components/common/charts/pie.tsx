import { Pie } from "react-chartjs-2";

interface Props {
  labels: unknown[];
  chartTitle: string;
  data: unknown[];
}

export default function PieChart(props: Props): JSX.Element {
  return (
    <Pie
      options={{ aspectRatio: 2 / 1 }}
      data={{
        labels: props.labels,
        datasets: [
          {
            label: props.chartTitle,
            data: props.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 109, 12, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}
