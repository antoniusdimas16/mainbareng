"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();

  const isPublicPage = ["/", "/login", "/register"].includes(pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <Link href="/" className="text-xl font-bold text-blue-600">
        MainBareng
      </Link>

      {isPublicPage ? (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-blue-600 transition font-medium"
          >
            Log In
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              color="primary"
              className="text-sm font-medium px-4 py-1 rounded-full shadow-none"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <LogoutButton />
      )}
    </nav>
  );
}
