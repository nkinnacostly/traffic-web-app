import Link from "next/link";
import FormContainer from "@/components/layout/auth-layout";
import AuthButton from "@/components/auth-ui/button";
import FormFooter from "@/components/auth-ui/form-footer";
import AuthInput from "@/components/auth-ui/input";

const SignIn: React.FC = () => {
  return (
    <FormContainer pageHeading="Welcome Back">
      <form className="md:p-9 md:pb-0 md:pt-0">
        <AuthInput type="Username"/>
        <AuthInput type="Password"/>
        <div className="flex justify-end text-sm mb-4">
          <Link href="#" className="text-sm text-[#484848]">
            Forgot password?
          </Link>
        </div>
      <AuthButton btnTitle="Sign in"/>
      </form>
      <FormFooter message1="Don’t have an account?" message2="Create an account" authUrl="/auth/sign-up"/>
    </FormContainer>
  );
};

export default SignIn;
