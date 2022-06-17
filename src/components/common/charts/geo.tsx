import { Chart, getElementAtEvent } from "react-chartjs-2";
import { topojson } from "chartjs-chart-geo";
import { useEffect, useRef, useState } from "react";
import MAP_JSON from "const/map.const";
import { IFeature } from "interfaces/chart.interface";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import toast from "../toast.component";

export default function WorldMap() {
  const chartRef = useRef<ChartJSOrUndefined<any>>(undefined);
  const [data, setData] = useState<IFeature[]>([]);
  const [chosen, setChosen] =
    useState<keyof typeof MAP_JSON>("world_continents");

  useEffect(() => {
    try {
      fetch(MAP_JSON[chosen].url)
        .then((response) => response.json())
        .then((value) => {
          const features: IFeature[] = topojson.feature(
            value,
            value.objects[MAP_JSON[chosen].objectsKey]
            // @ts-ignore
          ).features;
          setData(features);
        });
    } catch (error) {
      console.error(error);
      toast("Something went wrong!", "failure");
    }
  }, [chosen]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    chart.data = {
      labels: data.map(
        (d: any) => d.properties[MAP_JSON[chosen].propertiesKey]
      ),
      datasets: [
        {
          outline: data,
          label: "Countries",
          data: data.map((d: any) => ({
            feature: d,
            value: Math.random() * 10,
          })),
        },
      ],
    };
    chart.update();
  }, [data]);

  return (
    <Chart
      ref={chartRef}
      type="choropleth"
      data={{
        labels: data.map(
          (d: any) => d.properties[MAP_JSON[chosen].propertiesKey]
        ),
        datasets: [
          {
            outline: data,
            label: "Countries",
            data: data.map((d: any) => ({
              feature: d,
              value: Math.random() * 10,
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
        },
      }}
      onClick={(event: any) => {
        const { current: chart } = chartRef;
        if (!chart) return;
        const chosenFeature =
          // @ts-ignore
          getElementAtEvent(chart, event)[0]?.element.feature;
        const newChosen = chosenFeature?.properties[
          MAP_JSON[chosen].propertiesKey
        ]
          .toLowerCase()
          .replaceAll(" ", "_");
        if (Object.keys(MAP_JSON).includes(newChosen)) {
          setChosen(newChosen);
        }
      }}
    />
  );
}
