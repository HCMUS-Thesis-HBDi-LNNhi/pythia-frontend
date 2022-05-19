import { Icon } from "@iconify/react";

export default function Loading(): JSX.Element {
  return (
    <div className="z-40 absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-20 grid place-items-center">
      <Icon icon="mdi:loading" className="animate-spin text-6xl" />
    </div>
  );
}
