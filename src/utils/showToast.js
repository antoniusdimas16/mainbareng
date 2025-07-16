import { addToast, cn } from "@heroui/react";

export function showSuccessToast(message) {
  addToast({
    title: "Success",
    description: message,
    classNames: {
      base: cn([
        "bg-green-100 text-green-900",
        "rounded-md px-4 py-2",
        "border border-green-200",
        "shadow-sm",
      ]),
      title: "font-medium text-green-800",
      description: "text-sm text-green-700",
      closeButton: "hover:bg-green-200 p-1 rounded-md",
    },
  });
}

export function showErrorToast(message) {
  addToast({
    title: "Error",
    description: message,
    classNames: {
      base: cn([
        "bg-red-100 text-red-900",
        "rounded-md px-4 py-2",
        "border border-red-200",
        "shadow-sm",
      ]),
      title: "font-medium text-red-800",
      description: "text-sm text-red-700",
      closeButton: "hover:bg-red-200 p-1 rounded-md",
    },
  });
}
