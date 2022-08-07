import React from "react";

export type ViewMode = "user" | "";

export type ButtonStyle = "outline" | "solid" | "failure" | "highlight";

export enum PageLabels {
  LOGIN = "login",
  HOME = "home",
  CHARTS = "charts",
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

export type SelectValue = string | number | readonly string[] | undefined;
export interface ISelectItem {
  label: string;
  id: string;
  value: SelectValue;
  disabled?: boolean;
}
