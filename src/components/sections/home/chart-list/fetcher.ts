import { toast } from "components/common";
import API from "const/api.const";
import {
  ChartType,
  CustomerDataType,
  IChartData,
  IChartDataResponse,
  IChartOptions,
  TransactionDataType,
} from "interfaces/chart.interface";
import { fetcher } from "utils/fetcher";

function normalizedData(data: IChartDataResponse): IChartData {
  if (!data.id) throw { ...data, message: "Missing pinned chart ID" };
  const fromDate = data.from_date.split("_");
  const toDate = data.to_date.split("_");

  const id = data.id;
  const chartType = data.chart_type;
  const transaction = data.transaction_category as TransactionDataType;
  const customer = data.customer_category as CustomerDataType;
  const quarters = {
    from: parseInt(fromDate[0]),
    to: parseInt(toDate[0]),
  };
  const years = { from: parseInt(fromDate[1]), to: parseInt(toDate[1]) };
  return {
    id,
    chartType,
    transaction,
    customer,
    quarters,
    years,
  };
}

export async function handleFetchChart(
  userID: string,
  setLoading: (value: boolean) => void
): Promise<IChartData[]> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getPinnedCharts(userID));
    if (response.status !== 200) throw response;
    return response.data.charts.map((item: IChartDataResponse) =>
      normalizedData(item)
    );
  } catch (error) {
    toast("Something went wrong, please try again!", "failure");
    console.error(error);
    return [];
  } finally {
    setLoading(false);
  }
}

export async function handleCreateChart(
  userID: string,
  chartOptions: IChartOptions,
  chartType: ChartType,
  setLoading: (value: boolean) => void,
  reload: () => void,
  clear: () => void
): Promise<void> {
  try {
    setLoading(true);
    const fromDate = [chartOptions.quarters.from, chartOptions.years.from].join(
      "_"
    );
    const toDate = [chartOptions.quarters.to, chartOptions.years.to].join("_");
    const payload: IChartDataResponse = {
      user_id: userID,
      chart_type: chartType,
      from_date: fromDate,
      to_date: toDate,
      customer_category: chartOptions.customer,
      transaction_category: chartOptions.transaction,
    };
    const response = await fetcher.post(API.POST.createPinnedChart, payload);
    if (response.status === 204) reload();
    else throw response;
  } catch (error) {
    toast("Something went wrong, please try again!", "failure");
    console.error(error);
  } finally {
    clear();
    setLoading(false);
  }
}

export async function handleDelete(
  chartID: string,
  setLoading: (value: boolean) => void,
  reload: () => void
): Promise<void> {
  try {
    setLoading(true);
    const response = await fetcher.handleDelete(
      API.DELETE.deletePinnedChart(chartID)
    );
    if (response.status == 204) {
      reload();
    } else {
      throw response;
    }
  } catch (error) {
    toast("Something went wrong, please try again!", "failure");
    console.error(error);
  } finally {
    setLoading(false);
  }
}
