import type { NextPage } from "next";
import Layout from "components/common/layout";

const Home: NextPage = () => {
  return <Layout>You are in {process.env.NEXT_PUBLIC_ENV}</Layout>;
};

export default Home;
