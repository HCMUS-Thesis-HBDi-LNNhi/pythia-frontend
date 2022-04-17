import Button from "components/common/button.component";
import Layout from "components/common/layout.component";
import { DisplayBox } from "components/dashboard";
import icons from "const/icons.const";
import { INumberData } from "interfaces/dashboard.interface";

export default function Dashboard(): JSX.Element {
  const numberData: INumberData[] = [
    { label: "Total records", value: 12300, description: "Hello" },
    { label: "Total records", value: 12300 },
    { label: "Total records", value: 12300 },
    { label: "Total records", value: 12300 },
  ];

  const chartData = [
    { label: "Chart A", chart: <div>Some chart</div> },
    { label: "Chart A", chart: <div>Some chart</div> },
    { label: "Chart A", chart: <div>Some chart</div> },
    { label: "Chart A", chart: <div>Some chart</div> },
    { label: "Chart A", chart: <div>Some chart</div> },
    { label: "Chart A", chart: <div>Some chart</div> },
    { label: "Chart A", chart: <div>Some chart</div> },
  ];

  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Dashboard</h1>
      {numberData && (
        <div className="grid grid-cols-5">
          {numberData.map((item) => (
            <DisplayBox label={item.label}>
              <div>{item.value}</div>
              {item.description && <div>{item.description}</div>}
            </DisplayBox>
          ))}
          {numberData.length < 5 && (
            <Button
              className={[
                "border rounded-lg space-y-3 m-2 aspect-4/3",
                "flex flex-col flex-1 justify-center items-center",
                "text-4xl text-center opacity-80 shadow",
              ].join(" ")}
              style="outline"
              icon={icons.outline.plus}
            />
          )}
        </div>
      )}
      {chartData && (
        <div className="grid grid-cols-3">
          {chartData.map((item) => (
            <DisplayBox label={item.label}>{item.chart}</DisplayBox>
          ))}
          <Button
            className={[
              "border rounded-lg space-y-3 m-2 aspect-4/3",
              "flex flex-col flex-1 justify-center items-center",
              "text-5xl text-center opacity-80 shadow",
            ].join(" ")}
            style="outline"
            icon={icons.outline.plus}
          />
        </div>
      )}
    </Layout>
  );
}
