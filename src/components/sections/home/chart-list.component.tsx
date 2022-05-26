import { Button, ChartHeader, ChartBody } from "components/common";
import icons from "const/icons.const";
import { ChartType } from "interfaces/common.interface";
import { IChartData } from "interfaces/home.interface";
import { Dispatch, SetStateAction, useState } from "react";
import ChartDialog from "./chart-dialog.component";
import DisplayBox from "./display-box.component";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
interface Props {
  chartData: IChartData[];
  setChartData: Dispatch<SetStateAction<IChartData[]>>;
}

const initialData: IChartData = {
  label: "",
  report: "segmentation",
  metric: "age",
  chartType: ChartType.bar,
};

export default function ChartList(props: Props): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  const [submittedData, setSubmittedData] = useState<IChartData>(initialData);
  const [chartType, _setChartType] = useState<ChartType>(ChartType.bar);

  const clear = () => {
    setSubmittedData(initialData);
    setIsShow(false);
  };

  return (
    <main className="grid grid-cols-3">
      {props.chartData.map((item, index) => (
        <DisplayBox
          label={item.label}
          key={item.label + "_" + index}
          onClick={() => {
            const newData = props.chartData.slice();
            newData.splice(index, 1);
            props.setChartData(newData.slice());
          }}
        >
          <ChartBody
            chartType={chartType}
            chartTitle="Charts"
            categoricalData={labels}
            quantitativeData={labels.map(() => Math.random() * 100)}
            scatterData={labels.map(() => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
            }))}
          />
        </DisplayBox>
      ))}
      <div
        className={[
          "border border-primary-300 rounded-lg text-center m-2 aspect-4/3",
          "flex-1 grid hover:shadow-lg",
        ].join(" ")}
      >
        <Button
          className="text-5xl w-full h-full place-content-center"
          style="outline"
          icon={icons.outline.plus}
          onClick={() => setIsShow(true)}
        />
      </div>
      {isShow && (
        <ChartDialog
          data={submittedData}
          initialData={initialData}
          handleSubmit={(values: IChartData) => {
            const newData = props.chartData.slice();
            newData.push(values);
            props.setChartData(newData.slice());
            clear();
          }}
          handleReset={clear}
        />
      )}
    </main>
  );
}
