import { Layout, Dialog, UploadButton, Button } from "components/common";
import { ChartList } from "components/sections/home";
import { IData } from "interfaces/data.interface";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { handleFetchData } from "utils/handleData";

export default function Home(): JSX.Element {
  const userID = useReadLocalStorage<string>("user-id");
  const [firstUser, setFirstUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    if (!userID) return;
    handleFetchData(userID, setLoading).then((res) => res && setData(res));
  }, [userID]);

  return (
    <>
      <Layout
        title="Home"
        className="space-y-8 text-primary-700"
        isLoading={isLoading}
      >
        {data && <ChartList setLoading={setLoading} data={data} />}
      </Layout>
      {firstUser && (
        <Dialog className="text-primary-700 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Instruction</h1>
          <h3 className="text-l font-medium italic">
            Hello, before continue, please:
          </h3>
          <div>1. Upload customer transactions:</div>
          <div className="grid place-content-center">
            <UploadButton setLoading={setLoading} fileType="transaction" />
          </div>
          <div>2. Upload customer demographic data:</div>
          <div className="grid place-content-center">
            <UploadButton setLoading={setLoading} fileType="demographic" />
          </div>
          <div className="grid place-content-center pt-6">
            <Button style="solid" onClick={() => setFirstUser(false)}>
              Finish
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
}
