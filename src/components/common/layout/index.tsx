import MenuBar from "./menubar.component";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="min-h-screen w-screen">
      <MenuBar />
      <main>{props.children}</main>
    </div>
  );
}
