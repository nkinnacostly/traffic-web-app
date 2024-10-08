import Link from "next/link";
import FormContainer from "@/components/layout/auth-layout";
import AuthButton from "@/components/auth-ui/button";
import FormFooter from "@/components/auth-ui/form-footer";
import AuthInput from "@/components/auth-ui/input";

const SignUp: React.FC = () => {
  return (
    <FormContainer pageHeading="Create Account">
      <form className="md:p-9 md:pb-0 md:pt-0">
        <AuthInput type="Full name"/>
        <AuthInput type="Email"/>
      <AuthButton btnTitle="Create Account"/>
      </form>
      <FormFooter message1="Already have an account?" message2="Sign in" authUrl="/auth/sign-in"/>
    </FormContainer>
  );
};

export default SignUp;
