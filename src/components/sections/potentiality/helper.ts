import { NextRouter } from "next/router";

import API from "const/api.const";
import Errors from "const/error.const";

import { IResult } from "interfaces/potentiality.interface";

import handleErrors from "utils/errors.utils";
import fetcher from "utils/fetcher.utils";

export async function fetchPotentialityResult(
  id: string,
  setLoading: (value: boolean) => void,
  router: NextRouter,
  setFirstUser: (value: boolean) => void
): Promise<IResult | undefined> {
  try {
    setLoading(true);
    const response = await fetcher.get(API.GET.getPotentialityResult(id));
    if (response.status === 400) setFirstUser(true);
    else if (response.status !== 200) throw Errors[response.status] ?? response;
    else return response.data;
  } catch (error) {
    handleErrors(error, router);
  } finally {
    setLoading(false);
  }
}
