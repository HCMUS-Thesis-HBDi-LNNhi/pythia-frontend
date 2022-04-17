interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  style?: "outline" | "solid";
}

export default function Button(props: Props): JSX.Element {
  const { style = "solid" } = props;
  return (
    <button
      className={[
        "rounded-xl text-center",
        "py-3 px-5 opacity-80 flex items-center",
        "hover:opacity-100 hover:shadow-lg hover:font-medium",
        style === "solid" && "bg-primary-600 text-white-100",
        props.className,
      ].join(" ")}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.children}
      {props.children && props.icon && <div className="w-2" />}
      {props.icon && <div>{props.icon}</div>}
    </button>
  );
}
