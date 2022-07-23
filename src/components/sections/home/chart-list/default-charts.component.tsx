import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

import ChartContainer from "./chart-container.component";

import MAP_JSON from "const/map.const";

import { IFeature } from "interfaces/chart.interface";
import { IData } from "interfaces/data.interface";

import { getMap } from "utils/map.utils";

import { getTotalCustomers } from "./helper";

export const DefaultGeoCustomersPerRegion = (data: IData): JSX.Element => {
  const router = useRouter();

  const [features, setFeatures] = useState<IFeature[]>([]);
  const [totalCustomers] = useState(getTotalCustomers(data));

  useEffect(() => {
    getMap(MAP_JSON.world, router).then((res) => setFeatures(res));
  }, [router]);

  return (
    <ChartContainer label="Total customers per country">
      <Chart
        type="choropleth"
        data={{
          labels: features.map(
            (v) => v.properties[MAP_JSON.world.propertiesKey]
          ),
          datasets: [
            {
              outline: features,
              label: "",
              data: features.map((feature: IFeature) => ({
                feature,
                value:
                  totalCustomers.get(
                    feature.properties[MAP_JSON.world.propertiesKey]
                  ) ?? 0,
              })),
            },
          ],
        }}
        options={{
          showOutline: true,
          showGraticule: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xy: {
              projection: "naturalEarth1",
            },
            color: {
              beginAtZero: true,
              interpolate: "ylGn",
              display: false,
            },
          },
        }}
      />
    </ChartContainer>
  );
};
