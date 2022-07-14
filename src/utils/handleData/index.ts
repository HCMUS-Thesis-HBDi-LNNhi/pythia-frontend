import { NextRouter } from "next/router";

import API from "const/api.const";
import Errors from "const/error.const";
import { IData } from "interfaces/data.interface";
import handleErrors from "utils/errors.utils";
import { fetcher } from "../fetcher.utils";

export async function handleFetchData(
  id: string,
  setLoading: (value: boolean) => void,
  router: NextRouter
): Promise<IData | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getData(id));
    if (response.status !== 200) throw Errors[response.status] ?? response;
    else return response.data;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}

import { getLabel, getLabels, getDate } from "./getLabels";
import handle2DData from "./handle2DData";

export { getLabel, getLabels, getDate, handle2DData };
