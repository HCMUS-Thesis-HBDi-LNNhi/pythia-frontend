import { Button, Input, Tag } from "components/common";
import { RetainModel } from "interfaces/segmentation.interface";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TagColor } from "interfaces/common.interface";
import icons from "const/icons.const";
import { useReadLocalStorage } from "usehooks-ts";
import { handleUpload } from "utils/uploadFile";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userID = useReadLocalStorage<string>("user-id");
  const [selectModel, setSelectModel] = useState<RetainModel>(
    RetainModel.bg_nbd
  );
  const [isVisible, setIsVisible] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file || !userID) return;
    handleUpload(file, userID, props.setLoading);
  }, [file]);

  return (
    <main
      className={[
        "border border-gray-300 shadow rounded-lg",
        "p-4 space-y-4",
      ].join(" ")}
    >
      <div className="flex justify-end items-center w-full">
        <label htmlFor="model">
          <strong>Models: </strong>
        </label>
        <select
          id="model"
          className="border p-2 ml-2 mr-8 min-w-[12rem] rounded border-primary-500"
          value={selectModel}
          onChange={(e) => setSelectModel(parseInt(e.target.value))}
        >
          <option value={RetainModel.bg_nbd}>BG-NBD Model</option>
          <option value={RetainModel.rfm}>RFM Value</option>
        </select>
        <div className="space-x-2 mr-auto">
          <strong>Status: </strong>
          <Tag color={TagColor.blue}>In Progress</Tag>
        </div>
        <input
          type="file"
          accept=".csv,.xls"
          ref={inputRef}
          hidden
          onChange={(e) => {
            setFile(e.target.files && e.target.files[0]);
            // clear input file
            e.target.value = "";
          }}
        />
        <Button
          style="solid"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          Upload data
        </Button>
        {selectModel === RetainModel.bg_nbd && (
          <Button
            className="text-3xl"
            icon={
              isVisible ? icons.outline.chevron_up : icons.outline.chevron_down
            }
            onClick={() => setIsVisible(!isVisible)}
          />
        )}
      </div>
      {isVisible && (
        <form className="flex space-x-4 items-center">
          <label htmlFor="last_day">
            <strong>Last observed day: </strong>
          </label>
          <Input
            type="date"
            id="last_day"
            defaultValue={new Date().toISOString().substring(0, 10)}
          />
          <div />
          <label htmlFor="predict_days">
            <strong>Predict days: </strong>
          </label>
          <Input type="number" id="predict_days" defaultValue={365} />
        </form>
      )}
    </main>
  );
}
