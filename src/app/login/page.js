import { Card, CardBody } from "@heroui/react";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import SocialLogin from "../auth/page";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
          <SocialLogin />
        </div>
      </div>

      {/* Right Section - Image and Testimonial */}
      <div className="hidden lg:flex lg:w-1/2 relative ">
        <Image
          src="/assets/running.jpg" // Replace this with your image URL
          alt="Community Image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Header Title */}
        <div className="absolute top-14 right-14">
          <h2 className="text-4xl font-extrabold text-white">MainBareng</h2>
        </div>

        {/* Testimonial Section */}
        <div className="absolute bottom-10 left-14 max-w-md">
          <div className=" p-4 rounded-lg shadow-xl">
            <p className="text-white text-lg mb-2">
              &quot;Aplikasi MainBareng telah mengubah pandanganku tentang
              olahraga! Aku bisa mendapatkan banyak rekan dan komunitas yang
              menyenangkan disini!&quot;
            </p>
            <p className="text-sm text-gray-100">- Grace Hillary</p>
          </div>
        </div>
      </div>
    </div>
  );
}
