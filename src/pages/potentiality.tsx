import { Body, Header } from "components/sections/potentiality";
import { Layout, Pane } from "components/common";
import { useEffect, useState } from "react";
import { fetchPotentialityResult } from "components/sections/potentiality/fetcher";
import { useReadLocalStorage } from "usehooks-ts";
import handleErrors from "utils/errors.utils";
import Errors from "const/error.const";
import { useRouter } from "next/router";
import { IResult } from "interfaces/potentiality.interface";

export default function Potentiality(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<IResult>();
  const [displayGrid, setDisplayGrid] = useState(true);

  useEffect(() => {
    if (!userID) {
      handleErrors(Errors[401], router);
      return;
    }
    fetchPotentialityResult(userID, setLoading, router).then(
      (value) => value && setResult(value)
    );
    // eslint-disable-next-line
  }, [userID]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <Layout
      title="Potentiality"
      className="space-y-8 text-primary-700"
      isLoading={isLoading}
    >
      <Header
        setLoading={setLoading}
        displayGrid={displayGrid}
        setDisplayGrid={setDisplayGrid}
      />
      {result && <Body displayGrid={displayGrid} result={result} />}
    </Layout>
  );
}
