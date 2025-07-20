"use server";

import { prisma } from "@/lib/prisma";
import { getActiveUser } from "@/utils/getActiveUser";
import { revalidatePath } from "next/cache";
import { s3client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { parseZonedDateTime } from "@internationalized/date";

export async function createEvent(formData) {
  const user = await getActiveUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const sport_type = formData.get("sport_type");
  const date = formData.get("date");
  const time = formData.get("time");
  const max_participant = formData.get("max_participant");
  const location_name = formData.get("location_name");
  const city = formData.get("city");
  const price = formData.get("price");
  const is_private = formData.get("is_private");
  const image = formData.get("image");
  const timeZone = formData.get("timezone");

  if (!title || !sport_type || !city) {
    return {
      success: false,
      error: "Email, Sport Type, and City are required",
    };
  }

  const date_time = new Date(`${date} ${time}`);
  if (isNaN(date_time.getTime())) {
    return { success: false, error: "Invalid date or time format" };
  }

  if (max_participant && parseInt(max_participant) < 0) {
    return {
      success: false,
      error: "Max participant can not be less than 0.",
    };
  }

  if (price && parseInt(price) < 0) {
    return { success: false, error: "Price can not be less than 0" };
  }

  const shortTime = time.slice(0, 5);
  const dateString = `${date}T${shortTime}[${timeZone}]`;
  const utcDateTime = parseZonedDateTime(dateString);

  let bannerPath = null;
  let bannerName = null;
  let bannerSize = null;

  if (
    image &&
    typeof image.arrayBuffer === "function" &&
    image.size > 0 &&
    image.name
  ) {
    const allowedImageTypes = ["image/png", "image/jpeg"];
    const allowedImageSizes = 10 * 1024 * 1024;

    if (!allowedImageTypes.includes(image.type)) {
      return {
        success: false,
        error: "File type not supported. Upload only PNG and JPEG files.",
      };
    }

    if (image.size > allowedImageSizes) {
      return {
        success: false,
        error: "Image too large. Max file size is 10MB.",
      };
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const extension = image.name.split(".").pop();
    const key = `event-${timestamp}.${extension}`;

    try {
      await s3client.send(
        new PutObjectCommand({
          Bucket: "mainbareng",
          Key: key,
          Body: buffer,
          ContentType: image.type,
        })
      );

      bannerPath = `https://pub-030c44170f76454a961c419019a7b038.r2.dev/mainbareng/${key}`;
      bannerName = key;
      bannerSize = image.size;
    } catch (err) {
      return {
        success: false,
        error: `Image upload failed: (${err.message})`,
      };
    }
  }

  const event = await prisma.events.create({
    data: {
      title,
      description,
      sport_type,
      date_time: utcDateTime.toAbsoluteString(),
      max_participant: max_participant ? parseInt(max_participant) : null,
      location_name,
      city,
      price: price ? parseInt(price) : null,
      is_private: is_private === "true" || is_private === "on",
      user_id: user.id,
    },
  });

  if (bannerPath) {
    await prisma.eventBanners.create({
      data: {
        event_id: event.id,
        name: bannerName,
        size: bannerSize,
        path: bannerPath,
      },
    });
  }

  revalidatePath("/event");

  return { success: true, error: null };
}
