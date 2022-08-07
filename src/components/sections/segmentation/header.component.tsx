import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
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
import { DEFAULT_END_DATE, DEFAULT_PREDICT_TIME } from "const/chart.const";
import {
  DateToNumber,
  formatDateInput,
  NumberToDate,
} from "utils/formatter.utils";
import fetcher from "utils/fetcher.utils";
import API from "const/api.const";

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
  const [endDate, setEndDate] = useLocalStorage("end-date", DEFAULT_END_DATE);
  const [predictTime, setPredictTime] = useLocalStorage(
    "predict-time",
    DEFAULT_PREDICT_TIME
  );
  const [_, setTrigger] = useLocalStorage("trigger", false);

  useEffect(() => {
    if (!userID) handleErrors(Errors[401], router);
  }, [props.setLoading, router, userID]);

  return (
    <main className="border border-gray-300 shadow rounded-lg p-4">
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
            className="capitalize"
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
              className="min-w-[12rem]"
              value={formatDateInput(
                endDate ? NumberToDate(endDate) : new Date()
              )}
              setValue={(value) => setEndDate(DateToNumber(new Date(value)))}
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
              className="text-center max-w-[10rem]"
              value={predictTime}
              setValue={(value) =>
                typeof value === "number"
                  ? setPredictTime(value)
                  : setPredictTime(parseInt(value))
              }
            />
          </div>
        )}
        {props.selectedModel === RetainModel.bg_nbd && <div />}
        <div className="w-full flex justify-end col-span-3">
          <Button
            style="solid"
            onClick={async () => {
              if (!userID) {
                handleErrors(Errors[401], router);
                return;
              }
              setTrigger(true);
              try {
                const response = await fetcher.post(
                  API.POST.triggerModels(userID),
                  {
                    end_of_observation_date: endDate ?? DEFAULT_END_DATE,
                    prediction_time: predictTime ?? DEFAULT_PREDICT_TIME,
                  }
                );
                if (response.data.status !== "in progress") setTrigger(false);
              } catch (error) {
                handleErrors(error, router);
              } finally {
                window.location.reload();
              }
            }}
          >
            Update data
          </Button>
          <UploadButton
            fileType="demographic"
            setLoading={props.setLoading}
            label="Upload customers"
          />
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
