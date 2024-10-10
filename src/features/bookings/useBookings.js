import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

export function useBookings() {
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

  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    // IN ORDER TO TRIGGER AUTO REFETCH DUE CHANGES ON FILTER OBJECT, TQ ALLOWS US TO INCLUDE FILTER IN QUERYKEY ARRAY - WORKING KIND OF A DEPEDENCY ARRAY
    queryKey: ["bookings", filter],
    queryFn: () => getBookings(filter),
  });

  return { isLoading, error, bookings };
}
