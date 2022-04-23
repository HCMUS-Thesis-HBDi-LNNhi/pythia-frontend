interface Props {
  children: React.ReactNode;
  className?: string
}

export default function Dialog(props: Props): JSX.Element {
  const { children, className } = props;
  return (
    <dialog
      className={[
        "absolute top-0 left-0 z-10 h-screen w-screen",
        "grid place-items-center bg-primary-300 bg-opacity-80",
      ].join(" ")}
    >
      <div className={['bg-white rounded-lg shadow-lg p-4', className].join(" ")}>{children}</div>
    </dialog>
  );
}
