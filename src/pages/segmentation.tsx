import { Header } from "components/sections/segmentation";
import { Layout, Charts, Pane } from "components/common";
import { useState } from "react";

export default function Segmentation(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  return (
    <Layout
      title="Segmentation"
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
