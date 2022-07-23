import { topojson } from "chartjs-chart-geo";
import { NextRouter } from "next/router";

import Errors from "const/error.const";

import { IFeature } from "interfaces/chart.interface";
import { IMap } from "interfaces/map.interface";

import handleErrors from "./errors.utils";
import { removeDuplicateObjects } from "./formatter.utils";

export const getMap = async (
  map: IMap,
  router: NextRouter
): Promise<IFeature[]> => {
  if (!map) return [];
  const result = await fetch(map.url)
    .then((response) => response.json())
    .then((value) => {
      const features = topojson.feature(
        value,
        value.objects[map.objectsKey]
        // @ts-ignore
      ).features;
      const uniqueFeatures = removeDuplicateObjects<IFeature>(features);
      return uniqueFeatures;
    })
    .catch(() => {
      handleErrors(Errors.geError, router);
      return [];
    });
  return result;
};
