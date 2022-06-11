export enum Gender {
  female = "0",
  male = "1",
  others = "",
}

export enum Age {
  /** Under 18 */
  teen = "0",
  /** 18 to 25 */
  young_adult = "1",
  /** 26 to 65 */
  adult = "2",
  /** Over 65 */
  elder = "3",
}

export enum FactDataLabels {
  num_trans = "Number of transactions",
  total_amount = "Total amount",
  recency = "Recency",
  cluster_id = "Cluster",
  customer_id = "Customer ID",
}

export enum CategoryDataLabels {
  city = "City",
  country = "Country",
  customer_id = "Customer ID",
  dob = "Age",
  gender = "Gender",
  job_industry = "Job industry",
  job_title = "Job title",
  date_key = "Quarters",
}

export interface IDimCustomer {
  city: string;
  country: string;
  customer_id: string;
  dob: string;
  gender: string;
  job_industry: string;
  job_title: string;
}

export interface IDimDate {
  date_key: string;
  quarter: number;
  quarter_end_day: string;
  quarter_start_day: string;
  year: number;
}

export interface IFactData {
  num_trans: number;
  total_amount: number;
}

export interface IFactTable extends IFactData {
  account_id: string;
  customer_id: string;
  date_key: string;
  first_transaction: string;
  last_transaction: string;
}

export interface IData {
  dim_customers: IDimCustomer[];
  dim_dates: IDimDate[];
  fact_transactions: { [key: string]: IFactTable };
}
