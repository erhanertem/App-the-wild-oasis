import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // Set default to 7 if no last params value present @ URL
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // From this moment, back xx date per params and turn into isostring to search for in the data base.
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoadingRecentBookings, data: recentBookings } = useQuery(
    {
      queryFn: () => getBookingsAfterDate(queryDate),
      queryKey: [
        "bookings",
        `last-${numDays}`, // Dynamic key based on the number of days in the search parameter
        //  the queryKey array contains an additional element (last-${numDays}) to ensure the data fetched by the query is uniquely identified, based on the parameters that affect the query results. Say bookings with last-7days or bookiings with last-30days, etc.
      ],
    }
  );

  return { recentBookings, isLoadingRecentBookings };
}
