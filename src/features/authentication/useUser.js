import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

// CACHE USER INFO
export function useUser() {
  const { isLoading: isLoadingCurrentUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoadingCurrentUser,
    isAuthenticated: user?.role === "authenticated",
  };
}
