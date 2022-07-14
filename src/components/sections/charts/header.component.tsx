import { ChartTypes } from "const/chart.const";
import icons from "const/icons.const";
import { ChartType } from "interfaces/chart.interface";
import { Dispatch, SetStateAction } from "react";
import Button from "../../common/buttons/button.component";

interface Props {
  chosenChart: ChartType;
  setChosenChart: Dispatch<SetStateAction<ChartType>>;
  allowPin?: boolean;
  createChart?: () => void;
  disabledTypes?: ChartType[];
}

export default function ChartHeader(props: Props): JSX.Element {
  return (
    <div className="grid grid-cols-[30%,30%,40%] gap-2 place-content-between w-full h-fit">
      <div className="flex col-span-2">
        {ChartTypes.map((value) => {
          if (props.disabledTypes?.includes(value.type)) return;
          return (
            <Button
              key={value.label}
              className={[
                "border-l border-y rounded-none border-primary-700 text-2xl py-1",
                "last:border-r last:rounded-r first:rounded-l",
              ].join(" ")}
              icon={value.icon}
              isSelected={props.chosenChart === value.type}
              onClick={() => props.setChosenChart(value.type)}
              hoverStyle
            />
          );
        })}
      </div>
      {props.allowPin && (
        <Button
          className="text-2xl ml-auto"
          icon={icons.outline.pin}
          onClick={props.createChart}
        />
      )}
    </div>
  );
}
