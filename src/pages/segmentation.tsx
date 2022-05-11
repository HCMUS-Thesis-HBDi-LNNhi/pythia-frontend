import { Chart, Header } from "components/segmentation";
import { Layout } from "components/common";

export default function Segmentation(): JSX.Element {
  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Segmentation</h1>
      <Header />
      <Chart />
    </Layout>
  );
}
