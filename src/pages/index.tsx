import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import { PageLabels, ViewMode } from "interfaces/common.interface";

export default function Router(): void {
  const router = useRouter();
  const viewMode = useReadLocalStorage<ViewMode | undefined>("view-mode");
  const [_userID, setUserID] = useLocalStorage<string | undefined>(
    "user-id",
    undefined
  );
  const [_token, setToken] = useLocalStorage<string | undefined>(
    "token",
    undefined
  );
  useEffect(() => {
    switch (viewMode) {
      case "user":
        const { token, user_id } = router.query;
        if (token && user_id) {
          setUserID(user_id.toString());
          setToken(token.toString());
        }
        router.push(`/${PageLabels.HOME}`);
        return;
    }
  }, [router, viewMode, setUserID, setToken]);
}
