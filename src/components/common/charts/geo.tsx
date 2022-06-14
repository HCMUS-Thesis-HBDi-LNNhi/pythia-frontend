import { Chart, getElementAtEvent } from "react-chartjs-2";
import { topojson } from "chartjs-chart-geo";
import { useEffect, useRef, useState } from "react";
import { numericToAlpha2 } from "i18n-iso-countries";

/* const USPageMap = () => {
  const [nation, setNation] = useState<any>();
  const [states, setStates] = useState<any>([]);

  useEffect(() => {
    fetch("https://unpkg.com/us-atlas/states-10m.json")
      .then((response) => response.json())
      .then((us) => {
        // @ts-ignore
        setNation(ChartGeo.topojson.feature(us, us.objects.nation).features[0]);
        // @ts-ignore
        setStates(ChartGeo.topojson.feature(us, us.objects.states).features);
      });
  }, []);

  return (
    <Chart
      type="choropleth"
      data={{
        labels: states.map((d: any) => d.properties.name),
        datasets: [
          {
            label: "States",
            outline: nation,
            data: states.map((d: any) => ({
              feature: d,
              value: Math.random() * 10,
            })),
          },
        ],
      }}
    />
  );
};

export default USPageMap; */

interface IFeature {
  geometry: { type: string; coordinates: any };
  id: string;
  properties: { name: string };
  type: string;
}

export default function WorldMap() {
  const chartRef = useRef();
  const [data, setData] = useState<IFeature[]>([]);

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas/countries-50m.json")
      .then((response) => response.json())
      .then((value) => {
        const countries: IFeature[] =
          // @ts-ignore
          topojson.feature(value, value.objects.countries).features;
        setData(countries);
      });
  }, []);

  const onClick = (event: any) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    const chosen = getElementAtEvent(chart, event);

    console.log(chosen);
  };

  const arr = new Map([
    ["UK", 100],
    ["US", 300],
    ["RU", 500],
    ["VN", 800],
  ]);

  return (
    <Chart
      ref={chartRef}
      type="choropleth"
      data={{
        labels: data.map((feature) => feature.properties.name),
        datasets: [
          {
            label: "Countries",
            data: data.map((feature) => ({
              feature,
              value: arr.get(numericToAlpha2(feature.id)) ?? 0,
            })),
            outlineBackgroundColor: "#F5F5F5",
          },
        ],
      }}
      options={{
        showOutline: true,
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
