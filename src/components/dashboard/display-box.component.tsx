import { Button } from "components/common";
import icons from "const/icons.const";

interface Props {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void
}

export default function DisplayBox(props: Props): JSX.Element {
  return (
    <div
      className={[
        "border rounded-lg text-center flex-1 m-2 aspect-4/3 ",
        "grid grid-rows-[40px_calc(100%-40px)_0] gap-0 relative",
      ].join(" ")}
    >
      <div className="w-5/6 py-3 font-semibold border-b place-self-center">
        {props.label}
      </div>
      <div className="place-self-center">{props.children}</div>
      <Button className="text-lg place-self-end absolute !p-2" style='outline' icon={icons.solid.trash} onClick={() => props.onClick && props.onClick()}/>
    </div>
  );
}
