"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cancelJoinEvent(formData) {
  const userId = formData.get("userId");
  const eventId = formData.get("eventId");

  await prisma.participants.updateMany({
    where: {
      event_id: parseInt(eventId),
      user_id: parseInt(userId),
    },
    data: {
      status: "canceled",
    },
  });

  revalidatePath(`/event/${eventId}`);

  return { success: true, error: null };
}
