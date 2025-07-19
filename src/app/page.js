import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HomepageEventSection from "@/components/HomepageEventSection";

export default function HomePage() {
  return (
    <main>
      <section className="relative h-screen w-full">
        <Image
          src="/assets/banner.jpg"
          fill
          alt="MainBareng banner"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.75]"
          priority
        />
        <Navbar />

        <div className="absolute inset-0 flex flex-col items-center md:items-end justify-end bg-rose-300/10 text-white px-4 md:px-12 pb-20 md:pb-24 text-center md:text-right">
          <p className="text-xl md:text-2xl mb-2 max-w-xs md:max-w-md">
            Dari Aplikasi ke Lapangan, Yuk
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">MainBareng!</h1>
          <Link href="/register">
            <Button
              size="md"
              color="primary"
              className="w-full max-w-[200px] md:w-auto"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </section>
      <HomepageEventSection />
    </main>
  );
}
