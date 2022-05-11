export interface IHistory {
  name: string;
  num_rows: number;
  headers: string[];
  created_at: Date;
  updated_at: Date;
  file_type: string;
}

export interface IHistoryResponse {
  files: {
    name: string;
    num_rows: number;
    headers: string[];
    created_at: string;
    updated_at: string;
    file_type: string;
  }[];
}
