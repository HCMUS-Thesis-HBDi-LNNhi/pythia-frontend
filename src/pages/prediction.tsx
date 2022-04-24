import { Chart, Header } from "components/prediction";
import { Layout } from "components/common";

export default function Prediction(): JSX.Element {
  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Prediction</h1>
      <Header />
      <Chart />
    </Layout>
  );
}
