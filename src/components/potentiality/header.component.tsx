import { Button, Tag } from "components/common";
import { useState } from "react";
import { TagColor } from "interfaces/common.interface";
import { AcquireModel } from "interfaces/potentiality.interface";

export default function Header(): JSX.Element {
  const [selectModel, setSelectModel] = useState<AcquireModel>(
    AcquireModel.clustering
  );

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
        <Button style="solid">Upload data</Button>
      </div>
    </main>
  );
}
