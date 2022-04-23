interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  style?: "outline" | "solid" | "failure" | "highlight";
}

export default function Button(props: Props): JSX.Element {
  const getStyle = () => {
    switch (props.style) {
      case "solid":
        return "bg-primary-600 text-white-100 hover:shadow-lg";
      case "highlight":
        return "bg-green-500 text-black hover:shadow-lg";
      case "failure":
        return "bg-red-400 text-black hover:shadow-lg";
      case "outline":
      default:
        return "";
    }
  };

  return (
    <button
      className={[
        "rounded-xl text-center",
        "py-3 px-5 opacity-80 flex items-center",
        "hover:opacity-100 hover:font-medium",
        getStyle(),
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
