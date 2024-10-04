
import Image from "next/image";
import authbackgroundcover from "@/public/image/auth-bg.png"
import Traffik_Logo from "@/public/image/traffik__logo.png"
import logoVector from "@/public/image/login-vector.png"
import facebookIcon from "@/public/image/facebook-icon.png"
import googleIcon   from "@/public/image/google-icon.png"
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

import Link from "next/link";
const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#f2f2f2]">
      <div className="flex-1 bg-black hidden md:block">
        <div className="p-10 pb-1">
            <Image src={Traffik_Logo} width={190} height={20} alt="logo image"/>
        </div>
        <div className=" text-white md:flex items-center justify-center p-8 pr-0 hidden">
          <div className="mb-8 w-full h-full">
           <Image src={authbackgroundcover} width={1000} height={5000} alt="login background" className="w-full h-full"/>
          </div>
          </div>
      </div>
      <div className="flex-1 md:m-16 md:ml-0 md:mt-24 md:shadow-xl bg-[#DCDCDC33] md:rounded-2xl">
        <div className="p-6 md:p-14 md:mb-7">
            <div className="flex flex-col justify-center items-center">
          <Image src={logoVector} width={70} height={50} alt="logo vector"/>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#030803] mt-3">Welcome back</h2>
            </div> 
          <form className="md:p-9 md:pb-0 md:pt-0">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-[#484848]">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt className="text-[#484848]"/>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 p-3 border border-[#9F9F9F] rounded bg-white"
                    placeholder="Enter username"
                />
            </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-[#484848]">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiLockPasswordLine className="text-[#484848]"/>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 p-3 border border-[#9F9F9F] rounded bg-white"
                    placeholder="Enter username"
                />
            </div>
            </div>
            <div className="flex justify-end text-sm mb-4">
              <Link href="#" className="text-sm text-[#484848]">
                Forgot password?
              </Link>
            </div>
            
            <button className="w-full py-3 text-white font-bold rounded bg-gradient-to-r from-[#FF5390] via-[#F5B341] to-[#68AF6B]">Sign in</button>
          </form>
          <div className="mt-6 flex items-center justify-center m-8 gap-3">
            <div className="border-t border-[#48484899] w-full"></div>
            <p className="text-gray-600">OR</p>
            <div className="border-t border-[#48484899] w-full"></div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button className="mx-2 p-3 border border-gray-300 rounded bg-white">
              <Image src={googleIcon} width={20} height={15} alt="google icon"/>
            </button>
            <button className="mx-2 p-3 border border-gray-300 rounded bg-white">
            <Image src={facebookIcon} width={20} height={15} alt="google icon"/>
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#484848]">
              Don’t have an account? <Link href={"/auth/sign-up"}>
              <span className="text-sm text-blue-500">Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
