import LoginForm from "@/components/LoginForm";
import { Card } from "@heroui/react";
import SocialLogin from "../auth/page";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <Card className="max-w-md mx-auto mt-24 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Log In</h1>
      <LoginForm />
      <SocialLogin />
    </Card>
  );
}
