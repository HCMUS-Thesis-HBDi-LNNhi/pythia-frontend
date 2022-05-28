import { ISelectItem, SelectValue } from "interfaces/common.interface";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props {
  options: ISelectItem[];
  style?: "outline" | "solid";
  value?: SelectValue;
  setValue?: (value: SelectValue) => void;
  fill?: boolean;
  className?: string;
  id?: string;
  defaultValue?: SelectValue;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
}

export default function Select(props: Props): JSX.Element {
  return (
    <select
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={(e) => {
        props.setValue && props.setValue(e.target.value);
        props.onChange && props.onChange(e);
      }}
      onBlur={props.onBlur}
      className={[
        "border border-primary-500 p-2",
        props.style === "solid"
          ? "bg-primary-500 text-white-100 text-center rounded-xl"
          : "rounded",
        props.fill && "w-full",
        props.className,
      ].join(" ")}
      id={props.id}
    >
      {props.options.map((item) => (
        <option key={item.id} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
