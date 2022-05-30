import { Button, toast } from "components/common";
import API from "const/api.const";
import icons from "const/icons.const";
import { Dispatch, SetStateAction } from "react";
import { fetcher } from "utils/fetcher";

interface Props {
  chartID: string;
  label: string;
  children: React.ReactNode;
  handleReload: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChartContainer(props: Props): JSX.Element {
  async function handleDelete() {
    try {
      props.setLoading(true);
      const response = await fetcher.handleDelete(
        API.DELETE.deletePinnedChart(props.chartID)
      );
      if (response.status === 204) {
        props.handleReload();
      } else {
        throw response;
      }
    } catch (error) {
      toast("Something went wrong, please try again!", "failure");
      console.error(error);
    } finally {
      props.setLoading(false);
    }
  }

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
        onClick={() => handleDelete()}
      />
    </div>
  );
}
