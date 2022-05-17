interface Props {
  placeholder?: string;
  value?: string | number | readonly string[];
  setValue?: (value: string | number | readonly string[]) => void;
  fill?: boolean;
  className?: string;
  id?: string;
  defaultValue?: string | number | readonly string[];
}

export default function Textarea(props: Props): JSX.Element {
  const { value, setValue, placeholder, fill, className, id, defaultValue } =
    props;

  return (
    <textarea
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
