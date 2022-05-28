import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props {
  placeholder?: string;
  value?: string | number | readonly string[];
  setValue?: (value: string | number | readonly string[]) => void;
  fill?: boolean;
  className?: string;
  id?: string;
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export default function Textarea(props: Props): JSX.Element {
  return (
    <textarea
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
