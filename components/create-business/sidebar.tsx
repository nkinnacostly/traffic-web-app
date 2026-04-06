import { cn } from "@/lib/utils";
import logoImage from "@/public/image/traffik-logo-black.png";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";

type SideBarProps = {
  currentPath: string;
  completedSteps: string[];
};

export const Sidebar = ({ currentPath, completedSteps }: SideBarProps) => {
  const steps = [
    {
      sublabel: "Please provide your business details",
      label: "Business details",
      path: "/create-business/step1",
    },
    {
      sublabel: "Must be at least 8 characters",
      label: "Create Password",
      path: "/create-business/step2",
    },
    {
      sublabel: "We will notify you by mail when your account is activated",
      label: "Approve account",
      path: "/create-business/step3",
    },
    {
      sublabel: "Please upload your product",
      label: "Upload products",
      path: "/create-business/step4",
    },
  ];

  return (
    <aside className="hidden w-1/3 bg-gray-100 p-8 md:flex flex-col text-left overflow-y-auto">
      <div className="mb-11 ml-5">
        <Image src={logoImage} height={100} width={200} alt="Logo Image" />
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.path);
          const isCurrent = currentPath === step.path;

          return (
            <div key={index}>
              <div className="p-5">
                <div className="step flex items-center gap-5 mb-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isCompleted
                        ? "border-green-500 bg-green-500"
                        : isCurrent
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <IoMdCheckmark className="text-white" />
                    ) : isCurrent ? (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    ) : (
                      <IoMdCheckmark className="text-gray-400" />
                    )}
                  </div>
                  <h2
                    className={`text-lg ${
                      isCompleted
                        ? "text-gray-900 font-semibold"
                        : isCurrent
                          ? "text-gray-900 font-bold"
                          : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </h2>
                </div>
                <p
                  className={`text-sm text-left ml-11 ${
                    isCompleted
                      ? "text-gray-700"
                      : isCurrent
                        ? "text-gray-700"
                        : "text-gray-400"
                  }`}
                >
                  {step.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
