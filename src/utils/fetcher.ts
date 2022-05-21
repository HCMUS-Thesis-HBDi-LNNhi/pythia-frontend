import * as axios from "axios";

axios.default.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token)
    config.headers = {
      ...config.headers,
      "X-Access-Token": token.replaceAll('"', ""),
    };
  return config;
});

const get = (
  url: string,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> => {
  return axios.default.get(process.env.NEXT_PUBLIC_DOMAIN + url, config);
};

const post = (
  url: string,
  data?: any,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> => {
  return axios.default.post(process.env.NEXT_PUBLIC_DOMAIN + url, data, config);
};

export const fetcher = { get, post };
