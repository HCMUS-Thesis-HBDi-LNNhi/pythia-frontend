import * as axios from "axios";

function get(
  url: string,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> {
  return axios.default.get(process.env.NEXT_PUBLIC_DOMAIN + url, config);
}

function post(
  url: string,
  data?: any,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> {
  return axios.default.post(process.env.NEXT_PUBLIC_DOMAIN + url, data, config);
}

export const fetcher = { get, post };