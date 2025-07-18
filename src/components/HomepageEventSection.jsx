import { prisma } from "@/lib/prisma";
import HomepageEventCard from "@/components/HomepageEventCard";
import Link from "next/link";
import { Button } from "@heroui/react";

export default async function FeaturedEventSection() {
  const events = await prisma.events.findMany({
    skip: 2,
    include: { eventbanner: true },
    orderBy: { date_time: "asc" },
    take: 4,
  });

  if (!events || events.length === 0) return null;

  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Yuk, Intip Keseruan MainBareng!
          </h2>
          <p className="text-lg text-gray-700">
            Dari futsal santai sampai badminton seru! Cari event yang cocok,
            ajak teman, dan langsung gas!
          </p>
          <p className="text-md text-gray-600">
            Gak perlu jago, langsung berangkat. Daftar sekarang dan rasakan
            serunya main bareng komunitas!
          </p>
          <Link href="/register">
            <Button color="primary" className="w-full sm:w-auto">
              Gabung Sekarang
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <HomepageEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
