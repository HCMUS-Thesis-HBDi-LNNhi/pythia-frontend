import { IChartOptions, IScatterDataset } from "interfaces/chart.interface";
import { IData, IDimCustomer } from "interfaces/data.interface";

import { getLabels, getValueLabel, getDate } from "utils/formatter.utils";

const getMap = (
  data: IData,
  chartOptions: IChartOptions,
  dateKeys: string[]
) => {
  const map = new Map<string, { x: number; y: number }[]>();
  const keys = getLabels(data, chartOptions);
  keys.forEach((value) => map.set(value, []));
  data.dim_customers.forEach((customer) => {
    const mapKey = getValueLabel(
      customer[chartOptions.x as keyof IDimCustomer] ?? "",
      chartOptions.x
    );
    const mapValue = map.get(mapKey) ?? [];
    let num_trans = 0;
    let total_amount = 0;
    dateKeys.forEach((dateKey) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        num_trans += Math.round(customerFact.num_trans);
        total_amount += Math.round(customerFact.total_amount);
      }
    });
    map.set(mapKey, [...mapValue, { x: num_trans, y: total_amount }]);
  });
  return map;
};

const getDateKeyMap = (data: IData, dateKeys: string[]) => {
  const map = new Map<string, { x: number; y: number }[]>();
  data.dim_customers.forEach((customer) => {
    dateKeys.forEach((dateKey) => {
      const mapKey = getValueLabel(dateKey, "date_key");
      const mapValue = map.get(mapKey) ?? [];
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        const num_trans = Math.round(customerFact.num_trans);
        const total_amount = Math.round(customerFact.total_amount);
        map.set(mapKey, [...mapValue, { x: num_trans, y: total_amount }]);
      }
    });
  });
  return map;
};

export const getDatasets = (
  data: IData,
  chartOptions: IChartOptions
): IScatterDataset[] => {
  let map = new Map<string, { x: number; y: number }[]>();
  let dateKeys = getDate(chartOptions.quarters, chartOptions.years);

  if (chartOptions.x !== "date_key") map = getDateKeyMap(data, dateKeys);
  else map = getMap(data, chartOptions, dateKeys);

  const result: IScatterDataset[] = [];
  map.forEach((data, label) => result.push({ label, data }));
  return result;
};
