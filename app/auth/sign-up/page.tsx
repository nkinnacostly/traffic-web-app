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
import registerApi from "@/lib/services/api/auth/register.api";
import type { RegisterPayload } from "@/lib/services/api/auth/register.api";
import useToastAlert from "@/lib/hooks/use-toast-alert";

const registerSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const SignUp: React.FC = () => {
  const router = useRouter();
  const { handleSuccessToast, handleErrorToast } = useToastAlert();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsPending(true);
    try {
      const payload: RegisterPayload = {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      };

      const response = await registerApi(payload);

      handleSuccessToast({
        description:
          "Registration successful! Please check your email to verify your account.",
      });

      // Redirect to verify email page
      setTimeout(() => {
        router.push("/auth/verify-email");
      }, 1500);
    } catch (error: any) {
      handleErrorToast({
        description: error.message || "Failed to register. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormContainer pageHeading="Create Account">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-9 md:pb-0 md:pt-0"
      >
        <div className="mb-2">
          <Input
            label="Fullname"
            type="text"
            className={`py-6 border-[#9F9F9F] ${errors.fullname ? "border-red-500" : ""}`}
            placeholder="Enter Your Full Name"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Email"
            type="email"
            className={`py-6 border-[#9F9F9F] ${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter your email"
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
            placeholder="Create a password (min 8 characters)"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Input
            label="Confirm Password"
            type="password"
            className={`py-6 border-[#9F9F9F] ${errors.confirmPassword ? "border-red-500" : ""}`}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          className="font-semibold text-white w-full"
          variant={"signIn"}
          size={"lg"}
          disabled={isPending}
        >
          {isPending ? "Creating account..." : "Create Account"}
        </Button>

        <FormFooter
          message1="Already have an account?"
          message2="Sign in"
          authUrl="/auth/sign-in"
        />
      </form>
    </FormContainer>
  );
};

export default SignUp;
