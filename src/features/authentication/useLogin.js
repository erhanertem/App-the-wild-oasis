/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: loginApi,
    onSuccess: (userObj) => {
      // console.log(userObj); // userObj --> {user:***, session:***}
      // Manually inject cache data to user query key
      queryClient.setQueriesData(["user"], userObj);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Invalid login credentials");
    },
  });

  return { login, isLogging };
}
