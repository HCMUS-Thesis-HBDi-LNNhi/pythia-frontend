import { ChartColor } from "const/chart.const";
import { FactDataLabels } from "interfaces/data.interface";
import { IRFMResult } from "interfaces/segmentation.interface";
import { Scatter } from "react-chartjs-2";
import { removeDuplicateValues } from "utils/formatter";

interface Props {
  uniqueKeys: number[];
  rfmResult: IRFMResult;
  xKey: keyof IRFMResult;
  yKey: keyof IRFMResult;
  scatterType: "clv" | "num_trans";
}

export default function RFMScatterChart(props: Props): JSX.Element {
  const x = props.rfmResult[props.xKey];
  const y = props.rfmResult[props.yKey];
  const customerIndexes = Object.keys(props.rfmResult.cluster_id);

  const getData = (value: number) => {
    return customerIndexes.map((customerIndex) => {
      const index = parseInt(customerIndex);
      if (props.rfmResult.num_trans[index] === value) {
        return {
          x: x[index],
          y: y[index],
        };
      } else return {};
    });
  };

  const getNumTransXValue = (customerIndex: string, index: number) => {
    return index === 0
      ? (x[parseInt(customerIndex)] as number) - 0.1
      : (x[parseInt(customerIndex)] as number) + 0.1;
  };

  const getCLVData = (index: number) => {
    return customerIndexes.map((customerIndex) => {
      if (props.rfmResult.cluster_id[parseInt(customerIndex)] === index) {
        return {
          x:
            props.xKey === "num_trans"
              ? getNumTransXValue(customerIndex, index)
              : x[parseInt(customerIndex)],
          y: y[parseInt(customerIndex)],
        };
      } else return {};
    });
  };

  return (
    <Scatter
      data={{
        datasets: props.uniqueKeys.map((value, index) => {
          return {
            label: value.toString(),
            data: removeDuplicateValues(
              props.scatterType === "clv" ? getCLVData(index) : getData(value)
            ),
            backgroundColor: ChartColor[index % ChartColor.length],
          };
        }),
      }}
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: FactDataLabels[props.xKey],
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            title: {
              display: true,
              text: FactDataLabels[props.yKey],
              font: {
                weight: "bold",
              },
            },
            beginAtZero: true,
          },
        },
      }}
    />
  );
}
