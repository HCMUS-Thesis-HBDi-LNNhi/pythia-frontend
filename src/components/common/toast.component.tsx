interface Props {
  type?: "success" | "failure" | "general";
  message: string;
}

export default function Toast(props: Props) {
  return (
    <div
      className={["z-50 absolute top-4 grid place-self-center border"].join(
        " "
      )}
    >
      {props.message}
    </div>
  );
}
