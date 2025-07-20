"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseZonedDateTime } from "@internationalized/date";

export async function updateEvent(formData) {
  const eventId = formData.get("eventId");
  const title = formData.get("title");
  const description = formData.get("description") || "";
  const date = formData.get("date");
  const time = formData.get("time");
  const location_name = formData.get("location_name") || "";
  const city = formData.get("city");
  const max_participant = parseInt(formData.get("max_participant")) || null;
  const price = parseInt(formData.get("price")) || null;
  const sport_type = formData.get("sport_type");
  const is_private = formData.get("is_private");
  const timeZone = formData.get("timezone");

  if (!title || !sport_type || !city) {
    return {
      success: false,
      error: "Email, Sport Type, and City are required",
    };
  }

  const date_time = new Date(`${date} ${time}`);
  if (isNaN(date_time.getTime())) {
    return {
      success: false,
      error: "Invalid date or time format",
    };
  }

  if (max_participant && parseInt(max_participant) < 0) {
    return {
      success: false,
      error: "Max participant can not be less than 0.",
    };
  }

  if (price && parseInt(price) < 0) {
    return {
      success: false,
      error: "Price can not be less than 0",
    };
  }

  const shortTime = time.slice(0, 5);
  const dateString = `${date}T${shortTime}[${timeZone}]`;
  const utcDateTime = parseZonedDateTime(dateString);

  await prisma.events.update({
    where: { id: parseInt(eventId) },
    data: {
      title,
      description,
      date_time: utcDateTime.toAbsoluteString(),
      location_name,
      city,
      max_participant,
      price,
      sport_type,
      is_private,
    },
  });

  revalidatePath(`/event/${eventId}`);

  return { success: true, error: null };
}
