import { IMenuItem, PageTitles } from "interfaces/common.interface";
import icons from "./icons.const";

export const menuItems: IMenuItem[] = [
  { title: PageTitles.PROFILE, icon: icons.solid.account },
  { title: PageTitles.DASHBOARD, icon: icons.solid.home },
  { title: PageTitles.ANALYTICS, icon: icons.outline.analytic },
  { title: PageTitles.PREDICTION, icon: icons.solid.prediction },
  { title: "log_out", icon: icons.outline.logout },
];
