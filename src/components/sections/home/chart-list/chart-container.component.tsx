import { Button } from "components/common";
import icons from "const/icons.const";

interface Props {
  label: string;
  children: React.ReactNode;
  delete: () => void;
  onClick: () => void;
}

export default function ChartContainer(props: Props): JSX.Element {
  return (
    <div
      className={[
        "border border-primary-300 rounded-lg text-center flex-1 m-2 aspect-4/3",
        "grid grid-rows-[40px_calc(100%-40px)_0] gap-0 relative overflow-auto",
      ].join(" ")}
    >
      <div className="w-5/6 py-3 font-semibold border-b border-primary-300 place-self-center">
        {props.label}
      </div>
      <button
        className="w-full h-full p-8 grid place-content-center"
        onClick={() => props.onClick()}
      >
        {props.children}
      </button>
      <Button
        className="text-lg place-self-end absolute !p-2"
        style="outline"
        icon={icons.solid.trash}
        onClick={() => props.delete()}
      />
    </div>
  );
}
