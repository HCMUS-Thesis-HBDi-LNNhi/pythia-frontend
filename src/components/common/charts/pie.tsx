import { ChartColor } from "const/chart.const";
import { Pie } from "react-chartjs-2";

interface Props {
  labels: string[];
  /** Datasets length must be under 4 */
  datasets: {
    label: string;
    /** Must be percentage */
    data: number[];
  }[];
}

export default function PieChart(props: Props): JSX.Element {
  return (
    <div className="grid grid-cols-2 place-items-center">
      {props.datasets.map((dataset, index) => (
        <div className="w-2/3 p-2" key={index}>
          <Pie
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: props.labels,
              datasets: [
                {
                  ...dataset,
                  backgroundColor: ChartColor,
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
}
