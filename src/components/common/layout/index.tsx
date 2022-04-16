import MenuBar from "./menubar.component";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="min-h-screen w-screen flex">
      <MenuBar />
      <main className="m-12 min-h-full w-full">{props.children}</main>
    </div>
  );
}
