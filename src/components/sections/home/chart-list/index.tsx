import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import icons from "const/icons.const";
import { Button, ChartBody } from "components/common";
import ChartDialog from "./chart-dialog.component";
import ChartContainer from "./chart-container.component";
import { ChartType, IChartData } from "interfaces/chart.interface";
import { IData, initialData } from "interfaces/data.interface";
import { handleDelete, handleFetchChart } from "./fetcher";
import { handleFetchData } from "utils/handleData";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChartList(props: Props): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [isShow, setIsShow] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [data, setData] = useState<IData>();

  const fetchData = () => {
    if (!userID) return;
    handleFetchData(userID, props.setLoading).then((res) => setData(res));
    handleFetchChart(userID, props.setLoading).then((res) => setChartData(res));
  };

  const clear = () => {
    setIsShow(false);
  };

  const renderChart = (chartData: IChartData) => (
    <ChartContainer
      key={chartData.id}
      label={`${chartData.transaction} of ${chartData.customer}`}
      delete={() => handleDelete(chartData.id, props.setLoading, fetchData)}
    >
      <ChartBody
        data={data ?? initialData}
        chartType={ChartType.bar}
        chartOptions={chartData}
        quantitative="total_amount"
        categorical="gender"
      />
    </ChartContainer>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="grid grid-cols-2">
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
          setLoading={props.setLoading}
          reload={fetchData}
          clear={clear}
        />
      )}
    </main>
  );
}
