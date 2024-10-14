import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

// Custom TQ hook
export function useGetSettings() {
  const {
    isLoading, // Represents the loading state while the query is fetching data
    data: settings, // The fetched data
    // error,
  } = useQuery({
    queryKey: ["settings"], // The unique key for caching and identifying the query
    queryFn: getSettings, // The function responsible for fetching the data
  });

  return { isLoading, settings };
}
