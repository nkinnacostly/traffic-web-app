// Toast alert hook using sonner
import { toast } from "sonner";

const useToastAlert = () => {
  const handleErrorToast = ({ description }: { description: string }) => {
    toast.error("Error", { description });
  };

  const handleSuccessToast = ({ description }: { description: string }) => {
    toast.success("Success", { description });
  };

  const handleInfoToast = ({ description }: { description: string }) => {
    toast.info("Info", { description });
  };

  return {
    handleErrorToast,
    handleSuccessToast,
    handleInfoToast,
  };
};

export default useToastAlert;
