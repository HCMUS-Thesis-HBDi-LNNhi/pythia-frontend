import { CONTINENTS } from "const/country-code.const";
import MAP_JSON from "const/map.const";

import { IChartOptions, IFeature } from "interfaces/chart.interface";
import { IData, IFactData } from "interfaces/data.interface";

import { getContinentCode, RoundNumber } from "utils/formatter.utils";
import { getDate } from "utils/formatter.utils";

interface IDataset {
  label: string;
  data: number;
}

export function getDataset(
  data: IData,
  chartOptions: IChartOptions
): IDataset[] {
  const { y, quarters, years } = chartOptions;
  const dateKeys = getDate(quarters, years);

  const map = new Map<string, number>();

  const uniqueKeys = Array.from(
    new Set(data.dim_customers.map((value) => value.country))
  );
  uniqueKeys.forEach((value) => map.set(value, 0));

  data.dim_customers.forEach((customer) => {
    const mapKey = customer.country;
    const mapValue = map.get(mapKey) ?? 0;
    let sum = 0;
    dateKeys.forEach((dateKey) => {
      const factKey = `${customer.customer_id}_${dateKey}`;
      const customerFact = data.fact_transactions[factKey];
      if (customerFact) {
        sum += RoundNumber(customerFact[y as keyof IFactData]);
      }
    });
    map.set(mapKey, mapValue + sum);
  });

  const result: IDataset[] = [];
  map.forEach((data, label) => result.push({ label, data }));
  return result;
}

export const fillData = (
  x: string,
  datasets: IDataset[],
  feature: IFeature
) => {
  const map = MAP_JSON[x];
  const target = feature.properties[map.propertiesKey];
  if (x === "world_continents") {
    const continentData = datasets.find((data) => {
      const continentCode = getContinentCode(data.label);
      if (!continentCode) return false;
      else return target === CONTINENTS[continentCode];
    });
    return continentData ? continentData.data : 0;
  } else {
    const countryData = datasets.find((data) => target === data.label);
    return countryData ? countryData.data : 0;
  }
};

export const formatFeatures = (
  x: string,
  datasets: IDataset[],
  features: IFeature[]
) => {
  const map = MAP_JSON[x];
  return {
    labels: features.map((v) => (map ? v.properties[map.propertiesKey] : "")),
    datasets: [
      {
        outline: features,
        label: "",
        data: features.map((d: IFeature) => ({
          feature: d,
          value: fillData(x, datasets, d),
        })),
      },
    ],
  };
};

export const zoomIn = (x: string, chosen: IFeature): string => {
  const map = MAP_JSON[x];
  if (!map) return x;
  const newChosen = chosen?.properties[map.propertiesKey]
    .toLowerCase()
    .replaceAll(" ", "_");
  if (newChosen in MAP_JSON) return newChosen;
  return x;
};
