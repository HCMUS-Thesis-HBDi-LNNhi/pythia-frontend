import React from "react";

export enum PageTitles {
  LOGIN = "login",
  SIGN_UP = "sign_up",
  DASHBOARD = "dashboard",
  PROFILE = "profile",
  ANALYTICS = "analytics",
  PREDICTION = "prediction",
}
export interface IMenuItem {
  title: PageTitles | "log_out";
  icon: React.ReactNode;
}
