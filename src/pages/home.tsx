import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { Layout } from "components/common";
import { ChartList, Instructions, FigureBoxes } from "components/sections/home";
import { handleFetchData } from "components/sections/charts";

import Errors from "const/error.const";

import { IData } from "interfaces/data.interface";

import handleErrors from "utils/errors.utils";

export default function Home(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [firstUser, setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    !userID
      ? handleErrors(Errors[401], router)
      : handleFetchData(userID, router, setLoading, setFirstUser).then(
          (res) => res && setData(res)
        );
  }, [userID, router]);

  return (
    <>
      <Layout
        title="Home"
        className="space-y-8 text-primary-700"
        isLoading={isLoading}
      >
        {data && (
          <>
            <FigureBoxes data={data} />
            <ChartList setLoading={setLoading} data={data} />
          </>
        )}
      </Layout>
      {firstUser && (
        <Instructions setLoading={setLoading} setFirstUser={setFirstUser} />
      )}
    </>
  );
}
