import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { ChartTypes } from "const/common.const";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
// import { ReGeoMapChart } from "regeo-map-chart";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement
);

interface Props {
  chartTitle: string;
  labels: string[];
  data: number[];
  chartType: string;
  scatterChartData?: { x: number; y: number }[];
}

export default function ChartBody(props: Props): JSX.Element {
  const { labels, data, chartType, scatterChartData, chartTitle } = props;

  switch (chartType) {
    case ChartTypes[0].label:
      return (
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: chartTitle,
                data,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      );
    case ChartTypes[1].label:
      return (
        <Line
          data={{
            labels,
            datasets: [
              {
                label: chartTitle,
                data,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      );
    case ChartTypes[2].label:
      return (
        <Pie
          options={{ aspectRatio: 2 / 1 }}
          data={{
            labels,
            datasets: [
              {
                label: chartTitle,
                data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 109, 12, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 109, 12, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      );
    case ChartTypes[3].label:
      return (
        <Scatter
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            datasets: [
              {
                label: chartTitle,
                data: scatterChartData,
                backgroundColor: "rgba(255, 99, 132, 1)",
              },
            ],
          }}
        />
      );
    // case ChartTypes[4].label:
    //   <ReGeoMapChart
    //     data={[
    //       ["Region", "Users", "Active Users"],
    //       ["de", 252552, 25000],
    //       ["us", 852552, 162306],
    //       ["br", 452552, 52794],
    //       ["ca", 544445, 27229],
    //       ["fr", 652552, 277416],
    //       ["ru", 752751, 27410],
    //     ]}
    //     width={350}
    //     datalessRegionColor="#FDE2E2"
    //     datafulRegionColor="#1AC258"
    //     backgroundColor="#fff"
    //     hideMapLegend={true}
    //     strokeColor="#737373"
    //     tooltipBackgroundColor="#082032"
    //     style={{ maxWidth: 500 }} // the styled applied to the div that wraps the svg
    //   />;
    default:
      return <div>Wrong chart type</div>;
  }
}
