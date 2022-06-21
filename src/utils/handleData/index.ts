import API from "const/api.const";
import Errors from "const/error.const";
import { IChartOptions, IChartYear } from "interfaces/chart.interface";
import { Age, IData } from "interfaces/data.interface";
import { NextRouter } from "next/router";
import handleErrors from "utils/errors.utils";
import { fetcher } from "../fetcher.utils";

import handle2DData from "./handle2DData";

export { handle2DData };

const CURRENT_YEAR = new Date().getFullYear();

export const AgeKeys = [Age.teen, Age.young_adult, Age.adult, Age.elder];

export async function handleFetchData(
  id: string,
  setLoading: (value: boolean) => void,
  router: NextRouter
): Promise<IData | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getData(id));
    if (response.status !== 200) throw Errors[response.status] ?? response;
    else return response.data;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}

export function getDateKeys(quarters: IChartYear, years: IChartYear): string[] {
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

export function getXKeys(data: IData, chartOptions: IChartOptions) {
  const { x, quarters, years } = chartOptions;
  switch (x) {
    case "date_key":
      return getDateKeys(quarters, years);
    case "dob":
      return AgeKeys;
    default:
      return Array.from(new Set(data.dim_customers.map((value) => value[x])));
  }
}

export function getAgeKeyFromDOB(dob: string): Age {
  const age = CURRENT_YEAR - parseInt(dob.split("/")[2]);
  if (age < 18) return Age.teen;
  else if (age >= 18 && age < 26) return Age.young_adult;
  else if (age >= 26 && age < 66) return Age.adult;
  else return Age.elder;
}
