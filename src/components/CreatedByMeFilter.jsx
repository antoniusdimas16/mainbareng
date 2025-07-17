"use client";

import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreatedByMeFilter({ active }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleMine = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (active) {
      params.delete("mine");
    } else {
      params.set("mine", "true");
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Button
      onPress={toggleMine}
      variant={active ? "solid" : "ghost"}
      color={active ? "primary" : "default"}
      aria-label="Toggle Created by Me filter"
      className={`w-full border-0 rounded-md transition ${
        active
          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      Created by Me
    </Button>
  );
}
