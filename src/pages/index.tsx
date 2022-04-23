import { PageLabels, ViewMode } from "interfaces/common.interface";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";

export default function Router(): void {
  const router = useRouter();
  const viewMode = useReadLocalStorage<ViewMode | undefined>("view-mode");

  useLayoutEffect(() => {
    if (!viewMode) router.push(`/${PageLabels.LOGIN}`);
    else router.push(`/${PageLabels.DASHBOARD}`);
  }, [router, viewMode]);
}
