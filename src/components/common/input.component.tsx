import { HTMLInputTypeAttribute } from "react";

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number | readonly string[];
  setValue?: (value: string | number | readonly string[]) => void;
  fill?: boolean;
  className?: string;
  id?: string;
  defaultValue?: string | number | readonly string[];
}

export default function Input(props: Props): JSX.Element {
  const {
    type,
    value,
    setValue,
    placeholder,
    fill,
    className,
    id,
    defaultValue,
  } = props;

  return (
    <input
      type={type}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={[
        "border border-primary-500 rounded p-2",
        fill && "w-full",
        className,
      ].join(" ")}
      placeholder={placeholder}
      id={id}
    />
  );
}
