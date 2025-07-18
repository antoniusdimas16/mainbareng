"use client";

import { Card, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomepageEventCard({ event }) {
  const banner = event.eventbanner?.[0];
  const [imageError, setImageError] = useState(false);

  const date = new Date(event.date_time).toLocaleString("id-ID", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="relative block w-[280px] max-w-xs h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
      {banner && !imageError ? (
        <Image
          src={banner.path}
          alt={event.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
          MainBareng
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 z-20 w-full px-5 pb-5 text-white text-left space-y-1 drop-shadow-md">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-sm">{date}</p>
          <p className="text-sm">
            {event.location_name ?? "Lokasi TBA"}, {event.city}
          </p>
        </div>

        <Link href="/register" className="block mt-3">
          <Button size="sm" color="primary" className="w-full">
            Register
          </Button>
        </Link>
      </div>
    </Card>
  );
}
