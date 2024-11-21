import Link from "next/link";
import FormContainer from "@/components/layout/auth-layout";
import FormFooter from "@/components/auth-ui/form-footer";
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input";

const SignIn: React.FC = () => {
  return (
    <FormContainer pageHeading="Welcome Back">
      <form className="md:p-9 md:pb-0 md:pt-0">
        <Input  label="Username" type="username" className="py-6 mb-3 border-[#9F9F9F]" placeholder="Enter Your Username"/>
        <Input label="Password" type="password" className="py-6 mb-2 border-[#9F9F9F]" placeholder="Enter your Password"/>
        <div className="flex justify-end text-sm mb-2">
          <Link href="#" className="text-sm text-[#484848]">
            Forgot password?
          </Link>
        </div>
      <Button className="font-semibold text-white w-full" variant={"signIn"} size={"lg"}>Sign In</Button>
      <FormFooter message1="Don’t have an account?" message2="Create an account" authUrl="/auth/sign-up"/>
      </form>
    </FormContainer>
  );
};

export default SignIn;
