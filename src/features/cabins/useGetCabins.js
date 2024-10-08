import { useQuery } from '@tanstack/react-query';

import { getCabins } from '../../services/apiCabins';

export function useGetCabins() {
  // >#3.GET data via TQ
  const {
    isLoading, // Represents the loading state while the query is fetching data
    data: cabins, // The fetched data (renamed to cabins using object destructuring)
    refetch,
    // error, // Any error that occurred during the fetch
  } = useQuery({
    queryKey: ['cabins'], // The unique key for caching and identifying the query
    queryFn: getCabins, // The function responsible for fetching the data
  });

  return { isLoading, cabins, refetch };
}
