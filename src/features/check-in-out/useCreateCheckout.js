import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`); // Display success message
      queryClient.invalidateQueries({ active: true }); // Trigger re-cache
    }, // Data is the data returned from the updateBooking mutation fn
    onError: (err) => {
      console.log(err);
      toast.error("There was an error while checking out");
    }, // Display error message
  });

  return { checkOut, isCheckingOut };
}
