import { prisma } from "@/lib/prisma";
import { Card } from "@heroui/react";
import { getActiveUser } from "@/utils/getActiveUser";
import { hasJoinedEvent } from "@/utils/hasJoinedEvent";
import EventDetail from "@/components/EventDetail";

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = await prisma.events.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: true,
      eventbanner: true,
      participants: true,
    },
  });

  if (!event)
    return (
      <main className="max-w-3xl mx-auto py-10 px-4 mt-10">
        <Card
          shadow="lg"
          className="h-[200px] flex items-center justify-center space-y-3"
        >
          <div className="w-full flex items-center justify-center text-gray-500 text-xl font-semibold">
            MainBareng
          </div>
          <div className="w-full flex items-center justify-center text-gray-500 text-large font-semibold">
            Event Tidak Ditemukan
          </div>
        </Card>
      </main>
    );

  const user = await getActiveUser();
  const hasJoined = user ? await hasJoinedEvent(event.id, user.id) : false;

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 mt-10 space-y-4">
      <EventDetail event={event} user={user} hasJoined={hasJoined} />
    </main>
  );
}
