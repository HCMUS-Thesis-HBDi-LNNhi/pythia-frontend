import { Button, Radio } from "components/common";
import { initialChartOptions } from "const/chart.const";
import icons from "const/icons.const";
import { Field, Form, Formik } from "formik";
import { IChartOptions } from "interfaces/common.interface";
import { ChartOptionsValidate } from "utils/validate";

const Heading = (props: { label: string }): JSX.Element => (
  <label className="w-full font-medium text-primary-500 text-lg">
    {props.label}:
  </label>
);

const InputFrom = (): JSX.Element => (
  <div className="py-2 flex items-center space-x-2">
    <Field
      type="number"
      className="border border-primary-700 p-1 rounded w-1/3 text-center"
      name="quarters.from"
    />
    <Field
      type="number"
      className="border border-primary-700 p-1 rounded w-2/3 text-center"
      name="years.from"
    />
  </div>
);

const InputTo = (): JSX.Element => (
  <div className="py-2 flex items-center space-x-2 mb-4">
    <Field
      type="number"
      className="border border-primary-700 p-1 rounded w-1/3 text-center"
      name="quarters.to"
    />
    <Field
      type="number"
      className="border border-primary-700 p-1 rounded w-2/3 text-center"
      name="years.to"
    />
  </div>
);

const InputTransactions = (): JSX.Element => (
  <ul
    role="group"
    aria-labelledby="my-radio-group"
    className="space-y-2 grid grid-cols-2 gap-x-12 mb-4"
  >
    <Radio groupName="transaction" value="totalAmount" label="Total amount">
      <div className="text-3xl">{icons.outline.money}</div>
    </Radio>
    <Radio
      groupName="transaction"
      value="totalTransactions"
      label="Total transactions"
    >
      <div className="text-3xl">{icons.outline.transactions}</div>
    </Radio>
  </ul>
);

const InputCustomers = (): JSX.Element => (
  <ul
    role="group"
    aria-labelledby="my-radio-group"
    className="space-y-2 grid grid-cols-2 gap-x-12"
  >
    <Radio groupName="customer" value="age" label="Age">
      <div className="text-3xl">{icons.outline.age}</div>
    </Radio>
    <Radio groupName="customer" value="gender" label="Gender">
      <div className="text-3xl">{icons.outline.gender}</div>
    </Radio>
    <Radio groupName="customer" value="country" label="Country">
      <div className="text-3xl">{icons.outline.country}</div>
    </Radio>
    <Radio groupName="customer" value="city" label="City">
      <div className="text-3xl">{icons.outline.city}</div>
    </Radio>
    <Radio groupName="customer" value="jobTitle" label="Job title">
      <div className="text-3xl">{icons.outline.job_title}</div>
    </Radio>
    <Radio groupName="customer" value="jobIndustry" label="Job Industry">
      <div className="text-3xl">{icons.outline.job_industry}</div>
    </Radio>
  </ul>
);

interface Props {
  setChartOptions: (values: IChartOptions) => void;
}

export default function ChartOptions(props: Props): JSX.Element {
  return (
    <Formik<IChartOptions>
      initialValues={initialChartOptions}
      onSubmit={(values) => {
        props.setChartOptions(values);
      }}
      validate={(values) => ChartOptionsValidate(values)}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col h-full w-full items-center"
        >
          <Heading label="From quarter" />
          <InputFrom />
          <Heading label="To quarter" />
          <InputTo />
          <Heading label="Transactions" />
          <InputTransactions />
          <Heading label="Customers" />
          <InputCustomers />
          <Button style="solid" type="submit" className="mt-auto">
            Draw chart
          </Button>
        </Form>
      )}
    </Formik>
  );
}
