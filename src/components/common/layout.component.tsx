import Loading from "./loading.component";
import MenuBar from "./menubar.component";

interface Props {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
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
      {props.isLoading && <Loading />}
    </div>
  );
}
