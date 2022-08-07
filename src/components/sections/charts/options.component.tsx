import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

import { Button, Radio, Select } from "components/common";

import icons from "const/icons.const";
import MAP_JSON from "const/map.const";
import { initCustomerIcons, initTransactionIcons } from "const/chart.const";

import { ChartType, IChartOptions, IIcons } from "interfaces/chart.interface";

import { ChartOptionsValidate } from "utils/validate.utils";
import { getCategoryLabel } from "utils/formatter.utils";

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

const RadioGroup = (props: {
  label: string;
  className: string;
  groupName: string;
  fieldValue: string[];
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
          label={getCategoryLabel(value)}
        >
          <div className="text-3xl">{props.icons[index]}</div>
        </Radio>
      ))}
    </ul>
  </div>
);

const RegionSelection = (props: {
  label: string;
  className: string;
  name: string;
  fieldValue: string[];
}): JSX.Element => (
  <div className={props.className}>
    <Heading label={props.label} />
    <Select
      className="capitalize w-full"
      options={props.fieldValue.map((value) => ({
        label: getCategoryLabel(value),
        id: value,
        value,
      }))}
      name={props.name}
      label={props.label}
    />
  </div>
);

interface Props {
  initialValues: IChartOptions;
  chartType: ChartType;
  setChartOptions: (values: IChartOptions) => void;
}

export default function ChartOptions(props: Props): JSX.Element {
  const [customerIcons, setCustomerIcons] = useState<IIcons | null>(null);
  const [transactionIcons, setTransactionIcons] = useState<IIcons | null>(null);

  useEffect(() => {
    switch (props.chartType) {
      case ChartType.geo:
        setCustomerIcons(null);
        setTransactionIcons(initTransactionIcons);
        break;
      case ChartType.scatter:
        setCustomerIcons(initCustomerIcons);
        setTransactionIcons(null);
        break;
      case ChartType.line:
        setCustomerIcons({
          dob: icons.outline.age,
          date_key: icons.outline.calendar,
        });
        setTransactionIcons(initTransactionIcons);
        break;
      default:
        setCustomerIcons(initCustomerIcons);
        setTransactionIcons(initTransactionIcons);
        break;
    }
  }, [props.chartType]);

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
          {customerIcons ? (
            <RadioGroup
              label={
                props.chartType === ChartType.scatter ? "Value" : "X Value"
              }
              className="col-span-3"
              groupName="x"
              fieldValue={Object.keys(customerIcons)}
              icons={Object.values(customerIcons)}
            />
          ) : (
            <RegionSelection
              label="Region"
              className="col-span-3"
              name="x"
              fieldValue={Object.keys(MAP_JSON)}
            />
          )}
          {transactionIcons && (
            <RadioGroup
              label={props.chartType === ChartType.geo ? "Value" : "Y Value"}
              className="col-span-3"
              groupName="y"
              fieldValue={Object.keys(transactionIcons)}
              icons={Object.values(transactionIcons)}
            />
          )}
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
