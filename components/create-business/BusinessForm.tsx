import logoVector from "@/public/image/login-vector.png"
import Image from "next/image"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
export default function BusinessForm(){
    return (
        <div className="w-full h-full m-0 p-0  md:px-32">
            <div className="flex gap-4 justify-start mb-12 items-center">
                <h2 className="text-black text-3xl">Create Business</h2>
                <Image src={logoVector} width={50} height={30} alt="logo vector" className="w-10"/>
            </div>
            <Input label="Business Name" placeholder="Enter Business name" className="border-black py-6"/>
            <div className="my-10">
            <h2 className="text-black text-sm">Do you have a physical business location?</h2>
            <div className="flex gap-5 items-center">
                <div className="flex gap-3 items-center">
                    <h4 className="text-black">Yes</h4>
                    <Input type="radio" className="shadow-none w-4 border-black"/>
                </div>
                <div className="flex gap-3 items-center">
                    <h4 className="text-black">No</h4>
                    <Input type="radio" className="shadow-none w-4 border-black"/>
                </div>
            </div>
            <Input label="If Yes, business Address" placeholder="Enter business address" className="border-black py-6 mb-6"/>
            <Input label="CAC Number" placeholder="Enter cac number" className="border-black py-6 mb-6"/>
            <Button variant={"signIn"} className="w-full" size={"lg"}>
                <span className="text-lg text-black">Submit</span>
            </Button>
            </div>
        </div>
    )
}