import { qualitativeColors } from "const/colors.const";
import { IDataset } from "interfaces/chart.interface";
import { Pie } from "react-chartjs-2";

interface Props {
  labels: string[];
  /** Datasets length must be under 4 */
  /** Data must be from 0 to 1 */
  datasets: IDataset;
  displayLegend?: boolean;
}

export default function PieChart(props: Props): JSX.Element {
  return (
    <Pie
      options={{
        aspectRatio: 2 / 1,
        plugins: {
          legend: {
            display: props.displayLegend,
          },
        },
      }}
      data={{
        labels: props.labels,
        datasets: [
          {
            ...props.datasets,
            backgroundColor: qualitativeColors,
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}
