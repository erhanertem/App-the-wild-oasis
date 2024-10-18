import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (userObj) => {
      // console.log(userObj); // userObj as arged in login mutate fn -> {user:***, session:***}
      // Manually inject cache data to user query key - NOT REQUIRED - JUST EXPERIMENTATION - SHORTLIVED AND WILL BE OVERWRITTEN BY USEGETUSER CACHING ANYWAYS
      queryClient.setQueryData(["user"], userObj.user);
      navigate(
        "/dashboard",
        // Disallow going back in the browser
        { replace: true }
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Invalid login credentials");
    },
  });

  return { login, isLoggingIn };
}
