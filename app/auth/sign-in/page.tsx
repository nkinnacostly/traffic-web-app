"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormContainer from "@/components/layout/auth-layout";
import FormFooter from "@/components/auth-ui/form-footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import login from "@/lib/services/api/auth/login.api";
import type { LoginPayload } from "@/lib/services/api/auth/login.api";
import { useAuth } from "@/lib/context/providers/auth-provider";
import useToastAlert from "@/lib/hooks/use-toast-alert";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const SignIn: React.FC = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { handleSuccessToast, handleErrorToast } = useToastAlert();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsPending(true);
    try {
      const response = await login(values as LoginPayload);

      if (response.data.token) {
        const { token, ...userData } = response.data;
        authLogin(token, userData);
        handleSuccessToast({ description: "Login successful!" });
      }
    } catch (error: any) {
      handleErrorToast({
        description: error.message || "Failed to login. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormContainer pageHeading="Welcome Back">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-9 md:pb-0 md:pt-0"
      >
        <div className="mb-3">
          <Input
            label="Email"
            type="email"
            className={`py-6 border-[#9F9F9F] ${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter Your Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Password"
            type="password"
            className={`py-6 border-[#9F9F9F] ${errors.password ? "border-red-500" : ""}`}
            placeholder="Enter your Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end text-sm mb-2">
          <Link href="#" className="text-sm text-[#484848]">
            Forgot password?
          </Link>
        </div>

        <Button
          className="font-semibold text-white w-full"
          variant={"signIn"}
          size={"lg"}
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>

        <FormFooter
          message1="Don't have an account?"
          message2="Create an account"
          authUrl="/auth/sign-up"
        />
      </form>
    </FormContainer>
  );
};

export default SignIn;
