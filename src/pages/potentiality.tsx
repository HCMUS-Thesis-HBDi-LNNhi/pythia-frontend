import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

import { Layout } from "components/common";
import {
  Body,
  Header,
  fetchPotentialityResult,
} from "components/sections/potentiality";

import Errors from "const/error.const";

import { IResult } from "interfaces/potentiality.interface";

import handleErrors from "utils/errors.utils";

export default function Potentiality(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<IResult>();
  // const [displayGrid, setDisplayGrid] = useState(true);

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

  return (
    <Layout
      title="Potentiality"
      className="space-y-8 text-primary-700"
      isLoading={isLoading}
    >
      <Header
        setLoading={setLoading}
        // displayGrid={displayGrid}
        // setDisplayGrid={setDisplayGrid}
      />
      {result && <Body result={result} />}
    </Layout>
  );
}
