export enum Gender {
  "Female" = "0",
  "Male" = "1",
  "Others" = "2",
}

export interface IDimCustomer {
  city: string;
  country: string;
  customer_id: string;
  dob: string;
  gender: string;
  job_industry: string;
  job_title: string;
  wealth_segment: string;
}

export interface IDimDate {
  date_key: string;
  quarter: number;
  quarter_end_day: string;
  quarter_start_day: string;
  year: number;
}

export interface IFactTable {
  account_id: string;
  customer_id: string;
  date_key: string;
  first_transaction: string;
  last_transaction: string;
  num_trans: number;
  total_amount: number;
}

export interface IData {
  dim_customers: IDimCustomer[];
  dim_dates: IDimDate[];
  fact_transactions: { [key: string]: IFactTable };
}
