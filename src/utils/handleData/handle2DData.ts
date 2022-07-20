import { ChartType, IChartOptions, IDataset } from "interfaces/chart.interface";
import {
  CategoryDataLabels,
  IData,
  IDimCustomer,
  IFactData,
} from "interfaces/data.interface";
import { getDate, getLabel } from ".";

function render_geo(
  data: IData,
  dateKeys: string[],
  x: "city" | "country",
  y: keyof IFactData
): Map<string, number[]> {
  const result = new Map<string, number[]>();
  const uniqueKeys = Array.from(
    new Set(data.dim_customers.map((value) => value[x]))
  );
  uniqueKeys.forEach((value) => result.set(value, [0]));
  data.dim_customers.forEach((customer) => {
    const mapKey = customer[x];
    const mapValue = result.get(mapKey) ?? [0];
    let sum = 0;
    dateKeys.forEach((dateKey) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum += Math.round(customerFact[y]);
      }
    });
    result.set(mapKey, [mapValue[0] + sum]);
  });
  return result;
}

/** result: {x, [total_amount, num_trans]} */
function render_dateKey_scatter(data: IData, dateKeys: string[]) {
  const result = new Map<string, number[]>();
  dateKeys.forEach((dateKey) => {
    const mapKey = getLabel(dateKey, "date_key");
    const mapValue = result.get(mapKey) ?? [0, 0];
    let sum_trans = 0;
    let sum_amount = 0;
    data.dim_customers.forEach((customer) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum_trans += Math.round(customerFact.num_trans);
        sum_amount += Math.round(customerFact.total_amount);
      }
    });
    result.set(mapKey, [mapValue[0] + sum_amount, mapValue[1] + sum_trans]);
  });
  return result;
}

/** result: {x, [total_amount, num_trans]} */
function render_default_scatter(
  data: IData,
  keys: string[],
  dateKeys: string[],
  x: keyof IDimCustomer
) {
  const result = new Map<string, number[]>();
  keys.forEach((value) => result.set(value, [0, 0]));
  data.dim_customers.forEach((customer) => {
    const mapKey = getLabel(customer[x] ?? "", x);
    const mapValue = result.get(mapKey) ?? [0, 0];
    let sum_trans = 0;
    let sum_amount = 0;
    dateKeys.forEach((dateKey) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum_trans += Math.round(customerFact.num_trans);
        sum_amount += Math.round(customerFact.total_amount);
      }
    });
    result.set(mapKey, [mapValue[0] + sum_amount, mapValue[1] + sum_trans]);
  });
  return result;
}

/** result: {x, sum of y} */
function render_dateKey_default(
  data: IData,
  dateKeys: string[],
  y: keyof IFactData
): Map<string, number[]> {
  const result = new Map<string, number[]>();
  dateKeys.forEach((dateKey) => {
    const mapKey = dateKey;
    const mapValue = result.get(mapKey) ?? [0];
    let sum = 0;
    data.dim_customers.forEach((customer) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum += Math.round(customerFact[y]);
      }
    });
    result.set(mapKey, [mapValue[0] + sum]);
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
): Map<string, number[]> {
  const result = new Map<string, number[]>();
  keys.forEach((value) => result.set(value, [0]));
  data.dim_customers.forEach((customer) => {
    const mapKey = getLabel(customer[x] ?? "", x);
    const mapValue = result.get(mapKey) ?? [0];
    let sum = 0;
    dateKeys.forEach((dateKey) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum += Math.round(customerFact[y]);
      }
    });
    result.set(mapKey, [mapValue[0] + sum]);
  });
  return result;
}

export default function handle2DData(
  data: IData,
  chartType: ChartType,
  chartOptions: IChartOptions,
  keys: string[]
): IDataset[] {
  const { x, y, quarters, years } = chartOptions;
  const dateKeys = getDate(quarters, years);

  const input = () => {
    switch (chartType) {
      case ChartType.geo:
        if (x === "city") return render_geo(data, dateKeys, x, y);
        else return render_geo(data, dateKeys, "country", y);
      case ChartType.scatter:
        if (x === "date_key") return render_dateKey_scatter(data, dateKeys);
        else return render_default_scatter(data, keys, dateKeys, x);
      default:
        if (x === "date_key") return render_dateKey_default(data, dateKeys, y);
        else return render_default(data, keys, dateKeys, x, y);
    }
  };

  const entries = Array.from(input().entries());
  if (chartType === ChartType.scatter || chartType === ChartType.geo) {
    return entries.map(([label, data]) => ({ label, data }));
  } else {
    return [
      {
        label: CategoryDataLabels[chartOptions.x],
        data: entries.map(([_, data]) => data[0]),
      },
    ];
  }
}
