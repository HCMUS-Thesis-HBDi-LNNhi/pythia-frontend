import { Layout } from "components/common";
import Errors from "const/error.const";
import { IHistory, IHistoryResponse } from "interfaces/profile.interface";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import handleErrors from "utils/errors.utils";
import { fetcher } from "utils/fetcher.utils";
import { formatDate } from "utils/formatter.utils";

export default function Profile(): JSX.Element {
  const router = useRouter();
  const userId = useReadLocalStorage<string>("user-id");
  const [history, setHistory] = useState<IHistory[]>();
  const [isLoading, setLoading] = useState(false);

  const fetchHistory = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        const response = await fetcher.get(`/users/${userId}/files`);
        const responseData: IHistoryResponse = response.data;
        setHistory(
          responseData.files.map((value) => {
            return {
              ...value,
              created_at: new Date(value.created_at),
              updated_at: new Date(value.updated_at),
            };
          })
        );
      } catch (error) {
        handleErrors(error, router);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (!userId) {
      handleErrors(Errors[401], router);
    } else {
      fetchHistory(userId);
    }
  }, [userId, router, fetchHistory]);

  return (
    <Layout
      title="History"
      className="space-y-8 text-primary-700"
      isLoading={isLoading}
    >
      {history && history.length > 0 ? (
        <table className="w-full text-center">
          <thead>
            <tr className="text-lg font-bold bg-primary-200">
              <th className="border border-primary-500 w-1/3 p-4">
                Upload time
              </th>
              <th className="border border-primary-500 w-1/3 p-4">Filename</th>
              <th className="border border-primary-500 w-1/6 p-4">
                Total rows
              </th>
              <th className="border border-primary-500 w-1/6 p-4">File type</th>
            </tr>
          </thead>
          <tbody>
            {history.map((value, index) => (
              <tr key={value.name + " " + index}>
                <td className="border border-primary-500 p-4">
                  {formatDate(value.created_at)}
                </td>
                <td className="border border-primary-500 p-4">{value.name}</td>
                <td className="border border-primary-500 p-4">
                  {value.num_rows}
                </td>
                <td className="border border-primary-500 p-4">
                  {value.file_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-10">
          {!isLoading && "No history found"}
        </div>
      )}
    </Layout>
  );
}
