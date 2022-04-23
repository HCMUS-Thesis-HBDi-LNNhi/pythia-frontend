import { Button, Dialog, Input } from "components/common";
import icons from "const/icons.const";
import { IChartData } from "interfaces/dashboard.interface";
import { Dispatch, SetStateAction, useState } from "react";
import DisplayBox from "./display-box.component";

interface Props {
  chartData: IChartData[];
  setChartData: Dispatch<SetStateAction<IChartData[]>>;
}

const defaultData: IChartData = {
  label: "",
  chart: "Some chart",
  description: "",
};

export default function ChartList(props: Props): JSX.Element {
  const { chartData, setChartData } = props;
  const [isShow, setIsShow] = useState(false);
  const [submitData, setSubmitData] = useState<IChartData>(defaultData);

  const updateSubmitData = (
    key: keyof IChartData,
    value: string | number | readonly string[]
  ) => setSubmitData({ ...submitData, [key]: value });

  const clear = () => {
    setSubmitData(defaultData);
    setIsShow(false);
  };

  function add() {
    const newData = chartData.slice();
    newData.push(submitData);
    setChartData(newData.slice());
  }

  function remove(index: number) {
    const newData = chartData.slice();
    newData.splice(index, 1);
    setChartData(newData.slice());
  }

  return (
    <main className="grid grid-cols-3">
      {chartData.map((item, index) => (
        <DisplayBox
          label={item.label}
          key={item.label + "_" + index}
          onClick={() => remove(index)}
        >
          {item.chart}
        </DisplayBox>
      ))}
      <div
        className={[
          "border rounded-lg text-center m-2 aspect-4/3",
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
        <Dialog className="w-1/2 h-1/2">
          <div className="h-5/6 grid grid-cols-[30%_60%] place-items-center">
            <h6 className="col-span-2">Create a new box</h6>
            <label htmlFor="label">Label</label>
            <Input
              id="label"
              type="text"
              fill
              value={submitData.label}
              setValue={(value) => updateSubmitData("label", value)}
            />
            <label htmlFor="value">Value</label>
            <Input
              id="value"
              type="text"
              fill
              value={submitData.chart?.toString()}
              setValue={(value) => updateSubmitData("chart", value)}
            />
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              type="text"
              fill
              value={submitData.description}
              setValue={(value) => updateSubmitData("description", value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button onClick={() => clear()} style="failure">
              Cancel
            </Button>
            <Button
              onClick={() => {
                add();
                clear();
              }}
              style="highlight"
            >
              Accept
            </Button>
          </div>
        </Dialog>
      )}
    </main>
  );
}
