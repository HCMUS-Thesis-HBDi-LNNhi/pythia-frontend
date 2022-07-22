import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import { qualitativeColors } from "const/colors.const";

import { IChartOptions, IDataset } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

import { getLabels, handle2DData } from "utils/handleData";

interface Props {
  data: IData;
  chartOptions: IChartOptions;
}

export default function PieChart(props: Props): JSX.Element {
  const { data, chartOptions } = props;
  const [labels, setLabels] = useState<string[]>(getLabels(data, chartOptions));
  const [datasets, setDatasets] = useState<IDataset>(
    handle2DData(data, chartOptions, labels)[0]
  );

  useEffect(() => {
    setLabels(getLabels(data, chartOptions));
    setDatasets(handle2DData(data, chartOptions, labels)[0]);
  }, [data, chartOptions, labels]);

  return (
    <Pie
      data={{
        labels: labels,
        datasets: [
          {
            ...datasets,
            backgroundColor: qualitativeColors,
            borderWidth: 1,
          },
        ],
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
