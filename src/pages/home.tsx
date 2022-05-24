import { Layout } from "components/common";
import { ChartList, NumberList } from "components/sections/home";
import { ChartType } from "interfaces/common.interface";
import { IChartData, INumberData } from "interfaces/home.interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Home(): JSX.Element {
  const router = useRouter();
  const [_userID, setUserID] = useLocalStorage<string | undefined>(
    "user-id",
    undefined
  );
  const [_token, setToken] = useLocalStorage<string | undefined>(
    "token",
    undefined
  );
  const [numberData, setNumberData] = useState<INumberData[]>([
    {
      label: "label",
      report: "segmentation",
      metric: "age",
    },
  ]);

  const [chartData, setChartData] = useState<IChartData[]>([
    {
      label: "label",
      report: "segmentation",
      metric: "age",
      chartType: ChartType.pie,
    },
  ]);

  useEffect(() => {
    const { token, user_id } = router.query;
    setUserID(user_id?.toString());
    setToken(token?.toString());
  }, [router]);

  return (
    <Layout title="Home" className="space-y-8 text-primary-700">
      {numberData && (
        <NumberList numberData={numberData} setNumberData={setNumberData} />
      )}
      {chartData && (
        <ChartList chartData={chartData} setChartData={setChartData} />
      )}
    </Layout>
  );
}
