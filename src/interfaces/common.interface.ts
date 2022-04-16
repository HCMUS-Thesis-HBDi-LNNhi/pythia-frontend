import React from "react";

export type ViewMode = "guest" | "user";

export enum PageTitles {
  LOGIN = "login",
  DASHBOARD = "dashboard",
  PROFILE = "profile",
  ANALYTICS = "analytics",
  PREDICTION = "prediction",
}
export interface IMenuItem {
  title: PageTitles | "log_out";
  icon: React.ReactNode;
}

export interface ILoginMethod {
  title: string;
  icon: React.ReactNode;
  action: () => void;
}
