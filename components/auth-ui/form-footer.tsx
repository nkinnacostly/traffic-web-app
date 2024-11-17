
import Image from "next/image";
import googleIcon from "@/public/image/google-icon.png";
import facebookIcon from "@/public/image/facebook-icon.png";
import Link from "next/link";
type FormFooterProps={
    message1 : string,
    message2 : string,
    authUrl:string
}
export default function FormFooter({message1,message2,authUrl}:FormFooterProps){
    return(
    <>
    <div className="mt-4 flex items-center justify-center gap-3">
        <div className="border-t border-[#48484899] w-full"></div>
        <p className="text-gray-600">OR</p>
        <div className="border-t border-[#48484899] w-full"></div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button className="mx-2 p-3 border border-gray-300 rounded bg-white">
          <Image src={googleIcon} width={20} height={15} alt="google icon" />
        </button>
        <button className="mx-2 p-3 border border-gray-300 rounded bg-white">
          <Image src={facebookIcon} width={20} height={15} alt="facebook icon" />
        </button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-[#484848]">
          {message1}
          <Link href={authUrl}>
            <span className="text-sm text-blue-500">{message2}</span>
          </Link>
        </p>
      </div>
    </>
    )
}