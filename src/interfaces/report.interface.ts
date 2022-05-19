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
