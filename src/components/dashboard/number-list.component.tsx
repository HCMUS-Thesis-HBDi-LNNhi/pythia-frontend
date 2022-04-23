import { Button, Dialog, Input } from "components/common";
import icons from "const/icons.const";
import { INumberData } from "interfaces/dashboard.interface";
import { Dispatch, SetStateAction, useState } from "react";
import DisplayBox from "./display-box.component";

interface Props {
  numberData: INumberData[];
  setNumberData: Dispatch<SetStateAction<INumberData[]>>;
}

const defaultData: INumberData = {
  label: "",
  value: 0,
  description: "",
};

export default function NumberList(props: Props): JSX.Element {
  const { numberData, setNumberData } = props;
  const [isShow, setIsShow] = useState(false);
  const [submitData, setSubmitData] = useState<INumberData>(defaultData);

  const updateSubmitData = (
    key: keyof INumberData,
    value: string | number | readonly string[]
  ) => setSubmitData({ ...submitData, [key]: value });

  const clear = () => {
    setSubmitData(defaultData);
    setIsShow(false);
  };

  function add() {
    const newData = numberData.slice();
    newData.push(submitData);
    setNumberData(newData.slice());
  }

  function remove(index: number) {
    const newData = numberData.slice();
    newData.splice(index, 1);
    setNumberData(newData.slice());
  }

  return (
    <main className="grid grid-cols-5">
      {numberData.map((item, index) => (
        <DisplayBox
          label={item.label}
          key={item.label + "_" + index}
          onClick={() => remove(index)}
        >
          <div>{item.value}</div>
          {item.description && <div>{item.description}</div>}
        </DisplayBox>
      ))}
      {numberData.length < 5 && (
        <div
          className={[
            "border rounded-lg text-center m-2 aspect-4/3",
            "flex-1 grid hover:shadow-lg",
          ].join(" ")}
        >
          <Button
            className="text-4xl w-full h-full place-content-center"
            style="outline"
            icon={icons.outline.plus}
            onClick={() => setIsShow(true)}
          />
        </div>
      )}
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
              type="number"
              fill
              value={submitData.value !== 0 ? submitData.value : undefined}
              setValue={(value) => updateSubmitData("value", value)}
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
