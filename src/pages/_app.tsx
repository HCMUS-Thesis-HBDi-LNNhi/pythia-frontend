import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useInterval, useReadLocalStorage } from "usehooks-ts";

import API from "const/api.const";
import { fetcher } from "utils/fetcher.utils";
import handleErrors from "utils/errors.utils";
import { store, wrapper } from "store";

let persistor = persistStore(store);

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

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
