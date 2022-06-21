type ToastType = "success" | "failure" | "general";

export default function toast(message: string, type: ToastType = "general") {
  const toast = document.createElement("div");
  toast.className = [
    "z-50 fixed top-4 right-10 p-4",
    "rounded-md text-center font-medium",
    "border-l-2 bg-white-100",
    type === "success" && "border-green-400 text-green-500",
    type === "failure" && "border-red-400 text-red-500",
    type === "general" && "border-primary-400 text-primary-500",
  ].join(" ");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
}
