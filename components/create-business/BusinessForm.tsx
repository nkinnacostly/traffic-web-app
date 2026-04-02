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

const businessFormSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    hasPhysicalLocation: z.enum(["yes", "no"]),
    businessAddress: z.string().optional(),
    cacNumber: z.string().min(1, "CAC number is required"),
  })
  .refine(
    (data) => {
      if (
        data.hasPhysicalLocation === "yes" &&
        (!data.businessAddress || data.businessAddress.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Business address is required if you have a physical location",
      path: ["businessAddress"],
    },
  );

type BusinessFormValues = z.infer<typeof businessFormSchema>;

export default function BusinessForm() {
  const router = useRouter();
  const { handleSuccessToast, handleErrorToast } = useToastAlert();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      hasPhysicalLocation: "no",
    },
  });

  const hasPhysicalLocation = watch("hasPhysicalLocation");

  const onSubmit = async (values: BusinessFormValues) => {
    setIsPending(true);
    try {
      // TODO: Call API to create business
      console.log("Business form data:", values);

      handleSuccessToast({
        description: "Business details saved successfully!",
      });

      // Navigate to next step
      setTimeout(() => {
        router.push("/create-business/step2");
      }, 1000);
    } catch (error: any) {
      handleErrorToast({
        description:
          error.message || "Failed to save business details. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full h-full m-0 p-0 md:px-32">
      <div className="flex gap-4 justify-start mb-12 items-center">
        <h2 className="text-black text-3xl">Create Business</h2>
        <Image
          src={logoVector}
          width={50}
          height={30}
          alt="logo vector"
          className="w-10"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <Input
            label="Business Name"
            placeholder="Enter Business name"
            className={`border-black py-6 ${errors.businessName ? "border-red-500" : ""}`}
            {...register("businessName")}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessName.message}
            </p>
          )}
        </div>

        <div className="my-6">
          <h2 className="text-black text-sm mb-3">
            Do you have a physical business location?
          </h2>
          <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center">
              <Input
                type="radio"
                value="yes"
                className="shadow-none w-4 border-black"
                {...register("hasPhysicalLocation")}
              />
              <h4 className="text-black">Yes</h4>
            </div>
            <div className="flex gap-3 items-center">
              <Input
                type="radio"
                value="no"
                className="shadow-none w-4 border-black"
                {...register("hasPhysicalLocation")}
              />
              <h4 className="text-black">No</h4>
            </div>
          </div>
        </div>

        {hasPhysicalLocation === "yes" && (
          <div className="mb-6">
            <Input
              label="If Yes, business Address"
              placeholder="Enter business address"
              className={`border-black py-6 ${errors.businessAddress ? "border-red-500" : ""}`}
              {...register("businessAddress")}
            />
            {errors.businessAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.businessAddress.message}
              </p>
            )}
          </div>
        )}

        <div className="mb-6">
          <Input
            label="CAC Number"
            placeholder="Enter cac number"
            className={`border-black py-6 ${errors.cacNumber ? "border-red-500" : ""}`}
            {...register("cacNumber")}
          />
          {errors.cacNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cacNumber.message}
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
            {isPending ? "Saving..." : "Submit"}
          </span>
        </Button>
      </form>
    </div>
  );
}
