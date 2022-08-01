import { toast } from "components/common";

import { IChartOptions } from "interfaces/chart.interface";

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear();

export const ChartOptionsValidate = (values: IChartOptions) => {
  switch (true) {
    case values.years.from < MIN_YEAR || values.years.to < MIN_YEAR:
      toast(`Chosen year cannot under ${MIN_YEAR}`, "failure");
      return;
    case values.years.from > MAX_YEAR || values.years.to > MAX_YEAR:
      toast(`Chosen year cannot over ${MAX_YEAR}`, "failure");
      return;
    case values.quarters.from < 1 || values.quarters.to < 1:
      toast("Chosen quarter cannot under 1", "failure");
      return;
    case values.quarters.from > 4 || values.quarters.to > 4:
      toast("Chosen quarter cannot over 4", "failure");
      return;
    case values.years.from === values.years.to &&
      values.quarters.from > values.quarters.to:
    case values.years.from > values.years.to:
      toast("Invalid input", "failure");
      return;
    default:
      return;
  }
};
