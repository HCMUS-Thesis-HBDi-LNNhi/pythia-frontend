import { Button, Radio } from "components/common";
import icons from "const/icons.const";
import { Field, Form, Formik } from "formik";
import {
  ChartType,
  IChartOptions,
  XAxisType,
  YAxisType,
} from "interfaces/chart.interface";
import { CategoryDataLabels, FactDataLabels } from "interfaces/data.interface";
import React, { ReactNode } from "react";
import { ChartOptionsValidate } from "utils/validate.utils";

const Heading = (props: { label: string }): JSX.Element => (
  <label className="w-full font-medium text-primary-500 text-lg">
    {props.label}:
  </label>
);

const InputDate = (props: {
  label: string;
  fieldNames: string[];
}): JSX.Element => (
  <div>
    <Heading label={props.label} />
    <div className="py-2 pr-3 flex items-center space-x-2">
      <Field
        type="number"
        className="border border-primary-700 p-1 rounded w-1/3 text-center"
        name={props.fieldNames[0]}
      />
      <Field
        type="number"
        className="border border-primary-700 p-1 rounded w-2/3 text-center"
        name={props.fieldNames[1]}
      />
    </div>
  </div>
);

const InputTransactions = (props: {
  label: string;
  className: string;
  groupName: string;
  fieldValue: (keyof typeof FactDataLabels)[];
  icons: React.ReactNode[];
}): JSX.Element => (
  <div className={props.className}>
    <Heading label={props.label} />
    <ul
      role="group"
      className="space-y-2 grid grid-cols-7 lg:grid-cols-2 lg:gap-x-12"
    >
      {props.fieldValue.map((value, index) => (
        <Radio
          key={value}
          groupName={props.groupName}
          value={value}
          label={FactDataLabels[value]}
        >
          <div className="text-3xl">{props.icons[index]}</div>
        </Radio>
      ))}
    </ul>
  </div>
);

const InputCustomers = (props: {
  label: string;
  className: string;
  groupName: string;
  fieldValue: (keyof typeof CategoryDataLabels)[];
  icons: React.ReactNode[];
}): JSX.Element => (
  <div className={props.className}>
    <Heading label={props.label} />
    <ul
      role="group"
      className={[
        "space-y-2 grid grid-cols-7",
        "lg:grid-cols-2 lg:gap-x-12",
      ].join(" ")}
    >
      {props.fieldValue.map((value, index) => (
        <Radio
          key={value}
          groupName={props.groupName}
          value={value}
          label={CategoryDataLabels[value]}
        >
          <div className="text-3xl">{props.icons[index]}</div>
        </Radio>
      ))}
    </ul>
  </div>
);

const IconsCustomer: { [key: string]: ReactNode } = {
  dob: icons.outline.age,
  gender: icons.outline.gender,
  country: icons.outline.country,
  city: icons.outline.city,
  job_title: icons.outline.job_title,
  job_industry: icons.outline.job_industry,
  date_key: icons.outline.calendar,
};

const IconsTransaction: { [key: string]: ReactNode } = {
  num_trans: icons.outline.transactions,
  total_amount: icons.outline.money,
};

interface Props {
  initialValues: IChartOptions;
  chartType: ChartType;
  setChartOptions: (values: IChartOptions) => void;
}

export default function ChartOptions(props: Props): JSX.Element {
  return (
    <Formik<IChartOptions>
      initialValues={props.initialValues}
      onSubmit={(values) => {
        props.setChartOptions(values);
      }}
      validate={(values) => ChartOptionsValidate(values)}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className={[
            "h-full w-full",
            "grid grid-cols-[40%,20%,40%] gap-y-2",
            "lg:flex lg:flex-col lg:gap-y-0",
          ].join(" ")}
        >
          <InputDate
            label="From quarter"
            fieldNames={["quarters.from", "years.from"]}
          />
          <div />
          <InputDate
            label="To quarter"
            fieldNames={["quarters.to", "years.to"]}
          />
          {props.chartType !== ChartType.geo && (
            <InputCustomers
              label={
                props.chartType === ChartType.scatter ? "Value" : "X Value"
              }
              className="col-span-3"
              groupName="x"
              fieldValue={Object.keys(IconsCustomer) as XAxisType[]}
              icons={Object.values(IconsCustomer)}
            />
          )}
          {props.chartType !== ChartType.scatter && (
            <InputTransactions
              label={props.chartType === ChartType.geo ? "Value" : "Y Value"}
              className="col-span-3"
              groupName="y"
              fieldValue={Object.keys(IconsTransaction) as YAxisType[]}
              icons={Object.values(IconsTransaction)}
            />
          )}
          {/*TODO: Implement 3D charts */}
          <div className="mt-auto pt-4 col-span-3 grid place-items-center">
            <Button style="solid" type="submit">
              Draw chart
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
