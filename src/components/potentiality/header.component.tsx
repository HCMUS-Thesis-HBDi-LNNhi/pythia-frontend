import { Button, Tag } from "components/common";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TagColor } from "interfaces/common.interface";
import { AcquireModel } from "interfaces/potentiality.interface";
import { useReadLocalStorage } from "usehooks-ts";
import { handleUpload } from "utils/uploadFile";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userID = useReadLocalStorage<string>("user-id");
  const [selectModel, setSelectModel] = useState<AcquireModel>(
    AcquireModel.clustering
  );
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
          <option value={AcquireModel.clustering}>Clustering</option>
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
      </div>
    </main>
  );
}
