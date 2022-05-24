import { Header } from "components/sections/potentiality";
import { Charts, Layout, Pane } from "components/common";
import { useState } from "react";

export default function Potentiality(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  return (
    <Layout
      title="Potentiality"
      className="space-y-8 text-primary-700"
      isLoading={isLoading}
    >
      <Header setLoading={setLoading} />
      <Pane height="h-fit">
        <Charts />
      </Pane>
    </Layout>
  );
}
