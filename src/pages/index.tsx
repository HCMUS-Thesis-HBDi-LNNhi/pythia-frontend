import { PageLabels, ViewMode } from "interfaces/common.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

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
    const { token, user_id } = router.query;
    if (token && user_id) {
      setUserID(user_id.toString());
      setToken(token.toString());
    }
    if (!viewMode) router.push(`/${PageLabels.LOGIN}`);
    else router.push(`/${PageLabels.HOME}`);
  }, [router, viewMode, setUserID, setToken]);
}
