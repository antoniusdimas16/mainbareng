// actions/deleteEvent.js
"use server";

import { prisma } from "@/lib/prisma";

export async function deleteEvent(formData) {
  const eventId = parseInt(formData.get("eventId"), 10);

  if (isNaN(eventId)) {
    return {
      success: false,
      error: "Invalid event ID.",
    };
  }

  try {
    await prisma.$transaction([
      prisma.eventBanners.deleteMany({
        where: { event_id: eventId },
      }),
      prisma.participants.deleteMany({
        where: { event_id: eventId },
      }),
      prisma.events.delete({
        where: { id: eventId },
      }),
    ]);
  } catch (err) {
    return {
      success: false,
      error: "Failed to delete event and related data.",
    };
  }

  return { success: true, error: null };
}
