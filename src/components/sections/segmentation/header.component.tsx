import { Dispatch, SetStateAction, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

import {
  Button,
  CSVExportButton,
  Input,
  Tag,
  UploadButton,
} from "components/common";

import icons from "const/icons.const";
import Errors from "const/error.const";

import { RetainModel } from "interfaces/segmentation.interface";
import { TagColor } from "interfaces/common.interface";
import { ICSVData } from "interfaces/utils.interface";

import handleErrors from "utils/errors.utils";

interface Props {
  selectedModel: RetainModel;
  setSelectedModel: Dispatch<SetStateAction<RetainModel>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  displayGrid: boolean;
  setDisplayGrid: Dispatch<SetStateAction<boolean>>;
  status: string;
  csvData?: ICSVData;
}

export default function Header(props: Props): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");

  useEffect(() => {
    if (!userID) handleErrors(Errors[401], router);
  }, [props.setLoading, router, userID]);

  return (
    <main
      className={["border border-gray-300 shadow rounded-lg", "p-4"].join(" ")}
    >
      <div className="grid grid-cols-[38%,38%,20%] gap-y-4 gap-x-6">
        <div className="flex items-center justify-between">
          <label htmlFor="model">
            <strong>Models: </strong>
          </label>
          <select
            id="model"
            className="border p-2 min-w-[12rem] rounded border-primary-500"
            value={props.selectedModel}
            onChange={(e) => props.setSelectedModel(parseInt(e.target.value))}
          >
            <option value={RetainModel.rfm}>RFM Value</option>
            <option value={RetainModel.bg_nbd}>BG-NBD Model</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <strong>Status: </strong>
          <Tag
            className="capitalize text-center mx-10"
            color={props.status === "done" ? TagColor.green : TagColor.blue}
          >
            {props.status}
          </Tag>
        </div>
        <div className="flex items-center justify-end">
          <button
            className={[
              "border-l border-t border-b border-primary-500 rounded-l-xl py-1 px-4 text-3xl",
              !props.displayGrid && "bg-primary-600 text-white-100",
            ].join(" ")}
            onClick={() => props.setDisplayGrid(false)}
          >
            {icons.outline.list}
          </button>
          <button
            className={[
              "border border-primary-500 rounded-r-xl py-1 px-4 text-3xl",
              props.displayGrid && "bg-primary-600 text-white-100",
            ].join(" ")}
            onClick={() => props.setDisplayGrid(true)}
          >
            {icons.outline.grid}
          </button>
        </div>
        {props.selectedModel === RetainModel.bg_nbd && (
          <div className="flex items-center justify-between">
            <label htmlFor="last_day">
              <strong>Last observed day: </strong>
            </label>
            <Input
              type="date"
              id="last_day"
              defaultValue={new Date().toISOString().substring(0, 10)}
              className="min-w-[12rem]"
            />
          </div>
        )}
        {props.selectedModel === RetainModel.bg_nbd && (
          <div className="flex items-center justify-between">
            <label htmlFor="predict_days">
              <strong>Predict days: </strong>
            </label>
            <Input
              type="number"
              id="predict_days"
              defaultValue={365}
              className="text-center max-w-[10rem]"
            />
          </div>
        )}
        {props.selectedModel === RetainModel.bg_nbd && <div />}
        <div className="w-full flex justify-end col-span-3">
          <UploadButton
            fileType="demographic"
            setLoading={props.setLoading}
            label="Upload customers"
          />
          <div className="ml-2" />
          <UploadButton
            fileType="transaction"
            setLoading={props.setLoading}
            label="Upload transactions"
          />
          <div className="ml-2" />
          <Button
            style="outline"
            className="border border-primary-500"
            icon={icons.outline.download}
          >
            <a href="templates.zip" download="Customer transaction template">
              Templates
            </a>
          </Button>
          {props.csvData && <CSVExportButton {...props.csvData} />}
        </div>
      </div>
    </main>
  );
}
