import { IMenuItem, PageLabels } from "interfaces/common.interface";
import icons from "./icons.const";

export const menuItems: IMenuItem[] = [
  { label: PageLabels.PROFILE, icon: icons.solid.account },
  { label: PageLabels.HOME, icon: icons.solid.home },
  { label: PageLabels.CHARTS, icon: icons.solid.bar_chart },
  { label: PageLabels.SEGMENTATION, icon: icons.outline.segmentation },
  { label: PageLabels.POTENTIALITY, icon: icons.solid.potentiality },
];
