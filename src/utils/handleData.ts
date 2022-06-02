import { toast } from "components/common";
import API from "const/api.const";
import {
  ChartType,
  IChartOptions,
  IChartYear,
} from "interfaces/chart.interface";
import { IData, IDimCustomer } from "interfaces/data.interface";
import { fetcher } from "./fetcher";

export async function handleFetchData(
  id: string,
  setLoading: (value: boolean) => void
): Promise<IData | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getData(id));
    if (response.status === 200) return response.data;
  } catch (error) {
    toast("Something went wrong, please try again!", "failure");
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function getDateKeys(quarters: IChartYear, years: IChartYear): string[] {
  const result: string[] = [];
  let quarter = quarters.from;
  let year = years.from;
  while (year <= years.to) {
    if (quarter > quarters.to && year === years.to) break;
    result.push(`${quarter}_${year}`);
    if (quarter < 4) quarter++;
    else {
      quarter = 1;
      year++;
    }
  }
  return result;
}

function getXKeys(data: IData, x: keyof IDimCustomer): string[] {
  return Array.from(new Set(data.dim_customers.map((value) => value[x])));
}

export function normalizedData(
  data: IData,
  chartType: ChartType,
  chartOptions: IChartOptions
) {
  const { x, y, z, quarters, years } = chartOptions;

  const dateKeys = getDateKeys(quarters, years);
  let xKeys: string[] = [];
  if (x === "date_key") xKeys = dateKeys;
  else xKeys = getXKeys(data, x);

  switch (chartType) {
    // 2Q, 1C
    case ChartType.scatter:
    // 1Q, Country/City
    case ChartType.geo:
    // 1Q, 2C
    default:
      if (z) {
        // 3D chart
        const result = new Map<string, { [key: string]: number }>();

        if (x === "date_key") {
          data.dim_customers.forEach((customer) => {
            let mapKey = customer[z];
            dateKeys.forEach((dateKey) => {
              const factKey = `${customer.customer_id}_${dateKey}`;
              const customerFact = data.fact_transactions[factKey];

              if (customerFact) {
                const quantitativeValue = Math.round(customerFact[y]);
                const mapValue = result.get(mapKey) ?? {};
                const dateValue = mapValue[dateKey] ?? 0;

                result.set(mapKey, {
                  ...mapValue,
                  [dateKey]: dateValue + quantitativeValue,
                });
              }
            });
          });
        } else {
          //do something
        }
        return {
          result,
          xKeys,
        };
      } else {
        // 2D chart
        const result = new Map<string, number>();
        if (x !== "date_key") {
          data.dim_customers.forEach((customer) => {
            let mapKey = customer[x];
            const mapValue = result.get(mapKey) ?? 0;
            let sum = 0;
            dateKeys.forEach((dateKey) => {
              const factKey = `${customer.customer_id}_${dateKey}`;
              const customerFact = data.fact_transactions[factKey];
              if (customerFact) {
                sum += Math.round(customerFact[y]);
              }
            });
            result.set(mapKey, mapValue + sum);
          });
        } else {
          dateKeys.forEach((dateKey) => {
            const mapKey = dateKey;
            const mapValue = result.get(mapKey) ?? 0;
            let sum = 0;
            data.dim_customers.forEach((customer) => {
              const factKey = `${customer.customer_id}_${dateKey}`;
              const customerFact = data.fact_transactions[factKey];
              if (customerFact) {
                sum += Math.round(customerFact[y]);
              }
            });
            result.set(mapKey, mapValue + sum);
          });
        }
        return {
          result,
          xKeys:
            x === "date_key"
              ? xKeys.map((value) => `Q${value.replace("_", "/")}`)
              : xKeys,
        };
      }
  }
}
