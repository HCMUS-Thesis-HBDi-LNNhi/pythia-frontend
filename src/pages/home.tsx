import { Layout } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import Errors from "const/error.const";
import { IData } from "interfaces/data.interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import handleErrors from "utils/errors.utils";
import { handleFetchData } from "utils/handleData";

export default function Home(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [firstUser, _setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    !userID
      ? handleErrors(Errors[401], router)
      : handleFetchData(userID, setLoading, router).then(
          (res) => res && setData(res)
        );
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
