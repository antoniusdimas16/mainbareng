import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import DeleteEventButton from "@/components/DeleteEventButton";
import JoinEventButton from "@/components/JoinEventButton";

export default function EventDetail({ event, user, hasJoined }) {
  const creator = `${event.user.first_name} ${event.user.last_name}`;
  const banner = event.eventbanner[0];

  const formattedDate = new Date(event.date_time).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const locationName = event.location_name?.trim() || "TBA";
  const cityName = event.city || "";
  const mapQuery = encodeURIComponent(`${locationName}, ${cityName}`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const joinedParticipants =
    event.participants?.filter((p) => p.status === "joined") ?? [];
  const participantCount = joinedParticipants.length ?? 0;
  const max = event.max_participant;
  const hasMax = max > 0;
  const percent = hasMax
    ? Math.min(100, (participantCount / max) * 100)
    : participantCount > 0
    ? 100
    : 0;

  const barColor = !hasMax
    ? "bg-green-500"
    : percent >= 90
    ? "bg-red-500"
    : percent >= 60
    ? "bg-yellow-400"
    : "bg-green-500";

  const isFull = hasMax && participantCount >= max;

  return (
    <Card shadow="lg" className="overflow-hidden">
      {banner ? (
        <Image
          src={banner.path}
          alt={event.title}
          width={1200}
          height={600}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-semibold">
          MainBareng
        </div>
      )}

      <CardHeader className="px-6 pt-4 pb-2 space-y-1">
        <div>
          {event.sport_type && (
            <div className="inline-block my-1 px-3 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-r-full">
              {event.sport_type}
            </div>
          )}
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-sm text-gray-500">Dibuat oleh {creator}</p>

          {user?.id === event.user_id && (
            <div className="flex space-x-1.5">
              <Link href={`/event/${event.id}/edit`}>
                <Button size="sm" variant="light" color="warning">
                  Edit
                </Button>
              </Link>
              <DeleteEventButton eventId={event.id} />
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody className="px-6 pb-6 space-y-4">
        {event.description && (
          <p className="text-sm text-gray-700">{event.description}</p>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Tanggal:</span>
            <br /> {formattedDate}
          </div>
          <div>
            <span className="font-semibold">Lokasi:</span>
            <div className="flex items-center gap-1">
              {`${locationName}, ${cityName}`}
              <Link
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <p>🗺️</p>
              </Link>
            </div>
          </div>
          <div>
            <span className="font-semibold">Total Biaya:</span>
            <br />
            Rp {(event.price ?? 0).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Jumlah Peserta:</span>
            <div className="flex items-center gap-2">
              <span className="w-6 text-center">{participantCount}</span>
              <div className="flex-1 bg-gray-100 rounded h-2 relative">
                <div
                  className={`h-2 rounded ${barColor}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-6 text-center">
                {event.max_participant ?? "∞"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Link href="/event">
            <Button color="primary" variant="light">
              ← Back
            </Button>
          </Link>

          <JoinEventButton
            eventId={event.id}
            userId={user.id}
            hasJoined={hasJoined}
            isFull={isFull}
          />
        </div>
      </CardBody>
    </Card>
  );
}
