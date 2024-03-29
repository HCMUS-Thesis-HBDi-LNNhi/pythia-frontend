import { NextRouter } from "next/router";

import { toast } from "components/common";

import Errors from "const/error.const";

import { PageLabels } from "interfaces/common.interface";

export default function handleErrors(error: any, router: NextRouter) {
  switch (error) {
    case Errors[401]:
      toast("Your session has expired, please login again!", "failure");
      localStorage.clear();
      router.push(`/${PageLabels.LOGIN}`);
      break;
    case Errors.geoError:
      toast("Something went wrong, please reload!", "failure");
      break;
    case Errors.formatError:
      toast("Wrong file format. Please try again!", "failure");
      break;
    default:
      toast("Something went wrong, please try again!", "failure");
      break;
  }
}
