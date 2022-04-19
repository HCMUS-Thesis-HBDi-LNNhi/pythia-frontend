import Button from "components/common/button.component";
import Layout from "components/common/layout.component";
import { DisplayBox } from "components/dashboard";
import icons from "const/icons.const";
import { INumberData } from "interfaces/dashboard.interface";
import { useState } from "react";

export default function Dashboard(): JSX.Element {
  const [numberData, setNumberData] = useState<INumberData[]>([
    { label: "Total records 1", value: 12300, description: "Hello" },
    { label: "Total records 2", value: 12300 },
    { label: "Total records 3", value: 12300 },
    { label: "Total records 4", value: 12300 },
  ]);

  const [chartData, setChartData] = useState([
    { label: "Chart A 1", chart: <div>Some chart</div> },
    { label: "Chart A 2", chart: <div>Some chart</div> },
    { label: "Chart A 3", chart: <div>Some chart</div> },
    { label: "Chart A 4", chart: <div>Some chart</div> },
    { label: "Chart A 5", chart: <div>Some chart</div> },
    { label: "Chart A 6", chart: <div>Some chart</div> },
    { label: "Chart A 7", chart: <div>Some chart</div> },
  ]);

  function addNumberData() {
    const newData = numberData.slice();
    newData.push({ label: "New number", value: 12300 });
    setNumberData(newData.slice());
  }

  function removeNumberData(index: number) {
    const newData = numberData.slice();
    newData.splice(index, 1);
    setNumberData(newData.slice());
  }

  function addChartData() {
    const newData = chartData.slice();
    newData.push({ label: "New chart", chart: <div>Some chart</div> });
    setChartData(newData.slice());
  }

  function removeChartData(index: number) {
    const newData = chartData.slice();
    newData.splice(index, 1);
    setChartData(newData.slice());
  }

  return (
    <Layout className="space-y-8 text-primary-700">
      <h1 className="text-4xl text-center">Dashboard</h1>
      <main className="grid grid-cols-5">
        {numberData.map((item, index) => (
          <DisplayBox
            label={item.label}
            key={item.label + "_" + index}
            onClick={() => removeNumberData(index)}
          >
            <div>{item.value}</div>
            {item.description && <div>{item.description}</div>}
          </DisplayBox>
        ))}
        {numberData.length < 5 && (
          <div
            className={[
              "border rounded-lg text-center m-2 aspect-4/3",
              "flex-1 grid hover:shadow-lg",
            ].join(" ")}
          >
            <Button
              className="text-4xl w-full h-full place-content-center"
              style="outline"
              icon={icons.outline.plus}
              onClick={addNumberData}
            />
          </div>
        )}
      </main>
      <main className="grid grid-cols-3">
        {chartData.map((item, index) => (
          <DisplayBox
            label={item.label}
            key={item.label + "_" + index}
            onClick={() => removeChartData(index)}
          >
            {item.chart}
          </DisplayBox>
        ))}
        <div
          className={[
            "border rounded-lg text-center m-2 aspect-4/3",
            "flex-1 grid hover:shadow-lg",
          ].join(" ")}
        >
          <Button
            className="text-5xl w-full h-full place-content-center"
            style="outline"
            icon={icons.outline.plus}
            onClick={addChartData}
          />
        </div>
      </main>
    </Layout>
  );
}
