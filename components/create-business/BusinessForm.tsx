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
import FileUpload from "@/components/ui/file-upload";
import useToastAlert from "@/lib/hooks/use-toast-alert";
import completeSignup from "@/lib/services/api/vendors/complete-signup.api";
import type { CompleteSignupPayload } from "@/lib/services/api/vendors/complete-signup.api";

const businessFormSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    physicalStore: z.enum(["yes", "no"]),
    physicalStoreAddress: z.string().optional(),
    businessEmail: z.string().email("Invalid business email"),
    businessPhone: z.string().min(1, "Business phone is required"),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    description: z.string().min(1, "Business description is required"),
    businessHours: z.string().min(1, "Business hours are required"),
    businessCategory: z.string().min(1, "Business category is required"),
    storeLogo: z.string().url("Invalid logo URL").optional().or(z.literal("")),
    storeCoverPhoto: z
      .string()
      .url("Invalid cover photo URL")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (
        data.physicalStore === "yes" &&
        (!data.physicalStoreAddress || data.physicalStoreAddress.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Business address is required if you have a physical store",
      path: ["physicalStoreAddress"],
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
    setValue,
    formState: { errors },
  } = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      physicalStore: "no",
      physicalStoreAddress: "",
      website: "",
      storeLogo: "",
      storeCoverPhoto: "",
    },
  });

  const physicalStore = watch("physicalStore");

  const onSubmit = async (values: BusinessFormValues) => {
    setIsPending(true);
    try {
      const payload: CompleteSignupPayload = {
        businessName: values.businessName,
        physicalStore: values.physicalStore === "yes",
        physicalStoreAddress: values.physicalStoreAddress || "",
        businessEmail: values.businessEmail,
        businessPhone: values.businessPhone,
        website: values.website || "",
        description: values.description,
        businessHours: values.businessHours,
        businessCategory: values.businessCategory,
        storeLogo: values.storeLogo || "",
        storeCoverPhoto: values.storeCoverPhoto || "",
      };

      await completeSignup(payload);

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
            className={`border-black py-6 text-black ${errors.businessName ? "border-red-500" : ""}`}
            {...register("businessName")}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessName.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Business Email"
            type="email"
            placeholder="Enter business email"
            className={`border-black py-6 text-black ${errors.businessEmail ? "border-red-500" : ""}`}
            {...register("businessEmail")}
          />
          {errors.businessEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessEmail.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Business Phone"
            type="tel"
            placeholder="Enter business phone (e.g., +2348012345678)"
            className={`border-black py-6 text-black ${errors.businessPhone ? "border-red-500" : ""}`}
            {...register("businessPhone")}
          />
          {errors.businessPhone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessPhone.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Business Description"
            placeholder="Describe your business"
            className={`border-black py-6 text-black ${errors.description ? "border-red-500" : ""}`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Business Category"
            placeholder="e.g., Electronics, Gadgets, Accessories"
            className={`border-black py-6 text-black ${errors.businessCategory ? "border-red-500" : ""}`}
            {...register("businessCategory")}
          />
          {errors.businessCategory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessCategory.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Input
            label="Business Hours"
            placeholder="e.g., 09:00-21:00"
            className={`border-black py-6 text-black ${errors.businessHours ? "border-red-500" : ""}`}
            {...register("businessHours")}
          />
          {errors.businessHours && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessHours.message}
            </p>
          )}
        </div>

        <div className="my-6">
          <h2 className="text-black text-sm mb-3">
            Do you have a physical store?
          </h2>
          <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center">
              <Input
                type="radio"
                value="yes"
                className="shadow-none w-4 border-black"
                {...register("physicalStore")}
              />
              <h4 className="text-black">Yes</h4>
            </div>
            <div className="flex gap-3 items-center">
              <Input
                type="radio"
                value="no"
                className="shadow-none w-4 border-black"
                {...register("physicalStore")}
              />
              <h4 className="text-black">No</h4>
            </div>
          </div>
        </div>

        {physicalStore === "yes" && (
          <div className="mb-2">
            <Input
              label="Physical Store Address"
              placeholder="Enter store address"
              className={`border-black py-6 text-black ${errors.physicalStoreAddress ? "border-red-500" : ""}`}
              {...register("physicalStoreAddress")}
            />
            {errors.physicalStoreAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.physicalStoreAddress.message}
              </p>
            )}
          </div>
        )}

        <div className="mb-2">
          <Input
            label="Website (Optional)"
            type="url"
            placeholder="https://yourwebsite.com"
            className={`border-black py-6 text-black ${errors.website ? "border-red-500" : ""}`}
            {...register("website")}
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <FileUpload
            label="Store Logo (Optional)"
            value={watch("storeLogo")}
            onChange={(url) => setValue("storeLogo", url)}
            maxSizeMB={2}
          />
          {errors.storeLogo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storeLogo.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <FileUpload
            label="Store Cover Photo (Optional)"
            value={watch("storeCoverPhoto")}
            onChange={(url) => setValue("storeCoverPhoto", url)}
            maxSizeMB={5}
          />
          {errors.storeCoverPhoto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storeCoverPhoto.message}
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
