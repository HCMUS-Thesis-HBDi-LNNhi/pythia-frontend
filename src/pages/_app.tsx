import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useInterval, useReadLocalStorage } from "usehooks-ts";
import { fetcher } from "utils/fetcher.utils";
import API from "const/api.const";
import { useRouter } from "next/router";
import handleErrors from "utils/errors.utils";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const viewMode = useReadLocalStorage("view-mode");
  useInterval(async () => {
    try {
      if (viewMode === "user") await fetcher.get(API.GET.healthCheck);
    } catch (error) {
      handleErrors(error, router);
    }
  }, 600000);

  return <Component {...pageProps} />;
}

export default MyApp;
