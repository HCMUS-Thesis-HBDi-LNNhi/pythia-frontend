import { IMenuItem, PageLabels } from "interfaces/common.interface";
import icons from "./icons.const";

export const menuItems: IMenuItem[] = [
  { label: PageLabels.PROFILE, icon: icons.solid.account },
  { label: PageLabels.DASHBOARD, icon: icons.solid.home },
  { label: PageLabels.ANALYTICS, icon: icons.outline.analytic },
  { label: PageLabels.PREDICTION, icon: icons.solid.prediction },
  { label: "log_out", icon: icons.outline.logout },
];
