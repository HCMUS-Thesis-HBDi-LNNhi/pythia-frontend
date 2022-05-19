import { Button, Loading, toast } from "components/common";
import API from "const/api.const";
import icons from "const/icons.const";
import {
  ILoginMethod,
  PageLabels,
  ViewMode,
} from "interfaces/common.interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { fetcher } from "utils/fetcher";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [_viewMode, setViewMode] = useLocalStorage<ViewMode | undefined>(
    "view-mode",
    undefined
  );
  const [isLoading, setLoading] = useState(false);

  const loginMethods: ILoginMethod[] = [
    {
      label: "Login with Google",
      icon: icons.outline.google,
      action: async () => {
        try {
          setLoading(true);
          setViewMode("user");
          const response = await fetcher.get(API.GET.loginWithGoogle);
          if (response.status === 200) {
            setLoading(false);
            router.push(`/redirect/${response.data.login_path}`);
          }
        } catch (error) {
          console.error(error);
          toast("Can't login with google. Please try again");
          window.localStorage.clear();
          router.push(`/${PageLabels.LOGIN}`);
        } finally {
          setLoading(false);
        }
      },
    },
    {
      label: "Continue as guest",
      icon: icons.solid.guest,
      action: () => {
        setViewMode("guest");
        router.push(`/${PageLabels.HOME}`);
      },
    },
  ];

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  return (
    <>
      <main
        className={[
          "flex flex-col justify-center items-center w-screen h-screen text-center",
          "bg-primary-200 rounded-lg shadow-lg text-primary-700 space-y-8",
        ].join(" ")}
      >
        <h1 className="text-4xl">
          Welcome to <strong className="text-6xl font-MsMadi">Pythia</strong>
        </h1>
        <h3>
          It{"'"}s not what you sell that matters as much as how you sell it!
        </h3>
        <h3>— Brian Halligan, CEO & Co-Founder, HubSpot</h3>
        <div className="h-4"></div>
        {loginMethods.map((method) => (
          <Button
            icon={method.icon}
            onClick={() => method.action()}
            key={method.label}
            style="solid"
          >
            {method.label}
          </Button>
        ))}
      </main>
      {isLoading && <Loading />}
    </>
  );
}
