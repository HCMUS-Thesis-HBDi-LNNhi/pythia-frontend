import icons from "const/icons.const";
import { ICSVData } from "interfaces/utils.interface";
import { CSVLink } from "react-csv";
import Button from "./button.component";

export default function CSVExportButton(props: ICSVData): JSX.Element {
  return (
    <CSVLink data={props.data} headers={props.headers}>
      <Button
        style="outline"
        className="border border-primary-500 ml-2"
        icon={icons.outline.download}
      >
        Results
      </Button>
    </CSVLink>
  );
}
