import { IDataset } from "interfaces/chart.interface";
import { IRFM, IRFMResults } from "interfaces/segmentation.interface";

const getNumTransDatasets = (
  rfmResult: IRFMResults,
  customerIndexes: string[],
  x: { [key: number]: number },
  y: { [key: number]: number }
): IDataset[] => {
  const result = new Map();

  const num_trans = Object.values(rfmResult.rfm.num_trans).sort(
    (a, b) => a - b
  );
  const min = num_trans[0];
  const max = num_trans[num_trans.length - 1];
  const mid = Math.round((max - min) / 2);
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
): IDataset[] => {
  const uniqueKeys = Object.keys(rfmResult.clv).map((value) => parseInt(value));
  const result = new Map();
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
    label: (Math.round(rfmResult.clv[value] * 100) / 100).toString(),
    data: result.get(value) ?? [],
  }));
};

export const getDatasets = (
  xKey: keyof IRFM,
  yKey: keyof IRFM,
  scatterType: "clv" | "num_trans",
  rfmResult: IRFMResults
): IDataset[] => {
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
