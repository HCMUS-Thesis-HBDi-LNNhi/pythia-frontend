import { ButtonStyle } from "interfaces/common.interface";
import { useEffect, useRef } from "react";

const getStyle = (style?: ButtonStyle) => {
  switch (style) {
    case "solid":
      return "bg-primary-600 text-white-100 shadow-lg";
    case "highlight":
      return "bg-green-500 text-primary-700 shadow-lg";
    case "failure":
      return "bg-red-400 text-primary-700 shadow-lg";
    case "outline":
    default:
      return "";
  }
};

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: ButtonStyle;
  hoverStyle?: boolean;
  icon?: React.ReactNode;
  focusIcon?: React.ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button(props: Props): JSX.Element {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!ref.current || !props.isSelected) return;
    ref.current.focus();
  }, [props.isSelected]);

  return (
    <button
      type={props.type}
      className={[
        "rounded-xl text-center px-5",
        "opacity-90 flex items-center",
        !props.disabled && "hover:opacity-100 hover:font-medium",
        !props.disabled &&
          props.hoverStyle &&
          "hover:bg-primary-500 hover:text-white-100",
        props.isSelected && "bg-primary-500 text-white-100 opacity-100",
        (!props.icon || props.children) && "py-3",
        props.disabled && "bg-slate-300 text-slate-500",
        getStyle(props.style),
        props.className,
      ].join(" ")}
      onClick={() => props.onClick && props.onClick()}
      ref={ref}
      disabled={props.disabled}
    >
      {props.children}
      {props.children && props.icon && <div className="w-2" />}
      {props.icon && <div>{props.icon}</div>}
    </button>
  );
}
