import React from "react";

export type ViewMode = "guest" | "user";

export enum PageLabels {
  LOGIN = "login",
  DASHBOARD = "dashboard",
  PROFILE = "profile",
  ANALYTICS = "analytics",
  PREDICTION = "prediction",
}
export interface IMenuItem {
  label: PageLabels | "log_out";
  icon: React.ReactNode;
}

export interface ILoginMethod {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}
