"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ email: string }>();

  async function onSubmit(values: { email: string }) {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast.success("Password reset link sent to your email.");
    } catch (e) {
      toast.error("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-border sm:my-3 lg:my-6 lg:min-w-[400px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <h2 className="text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded border"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}
