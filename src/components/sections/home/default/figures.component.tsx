import { useEffect, useState } from "react";

import { IData } from "interfaces/data.interface";
import { IFigure } from "interfaces/home.interface";
import { RoundNumber } from "utils/formatter.utils";

const FigureBox = (figure: IFigure): JSX.Element => {
  return (
    <div
      className={[
        "border border-primary-300 rounded-lg text-center m-2 p-2 h-32",
        "grid grid-rows-[60%.0,40%] place-items-center",
      ].join(" ")}
    >
      <div className="font-semibold">{figure.label}</div>
      <div className="border-b border-primary-300 w-5/6"></div>
      <div className="">{figure.value}</div>
    </div>
  );
};

interface Props {
  data: IData;
}

export default function FigureBoxes(props: Props): JSX.Element {
  const [defaultFigures, setDefaultFigures] = useState<IFigure[]>([]);

  useEffect(() => {
    setDefaultFigures(getDefaultFigures(props.data));
  }, [props.data]);

  return (
    <div className="grid grid-cols-5 text-center">
      {defaultFigures.map((figure) => (
        <FigureBox {...figure} key={figure.label} />
      ))}
    </div>
  );
}

function getDefaultFigures(data: IData): IFigure[] {
  const totalCustomers = data.dim_customers.length;

  let totalTransactions = 0;
  let totalAmount = 0;

  Object.entries(data.fact_transactions).map(([_, value]) => {
    totalTransactions += value.num_trans;
    totalAmount += value.total_amount;
  });

  return [
    { label: "No. Customers", value: totalCustomers },
    { label: "No. Transactions", value: totalTransactions },
    { label: "Total Avenue", value: RoundNumber(totalAmount, 2) },
    {
      label: "Transactions per Customer",
      value: RoundNumber(totalTransactions / totalCustomers, 2),
    },
    {
      label: "Avenue per Customer",
      value: RoundNumber(totalAmount / totalCustomers, 2),
    },
  ];
}
