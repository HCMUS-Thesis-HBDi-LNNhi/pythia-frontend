import { Chart, Header } from "components/analytics";
import { Layout } from "components/common";

export default function Analytics(): JSX.Element {
  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Analytics</h1>
      <Header />
      <Chart />
    </Layout>
  );
}
