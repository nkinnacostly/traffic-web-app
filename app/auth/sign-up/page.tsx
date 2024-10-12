import Link from "next/link";
import FormContainer from "@/components/layout/auth-layout";
import FormFooter from "@/components/auth-ui/form-footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const SignUp: React.FC = () => {
  return (
    <FormContainer pageHeading="Create Account">
      <form className="md:p-9 md:pb-0 md:pt-0">
        <Input type="username" label="Fullname" className="py-6 mb-2 border-[#9F9F9F]" placeholder="Enter Your Username"/>
        <Input type="password" label="Email" className="py-6 mb-4 border-[#9F9F9F]" placeholder="Enter your Password"/>
      <Button className="font-semibold text-white w-full" variant={"signIn"} size={"lg"}>Sign In</Button>
      <FormFooter message1="Already have an account?" message2="Sign in" authUrl="/auth/sign-in"/>
      </form>
    </FormContainer>
  );
};

export default SignUp;
