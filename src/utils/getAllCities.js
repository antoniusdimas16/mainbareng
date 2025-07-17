import { prisma } from "@/lib/prisma";

export async function getAllCities() {
  const cities = await prisma.events.findMany({
    select: { city: true },
    distinct: ["city"],
  });

  const allCities = cities.map((e) => e.city).filter(Boolean);

  return allCities;
}
