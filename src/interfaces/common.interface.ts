import React from "react";

export type ViewMode = "guest" | "user";

export enum PageLabels {
  LOGIN = "login",
  HOME = "home",
  PROFILE = "profile",
  SEGMENTATION = "segmentation",
  POTENTIALITY = "potentiality",
}
export interface IMenuItem {
  label: PageLabels | "log out";
  icon: React.ReactNode;
}

export interface ILoginMethod {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export enum TagColor {
  gray,
  red,
  green,
  blue,
}
