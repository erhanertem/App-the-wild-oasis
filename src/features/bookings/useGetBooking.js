import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useGetBooking() {
  // NOTE: useParams is a RR hook that get a hold of URL path parameter
  const { bookingId } = useParams();

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // By default, TQ tries to fetch data 3 times before it fails gracefully
  });

  return { isLoading, error, booking };
}
