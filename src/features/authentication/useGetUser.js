import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

// CACHE USER INFO
export function useGetUser() {
  const { isLoading: isLoadingCurrentUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isLoadingCurrentUser,
    isAuthenticated: user?.role === "authenticated",
  };
}
