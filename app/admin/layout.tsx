import React from "react";
import AdminSideNav from "./components/side-bar";
import DashboardTopNav from "./components/NavBar";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex relative  w-full ">
      <div className="w-[252px] sticky h-screen overflow-hidden inset-y-0 bg-red-400 hidden md:block">
        <AdminSideNav />
      </div>
      <div className="w-full md:w-[calc(100%-252px)]  h-full ">
        <DashboardTopNav />
        <div className="w-full p-5 h-[calc(100%-84.8px)] ">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
