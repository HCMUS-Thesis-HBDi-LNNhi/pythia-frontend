import { Button, Dialog, Input, Select } from "components/common";
import { ChartOptions } from "const/chart.const";
import {
  PotentialityOptions,
  ReportOptions,
  SegmentationOptions,
} from "const/report.const";
import { Formik, FormikErrors } from "formik";
import { ISelectItem } from "interfaces/common.interface";
import { IChartData } from "interfaces/home.interface";
import { IReport } from "interfaces/report.interface";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getMetricOptions = (report: keyof IReport): ISelectItem[] => {
  switch (report) {
    case "segmentation":
      return SegmentationOptions;
    case "potentiality":
      return PotentialityOptions;
    default:
      return [];
  }
};

interface Props {
  data: IChartData;
  initialData: IChartData;
  handleSubmit: (values: IChartData) => void;
  handleReset: () => void;
}

export default function ChartDialog(props: Props): JSX.Element {
  return (
    <Dialog className="w-3/4 p-8 text-primary-500">
      <h1 className="text-center font-bold text-primary-600 text-lg uppercase pb-6">
        Create a chart
      </h1>
      <Formik<IChartData>
        initialValues={props.initialData}
        validate={(values) => {
          const errors: FormikErrors<IChartData> = {};
          if (!values.label) errors.label = "Chart label can not be empty!";
          if (values.label.length > 20)
            errors.label = "Chart label can not have more than 20 characters";
          if (
            values.report === "potentiality" &&
            (values.metric === "transactionDate" ||
              values.metric === "transactionAmount")
          )
            errors.metric =
              "Potentiality report does not have Transaction Date and Transaction Amount!";
          // @ts-ignore
          if (values.metric === "") errors.metric = "Please choose a metric";
          return errors;
        }}
        onSubmit={(values) => {
          props.handleSubmit(values);
        }}
        onReset={() => props.handleReset()}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset,
          errors,
          touched,
        }) => (
          <div className="grid grid-cols-[60%,40%]">
            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className="space-y-4"
            >
              {errors.label && touched.label && (
                <div className="text-red-500">{errors.label}</div>
              )}
              {errors.metric && touched.metric && (
                <div className="text-red-500">{errors.metric}</div>
              )}
              <div id="chartLabel" className="flex items-center space-x-4">
                <label htmlFor="label" className="w-1/3 font-semibold">
                  Chart label
                </label>
                <Input
                  id="label"
                  type="text"
                  fill
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div id="reportLabel" className="flex items-center space-x-4">
                <label htmlFor="report" className="w-1/3 font-semibold">
                  Report
                </label>
                <Select
                  id="report"
                  fill
                  value={values.report}
                  options={ReportOptions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div id="metricLabel" className="flex items-center space-x-4">
                <label htmlFor="metric" className="w-1/3 font-semibold">
                  Metric
                </label>
                <Select
                  id="metric"
                  fill
                  value={values.metric}
                  options={[
                    {
                      label: "Choose a metric",
                      id: "",
                      value: "",
                    },
                    ...getMetricOptions(values.report),
                  ]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div id="chartLabel" className="flex items-center space-x-4">
                <label htmlFor="chartType" className="w-1/3 font-semibold">
                  Chart type
                </label>
                <Select
                  id="chartType"
                  fill
                  value={values.chartType}
                  options={ChartOptions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div id="formButtons" className="flex justify-end space-x-4">
                <Button disabled={isSubmitting} style="failure" type="reset">
                  Cancel
                </Button>
                <Button disabled={isSubmitting} style="highlight" type="submit">
                  Accept
                </Button>
              </div>
            </form>
            <main className="ml-4 pl-4 py-2 border-l border-primary-300">
              <h2 className="text-center font-medium text-primary-600 text-lg pb-6">
                Preview
              </h2>
              {/* <ChartBody
                chartTitle={values.metric}
                labels={labels}
                data={labels.map(() => Math.random() * 100)}
                scatterChartData={labels.map(() => ({
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                }))}
                chartType={values.chartType}
              /> */}
            </main>
          </div>
        )}
      </Formik>
    </Dialog>
  );
}
