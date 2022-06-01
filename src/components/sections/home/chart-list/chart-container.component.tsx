import { Button } from "components/common";
import icons from "const/icons.const";

interface Props {
  label: string;
  children: React.ReactNode;
  delete: () => void;
}

export default function ChartContainer(props: Props): JSX.Element {
  return (
    <div
      className={[
        "border border-primary-300 rounded-lg text-center flex-1 m-2 aspect-4/3 ",
        "grid grid-rows-[40px_calc(100%-40px)_0] gap-0 relative",
      ].join(" ")}
    >
      <div className="w-5/6 py-3 font-semibold border-b border-primary-300 place-self-center">
        {props.label}
      </div>
      <div className="w-11/12 place-self-center">{props.children}</div>
      <Button
        className="text-lg place-self-end absolute !p-2"
        style="outline"
        icon={icons.solid.trash}
        onClick={() => props.delete()}
      />
    </div>
  );
}
