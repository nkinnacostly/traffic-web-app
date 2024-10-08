import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import clsx from "clsx"

type AuthInputProps={
    type:string
}
export default function AuthInput ({type}:AuthInputProps){

    return (
        <>
         <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-[#484848] ">
            {type}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUserAlt className={clsx("text-[#484848]",{
                "hidden" : type != "Username"
            })}/>
             <RiLockPasswordLine className={clsx("text-[#484848]",{
                "hidden" : type != "Password"
            })}/>
             <FaUserAlt className={clsx("text-[#484848]",{
                "hidden" : type != "Full name"
            })}/>
            <IoMail  className={clsx("text-[#484848]",{
                "hidden" : type != "Email"
            })}/>
            </div>
            <input
              type={type}
              className="block w-full pl-10 p-3 border border-[#9F9F9F] rounded bg-white"
              placeholder={`Enter ${type}`}
            />
          </div>
        </div>
        </>
    )
}