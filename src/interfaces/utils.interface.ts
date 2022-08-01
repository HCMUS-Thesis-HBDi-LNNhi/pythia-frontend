export type FileType = "demographic" | "transaction" | "classification";

export interface ICSVData {
  headers: string[] | { label: string; key: string }[];
  data: { [key: string]: string | number | boolean }[];
}
