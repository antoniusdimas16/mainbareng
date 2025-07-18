"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/loginUser";
import { Input, Button } from "@heroui/react";
import { showSuccessToast, showErrorToast } from "@/utils/showToast";

export default function LoginForm() {
  const router = useRouter();

  const initialState = { success: false, error: null };

  async function handleLogin(_, formData) {
    try {
      await loginUser(formData);

      showSuccessToast("Login successful! Welcome back!");
      router.push("/event");

      return { success: true, error: null };
    } catch (err) {
      showErrorToast(err.message || "Login failed. Please try again.");
      return { success: false, error: err.message };
    }
  }

  const [state, formAction, pending] = useActionState(
    handleLogin,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Champion! 🏆</h1>
        <p className="text-gray-600 text-sm mb-6">
          Masuk untuk dapat mengakses berbagai aktivitas olahraga dan tetap
          update terhadap kegiatan lain seperti MainBareng dan turnamen bersama.
        </p>
      </div>

      <fieldset disabled={pending} className="space-y-4">
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

        <Button
          type="submit"
          color="primary"
          isLoading={pending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          size="lg"
        >
          Log In
        </Button>

        {state.error && (
          <p className="text-sm text-red-600 text-center">{state.error}</p>
        )}
      </fieldset>

      <div className="text-center space-y-4">
        <p className="text-gray-500">or</p>
        <Button
          type="button"
          className="w-full bg-gray-50 text-gray-900 font-medium border border-gray-300 hover:bg-gray-200"
        >
          <img src="/assets/google.png" alt="Google Logo" className="w-4 h-4" />
          Continue with Google
        </Button>
        <p className="text-sm text-gray-600">
          Not a member yet?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Join the Club
          </a>
        </p>
      </div>
    </form>
  );
}
