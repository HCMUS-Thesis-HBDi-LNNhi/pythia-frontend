import {
  ChartType,
  IChartOptions,
  IDataset,
  IScatterDataset,
} from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";
import { ReactNode, useEffect, useState } from "react";
import { getXKeys } from "utils/handleData";
import { getChosenChart, getDatasets, getLabels } from "./helper";

interface Props {
  data: IData;
  chartType: ChartType;
  chartOptions: IChartOptions;
}

export default function ChartBody(props: Props): JSX.Element {
  const { data, chartType, chartOptions } = props;
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataset[] | IScatterDataset[]>([]);
  const [chosenChart, setChosenChart] = useState<ReactNode>();

  useEffect(() => {
    const xKeys = getXKeys(data, chartOptions);
    setLabels(getLabels(xKeys, chartOptions));
    setDatasets(getDatasets(xKeys, data, chartType, chartOptions));
  }, [data, chartOptions, chartType]);

  useEffect(() => {
    setChosenChart(getChosenChart(chartType, labels, datasets, chartOptions));
  }, [chartType, labels, datasets, chartOptions]);

  return <>{chosenChart}</>;
}
