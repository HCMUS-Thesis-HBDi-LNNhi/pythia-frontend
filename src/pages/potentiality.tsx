import { Chart, Header } from "components/potentiality";
import { Layout } from "components/common";
import { useState } from "react";

export default function Potentiality(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  return (
    <Layout className="space-y-8 text-primary-700" isLoading={isLoading}>
      <h1 className="text-4xl text-center">Potentiality</h1>
      <Header setLoading={setLoading} />
      <Chart />
    </Layout>
  );
}
