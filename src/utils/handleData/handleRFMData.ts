import { IScatterDataset } from "interfaces/chart.interface";
import { IRFMResponse, IRFMResult } from "interfaces/segmentation.interface";

const getNumTransDatasets = (
  rfmResult: IRFMResponse,
  customerIndexes: string[],
  x: { [key: number]: number },
  y: { [key: number]: number }
): IScatterDataset[] => {
  const uniqueKeys = Array.from(
    new Set(Object.values(rfmResult.rfm.num_trans))
  ).sort((a, b) => a - b);
  const result = new Map();
  customerIndexes
    .map((value) => parseInt(value))
    .forEach((customerIndex) => {
      const mapKey = rfmResult.rfm.num_trans[customerIndex];
      const mapValue = result.get(mapKey) ?? [];
      result.set(mapKey, [
        ...mapValue,
        { x: x[customerIndex], y: y[customerIndex] },
      ]);
    });
  return uniqueKeys.map((value) => ({
    label: value.toString(),
    data: result.get(value) ?? [],
  }));
};

const getCLVDatasets = (
  rfmResult: IRFMResponse,
  customerIndexes: string[],
  xKey: keyof IRFMResult,
  x: { [key: number]: number },
  y: { [key: number]: number }
): IScatterDataset[] => {
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
      result.set(mapKey, [
        ...mapValue,
        {
          x: xValue,
          y: y[customerIndex],
        },
      ]);
    });
  return uniqueKeys.map((value) => ({
    label: (Math.round(rfmResult.clv[value] * 100) / 100).toString(),
    data: result.get(value) ?? [],
  }));
};

export const getDatasets = (
  xKey: keyof IRFMResult,
  yKey: keyof IRFMResult,
  scatterType: "clv" | "num_trans",
  rfmResult: IRFMResponse
): IScatterDataset[] => {
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
