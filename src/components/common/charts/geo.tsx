// import { useEffect, useRef } from "react";
// import { Chart, GoogleChartWrapper } from "react-google-charts";

// interface Props {
//   label: string;
//   data: [string, number][];
// }

// export default function GeoChart(props: Props): JSX.Element {
//   const ref = useRef<Chart>(null);

//   const originalWarn = console.warn;

//   console.warn = function (...args) {
//     const arg = args && args[0];

//     if (arg && arg.includes("Attempting to load version '51' of Google Charts"))
//       return;

//     originalWarn(...args);
//   };

//   function handleReadyState(chartWrapper: GoogleChartWrapper) {
//     const chart = chartWrapper.getChart();
//     const selection = chart.getSelection();
//     console.log("ready", selection);
//   }

//   function handleSelectState(chartWrapper: GoogleChartWrapper) {
//     const chart = chartWrapper.getChart();
//     const selection = chart.getSelection();
//     console.log("select", selection);
//   }

//   useEffect(() => {});

//   return (
//     <Chart
//       ref={ref}
//       chartType="GeoChart"
//       width="100%"
//       height="90%"
//       data={[["Country", props.label], ...props.data]}
//       options={{
//         // region: "002", // Africa
//         backgroundColor: "#DBE9F5",
//       }}
//       chartEvents={[
//         {
//           eventName: "ready",
//           callback: ({ chartWrapper }) => handleReadyState(chartWrapper),
//         },
//         {
//           eventName: "select",
//           callback: ({ chartWrapper }) => handleSelectState(chartWrapper),
//         },
//       ]}
//     />
//   );
// }

// import { Chart } from '';

export default function GeoChart(): JSX.Element {
  return <div>Geo chart</div>;
}
//   const chart = new Chart(document.getElementById("canvas").getContext("2d"), {
//     type: 'choropleth',
//     data: {
//       labels: countries.map((d) => d.properties.name),
//       datasets: [{
//         label: 'Countries',
//         data: countries.map((d) => ({feature: d, value: Math.random()})),
//       }]
//     },
//     options: {
//       showOutline: true,
//       showGraticule: true,
//       plugins: {
//         legend: {
//           display: false
//         },
//       },
//       scales: {
//         xy: {
//           projection: 'equalEarth'
//         }
//       }
//     }
//   });
// });

//   return <div></div>;
// }
