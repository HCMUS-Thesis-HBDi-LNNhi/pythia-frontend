import { Button, Dialog, Input, Select, Tag, toast } from "components/common";
import { RetainModel } from "interfaces/segmentation.interface";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PageLabels, TagColor } from "interfaces/common.interface";
import icons from "const/icons.const";
import { useReadLocalStorage } from "usehooks-ts";
import { handleUpload } from "utils/uploadFile";
import { useRouter } from "next/router";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: Props): JSX.Element {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userID = useReadLocalStorage<string>("user-id");
  const [selectModel, setSelectModel] = useState<RetainModel>(
    RetainModel.bg_nbd
  );
  const [isVisible, setIsVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"demographic" | "transaction">();

  useEffect(() => {
    if (!file || !fileType) return;
    if (!userID) {
      toast("Something went wrong, please login again!", "failure");
      router.push(`/${PageLabels.LOGIN}`);
      return;
    }
    handleUpload(file, userID, fileType ?? "demographic", props.setLoading);
  }, [file, fileType]);

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
        <Button
          style="outline"
          className="border border-primary-500 mr-2"
          icon={icons.outline.download}
        >
          <a href="templates.zip" download="Customer transaction template">
            Templates
          </a>
        </Button>
        <input
          type="file"
          accept=".csv"
          ref={inputRef}
          hidden
          onChange={(e) => {
            setFile(e.target.files && e.target.files[0]);
            // clear input file
            e.target.value = "";
          }}
        />
        <Select
          options={[
            {
              label: "Upload data",
              id: "",
              value: undefined,
            },
            {
              label: "Upload demographic data",
              id: "demographic",
              value: "demographic",
            },
            {
              label: "Upload transaction data",
              id: "transaction",
              value: "transaction",
            },
          ]}
          value={fileType}
          setValue={(value) => {
            if (value !== "demographic" && value !== "transaction") return;
            setFileType(value);
            inputRef.current?.click();
          }}
          className="p-3 bg-none focus:bg-none"
          style="solid"
        />
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
