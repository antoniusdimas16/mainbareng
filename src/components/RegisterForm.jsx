"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/registerUser";
import { Input, Button } from "@heroui/react";

export default function RegisterForm() {
  const router = useRouter();
  const initialState = { success: false, error: null };

  async function handleRegister(_, formData) {
    try {
      await registerUser(formData);
      router.push("/login");
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  const [state, formAction] = useActionState(handleRegister, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gabung MainBareng! 🏓</h1>
        <p className="text-gray-600 text-sm mb-6">
          Jadi bagian dari komunitas yang eksklusif. Nikmati pengalaman bermain
          bersama dengan ragam aktivitas menyenangkan!
        </p>
      </div>

      <div className="space-y-4">
        <Input
          isRequired
          label="Email"
          name="email"
          placeholder="your.email@example.com"
          type="email"
          variant="bordered"
          classNames={{
            label: "text-gray-700",
            input: "text-gray-900",
          }}
        />

        <Input
          isRequired
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          classNames={{
            label: "text-gray-700",
            input: "text-gray-900",
          }}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="first_name"
            placeholder="Enter your first name"
            type="text"
            variant="bordered"
            classNames={{
              label: "text-gray-700",
              input: "text-gray-900",
            }}
          />

          <Input
            label="Last Name"
            name="last_name"
            placeholder="Enter your last name"
            type="text"
            variant="bordered"
            classNames={{
              label: "text-gray-700",
              input: "text-gray-900",
            }}
          />
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          size="lg"
        >
          Sign Up
        </Button>

        {state.error && (
          <p className="text-sm text-red-600 text-center">{state.error}</p>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </form>
  );
}
