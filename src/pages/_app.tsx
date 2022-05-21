import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useReadLocalStorage, useTimeout } from "usehooks-ts";
import { fetcher } from "utils/fetcher";
import API from "const/api.const";
import { useRouter } from "next/router";
import { PageLabels } from "interfaces/common.interface";
import { toast } from "components/common";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const token = useReadLocalStorage("token");
  useTimeout(async () => {
    console.log(token);

    if (token) {
      try {
        // await fetcher.get(API.GET.healthCheck);
      } catch (error) {
        toast("Your session has expired. Please login again!", "failure");
        router.push(`/${PageLabels.LOGIN}`);
      }
    }
  }, 600000);
  // 600000
  return <Component {...pageProps} />;
}

export default MyApp;
