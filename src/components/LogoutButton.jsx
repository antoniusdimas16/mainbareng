"use client";

import { logoutUser } from "@/actions/logoutUser";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function LogoutButton() {
  const router = useRouter();
  const initialState = { success: false };

  async function handleLogout(_, formData) {
    await logoutUser();
    router.push("/");
    return { success: true };
  }

  const [_, formAction] = useActionState(handleLogout, initialState);

  return (
    <form action={formAction}>
      <Button type="submit" size="sm" color="danger">
        Log out
      </Button>
    </form>
  );
}
