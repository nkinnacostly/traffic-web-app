"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { H5, Span } from "@/components/ui/typography";
import { storage } from "@/utils/storage";
import { Logout, Notification } from "iconsax-react";
import { useRouter } from "next/navigation";
import React from "react";

function DashboardTopNav() {
  const router = useRouter();
  const logout = () => {
    storage.cookieStorage.remove("__session");
    storage.sessionStorage.remove("__session");
    storage.sessionStorage.remove("user");
    router.push("/login");
  };
  return (
    <div className="w-full h-[5.3rem]  flex items-center justify-between p-4 text-black">
      <H5>DashBoard</H5>
      <div className="flex items-center gap-2">
        <Notification size={24} className="text-primary" variant="Bold" />

        <Popover>
          <PopoverTrigger>
            <div className="h-8 w-8 rounded-full flex items-center justify-center border border-primary">
              P
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div
              className="flex items-center justify-start gap-2 hover:bg-herobackground/10 cursor-pointer p-2 rounded-lg"
              onClick={() => logout()}
            >
              <Logout size={24} className="text-primary" />
              <Span className="text-primary">Logout</Span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default DashboardTopNav;
