import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "iconsax-react";
import Duration from "./Duration";

type StaticCardProps={
  title:string,
  amount:number,
  subTitle:string,
  isDue:boolean,
  percentage:number,
  isView:boolean,
  showConcurrency:boolean,
  hideBage:boolean,
  bgColor?:string,
  border?:string
}

export default function StaticCard({title,amount,subTitle,isDue,percentage,isView,showConcurrency,hideBage,bgColor = "[#f9f9f9]",border="[#f9f9f9]"}:StaticCardProps){
    return(
      <Card className={`shadow-none rounded-non bg-${bgColor} border-${border} px-2 py-2`}>
        <div className="my-4 mx-2">
        <div>
          <h3 className="text-sm text-[#030803B2] pb-5 font-semibold">{title}
            {isDue &&(
            <Duration/>
            )}
          </h3>
          <div className="flex gap-2 items-center text-center">
          <h1 className="text-3xl font-bold mb-2">{showConcurrency?"₦":""}{amount.toLocaleString()}</h1>
          <>
          {hideBage ? (
            <>
            </>
          ):(
            <>
            {isView ? (
              <Badge className="bg-[#089B0D] shadow-none rounded-none py-3 px-3">View</Badge>
            ):(
            <Badge className="bg-[#4CAD5026] shadow-none px-1 py-2">
              <ArrowUp size="12" color="#0D9013"/>
              <h5 className="text-[#0D9013] text-xs">{percentage}%</h5>
            </Badge>
            )}
            </>
          )}
          </>
          </div>
          {subTitle &&(
          <p className="text-xs text-[#030803B2]">{subTitle}</p>     
          )}
        </div>
        </div>
       </Card>
    )
}