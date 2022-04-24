import { Layout } from "components/common";

export default function Profile(): JSX.Element {
  const history = [
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
    { date: "22/03/2012, 12:43", filename: "File A", size: "12345" },
  ];

  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">History</h1>
      <table className="w-full text-center">
        <thead>
          <tr className="text-lg font-bold bg-primary-200">
            <th className="border border-primary-500 w-2/5 p-4">Upload time</th>
            <th className="border border-primary-500 w-2/5 p-4">Filename</th>
            <th className="border border-primary-500 w-1/5 p-4">Size</th>
          </tr>
        </thead>
        <tbody>
          {history.map((value) => (
            <tr>
              <td className="border border-primary-500 p-4">{value.date}</td>
              <td className="border border-primary-500 p-4">
                {value.filename}
              </td>
              <td className="border border-primary-500 p-4">{value.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
