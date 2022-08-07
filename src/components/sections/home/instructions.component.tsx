import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button, Dialog, Input, UploadButton } from "components/common";
import icons from "const/icons.const";
import { useLocalStorage } from "usehooks-ts";
import { DEFAULT_END_DATE, DEFAULT_PREDICT_TIME } from "const/chart.const";
import {
  DateToNumber,
  formatDateInput,
  NumberToDate,
} from "utils/formatter.utils";
import fetcher from "utils/fetcher.utils";
import API from "const/api.const";
import handleErrors from "utils/errors.utils";
import { NextRouter } from "next/router";

interface Props {
  userID: string;
  router: NextRouter;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFirstUser: Dispatch<SetStateAction<boolean>>;
}

export default function Instructions(props: Props): JSX.Element {
  const [_, setTrigger] = useLocalStorage("trigger", false);
  const [endDate, setEndDate] = useLocalStorage("end-date", DEFAULT_END_DATE);
  const [predictTime, setPredictTime] = useLocalStorage(
    "predict-time",
    DEFAULT_PREDICT_TIME
  );

  const [transaction, setTransaction] = useState(false);
  const [demographic, setDemographic] = useState(false);

  return (
    <Dialog className="text-primary-700 p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Instruction</h1>
      <h3 className="font-medium italic">
        Welcome to Pythia, please upload data before continue!
      </h3>
      <div className="space-x-2">
        <input type="checkbox" checked={transaction} readOnly />
        <span>Upload customers transactions</span>
      </div>
      <div className="grid place-content-center">
        <UploadButton
          setLoading={props.setLoading}
          fileType="transaction"
          setUploadSuccess={setTransaction}
        />
      </div>
      <div className="space-x-2">
        <input type="checkbox" checked={demographic} readOnly />
        <span>Upload customers demographic</span>
      </div>
      <div className="grid place-content-center">
        <UploadButton
          setLoading={props.setLoading}
          fileType="demographic"
          setUploadSuccess={setDemographic}
        />
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
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
        <div className="w-full col-span-2 italic text-sm">
          *Last observed day should be the latest day of all transactions
        </div>
      </div>
      <div className="flex justify-end items-center space-x-2 pt-4">
        <Button
          style="outline"
          className="border border-primary-500"
          icon={icons.outline.download}
        >
          <a href="templates.zip" download="Customer transaction template">
            Templates
          </a>
        </Button>
        <Button
          style="solid"
          onClick={async () => {
            props.setFirstUser(false);
            setTrigger(true);
            try {
              const response = await fetcher.post(
                API.POST.triggerModels(props.userID),
                {
                  end_of_observation_date: endDate ?? DEFAULT_END_DATE,
                  prediction_time: predictTime ?? DEFAULT_PREDICT_TIME,
                }
              );
              if (response.data.status !== "in progress") setTrigger(false);
            } catch (error) {
              handleErrors(error, props.router);
            } finally {
              window.location.reload();
            }
          }}
          disabled={!transaction || !demographic}
        >
          Finish
        </Button>
      </div>
    </Dialog>
  );
}
