import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE_PER_PAGINATION } from "../../utils/constants";

// GET BOOKINGS DATA WITH API-SIDE FILTERING/SORTING DISSIMILAR TO WHAT WE HAVE DONE WITH THE CABINS DATA
export function useGetBookings() {
  /**
   * INSTEAD OF FILTERING/SORTING WHOLE DATA RECEIVED FROM THE DB, WE WANT TO CUSTOM FETCH DATA AND ONLY RECEIVE THE REQUIRED ONES WHEN WE TOGGLE BETWEEN SORT AND FILTER OPTIONS @ BOOKING TABLE. THIS SELECTIVE FILTERING AND SORTING FETCH OPERATION IS CALLED SERVER-SIDE FILTERING.
   * WE CANT MANUPLATE GETBOOKINGS API FN VIA READING PARAMS FROM RR useSearchParams, AS  ITS NOT ACCESSIBLE OUT OF REACT COMPONENT. WE CAN MANUPLATE THIS FUNCTION RIGHT HERE SINCE WE ACCESS IT @ QUERYFN KEY OF USEQUERY.
   */
  const [searchParams] = useSearchParams();

  // GET FILTER VALUE
  const filterValue = searchParams.get("status");
  const filter =
    // If designated URL value for status param is 'all' or none specified, mark null else provide status params' new designated URL value
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // // 💡 ALLOW CUSTOMZIATION OF METHOD ...but requires some more work as well...
  // : { field: "status", value: filterValue, method: "" };

  // GET SORT VALUE
  const sortByDef = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByDef.split("-");
  const sortBy = { field, direction };

  // GET PAGINATION VALUE
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    // IN ORDER TO TRIGGER AUTO REFETCH DUE CHANGES ON FILTER OBJECT, TQ ALLOWS US TO INCLUDE FILTER IN QUERYKEY ARRAY - WORKING KIND OF A DEPEDENCY ARRAY
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING DATA IN TQ
  const queryClient = useQueryClient();
  // Compute the pagination pages
  const pageCount = Math.ceil(count / PAGE_SIZE_PER_PAGINATION);
  // GUARD CLAUSE - Stop pre-fetching prior to last page so that we do not pre-fetch a non-existing next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  // GUARD CLAUSE - Stop pre-fetching prior to first page so that we do not pre-fetch a non-existing prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
