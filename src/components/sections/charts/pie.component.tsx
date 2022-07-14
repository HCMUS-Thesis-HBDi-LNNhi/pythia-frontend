import { toast } from "components/common";
import { qualitativeColors } from "const/colors.const";
import { IDataset } from "interfaces/chart.interface";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";

interface Props {
  labels: string[];
  datasets: IDataset;
}

export default function PieChart(props: Props): JSX.Element {
  useEffect(() => {
    if (props.labels.length > 10) {
      toast(
        "For charts with more than 10 values, we recommend using SCATTER chart.",
        "general"
      );
    }
  }, [props.labels]);

  return (
    <Pie
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
      options={{
        aspectRatio: 2 / 1,
        plugins: {
          legend: {
            display: props.labels.length <= 10,
          },
        },
      }}
    />
  );
}
