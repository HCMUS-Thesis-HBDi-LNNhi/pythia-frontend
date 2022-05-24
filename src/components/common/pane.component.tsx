interface Props {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export default function Pane(props: Props): JSX.Element {
  return (
    <div
      className={[
        "border border-gray-300 shadow px-6 py-4 rounded-lg",
        props.width ?? "w-full",
        props.height ?? "h-full",
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}
