import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  setValue?: (value: string | number) => void;
  fill?: boolean;
  className?: string;
  id?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export default function Input(props: Props): JSX.Element {
  return (
    <input
      type={props.type}
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
      placeholder={props.placeholder}
      id={props.id}
    />
  );
}
