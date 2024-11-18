import React from "react";
import StaticCard from "@/components/StaticCard";;
import RecentCustomerTable from "@/components/RecentCustomerTable";
import ProductCard from "@/components/ProductCard";
import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { productDemoData, staticCardData } from "@/data/dashboardData";
import HolidayCard from "@/components/holidayCard";

function Dashboard() {
  return (
    <div className="space-y-5 bg-white">
      <h3>Dashboard</h3>
      <div className="flex flex-col md:flex-row gap-5">
        {staticCardData.map((group, groupIndex) => (
          <div key={groupIndex} className="flex gap-3 bg-[#f9f9f9] rounded-md px-2 py-2 w-full overflow-x-auto">
            {group.map((card, cardIndex) => (
              <StaticCard key={cardIndex} {...card} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-5">
        <HolidayCard title="DEFACTO" likes={14777} />
        <RecentCustomerTable />
      </div>
      <Card className="overflow-x-auto p-6 bg-[#F6F6F6] mt-5 shadow-none border-[#f9f9f9]">
        <H3 className="my-2">Top Performance</H3>
        <div className="flex gap-5">
          {productDemoData.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
