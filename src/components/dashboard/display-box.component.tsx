interface Props {
  label: string;
  children?: React.ReactNode;
}

export default function DisplayBox(props: Props): JSX.Element {
  return (
    <div
      className={[
        "border rounded-lg space-y-3 text-center m-2 aspect-4/3",
        "flex flex-col flex-1 justify-center items-center",
      ].join(" ")}
    >
      <div>{props.label}</div>
      {props.children}
    </div>
  );
}
