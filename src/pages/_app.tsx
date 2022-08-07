import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useInterval, useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

import API from "const/api.const";

import fetcher from "utils/fetcher.utils";
import handleErrors from "utils/errors.utils";
import { DEFAULT_END_DATE, DEFAULT_PREDICT_TIME } from "const/chart.const";
import Errors from "const/error.const";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const viewMode = useReadLocalStorage("view-mode");
  const userID = useReadLocalStorage<string>("user-id");
  const endDate = useReadLocalStorage<number>("end-date");
  const predictTime = useReadLocalStorage<number>("predict-time");

  const [trigger, setTrigger] = useLocalStorage("trigger", false);

  useInterval(async () => {
    try {
      if (viewMode === "user") await fetcher.get(API.GET.healthCheck);
    } catch (error) {
      handleErrors(error, router);
    }
  }, 600000);

  useInterval(async () => {
    if (viewMode !== "user" || !trigger) return;
    if (!userID) {
      handleErrors(Errors[401], router);
      return;
    }
    try {
      const response = await fetcher.post(API.POST.triggerModels(userID), {
        end_of_observation_date: endDate ?? DEFAULT_END_DATE,
        prediction_time: predictTime ?? DEFAULT_PREDICT_TIME,
      });
      if (response.data.status !== "in progress") setTrigger(false);
    } catch (error) {
      handleErrors(error, router);
    }
  }, 10000);

  return <Component {...pageProps} />;
}

export default MyApp;
