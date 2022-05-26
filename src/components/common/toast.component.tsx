type ToastType = "success" | "failure" | "general";

export default function toast(message: string, type: ToastType = "general") {
  const toast = document.createElement("div");
  toast.className = [
    "z-50 fixed top-4 left-1/2 min-w-[500px] -ml-[calc(250px-80px)] p-4",
    "rounded-md text-center font-medium",
    type === "success" && "bg-green-200 text-green-700",
    type === "failure" && "bg-red-200 text-red-700",
    type === "general" && "bg-primary-200 text-primary-700",
  ].join(" ");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
}
