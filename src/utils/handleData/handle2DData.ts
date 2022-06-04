import { ChartType, IChartOptions } from "interfaces/chart.interface";
import { IData, IDimCustomer, IFactData } from "interfaces/data.interface";
import { getAgeKeyFromDOB, getDateKeys } from ".";

/** result: {x, [total_amount, num_trans]} */
function render_dateKey_scatter(data: IData, dateKeys: string[]) {
  const result = new Map<string, number[]>();
  dateKeys.forEach((dateKey) => {
    const mapKey = dateKey;
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
  xKeys: string[],
  dateKeys: string[],
  x: keyof IDimCustomer
) {
  const result = new Map<string, number[]>();
  xKeys.forEach((value) => result.set(value, [0, 0]));
  data.dim_customers.forEach((customer) => {
    const mapKey = x === "dob" ? getAgeKeyFromDOB(customer.dob) : customer[x];
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
  xKeys: string[],
  dateKeys: string[],
  x: keyof IDimCustomer,
  y: keyof IFactData
): Map<string, number[]> {
  const result = new Map<string, number[]>();
  xKeys.forEach((value) => result.set(value, [0]));
  data.dim_customers.forEach((customer) => {
    const mapKey = x === "dob" ? getAgeKeyFromDOB(customer.dob) : customer[x];
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

export default function render2DCharts(
  data: IData,
  chartType: ChartType,
  chartOptions: IChartOptions,
  xKeys: string[]
): Map<string, number[]> {
  const { x, y, quarters, years } = chartOptions;
  const dateKeys = getDateKeys(quarters, years);

  switch (true) {
    // TODO: implement for Geo chart
    case x === "date_key" && chartType === ChartType.geo:
      return new Map();
    case x === "dob" && chartType === ChartType.geo:
      return new Map();
    case chartType === ChartType.geo:
      return new Map();

    case x === "date_key" && chartType === ChartType.scatter:
      return render_dateKey_scatter(data, dateKeys);
    case chartType === ChartType.scatter:
      //@ts-ignore
      return render_default_scatter(data, xKeys, dateKeys, x);
    case x === "date_key":
      return render_dateKey_default(data, dateKeys, y);
    default:
      //@ts-ignore
      return render_default(data, xKeys, dateKeys, x, y);
  }
}
