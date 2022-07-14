import { Chart, getElementAtEvent } from "react-chartjs-2";
import { topojson } from "chartjs-chart-geo";
import { useCallback, useEffect, useRef, useState } from "react";
import { IDataset, IFeature } from "interfaces/chart.interface";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import Button from "../../common/buttons/button.component";
import icons from "const/icons.const";
import MAP_JSON from "const/map.const";
import handleErrors from "utils/errors.utils";
import { useRouter } from "next/router";
import Errors from "const/error.const";
import {
  getContinentCode,
  removeDuplicateObjects,
} from "utils/formatter.utils";
import { CONTINENTS } from "const/country-code.const";

interface Props {
  datasets: IDataset[];
}

export default function GeoChart(props: Props) {
  const router = useRouter();
  const chartRef = useRef<ChartJSOrUndefined<any>>(undefined);
  const [initialData, setInitialData] = useState<IFeature[]>([]);
  const [previous, setPrevious] = useState<(keyof typeof MAP_JSON)[]>([]);
  const [chosen, setChosen] =
    useState<keyof typeof MAP_JSON>("world_continents");

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

  const fillData = (feature: IFeature) => {
    const target = feature.properties[MAP_JSON[chosen].propertiesKey];

    if (chosen === "world_continents") {
      const continentData = props.datasets.find((data) => {
        const continentCode = getContinentCode(data.label);
        if (!continentCode) return false;
        else return target === CONTINENTS[continentCode];
      });
      return continentData ? continentData.data[0] : 0;
    } else {
      const countryData = props.datasets.find((data) => target === data.label);
      return countryData ? countryData.data[0] : 0;
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
            label: "",
            data: features.map((d: IFeature) => ({
              feature: d,
              value: fillData(d),
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
        const uniqueFeatures = removeDuplicateObjects<IFeature>(features);
        setInitialData(uniqueFeatures);
        updateChart(uniqueFeatures);
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
              label: "",
              data: initialData.map((d: IFeature) => ({
                feature: d,
                value: fillData(d),
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
