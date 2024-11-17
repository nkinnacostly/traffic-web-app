
"use client"
import BusinessForm from "@/components/create-business/BusinessForm";
import CreatePassword from "@/components/create-business/CreatePassword";
import ApproveAccount from "@/components/create-business/ApproveAccount";

const BusinessStep = ({params}:{params:{stepId:string}}) => {

  const step = params.stepId
  const getForm = () => {
    switch (step) {
      case "step1":
        return <BusinessForm/>;
      case "step2":
        return <CreatePassword/>;
      case "step3":
        return <ApproveAccount/>;
      case "step4":
        return <div>Upload Products Form</div>;
      default:
        return <div>Invalid Step {}</div>;
    }
  };

  return (
    <>
    {getForm()}
    </>
  );
};

export default BusinessStep;
