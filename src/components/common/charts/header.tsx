import { ChartTypes } from "const/chart.const";
import icons from "const/icons.const";
import { ChartType } from "interfaces/common.interface";
import { Dispatch, SetStateAction } from "react";
import Button from "../button.component";

interface Props {
  isSelected: ChartType;
  setSelected: Dispatch<SetStateAction<ChartType>>;
}

export default function ChartHeader(props: Props): JSX.Element {
  return (
    <div className="flex w-full h-fit">
      <div className="flex">
        {ChartTypes.map((value) => (
          <Button
            key={value.label}
            className={[
              "border-l border-y rounded-none border-primary-700 text-2xl py-1",
              "last:border-r last:rounded-r first:rounded-l",
            ].join(" ")}
            icon={value.icon}
            isSelected={props.isSelected === value.label}
            onClick={() => {
              props.setSelected(value.type);
            }}
            disabled={value.label == ChartTypes[ChartTypes.length - 1].label}
            hoverStyle
          />
        ))}
      </div>
      <Button className="text-2xl ml-auto" icon={icons.outline.pin}></Button>
    </div>
  );
}
