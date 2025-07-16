"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/loginUser";
import { Card, Input, Button } from "@heroui/react";
import { showSuccessToast, showErrorToast } from "@/utils/showToast";

export default function LoginForm() {
  const router = useRouter();
  const initialState = { success: false, error: null };

  async function handleLogin(_, formData) {
    try {
      await loginUser(formData);
      showSuccessToast("Login success!");
      router.push("/event");
      return { success: true, error: null };
    } catch (err) {
      showErrorToast(err.message || "Failed. Please Try Again.");
      return { success: false, error: err.message };
    }
  }

  const [state, formAction, pending] = useActionState(
    handleLogin,
    initialState
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <form action={formAction}>
        <fieldset disabled={pending} className="space-y-4 p-4">
          <Input
            isRequired
            errorMessage="Please enter your email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            isRequired
            errorMessage="Please enter your password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <Button
            type="submit"
            color="primary"
            isLoading={pending}
            className="w-full"
          >
            Login
          </Button>

          {state.error && (
            <p className="text-sm text-red-600 text-center">{state.error}</p>
          )}
        </fieldset>
      </form>
    </Card>
  );
}
