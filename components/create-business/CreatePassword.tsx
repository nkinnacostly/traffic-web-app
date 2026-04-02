"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logoVector from "@/public/image/login-vector.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useToastAlert from "@/lib/hooks/use-toast-alert";

const createPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type CreatePasswordFormValues = z.infer<typeof createPasswordSchema>;

export default function CreatePassword() {
  const router = useRouter();
  const { handleSuccessToast, handleErrorToast } = useToastAlert();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(createPasswordSchema),
  });

  const onSubmit = async (values: CreatePasswordFormValues) => {
    setIsPending(true);
    try {
      // TODO: Call API to create password
      console.log("Password data:", values);

      handleSuccessToast({ description: "Password created successfully!" });

      // Navigate to next step
      setTimeout(() => {
        router.push("/create-business/step3");
      }, 1000);
    } catch (error: any) {
      handleErrorToast({
        description:
          error.message || "Failed to create password. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full h-full m-0 p-0 md:px-32">
      <div className="flex gap-4 justify-start mb-12 items-center">
        <h2 className="text-black text-3xl">Create Password</h2>
        <Image
          src={logoVector}
          width={50}
          height={30}
          alt="logo vector"
          className="w-10"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6">
          <div className="mb-4">
            <Input
              label="Enter Password"
              placeholder="Enter Password (min 8 characters)"
              type="password"
              className={`border-black py-6 ${errors.password ? "border-red-500" : ""}`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <Input
              label="Repeat Password"
              placeholder="Repeat Password"
              type="password"
              className={`border-black py-6 ${errors.confirmPassword ? "border-red-500" : ""}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            variant={"signIn"}
            className="w-full"
            size={"lg"}
            disabled={isPending}
          >
            <span className="text-lg text-black">
              {isPending ? "Creating password..." : "Submit"}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
