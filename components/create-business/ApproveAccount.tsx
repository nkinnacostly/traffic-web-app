import logoVector from "@/public/image/login-vector.png"
import Image from "next/image"
import approvalImage from "@/public/image/approve-acct.png"
export default function ApproveAccount(){
    return (
        <div className="w-full h-full m-0 p-0  md:px-32 py-14 flex justify-center flex-col items-center text-center">
            <div className="flex gap-4  mb-12 items-center">
                <h2 className="text-black text-3xl">Account approval</h2>
                <Image src={logoVector} width={50} height={30} alt="logo vector" className="w-10"/>
            </div>
            <div className="mt-28 mb-10">
           <Image src={approvalImage} width={550} height={300} alt="approval-vector"/>
            </div>
            <p className="text-black text-xs text-center">Upon approval, an email will be sent to Victor@gmail.com</p>
        </div>
    )
}