import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Manually remove query cache for the user key so that no malicious actor can get a hold of it upon a succesfull logout
      queryClient.removeQueries();
      navigate(
        "/login",
        // Disallow going back in the browser
        { replace: true }
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Problem encountered while logging out. Please try again");
    },
  });

  return { logout, isLoggingOut };
}
