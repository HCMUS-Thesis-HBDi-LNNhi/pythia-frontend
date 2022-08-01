import { NextRouter } from "next/router";

import API from "const/api.const";
import Errors from "const/error.const";

import {
  IBGNBDResponse,
  IRFM,
  IRFMResults,
  IRFMResponse,
} from "interfaces/segmentation.interface";

import fetcher from "utils/fetcher.utils";
import handleErrors from "utils/errors.utils";
import { RoundNumber } from "utils/formatter.utils";

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

const getNumTransDatasets = (
  rfmResult: IRFMResults,
  customerIndexes: string[],
  x: { [key: number]: number },
  y: { [key: number]: number }
) => {
  const result = new Map<string, [number, number][]>();

  const num_trans = Object.values(rfmResult.rfm.num_trans).sort(
    (a, b) => a - b
  );
  const min = num_trans[0];
  const max = num_trans[num_trans.length - 1];
  const mid = RoundNumber((max - min) / 2);
  const transKey = [`Under ${mid} transactions`, `Over ${mid} transactions`];

  customerIndexes
    .map((value) => parseInt(value))
    .forEach((customerIndex) => {
      const num_tran = rfmResult.rfm.num_trans[customerIndex];

      let mapKey;
      if (num_tran < mid) mapKey = transKey[0];
      else mapKey = transKey[1];

      const mapValue = result.get(mapKey) ?? [];
      result.set(mapKey, [...mapValue, [x[customerIndex], y[customerIndex]]]);
    });

  return Object.values(transKey).map((value) => ({
    label: value.toString(),
    data: result.get(value) ?? [],
  }));
};

const getCLVDatasets = (
  rfmResult: IRFMResults,
  customerIndexes: string[],
  xKey: keyof IRFM,
  x: { [key: number]: number },
  y: { [key: number]: number }
) => {
  const uniqueKeys = Object.keys(rfmResult.clv).map((value) => parseInt(value));
  const result = new Map<number, [number, number][]>();
  customerIndexes
    .map((value) => parseInt(value))
    .forEach((customerIndex) => {
      const mapKey = rfmResult.rfm.cluster_id[customerIndex];
      const mapValue = result.get(mapKey) ?? [];
      const xValue =
        xKey === "num_trans"
          ? x[customerIndex] - 0.1 + mapKey * 0.2
          : x[customerIndex];
      result.set(mapKey, [...mapValue, [xValue, y[customerIndex]]]);
    });
  return uniqueKeys.map((value) => ({
    label: RoundNumber(rfmResult.clv[value]).toString(),
    data: result.get(value) ?? [],
  }));
};

export const getDatasets = (
  xKey: keyof IRFM,
  yKey: keyof IRFM,
  scatterType: "clv" | "num_trans",
  rfmResult: IRFMResults
) => {
  const x = rfmResult.rfm[xKey];
  const y = rfmResult.rfm[yKey];
  const customerIndexes = Object.keys(rfmResult.rfm.cluster_id);
  switch (scatterType) {
    case "num_trans":
      return getNumTransDatasets(rfmResult, customerIndexes, x, y);
    case "clv":
    default:
      return getCLVDatasets(rfmResult, customerIndexes, xKey, x, y);
  }
};
