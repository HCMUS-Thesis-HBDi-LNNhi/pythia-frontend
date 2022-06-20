import {
  Button,
  ChartBody,
  ChartHeader,
  ChartOptions,
  Dialog,
  toast,
} from "components/common";
import { initialChartOptions } from "const/chart.const";
import { ChartType, IChartOptions } from "interfaces/chart.interface";
import { PageLabels } from "interfaces/common.interface";
import { IData } from "interfaces/data.interface";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { handleCreateChart } from "./fetcher";

interface Props {
  userID: string;
  data: IData;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reload: () => void;
  clear: () => void;
}

export default function ChartDialog(props: Props): JSX.Element {
  const router = useRouter();
  const { userID, setLoading, reload, clear } = props;

  const [chartType, setChartType] = useState<ChartType>(ChartType.bar);
  const [chartOptions, setChartOptions] =
    useState<IChartOptions>(initialChartOptions);

  return (
    <Dialog className="w-4/5 h-[90%] p-8 text-primary-500">
      <h1 className="text-center font-bold text-primary-600 text-lg uppercase pb-6">
        Create a chart
      </h1>
      <main className="w-full h-[90%] flex">
        <div className="flex flex-col w-3/4">
          <ChartHeader chosenChart={chartType} setChosenChart={setChartType} />
          <div className="mt-8" />
          <ChartBody
            data={props.data}
            chartType={chartType}
            chartOptions={chartOptions}
          />
          <div className="flex mt-auto w-full justify-end space-x-4">
            <Button
              style="highlight"
              onClick={() => {
                if (!userID) {
                  toast("Something went wrong, please login again!", "failure");
                  router.push(`/${PageLabels.LOGIN}`);
                } else {
                  handleCreateChart(
                    userID,
                    chartOptions,
                    chartType,
                    setLoading,
                    reload,
                    clear
                  );
                }
              }}
            >
              Accept
            </Button>
            <Button style="failure" onClick={() => props.clear()}>
              Cancel
            </Button>
          </div>
        </div>
        <div className="w-1/4 px-4 ml-4 border-l border-primary-400">
          <ChartOptions setChartOptions={setChartOptions} />
        </div>
      </main>
    </Dialog>
  );
}
