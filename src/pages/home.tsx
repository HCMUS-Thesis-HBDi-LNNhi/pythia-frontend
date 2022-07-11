import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Layout } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import { IState } from "interfaces/store.interface";

export default function Home(): JSX.Element {
  const data = useSelector((state: IState) => state.warehouse);
  const selector = useSelector((state) => state);
  const [firstUser, _setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(selector);
  });

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
