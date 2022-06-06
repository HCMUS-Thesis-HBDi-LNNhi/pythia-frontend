import { Button, Input, Tag, toast, UploadButton } from "components/common";
import { RetainModel } from "interfaces/segmentation.interface";
import { Dispatch, SetStateAction, useEffect } from "react";
import { PageLabels, TagColor } from "interfaces/common.interface";
import icons from "const/icons.const";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

interface Props {
  selectedModel: RetainModel;
  setSelectedModel: Dispatch<SetStateAction<RetainModel>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: Props): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [selectModel, setSelectModel] = useState<RetainModel>(
    RetainModel.bg_nbd
  );
  const [file, _setFile] = useState<File | null>(null);
  const [fileType, _setFileType] = useState<"demographic" | "transaction">();

  useEffect(() => {
    if (!userID) {
      toast("Something went wrong, please login again!", "failure");
      router.push(`/${PageLabels.LOGIN}`);
      return;
    }
  }, [props.setLoading, router, userID]);

  return (
    <main
      className={["border border-gray-300 shadow rounded-lg", "p-4"].join(" ")}
    >
      <div className="grid grid-cols-[40%,40%,20%] gap-y-4">
        <div className="flex items-center space-x-4">
          <strong>Demographic data: </strong>
          <UploadButton
            fileType="demographic"
            setLoading={props.setLoading}
            label="Upload data"
          />
        </div>
        <div className="flex items-center space-x-4">
          <strong>Transactions data: </strong>
          <UploadButton
            fileType="transaction"
            setLoading={props.setLoading}
            label="Upload data"
          />
        </div>
        <Button
          style="outline"
          className="border border-primary-500 mr-2 ml-auto"
          icon={icons.outline.download}
        >
          <a href="templates.zip" download="Customer transaction template">
            Templates
          </a>
        </Button>
        <div className="flex items-center space-x-4">
          <label htmlFor="model">
            <strong>Models: </strong>
          </label>
          <select
            id="model"
            className="border p-2 min-w-[12rem] rounded border-primary-500"
            value={props.selectedModel}
            onChange={(e) => props.setSelectedModel(parseInt(e.target.value))}
          >
            <option value={RetainModel.bg_nbd}>BG-NBD Model</option>
            <option value={RetainModel.rfm}>RFM Value</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <strong>Status: </strong>
          <Tag color={TagColor.blue}>In Progress</Tag>
        </div>
        <div />
        {props.selectedModel === RetainModel.bg_nbd && (
          <form className="flex items-center space-x-4 col-span-2">
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
            <Input
              type="number"
              id="predict_days"
              defaultValue={365}
              className="text-center"
            />
          </form>
        )}
      </div>
    </main>
  );
}
