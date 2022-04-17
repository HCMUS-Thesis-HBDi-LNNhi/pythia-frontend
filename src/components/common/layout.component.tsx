import MenuBar from "./menubar.component";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="h-screen w-screen flex">
      <MenuBar />
      <main
        className={["p-8 h-full w-full overflow-scroll", props.className].join(
          " "
        )}
      >
        {props.children}
      </main>
    </div>
  );
}
