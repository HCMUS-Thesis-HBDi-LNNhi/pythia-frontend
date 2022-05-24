import icons from "const/icons.const";
import { menuItems } from "const/pages.const";
import { IMenuItem, PageLabels, ViewMode } from "interfaces/common.interface";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

const Link = dynamic(() => import("next/link"), { ssr: false });

export default function MenuBar(): JSX.Element {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const viewMode: ViewMode | null = useReadLocalStorage("view-mode");
  const [isHover, setIsHover] = useState(false);

  const [items] = useState<IMenuItem[]>(getMenuItem());

  function getMenuItem(): IMenuItem[] {
    switch (viewMode) {
      case "guest":
        return [
          ...menuItems,
          { label: PageLabels.LOGIN, icon: icons.outline.login },
        ];
      case "user":
        return [...menuItems, { label: "log out", icon: icons.outline.logout }];
      default:
        return menuItems;
    }
  }

  useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    menuElement.addEventListener("mouseover", () => setIsHover(true));
    menuElement.addEventListener("mouseout", () => setIsHover(false));

    return () => {
      menuElement.addEventListener("mouseover", () => setIsHover(true));
      menuElement.addEventListener("mouseout", () => setIsHover(false));
    };
  }, [menuRef]);

  return (
    <div
      className={[
        "bg-gradient-to-t from-primary-600 via-primary-300 to-white-100",
        "h-screen w-20 hover:w-56 duration-500",
        "flex flex-col py-20 space-y-4 relative",
      ].join(" ")}
      ref={menuRef}
    >
      {items.map((item) => (
        <Link
          href={
            item.label != "log out" ? `/${item.label}` : `/${PageLabels.LOGIN}`
          }
          passHref
          key={item.label}
        >
          <a
            key={item.label}
            className={[
              "w-full flex items-center space-x-2 text-primary-700 px-6 py-4 capitalize",
              "hover:bg-primary-400 hover:text-white-100",
              "last:text-white-100 hover:last:text-primary-700 last:absolute last:bottom-[5%]",
            ].join(" ")}
          >
            <span className="text-4xl">{item.icon}</span>
            <span
              className={[
                isHover ? "inline" : "hidden",
                "animate-[ping_300ms_cubic-bezier(0,0,0.2,1)_reverse]",
              ].join(" ")}
            >
              {item.label}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
