import { Pie } from "react-chartjs-2";

import { qualitativeColors } from "const/colors.const";

import { IDataset } from "interfaces/chart.interface";

interface Props {
  labels: string[];
  datasets: IDataset;
}

export default function PieChart(props: Props): JSX.Element {
  const { labels, datasets } = props;

  return (
    <Pie
      data={{
        labels,
        datasets: [{ ...datasets, backgroundColor: qualitativeColors }],
      }}
      options={{
        aspectRatio: 2 / 1,
        plugins: {
          legend: {
            display: labels.length <= 10,
          },
        },
      }}
    />
  );
}
