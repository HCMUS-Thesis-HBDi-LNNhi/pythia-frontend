import {
  Button,
  ChartBody,
  ChartHeader,
  ChartOptions,
  Dialog,
  toast,
} from "components/common";
import API from "const/api.const";
import { initialChartOptions } from "const/chart.const";
import {
  ChartType,
  IChartDataResponse,
  IChartOptions,
} from "interfaces/chart.interface";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { fetcher } from "utils/fetcher";

const labels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

interface Props {
  userID: string;
  handleReset: () => void;
  handleReload: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChartDialog(props: Props): JSX.Element {
  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [chartOptions, setChartOptions] =
    useState<IChartOptions>(initialChartOptions);

  const handleCreateChart = useCallback(async () => {
    if (!props.userID) return;
    try {
      props.setLoading(true);
      const fromDate = [
        chartOptions.quarters.from,
        chartOptions.years.from,
      ].join("_");
      const toDate = [chartOptions.quarters.to, chartOptions.years.to].join(
        "_"
      );
      const payload: IChartDataResponse = {
        user_id: props.userID,
        chart_type: chartType,
        from_date: fromDate,
        to_date: toDate,
        customer_category: chartOptions.customer,
        transaction_category: chartOptions.transaction,
      };
      const response = await fetcher.post(API.POST.createPinnedChart, payload);
      if (response.status === 204) {
        props.handleReset();
        props.handleReload();
      } else {
        throw response;
      }
    } catch (error) {
      toast("Something went wrong, please try again!", "failure");
      console.error(error);
      props.handleReset();
    } finally {
      props.setLoading(false);
    }
  }, [chartOptions, chartType, props]);

  return (
    <Dialog className="w-4/5 h-[90%] p-8 text-primary-500">
      <h1 className="text-center font-bold text-primary-600 text-lg uppercase pb-6">
        Create a chart
      </h1>
      <main className="w-full h-[90%] flex">
        <div className="flex flex-col w-3/4">
          <ChartHeader chosenChart={chartType} setChosenChart={setChartType} />
          <div className="mt-8" />
          <ChartBody
            chartType={chartType}
            chartTitle={chartOptions.customer}
            categoricalData={labels}
            quantitativeData={labels.map(() => Math.random() * 100)}
            scatterData={labels.map(() => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
            }))}
          />
          <div className="flex mt-auto w-full justify-end space-x-4">
            <Button style="highlight" onClick={() => handleCreateChart()}>
              Accept
            </Button>
            <Button style="failure" onClick={() => props.handleReset()}>
              Cancel
            </Button>
          </div>
        </div>
        <div className="w-1/4 px-4 ml-4 border-l border-primary-400">
          <ChartOptions setChartOptions={setChartOptions} />
        </div>
      </main>
    </Dialog>
  );
}
