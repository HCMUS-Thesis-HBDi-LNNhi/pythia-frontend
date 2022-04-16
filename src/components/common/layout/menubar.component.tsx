import { menuItems } from "const/pages.const";
import { PageTitles } from "interfaces/common.interface";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MenuBar(): JSX.Element {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);

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
        "h-screen w-20 hover:w-44 duration-500",
        "flex flex-col py-20 space-y-10 relative",
      ].join(" ")}
      ref={menuRef}
    >
      {menuItems.map((item) => (
        <Link href={item.title != "log_out" ? `/${item.title}` : `/`} passHref>
          <a
            key={item.title}
            className={[
              "w-full flex items-center space-x-2 text-primary-700 px-6 py-4 capitalize",
              "hover:bg-primary-400 hover:text-white-100",
              "last:text-white-100 last:absolute last:bottom-20 hover:last:text-primary-700",
            ].join(" ")}
          >
            <span className="text-4xl">{item.icon}</span>
            <span
              className={[
                isHover ? "inline" : "hidden",
                "animate-[ping_300ms_cubic-bezier(0,0,0.2,1)_reverse]",
              ].join(" ")}
            >
              {item.title}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
