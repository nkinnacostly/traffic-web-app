import Image from "next/image";
import Traffik_Logo from "@/public/image/traffik__logo.png";
import authbackgroundcover from "@/public/image/auth-bg.png";
import logoVector from "@/public/image/login-vector.png";

interface FormContainerProps {
  children: React.ReactNode;
  pageHeading :string
}

const FormContainer: React.FC<FormContainerProps> = ({ children ,pageHeading}) => {
  return (
    <div className="min-h-screen flex bg-[#f2f2f2]">
      <div className="flex-1 bg-black hidden md:block">
        <div className="p-10 pb-1">
          <Image src={Traffik_Logo} width={190} height={20} alt="logo image" />
        </div>
        <div className="text-white md:flex items-center justify-center p-8 pr-0 hidden">
          <div className="mb-8 w-full h-full">
            <Image
              src={authbackgroundcover}
              width={1000}
              height={5000}
              alt="login background"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 md:m-16 md:ml-0 md:mt-24 md:shadow-xl bg-[#DCDCDC33] md:rounded-2xl">
        <div className="p-6 md:p-14 md:mb-7">
          <div className="flex flex-col justify-center items-center">
            <Image src={logoVector} width={70} height={50} alt="logo vector" />
            <h2 className="text-2xl font-bold mb-6 text-center text-[#030803] mt-3">
              {pageHeading}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
