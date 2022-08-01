import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

import { Layout } from "components/common";
import {
  Body,
  Header,
  Instructions,
  fetchPotentialityResult,
} from "components/sections/potentiality";

import Errors from "const/error.const";

import { IResult } from "interfaces/potentiality.interface";
import { ICSVData } from "interfaces/utils.interface";

import handleErrors from "utils/errors.utils";

export default function Potentiality(): JSX.Element {
  const router = useRouter();
  const userID = useReadLocalStorage<string>("user-id");
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<IResult>();
  const [displayGrid, setDisplayGrid] = useState(true);
  const [firstUser, setFirstUser] = useState(false);

  const generateCSV = (): ICSVData => {
    return {
      headers: [
        { label: "Customer ID", key: "customer_id" },
        { label: "Potential", key: "potential" },
      ],
      data: (result?.result ?? []).map((value) => {
        return {
          customer_id: value.customer_id,
          potential:
            value.labels === 0
              ? "Non potential customers"
              : "Potential customers",
        };
      }),
    };
  };

  useEffect(() => {
    if (!userID) {
      handleErrors(Errors[401], router);
      return;
    }
    fetchPotentialityResult(userID, setLoading, router, setFirstUser).then(
      (value) => value && setResult(value)
    );
    // eslint-disable-next-line
  }, [userID]);

  return (
    <>
      <Layout
        title="Potentiality"
        className="space-y-8 text-primary-700"
        isLoading={isLoading}
      >
        <Header
          setLoading={setLoading}
          displayGrid={displayGrid}
          setDisplayGrid={setDisplayGrid}
          csvData={generateCSV()}
        />
        {result && <Body result={result} displayGrid={displayGrid} />}
      </Layout>
      {firstUser && (
        <Instructions setLoading={setLoading} setFirstUser={setFirstUser} />
      )}
    </>
  );
}
