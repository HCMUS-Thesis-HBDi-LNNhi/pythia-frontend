import { toast } from "components/common";
import API from "const/api.const";
import {
  ChartType,
  IChartOptions,
  IChartYear,
} from "interfaces/chart.interface";
import { IData, IDimCustomer, IFactData } from "interfaces/data.interface";
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

export function normalizedData(
  data: IData,
  chartType: ChartType,
  chartOptions: IChartOptions,
  quantitative: keyof IFactData,
  /** User defined */
  categorical: keyof IDimCustomer
) {
  const dateKeys = getDateKeys(chartOptions.quarters, chartOptions.years);

  switch (chartType) {
    case ChartType.scatter:
    // return new Map<string, { [key: string]: number }>({'0' : {}});
    case ChartType.geo:
    // return new Map<string, { [key: string]: number }>({});
    default:
      const result = new Map<string, { [key: string]: number }>();

      data.dim_customers.forEach((customer) => {
        let mapKey = customer[categorical];

        dateKeys.forEach((dateKey) => {
          const factKey = `${customer.customer_id}_${dateKey}`;
          const customerFact = data.fact_transactions[factKey];

          if (customerFact) {
            const quantitativeValue = customerFact[quantitative];
            const mapValue = result.get(mapKey) ?? {};

            result.set(mapKey, {
              ...mapValue,
              [dateKey]: Math.round(quantitativeValue),
            });
          }
        });
      });
      return { result, dateKeys };
  }
}
