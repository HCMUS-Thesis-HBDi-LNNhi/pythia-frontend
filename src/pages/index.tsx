import { PageLabels, ViewMode } from "interfaces/common.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export default function Router(): void {
  const router = useRouter();
  const [localStorage, setLocalStorage] = useLocalStorage<string | undefined>(
    "user-id",
    undefined
  );
  const viewMode = useReadLocalStorage<ViewMode | undefined>("view-mode");

  useEffect(() => {
    if (!localStorage) {
      const path: string = router.asPath;
      const queryString = path.substring(2).split("=");
      setLocalStorage(queryString[1]);
    }
    if (!viewMode) router.push(`/${PageLabels.LOGIN}`);
    else router.push(`/${PageLabels.HOME}`);
  }, [router, viewMode]);
}
