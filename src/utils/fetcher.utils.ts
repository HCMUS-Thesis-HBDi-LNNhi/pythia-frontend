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

const get = async (
  url: string,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> => {
  return await axios.default
    .get(process.env.NEXT_PUBLIC_DOMAIN + url, config)
    .then((response) => response)
    .catch((error) => error.response);
};

const post = async (
  url: string,
  data?: any,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> => {
  return await axios.default
    .post(process.env.NEXT_PUBLIC_DOMAIN + url, data, config)
    .then((response) => response)
    .catch((error) => error.response);
};

const handleDelete = async (
  url: string,
  config?: axios.AxiosRequestConfig<any>
): Promise<axios.AxiosResponse<any, any>> => {
  return await axios.default
    .delete(process.env.NEXT_PUBLIC_DOMAIN + url, config)
    .then((response) => response)
    .catch((error) => error.response);
};

const fetcher = { get, post, handleDelete };

export default fetcher;
