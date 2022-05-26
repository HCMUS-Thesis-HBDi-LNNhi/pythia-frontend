interface Props {
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

export default function Pane(props: Props): JSX.Element {
  return (
    <div
      className={[
        "border border-gray-300 shadow p-4 rounded-lg",
        props.width ?? "w-full",
        props.height ?? "h-full",
        props.className,
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}
