import { NextRouter } from "next/router";

import API from "const/api.const";
import Errors from "const/error.const";

import { IData } from "interfaces/data.interface";

import handleErrors from "utils/errors.utils";
import fetcher from "utils/fetcher.utils";

export async function handleFetchData(
  userID: string | null,
  setLoading: (value: boolean) => void,
  router: NextRouter
): Promise<IData | undefined> {
  if (!userID) {
    handleErrors(Errors[401], router);
    return;
  }
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getData(userID));
    if (response.status !== 200) throw Errors[response.status] ?? response;
    else return response.data;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}

import {
  getCategoryLabel,
  getValueLabel,
  getLabels,
  getDate,
} from "./getLabels";
import handle2DData from "./handle2DData";

export { getCategoryLabel, getValueLabel, getLabels, getDate, handle2DData };
