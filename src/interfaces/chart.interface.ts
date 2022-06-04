export type MetricType =
  | keyof ICustomerDemographic
  | keyof ICustomerTransaction;

export enum ChartType {
  bar = "bar",
  pie = "pie",
  line = "line",
  scatter = "scatter",
  geo = "geo",
}

export enum TransactionDataType {
  totalAmount = "Total Amount",
  totalTransactions = "Total Transactions",
}

export enum CustomerDataType {
  age = "Age",
  gender = "Gender",
  country = "Country",
  city = "City",
  jobTitle = "Job Title",
  jobIndustry = "Job Industry",
}

export type ScatterDataType = { x: number; y: number };

export interface IChart {
  label: string;
  type: ChartType;
  icon?: React.ReactNode;
  focusIcon?: React.ReactNode;
}

export interface IChartYear {
  from: number;
  to: number;
}

export interface IChartOptions {
  transaction: TransactionDataType;
  customer: CustomerDataType;
  years: IChartYear;
  quarters: IChartYear;
}

export interface IChartData extends IChartOptions {
  id: string;
  chartType: ChartType;
}

export interface IChartDataResponse {
  id?: string;
  chart_type: ChartType;
  customer_category: string;
  from_date: string;
  to_date: string;
  transaction_category: string;
  user_id: string;
}

export interface ICustomerDemographic {
  customerID: string;
  // dob: Date; => receive dob from DB & calculate age ???
  age: number;
  gender: number;
  country: string;
  city: string;
  jobTitle: string;
  jobIndustry: string;
  wealthSegment: string;
}

export interface ICustomerTransaction {
  customerID: string;
  transactionDate: Date;
  transactionAmount: number;
}

export interface IReport {
  segmentation: ICustomerDemographic | ICustomerTransaction;
  potentiality: ICustomerDemographic;
}

export enum ReportLabel {
  segmentation = "Segmentation Report",
  potentiality = "Potentiality Report",
}
