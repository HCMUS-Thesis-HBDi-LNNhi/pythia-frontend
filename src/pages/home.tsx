import { Layout, toast } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import { PageLabels } from "interfaces/common.interface";
import { IData } from "interfaces/data.interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { handleFetchData } from "utils/handleData";

export default function Home(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [firstUser, _setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    if (!userID) {
      toast("Something went wrong, please login again!", "failure");
      router.push(`/${PageLabels.LOGIN}`);
    } else {
      handleFetchData(userID, setLoading).then((res) => res && setData(res));
    }
  }, [userID]);

  return (
    <>
      <Layout
        title="Home"
        className="space-y-8 text-primary-700"
        isLoading={isLoading}
      >
        {data && <ChartList setLoading={setLoading} data={data} />}
      </Layout>
      {firstUser && <Instructions />}
    </>
  );
}
