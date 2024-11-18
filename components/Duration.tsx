import { ArrowDown2 } from "iconsax-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Span } from "./ui/typography";

export default function Duration(){
    return (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
            <Span className="pl-2 font-normal text-[#666666CC] text-sm">Duration</Span>
            <ArrowDown2 size="18" color="#666666CC"/>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div
              className="flex items-center justify-start gap-2 hover:bg-herobackground/10 cursor-pointer p-2 rounded-lg"
            >
              <Span className="text-primary">Yearly</Span>
            </div>
            <div
              className="flex items-center justify-start gap-2 hover:bg-herobackground/10 cursor-pointer p-2 rounded-lg"
            >
              <Span className="text-primary">Monthly</Span>
            </div>
          </PopoverContent>
        </Popover>
    )
}