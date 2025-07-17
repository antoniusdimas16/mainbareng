"use client";

import { Select, SelectItem } from "@heroui/react";
import { sportTypeOptions } from "@/constants/sportTypeOptions";
import { useRouter, useSearchParams } from "next/navigation";

export default function SportTypeFilter({ selected }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (keySet) => {
    const key = Array.from(keySet)[0];
    const params = new URLSearchParams(searchParams.toString());

    if (key) {
      params.set("sport_type", key);
      params.set("page", "1");
    } else {
      params.delete("sport_type");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Select
        placeholder="Filter by sport type"
        defaultSelectedKey={selected || undefined}
        onSelectionChange={handleChange}
        isClearable
      >
        {sportTypeOptions.map((sport) => (
          <SelectItem key={sport.key}>{sport.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
