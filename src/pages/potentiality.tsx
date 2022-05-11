import { Chart, Header } from "components/potentiality";
import { Layout } from "components/common";

export default function Potentiality(): JSX.Element {
  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Potentiality</h1>
      <Header />
      <Chart />
    </Layout>
  );
}
