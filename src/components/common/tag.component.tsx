import { TagColor } from "interfaces/common.interface";

interface Props {
  children: string;
  color: TagColor;
}

const getColor = (color: TagColor): string => {
  switch (color) {
    case TagColor.blue:
      return "bg-blue-200";
    case TagColor.green:
      return "bg-green-200";
    case TagColor.red:
      return "bg-red-200";
    case TagColor.gray:
    default:
      return "bg-gray-200";
  }
};

export default function Tag(props: Props): JSX.Element {
  return (
    <span
      className={[
        getColor(props.color),
        "px-4 py-1 rounded text-lg font-medium",
      ].join(" ")}
    >
      {props.children}
    </span>
  );
}
