export enum Gender {
  female = "Female",
  male = "Male",
  others = "Others",
}

export enum Age {
  teen = "Under 18",
  young_adult = "18 to 25",
  adult = "26 to 45",
  middle_age = "46 to 65",
  elder = "Over 65",
}

export enum Transaction {
  under = "Under",
  mid = "Middle",
  upper = "Upper",
}

export interface IDimCustomer {
  city: string;
  country: string;
  customer_id?: string;
  dob: string;
  gender: string;
  job_industry: string;
  job_title: string;
  wealth_segment: string;
  date_key?: string;
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
