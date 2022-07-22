import { Field } from "formik";
import { ISelectItem } from "interfaces/common.interface";

interface Props {
  options: ISelectItem[];
  name: string;
  label: string;
  style?: "outline" | "solid";
  className?: string;
}

export default function Select(props: Props): JSX.Element {
  return (
    <Field
      as="select"
      name={props.name}
      className={[
        "border border-primary-500 p-2",
        props.style === "solid"
          ? "bg-primary-500 text-white-100 text-center rounded-xl"
          : "rounded",
        props.className,
      ].join(" ")}
    >
      {props.options.map((item) => (
        <option key={item.id} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      ))}
    </Field>
  );
}
