import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import icons from "const/icons.const";
import { Button, ChartBody } from "components/common";
import ChartDialog from "./chart-dialog.component";
import ChartContainer from "./chart-container.component";
import { IChartData } from "interfaces/chart.interface";
import {
  CategoryDataLabels,
  FactDataLabels,
  IData,
} from "interfaces/data.interface";
import { handleDelete, handleFetchChart } from "./fetcher";

interface Props {
  data: IData;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChartList(props: Props): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [isShow, setIsShow] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const fetchData = () => {
    if (!userID) return;
    handleFetchChart(userID, props.setLoading).then((res) => setChartData(res));
  };

  const clear = () => {
    setIsShow(false);
  };

  const renderChart = (chartData: IChartData) => (
    <ChartContainer
      key={chartData.id}
      label={`${FactDataLabels[chartData.y]} of ${
        CategoryDataLabels[chartData.x]
      }`}
      delete={() => handleDelete(chartData.id, props.setLoading, fetchData)}
    >
      <ChartBody
        data={props.data}
        chartType={chartData.chartType}
        chartOptions={chartData}
      />
    </ChartContainer>
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      {chartData.map((item) => renderChart(item))}
      <div
        className={[
          "border border-primary-300 rounded-lg text-center m-2 aspect-4/3",
          "flex-1 grid hover:shadow-lg",
        ].join(" ")}
      >
        <Button
          className="text-5xl w-full h-full place-content-center"
          style="outline"
          icon={icons.outline.plus}
          onClick={() => setIsShow(true)}
        />
      </div>
      {isShow && userID && (
        <ChartDialog
          userID={userID}
          data={props.data}
          setLoading={props.setLoading}
          reload={fetchData}
          clear={clear}
        />
      )}
    </main>
  );
}
