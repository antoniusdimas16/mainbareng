"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const existing = await prisma.users.findUnique({ where: { email } });

  if (existing) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      first_name,
      last_name,
    },
  });

  return { success: true, error: null };
}
