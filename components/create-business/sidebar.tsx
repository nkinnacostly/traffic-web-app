import { cn } from "@/lib/utils"; 
import logoImage from "@/public/image/traffik-logo-black.png"
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";

type SideBarProps = {
  currentPath: string;
  completedSteps: string[];
};

export const Sidebar = ({ currentPath, completedSteps }: SideBarProps) => {
  const steps = [
    { sublabel: "Please provide your business details", label: "Business details", path: "/create-business/step1" },
    { sublabel: "Must be at least 8 characters", label: "Create Password", path: "/create-business/step2" },
    { sublabel: "We will notify you by mail when your account is activated", label: "Approve account", path: "/create-business/step3" },
    { sublabel: "Please upload your product", label: "Upload products", path: "/create-business/step4" },
  ];

  return (
    <aside className="hidden w-1/3 bg-gray-100 p-8 md:flex flex-col text-left">
      <div className="mb-11 ml-5">
        <Image src={logoImage} height={100} width={200} alt="Logo Image" />
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.path);

          return (
            <div key={index}>
              <div className="p-5">
                <div className="step flex items-center gap-5 mb-2">
                  <div className={`w-6 h-6 rounded-full border ${isCompleted?'border-green-500' :''} flex items-center justify-center`}>
                    {isCompleted ? (
                     <IoMdCheckmark  className="text-green-500"/>
                    ) : (
                      <IoMdCheckmark className="text-gray-300"/>
                    )}
                  </div>
                  <h2 className={` ${isCompleted?'text-[#030803] font-semibold' :'text-gray-300'}  text-lg`}>{step.label}</h2>
                </div>
                <p className={`${isCompleted?'text-[#030803]' :'text-gray-300'} text-sm text-left ml-11`}>{step.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
