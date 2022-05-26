import { Button, Dialog, Input, Select, Textarea } from "components/common";
import icons from "const/icons.const";
import { INumberData } from "interfaces/home.interface";
import { Dispatch, SetStateAction, useState } from "react";
import DisplayBox from "./display-box.component";
import NumberDialog from "./number-dialog.component";

interface Props {
  numberData: INumberData[];
  setNumberData: Dispatch<SetStateAction<INumberData[]>>;
}

const initialData: INumberData = {
  label: "",
  report: "segmentation",
  metric: "age",
};

export default function NumberList(props: Props): JSX.Element {
  const { numberData, setNumberData } = props;
  const [isShow, setIsShow] = useState(false);
  const [submittedData, setSubmittedData] = useState<INumberData>(initialData);

  const clear = () => {
    setSubmittedData(initialData);
    setIsShow(false);
  };

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
          <div className="font-bold text-3xl text-primary-500">1000</div>
        </DisplayBox>
      ))}
      {numberData.length < 5 && (
        <div
          className={[
            "border border-primary-300 rounded-lg text-center m-2 aspect-4/3",
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
        <NumberDialog
          data={submittedData}
          initialData={initialData}
          handleSubmit={(values: INumberData) => {
            const newData = numberData.slice();
            newData.push(values);
            setNumberData(newData.slice());
            clear();
          }}
          handleReset={clear}
        />
      )}
    </main>
  );
}
