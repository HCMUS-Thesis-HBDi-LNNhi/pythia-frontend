import API from "const/api.const";
import Errors from "const/error.const";
import {
  IBGNBDResponse,
  IRFMResponse,
} from "interfaces/segmentation.interface";
import { NextRouter } from "next/router";
import handleErrors from "utils/errors.utils";
import { fetcher } from "utils/fetcher.utils";

export async function fetchRFMResult(
  id: string,
  setLoading: (value: boolean) => void,
  router: NextRouter
): Promise<IRFMResponse | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getRFMResult(id));
    if (response.status !== 200) throw Errors[response.status] ?? response;
    else return response.data;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}

export async function fetchBGNBDResult(
  id: string,
  setLoading: (value: boolean) => void,
  router: NextRouter
): Promise<IBGNBDResponse | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getBGNBDResult(id));
    if (response.status === 200) return response.data;
    else throw response;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}
