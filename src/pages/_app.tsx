import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useInterval, useLocalStorage } from "usehooks-ts";
import { fetcher } from "utils/fetcher";
import API from "const/api.const";
import { useRouter } from "next/router";
import { toast } from "components/common";
import { PageLabels } from "interfaces/common.interface";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useLocalStorage("view-mode", "");
  useInterval(async () => {
    try {
      if (viewMode === "user") await fetcher.get(API.GET.healthCheck);
    } catch (error) {
      toast("Your session has expired, please login again!", "failure");
      setViewMode("");
      router.push(`/${PageLabels.LOGIN}`);
    }
  }, 600000);

  return <Component {...pageProps} />;
}

export default MyApp;
