type ToastType = "success" | "failure" | "general";

interface Props {
  type?: ToastType;
  message: string;
}

export default function Toast(props: Props) {
  const { type = "general" } = props;
  return (
    <div
      className={[
        "z-10 fixed top-4 left-1/2 min-w-[500px] -ml-[calc(250px-80px)] p-4",
        "rounded-md text-center font-medium",
        type === "success" && "bg-green-200 text-green-700",
        type === "failure" && "bg-red-200 text-red-700",
        type === "general" && "bg-primary-200 text-primary-700",
      ].join(" ")}
    >
      {props.message}
    </div>
  );
}
