import { ISelectItem } from "interfaces/common.interface";
import { ReportLabel } from "interfaces/report.interface";

export const ReportOptions: ISelectItem[] = [
  {
    label: ReportLabel.segmentation,
    id: "segmentation",
    value: "segmentation",
  },
  {
    label: ReportLabel.potentiality,
    id: "potentiality",
    value: "potentiality",
  },
];

export const PotentialityOptions: ISelectItem[] = [
  { label: "Age", id: "age", value: "age" },
  { label: "Gender", id: "gender", value: "gender" },
  { label: "Country", id: "country", value: "country" },

  { label: "City", id: "city", value: "city" },
  { label: "Job Title", id: "jobTitle", value: "jobTitle" },
  { label: "Job Industry", id: "jobIndustry", value: "jobIndustry" },
  {
    label: "Wealth Segment",
    id: "wealthSegment",
    value: "wealthSegment",
  },
];

export const SegmentationOptions: ISelectItem[] = [
  ...PotentialityOptions,
  {
    label: "Transaction Date",
    id: "transactionDate",
    value: "transactionDate",
  },
  {
    label: "Transaction Amount",
    id: "transactionAmount",
    value: "transactionAmount",
  },
];
