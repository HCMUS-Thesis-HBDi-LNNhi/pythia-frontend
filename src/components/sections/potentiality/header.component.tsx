import { Button, Tag, UploadButton } from "components/common";
import { Dispatch, SetStateAction } from "react";
import { TagColor } from "interfaces/common.interface";
import icons from "const/icons.const";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  displayGrid: boolean;
  setDisplayGrid: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: Props): JSX.Element {
  return (
    <main
      className={[
        "border border-gray-300 shadow rounded-lg",
        "p-4 space-y-4",
      ].join(" ")}
    >
      <div className="flex justify-end items-center w-full">
        <div className="space-x-2 mr-auto">
          <strong>Status: </strong>
          <Tag color={TagColor.blue}>In Progress</Tag>
        </div>
        <Button
          style="outline"
          className="border border-primary-500 mr-2"
          icon={icons.outline.download}
        >
          <a
            href="templates/Customer-demographic-template.csv"
            download="Customer transaction template"
          >
            Templates
          </a>
        </Button>
        <UploadButton setLoading={props.setLoading} fileType="classification" />
        <div className="flex items-center justify-end ml-2">
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
      </div>
    </main>
  );
}
