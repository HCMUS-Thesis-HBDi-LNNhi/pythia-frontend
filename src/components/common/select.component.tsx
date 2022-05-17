type SelectValue = string | number | readonly string[] | undefined;

interface SelectItem {
  label: string;
  id: string;
  value: SelectValue;
}

interface Props {
  options: SelectItem[];
  value?: SelectValue;
  setValue?: (value: SelectValue) => void;
  fill?: boolean;
  className?: string;
  id?: string;
  defaultValue?: SelectValue;
}

export default function Select(props: Props): JSX.Element {
  const { value, setValue, fill, className, id, defaultValue } = props;

  return (
    <select
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={[
        "border border-primary-500 rounded p-2",
        fill && "w-full",
        className,
      ].join(" ")}
      id={id}
    >
      {props.options.map((item) => (
        <option key={item.id} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
