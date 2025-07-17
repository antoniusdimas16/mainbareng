"use client";

import { Select, SelectItem } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CityFilter({ selected, options }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (keySet) => {
    const key = Array.from(keySet)[0];
    const params = new URLSearchParams(searchParams.toString());

    if (key) {
      params.set("city", key);
      params.set("page", "1");
    } else {
      params.delete("city");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Select
        placeholder="Filter by city"
        aria-label="Filter by city"
        defaultSelectedKey={selected || undefined}
        onSelectionChange={handleChange}
        isClearable
      >
        {options.map((city) => (
          <SelectItem key={city}>{city}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
