import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import { PageLabels } from "interfaces/common.interface";
import { updateUserID } from "store/config/actions";

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
          updateUserID(user_id.toString())(dispatch);
          setToken(token.toString());
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
