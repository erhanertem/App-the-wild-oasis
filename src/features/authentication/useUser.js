import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

// CACHE USER INFO
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === "authenticated" };
}
