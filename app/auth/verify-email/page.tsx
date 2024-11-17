import Image from "next/image";
import FormContainer from "@/components/layout/auth-layout";
import verifyEmailImg from "@/public/image/object-verify-email.png"
const SignUp: React.FC = () => {
  return (
    <FormContainer pageHeading="Verify your email">
      <div className="md:p-9 md:pb-0 md:pt-0 text-center flex flex-col justify-center items-center">
       <p className="text-[#484848B2] text-sm mb-11">You will need to verify your email to complete registration</p> 
        <Image src={verifyEmailImg} height={250} width={300} alt="Verify email banner"/>
        <p className="text-[#484848B2] text-xs mt-6">An email has been sent to victor@gmail.com with a link to verify your account. If you have not recieved the email, please check your spam folder</p>
      </div>
    </FormContainer>
  );
};

export default SignUp;
