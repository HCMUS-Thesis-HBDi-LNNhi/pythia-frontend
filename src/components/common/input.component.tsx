import { HTMLInputTypeAttribute } from "react";

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number | readonly string[];
  setValue?: (value: string | number | readonly string[]) => void;
  fill?: boolean;
  className?: string;
  id?: string;
}

export default function Input(props: Props): JSX.Element {
  const { type, value, setValue, placeholder, fill, className, id } = props;

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={["border rounded p-2", fill && "w-full", className].join(" ")}
      placeholder={placeholder}
      id={id}
    />
  );
}
