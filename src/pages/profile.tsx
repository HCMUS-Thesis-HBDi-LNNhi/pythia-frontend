import { Layout } from "components/common";
import { IHistory, IHistoryResponse } from "interfaces/profile.interface";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { fetcher } from "utils/fetcher";

export default function Profile(): JSX.Element {
  const userId = useReadLocalStorage<string>("user-id");
  const [history, setHistory] = useState<IHistory[]>();

  async function fetchHistory(userId: string) {
    try {
      const response = await fetcher.get(`/users/${userId}/files`);
      const data: IHistoryResponse = response.data;
      setHistory(
        data.files.map((value) => {
          return {
            ...value,
            created_at: new Date(value.created_at),
            updated_at: new Date(value.updated_at),
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("hello", userId);

    if (!userId) return;
    fetchHistory(userId);
  }, [userId]);

  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">History</h1>
      {history && history.length > 0 ? (
        <table className="w-full text-center">
          <thead>
            <tr className="text-lg font-bold bg-primary-200">
              <th className="border border-primary-500 w-2/5 p-4">
                Upload time
              </th>
              <th className="border border-primary-500 w-2/5 p-4">Filename</th>
              <th className="border border-primary-500 w-1/5 p-4">Size</th>
            </tr>
          </thead>
          <tbody>
            {history.map((value, index) => (
              <tr key={value.name + " " + index}>
                <td className="border border-primary-500 p-4">
                  {value.created_at}
                </td>
                <td className="border border-primary-500 p-4">{value.name}</td>
                <td className="border border-primary-500 p-4">
                  {value.num_rows}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-10">No history found</div>
      )}
    </Layout>
  );
}
