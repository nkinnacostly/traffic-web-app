"use client"
import StaticCard from "@/components/StaticCard";
import ProgressTrackbar from "@/components/trackbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab"
import TransactionTable from "@/components/TransactionTable";


import { useState } from "react";

export default function Page(){
   // const [value, setValue] = useState(50);
    return (
        <div className="space-y-5">
            <h3>Transaction</h3>
            <div className="flex gap-48 overflow-x-auto">
                <StaticCard amount={180000} isDue={false} percentage={3} subTitle="Total Available Balance" title="Available Balance" isView={false} showConcurrency={false} hideBage={false} border="none" bgColor="[#fff]"/>
                <StaticCard amount={180000} isDue={true} percentage={3} subTitle="Last 7 days earnings" title="Weekly Revenue" isView={false} showConcurrency={false} hideBage={false} border="none" bgColor="[#fff]"/>
                <StaticCard amount={180000} isDue={true} percentage={3} subTitle="Last 30 days profits" title="Monthly Profits" isView={false} showConcurrency={false} hideBage={false} border="none" bgColor="[#fff]" />
            </div>
            <ProgressTrackbar progress={35} />
            <Tabs defaultValue="all_transaction" className="">
                <TabsList  className=" gap-5 md:gap-44 bg-white mb-3">
                    <TabsTrigger value="all_transaction">All Transaction</TabsTrigger>
                    <TabsTrigger value="pending">Pending Transaction</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="all_transaction">
                    <TransactionTable /*status="all_transaction"*//>
                </TabsContent>
                <TabsContent value="pending">
                <TransactionTable /*status="pending"*//>
                </TabsContent>
                <TabsContent value="orders">
                <TransactionTable /*status="orders"*//>
                </TabsContent>
            </Tabs>
        </div>
    )
}