import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: signupApi,
    onSuccess: ({ user: { user_metadata } }) => {
      const { fullName, email } = user_metadata;
      toast.success(
        `Account successfully created for ${fullName}. Please verify the new account via ${email}`
      );
    },
    onError: (error) => {
      // console.log("ERROR", error);
      toast.error(error.message);
    },
  });

  return { signup, isSigningup };
}
