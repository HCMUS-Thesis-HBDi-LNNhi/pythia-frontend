import React from "react";

interface TooltipProps {
  text: React.ReactNode;
  children: React.ReactNode;
}

const TooltipLeft = (props: TooltipProps): JSX.Element => (
  <div className="flex justify-center items-center relative group space-x-2">
    <span
      className={[
        "w-max py-1 px-4 text-white bg-black",
        "hidden group-hover:block rounded absolute right-full",
        "tooltip-left z-20",
      ].join(" ")}
    >
      {props.text}
    </span>
    {props.children}
  </div>
);

const TooltipRight = (props: TooltipProps): JSX.Element => (
  <div className="flex justify-center items-center relative group space-x-2">
    {props.children}
    <span
      className={[
        "w-max py-1 px-4 text-white bg-black",
        "hidden group-hover:block rounded absolute left-full",
        "tooltip-right z-20",
      ].join(" ")}
    >
      {props.text}
    </span>
  </div>
);

const TooltipTop = (props: TooltipProps): JSX.Element => (
  <div className="flex flex-col justify-center items-center relative group space-y-2">
    <div
      className={[
        "w-max py-1 px-4 text-white bg-black",
        "hidden group-hover:block rounded absolute bottom-full",
        "tooltip-top z-20",
      ].join(" ")}
    >
      {props.text}
    </div>
    {props.children}
  </div>
);

const TooltipBottom = (props: TooltipProps): JSX.Element => (
  <div className="flex flex-col justify-center items-center relative group space-y-2">
    {props.children}
    <div
      className={[
        "w-max py-1 px-4 text-white bg-black",
        "hidden group-hover:block rounded absolute top-full",
        "tooltip-bottom z-20",
      ].join(" ")}
    >
      {props.text}
    </div>
  </div>
);

interface Props extends TooltipProps {
  position: "left" | "right" | "bottom" | "top";
}

export default function Tooltip(props: Props): JSX.Element {
  switch (props.position) {
    case "left":
      return <TooltipLeft text={props.text}>{props.children}</TooltipLeft>;
    case "right":
      return <TooltipRight text={props.text}>{props.children}</TooltipRight>;
    case "top":
      return <TooltipTop text={props.text}>{props.children}</TooltipTop>;
    case "bottom":
    default:
      return <TooltipBottom text={props.text}>{props.children}</TooltipBottom>;
  }
}
