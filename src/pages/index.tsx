import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import { PageLabels } from "interfaces/common.interface";
import { updateUserID } from "store/config/actions";
import {
  fetchBGNBDResult,
  fetchRFMResult,
} from "components/sections/segmentation/fetcher";
import { updateBGNBDResult, updateRFMResult } from "store/segmentation/actions";
import { handleFetchData } from "utils/handleData";
import { updateWarehouse } from "store/warehouse/actions";

export default function Router(): void {
  const router = useRouter();
  const dispatch = useDispatch();
  const viewMode = useReadLocalStorage("view-mode");
  const [_, setToken] = useLocalStorage("token", "");

  useEffect(() => {
    switch (viewMode) {
      case "user":
        const { token, user_id } = router.query;
        if (token && user_id) {
          setToken(token.toString());

          const userID = user_id.toString();

          updateUserID(userID)(dispatch);
          handleFetchData(userID, () => {}, router).then(
            (res) => res && updateWarehouse(res)(dispatch)
          );
          fetchRFMResult(userID, () => {}, router).then((value) => {
            console.log("rfm", value);

            value && updateRFMResult(value)(dispatch);
          });
          fetchBGNBDResult(userID, () => {}, router).then(
            (value) => value && updateBGNBDResult(value)(dispatch)
          );
        }
        router.push(`/${PageLabels.HOME}`);
        return;
      // TODO: handle guest mode
      case "guest":
      default:
        router.push(`/${PageLabels.LOGIN}`);
        return;
    }
  }, [router, viewMode]);
}
