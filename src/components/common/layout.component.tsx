import Loading from "./loading.component";
import MenuBar from "./menubar.component";

interface Props {
  children: React.ReactNode;
  title: string;
  className?: string;
  isLoading?: boolean;
}

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="h-screen w-screen flex text-primary-700">
      <MenuBar />
      <main
        className={["p-8 h-full w-full overflow-scroll", props.className].join(
          " "
        )}
      >
        <h1 className="text-4xl text-center font-medium">{props.title}</h1>
        {props.children}
      </main>
      {props.isLoading && <Loading />}
    </div>
  );
}
