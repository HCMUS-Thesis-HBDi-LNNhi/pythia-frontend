import { Button, Dialog, Input, Select } from "components/common";
import {
  PotentialityOptions,
  ReportOptions,
  SegmentationOptions,
} from "const/report.const";
import { Formik, FormikErrors } from "formik";
import { ISelectItem } from "interfaces/common.interface";
import { IChartData, INumberData } from "interfaces/home.interface";
import { IReport } from "interfaces/report.interface";

interface Props {
  data: INumberData;
  initialData: INumberData;
  handleSubmit: (values: INumberData) => void;
  handleReset: () => void;
}

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

export default function NumberDialog(props: Props): JSX.Element {
  return (
    <Dialog className="w-1/2 p-8 text-primary-500">
      <h1 className="text-center font-bold text-primary-600 text-lg uppercase pb-6">
        Choose a metric
      </h1>
      <Formik<INumberData>
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
            <div id="numberLabel" className="flex items-center space-x-4">
              <label htmlFor="label" className="w-1/3 font-semibold">
                Label
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
            <div id="formButtons" className="flex justify-end space-x-4">
              <Button disabled={isSubmitting} style="failure" type="reset">
                Cancel
              </Button>
              <Button disabled={isSubmitting} style="highlight" type="submit">
                Accept
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
