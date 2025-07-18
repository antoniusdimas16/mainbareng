import { prisma } from "@/lib/prisma";
import EventCard from "@/components/EventCard";
import CreateEventButton from "@/components/CreateEventButton";
import Pagination from "@/components/Pagination";
import SportTypeFilter from "@/components/sportTypeFilter";
import CityFilter from "@/components/CityFilter";
import CreatedByMeFilter from "@/components/CreatedByMeFilter";
import { getActiveUser } from "@/utils/getActiveUser";
import { getAllCities } from "@/utils/getAllCities";

export default async function EventPage({ searchParams }) {
  const param = await searchParams;
  const user = await getActiveUser();
  const cityOptions = await getAllCities();

  const page = parseInt(param?.page || "1");
  const limit = 9;
  const offset = (page - 1) * limit;

  const sportType = param?.sport_type || null;
  const city = param?.city || null;
  const mine = param?.mine === "true";

  const filterBy = {};
  if (sportType) filterBy.sport_type = sportType;
  if (city) filterBy.city = city;
  if (mine && user) filterBy.user_id = user.id;

  const events = await prisma.events.findMany({
    where: filterBy,
    skip: offset,
    take: limit,
    include: {
      eventbanner: true,
      participants: true,
    },
    orderBy: { date_time: "asc" },
  });

  const total = await prisma.events.count({
    where: filterBy,
  });

  const query = {};

  if (sportType) query.sport_type = sportType;
  if (city) query.city = city;
  if (mine) query.mine = "true";

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6 mt-14">
      <h1 className="text-2xl font-bold">Browse Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="w-full">
          <CreatedByMeFilter active={mine} />
        </div>
        <div className="w-full">
          <SportTypeFilter selected={sportType} />
        </div>
        <div className="w-full">
          <CityFilter selected={city} options={cityOptions} />
        </div>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">Belum ada event. Yuk bikin!</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            total={total}
            limit={limit}
            query={query}
          />
        </div>
      )}
      <CreateEventButton />
    </section>
  );
}
