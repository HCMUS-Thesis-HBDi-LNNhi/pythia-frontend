import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { Layout } from "components/common";
import { ChartList } from "components/sections/home";
import Instructions from "components/sections/instructions";
import Errors from "const/error.const";
import { IState } from "interfaces/store.interface";
import handleErrors from "utils/errors.utils";
import { handleFetchData } from "utils/handleData";
import { updateWarehouse } from "store/warehouse/actions";

export default function Home(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const userID = useSelector((state: IState) => state.config.userID);
  const data = useSelector((state: IState) => state.warehouse);
  const [firstUser, _setFirstUser] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    !userID
      ? handleErrors(Errors[401], router)
      : handleFetchData(userID, setLoading, router).then(
          (res) => res && updateWarehouse(res)(dispatch)
        );
  }, [userID, router]);

  return (
    <>
      <Layout
        title="Home"
        className="space-y-8 text-primary-700"
        isLoading={isLoading}
      >
        {data && <ChartList setLoading={setLoading} data={data} />}
      </Layout>
      {firstUser && <Instructions />}
    </>
  );
}
