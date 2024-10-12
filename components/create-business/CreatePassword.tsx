import logoVector from "@/public/image/login-vector.png"
import Image from "next/image"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
export default function CreatePassword(){
    return (
        <div className="w-full h-full m-0 p-0  md:px-32">
            <div className="flex gap-4 justify-start mb-12 items-center">
                <h2 className="text-black text-3xl">Create Password</h2>
                <Image src={logoVector} width={50} height={30} alt="logo vector" className="w-10"/>
            </div>
            <div className="my-10">
            <Input label="Enter Password" placeholder="Enter Password" className="border-black py-6"/>
            <Input label="Repeat Password" placeholder="Enter Password" className="border-black py-6 mb-6"/>
            <Button variant={"signIn"} className="w-full" size={"lg"}>
                <span className="text-lg text-black">Submit</span>
            </Button>
            </div>
        </div>
    )
}