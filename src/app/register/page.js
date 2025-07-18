import { Card, CardBody } from "@heroui/react";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/assets/tennis.jpg"
          alt="Sports facility"
          fill
          className="object-cover"
        />

        <div className="absolute top-14 left-14">
          <h2 className="text-4xl font-extrabold text-white">MainBareng</h2>
        </div>

        <div className="absolute top-36 left-14 max-w-md">
          <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
            <p className="text-black text-lg mb-2">
              &quot;Tempat paling pas untuk cari temen MainBareng!&quot;
            </p>
            <p className="text-sm text-gray-600">- David G</p>
          </div>
        </div>
      </div>
    </div>
  );
}
