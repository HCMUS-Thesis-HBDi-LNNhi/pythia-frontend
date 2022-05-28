import { Layout } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [firstUser, _setFirstUser] = useState(false);

  return (
    <>
      <Layout title="Home" className="space-y-8 text-primary-700">
        <ChartList />
      </Layout>
      {firstUser && <Instructions />}
    </>
  );
}
