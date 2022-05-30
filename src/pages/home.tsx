import { Layout } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import { IData } from "interfaces/data.interface";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { fetchData } from "utils/handleData";

export default function Home(): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [firstUser, _setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    if (!userID) return;
    fetchData(userID, setLoading).then((res) => {
      setData(res);
    });
  }, [userID]);

  return (
    <>
      <Layout
        title="Home"
        className="space-y-8 text-primary-700"
        isLoading={isLoading}
      >
        {data ? (
          <ChartList userID={userID} data={data} setLoading={setLoading} />
        ) : (
          <div>Data not found</div>
        )}
      </Layout>
      {firstUser && <Instructions />}
    </>
  );
}
