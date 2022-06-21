import { Chart, getElementAtEvent } from "react-chartjs-2";
import { topojson } from "chartjs-chart-geo";
import { useCallback, useEffect, useRef, useState } from "react";
import { IDataset, IFeature } from "interfaces/chart.interface";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import Button from "../buttons/button.component";
import icons from "const/icons.const";
import MAP_JSON from "const/map.const";
import handleErrors from "utils/errors.utils";
import { useRouter } from "next/router";
import Errors from "const/error.const";

interface Props {
  datasets: IDataset[];
}

export default function GeoChart(props: Props) {
  const router = useRouter();
  const chartRef = useRef<ChartJSOrUndefined<any>>(undefined);
  const [initialData, setInitialData] = useState<IFeature[]>([]);
  const [previous, setPrevious] = useState<(keyof typeof MAP_JSON)[]>([]);
  const [chosen, setChosen] = useState<keyof typeof MAP_JSON>("world");

  const zoomIn = (chosenFeature: IFeature) => {
    const newChosen = chosenFeature?.properties[MAP_JSON[chosen].propertiesKey]
      .toLowerCase()
      .replaceAll(" ", "_");
    if (Object.keys(MAP_JSON).includes(newChosen)) {
      const newPrevious = previous.slice();
      newPrevious.push(chosen);
      setPrevious(newPrevious);
      setChosen(newChosen as any);
    }
  };

  const updateChart = useCallback(
    (features: IFeature[]) => {
      if (!chartRef.current) return;
      const chart = chartRef.current;
      chart.data = {
        labels: features.map(
          (v) => v.properties[MAP_JSON[chosen].propertiesKey]
        ),
        datasets: [
          {
            outline: features,
            label: "Countries",
            // TODO: Use real data
            data: features.map((d: any) => ({
              feature: d,
              value: Math.random() * 10,
            })),
          },
        ],
      };
      chart.update();
    },
    [chosen]
  );

  useEffect(() => {
    fetch(MAP_JSON[chosen].url)
      .then((response) => response.json())
      .then((value) => {
        const features = topojson.feature(
          value,
          value.objects[MAP_JSON[chosen].objectsKey]
          // @ts-ignore
        ).features;
        setInitialData(features);
        updateChart(features);
      })
      .catch(() => handleErrors(Errors.geError, router));
  }, [chosen, router, updateChart]);

  return (
    <>
      <Button
        icon={
          chosen === "world_continents"
            ? icons.outline.zoomIn
            : icons.outline.zoomOut
        }
        onClick={() => {
          const newPrevious = previous.slice();
          if (chosen === "world_continents") {
            newPrevious.push("world_continents");
            setPrevious(newPrevious);
            setChosen("world");
          } else {
            const newChosen = newPrevious.pop();
            setPrevious(newPrevious);
            setChosen(newChosen ?? "world_continents");
          }
        }}
        className="flex justify-end"
      >
        {chosen === "world_continents" ? "Countries world map" : "Go back"}
      </Button>
      <Chart
        ref={chartRef}
        type="choropleth"
        data={{
          labels: initialData.map(
            (d: any) => d.properties[MAP_JSON[chosen].propertiesKey]
          ),
          datasets: [
            {
              outline: initialData,
              label: "Countries",
              // TODO: Use real data
              data: initialData.map((d: any) => ({
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
          const chosenElement = getElementAtEvent(chart, event)[0]?.element;
          // @ts-ignore
          zoomIn(chosenElement.feature);
        }}
      />
    </>
  );
}
