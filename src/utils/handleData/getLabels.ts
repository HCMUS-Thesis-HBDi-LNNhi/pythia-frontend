import { Age, Gender, IData, IDimCustomer } from "interfaces/data.interface";
import { IChartOptions, IChartYear } from "interfaces/chart.interface";

const CURRENT_YEAR = new Date().getFullYear();

export function getDate(quarters: IChartYear, years: IChartYear): string[] {
  const result: string[] = [];

  let currentQuarter = quarters.from;
  let currentYear = years.from;

  while (currentYear <= years.to) {
    if (currentQuarter > quarters.to && currentYear === years.to) break;
    result.push(`${currentQuarter}_${currentYear}`);
    if (currentQuarter < 4) currentQuarter++;
    else (currentQuarter = 1), currentYear++;
  }

  return result;
}

export const getLabels = (
  data: IData,
  chartOptions: IChartOptions
): string[] => {
  const { x, quarters, years } = chartOptions;
  switch (x) {
    case "date_key":
      return getDate(quarters, years).map(
        (value) => `Q${value.replace("_", "/")}`
      );
    case "dob":
      return Object.values(Age);
    case "gender":
      return Object.values(Gender);
    default:
      return Array.from(
        new Set(
          data.dim_customers.map(
            (value) => value[x as keyof IDimCustomer] ?? ""
          )
        )
      );
  }
};

export const getValueLabel = (key: string, category?: string): string => {
  switch (category) {
    case "gender":
      switch (key) {
        case "0":
          return Gender.female;
        case "1":
          return Gender.male;
        default:
          return Gender.others;
      }
    case "dob":
      const age = CURRENT_YEAR - parseInt(key.split("/")[2]);
      switch (true) {
        case age < 18:
          return Age.teen;
        case age >= 18 && age < 26:
          return Age.young_adult;
        case age >= 26 && age < 46:
          return Age.adult;
        case age >= 46 && age < 66:
          return Age.middle_age;
        default:
          return Age.elder;
      }
    case "date_key":
      return `Q${key.replace("_", "/")}`;
    default:
      return key;
  }
};

export const getCategoryLabel = (key: string) => {
  switch (key) {
    // IFactData + RFM
    case "num_trans":
      return "Total transactions";
    case "total_amount":
      return "Total amount";
    case "recency":
      return "Recency";
    case "cluster_id":
      return "Cluster ID";
    //  IDimCustomer
    case "customer_id":
      return "Customer ID";
    case "city":
      return "City";
    case "country":
      return "Country";
    case "dob":
      return "Age";
    case "gender":
      return "Gender";
    case "job_industry":
      return "Job industry";
    case "job_title":
      return "Job title";
    case "date_key":
      return "Quarters";
    case "wealth_segment":
      return "Wealth segment";
    // MAP_JSON
    case "world":
      return "World countries";
    case "world_continents":
      return "World continents";
    default:
      return key.replaceAll("_", " ");
  }
};
