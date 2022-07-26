import { NextRouter } from "next/router";

import API from "const/api.const";
import Errors from "const/error.const";

import { IChartOptions, IDataset } from "interfaces/chart.interface";
import { IData, IDimCustomer, IFactData } from "interfaces/data.interface";

import handleErrors from "utils/errors.utils";
import fetcher from "utils/fetcher.utils";
import {
  getCategoryLabel,
  getDate,
  getValueLabel,
  RoundNumber,
} from "utils/formatter.utils";

/** result: {x, sum of y} */
function render_dateKey_default(
  data: IData,
  dateKeys: string[],
  y: keyof IFactData
): Map<string, number> {
  const result = new Map<string, number>();
  dateKeys.forEach((dateKey) => {
    const mapKey = dateKey;
    const mapValue = result.get(mapKey) ?? 0;
    let sum = 0;
    data.dim_customers.forEach((customer) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum += RoundNumber(customerFact[y]);
      }
    });
    result.set(mapKey, mapValue + sum);
  });
  return result;
}

/** result: {x, sum of y} */
function render_default(
  data: IData,
  keys: string[],
  dateKeys: string[],
  x: keyof IDimCustomer,
  y: keyof IFactData
): Map<string, number> {
  const result = new Map<string, number>();
  keys.forEach((value) => result.set(value, 0));
  data.dim_customers.forEach((customer) => {
    const mapKey = getValueLabel(customer[x] ?? "", x);
    const mapValue = result.get(mapKey) ?? 0;
    let sum = 0;
    dateKeys.forEach((dateKey) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum += RoundNumber(customerFact[y]);
      }
    });
    result.set(mapKey, mapValue + sum);
  });
  return result;
}

export default function handle2DData(
  data: IData,
  chartOptions: IChartOptions,
  keys: string[]
): IDataset[] {
  const { x, y, quarters, years } = chartOptions;
  const dateKeys = getDate(quarters, years);

  const input = () => {
    if (x === "date_key")
      return render_dateKey_default(data, dateKeys, y as keyof IFactData);
    else
      return render_default(
        data,
        keys,
        dateKeys,
        x as keyof IDimCustomer,
        y as keyof IFactData
      );
  };

  const entries = Array.from(input().entries());
  return [
    {
      label: getCategoryLabel(chartOptions.x),
      data: entries.map(([_, data]) => data),
    },
  ];
}

export async function handleFetchData(
  userID: string | null,
  router: NextRouter,
  setLoading: (value: boolean) => void,
  setFirstUser: (value: boolean) => void
): Promise<IData | undefined> {
  if (!userID) {
    handleErrors(Errors[401], router);
    return;
  }
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getData(userID));
    if (response.status === 400) setFirstUser(true);
    else if (response.status !== 200) throw Errors[response.status] ?? response;
    else return response.data;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}
