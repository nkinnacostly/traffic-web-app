"use client"
import { Sidebar } from "@/components/create-business/sidebar";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

interface CreateBusinessLayoutProps {
  children: ReactNode; 
}

const CreateBusinessLayout: React.FC<CreateBusinessLayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current path
  const [completedSteps, setCompletedSteps] = useState<string[]>([]); // State to track completed steps

  useEffect(() => {
    // Update completedSteps when the path changes
    if (pathname === "/create-business/step1") {
      setCompletedSteps([]); // Starting at step 1, no steps are completed yet
    } else if (pathname === "/create-business/step2") {
      setCompletedSteps(["/create-business/step1"]); // Step 1 completed
    } else if (pathname === "/create-business/step3") {
      setCompletedSteps(["/create-business/step1", "/create-business/step2"]); // Step 1 and 2 completed
    } else if (pathname === "/create-business/step4") {
      setCompletedSteps(["/create-business/step1", "/create-business/step2", "/create-business/step3"]); // Steps 1, 2, and 3 completed
    }
  }, [pathname]);

  return (
    <div className="flex-none md:flex md:h-screen">
      <Sidebar currentPath={pathname} completedSteps={completedSteps} /> {/* Pass current path and completed steps */}
      <div className="w-full md:w-2/3 p-8">
        {children}
      </div>
    </div>
  );
};

export default CreateBusinessLayout;
