import { Chart, getElementAtEvent } from "react-chartjs-2";
import { topojson } from "chartjs-chart-geo";
import { useEffect, useRef, useState } from "react";
import MAP_JSON from "const/map.const";
import { IFeature } from "interfaces/chart.interface";

export default function WorldMap() {
  const chartRef = useRef();
  const [data, setData] = useState<IFeature[]>([]);
  const [chosen, _setChosen] = useState<keyof typeof MAP_JSON>("united_states");

  const onClick = (event: any) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    const chosen = getElementAtEvent(chart, event);
    console.log(chosen);
  };

  useEffect(() => {
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
  }, [chosen]);

  useEffect(() => {
    console.log(data);
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
            label: "Countries",
            data: data.map((d: any) => ({
              feature: d,
              value: Math.random() * 10,
            })),
            outlineBackgroundColor: "#F5F5F5",
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
            projection: "equirectangular",
          },
        },
      }}
      onClick={onClick}
    />
  );
}
