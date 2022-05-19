import { ISelectItem, SelectValue } from "interfaces/common.interface";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props {
  options: ISelectItem[];
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
        "border border-primary-500 rounded p-2",
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