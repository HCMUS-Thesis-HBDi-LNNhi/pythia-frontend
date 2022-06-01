import { ChartColor } from "const/chart.const";
import { Pie } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: {
    label: string;
    /** Must be percentage */
    data: number[];
  }[];
}

export default function PieChart(props: Props): JSX.Element {
  return (
    <Pie
      options={{ aspectRatio: 2 / 1 }}
      data={{
        labels: props.labels,
        datasets: props.datasets.map((value) => ({
          ...value,
          backgroundColor: ChartColor,
          borderWidth: 1,
        })),
      }}
    />
  );
}
