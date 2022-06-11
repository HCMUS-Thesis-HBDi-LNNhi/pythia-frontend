import { Layout } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import { IData } from "interfaces/data.interface";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { handleFetchData } from "utils/handleData";

export default function Home(): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [firstUser, _setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    if (!userID) return;
    handleFetchData(userID, setLoading).then((res) => res && setData(res));
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
