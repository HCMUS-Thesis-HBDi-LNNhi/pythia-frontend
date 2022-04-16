interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button(props: Props): JSX.Element {
  return (
    <button
      className={[
        "bg-primary-600 text-white-100 rounded-xl text-center",
        "py-3 px-5 opacity-80 flex items-center",
        "hover:opacity-100 hover:shadow-lg hover:font-medium",
        props.className,
      ].join(" ")}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.children && <>{props.children}</>}
      {props.icon && <div className="text-xl pl-2">{props.icon}</div>}
    </button>
  );
}
