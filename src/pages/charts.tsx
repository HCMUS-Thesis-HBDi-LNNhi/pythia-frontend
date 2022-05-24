import { Layout, Pane, Charts as RenderCharts } from "components/common";
import { Field, Form, Formik } from "formik";
import React from "react";

const InputDate = (props: { children: React.ReactNode }): JSX.Element => (
  <input type="date">{props.children}</input>
);

export default function Charts(): JSX.Element {
  return (
    <Layout title="Charts">
      <main className="w-full h-[90%] mt-4 flex">
        <Pane width="w-3/4">
          <RenderCharts />
        </Pane>
        <Pane width="w-1/4 ml-4">
          <Formik
            initialValues={{ transaction: "", customer: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form>
                <h2 className="font-medium text-primary-500 text-lg my-3">
                  Datetime values:
                </h2>
                <div className="flex flex-col">
                  <label htmlFor="from">From:</label>
                  <input type="date" id="from" />
                  <label htmlFor="to">To:</label>
                  <input type="date" id="to" />
                </div>
                <h2 className="font-medium text-primary-500 text-lg my-3 border-t border-primary-200">
                  Transaction values:
                </h2>
                <ul
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="space-y-2"
                >
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      name="transaction"
                      id="totalAmount"
                      value="totalAmount"
                    />
                    <label htmlFor="totalAmount">Total Amount</label>
                  </li>
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      name="transaction"
                      id="totalTransactions"
                      value="totalTransactions"
                    />
                    <label htmlFor="totalTransactions">
                      Total Transactions
                    </label>
                  </li>
                </ul>
                <h2 className="font-medium text-primary-500 text-lg my-3 border-t border-primary-200">
                  Customer values:
                </h2>
                <ul
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="space-y-2"
                >
                  <li className="space-x-2">
                    <Field type="radio" id="age" name="customer" value="age" />
                    <label htmlFor="age">Age</label>
                  </li>
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      id="gender"
                      name="customer"
                      value="gender"
                    />
                    <label htmlFor="gender">Gender</label>
                  </li>
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      id="country"
                      name="customer"
                      value="country"
                    />
                    <label htmlFor="country">Country</label>
                  </li>
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      id="city"
                      name="customer"
                      value="city"
                    />
                    <label htmlFor="city">City</label>
                  </li>
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      id="jobTitle"
                      name="customer"
                      value="jobTitle"
                    />
                    <label htmlFor="jobTitle">Job Title</label>
                  </li>
                  <li className="space-x-2">
                    <Field
                      type="radio"
                      id="jobIndustry"
                      name="customer"
                      value="jobIndustry"
                    />
                    <label htmlFor="jobIndustry">Job Industry</label>
                  </li>
                </ul>
              </Form>
            )}
          </Formik>
        </Pane>
      </main>
    </Layout>
  );
}
