import { Button, ChartBody, toast } from "components/common";
import icons from "const/icons.const";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import ChartDialog from "./chart-dialog.component";
import ChartContainer from "./chart-container.component";
import API from "const/api.const";
import { useReadLocalStorage } from "usehooks-ts";
import { fetcher } from "utils/fetcher";
import {
  CustomerDataType,
  IChartData,
  IChartDataResponse,
  TransactionDataType,
} from "interfaces/chart.interface";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChartList(props: Props): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [isShow, setIsShow] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const fetchChartData = useCallback(async () => {
    if (!userID) return;
    try {
      props.setLoading(true);
      const response = await fetcher.get(API.GET.getPinnedCharts(userID));
      if (response.status === 200) {
        const data: { charts: IChartDataResponse[] } = response.data;
        if (data.charts.length === 0) return;
        setChartData(
          data.charts.map((item) => {
            if (!item.id) throw { ...item, message: "Missing pinned chart ID" };
            const fromDate = item.from_date.split("_");
            const toDate = item.to_date.split("_");
            return {
              quarters: {
                from: parseInt(fromDate[0]),
                to: parseInt(toDate[0]),
              },
              years: { from: parseInt(fromDate[1]), to: parseInt(toDate[1]) },
              chartType: item.chart_type,
              id: item.id,
              transaction: item.transaction_category as TransactionDataType,
              customer: item.customer_category as CustomerDataType,
            };
          })
        );
      } else throw response;
    } catch (error) {
      toast("Something went wrong, please try again!", "failure");
      console.error(error);
    } finally {
      props.setLoading(false);
    }
  }, [userID, props]);

  useEffect(() => {
    fetchChartData();
  }, [userID, props, fetchChartData]);

  return (
    <main className="grid grid-cols-3">
      {chartData.map((item) => (
        <ChartContainer
          key={item.id}
          chartID={item.id}
          label={`${item.transaction} of ${item.customer}`}
          handleReload={() => fetchChartData()}
          setLoading={props.setLoading}
        >
          <ChartBody
            chartType={item.chartType}
            chartTitle={item.customer}
            categoricalData={labels}
            quantitativeData={labels.map(() => Math.random() * 100)}
            scatterData={labels.map(() => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
            }))}
          />
        </ChartContainer>
      ))}
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
          handleReset={() => setIsShow(false)}
          handleReload={() => fetchChartData()}
          setLoading={props.setLoading}
        />
      )}
    </main>
  );
}
