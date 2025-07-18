"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <section className="relative h-screen w-full">
      <Image
        src="/assets/banner.jpg"
        fill
        alt="MainBareng banner"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.75]"
        priority
      />
      <Navbar />

      <div className="absolute inset-0 flex flex-col items-end justify-end bg-rose-300/10 text-white px-12 pb-24 text-right">
        <p className="text-2xl mb-2 max-w-md">Dari Aplikasi ke Lapangan, Yuk</p>
        <h1 className="text-7xl font-bold mb-6 ">MainBareng!</h1>
        <Link href="/register">
          <Button color="primary">Join Now</Button>
        </Link>
      </div>
    </section>
  );
}
