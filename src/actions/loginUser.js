"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function loginUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return {
      success: false,
      error: "Invalid password",
    };
  }

  const payload = {
    userId: user.id,
    email: user.email,
    first_name: user.first_name,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

  const cookieStore = await cookies();

  cookieStore.set("token", jwtToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { success: true, error: null };
}
