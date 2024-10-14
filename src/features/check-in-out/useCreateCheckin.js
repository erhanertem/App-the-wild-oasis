import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`); // Display success message
      queryClient.invalidateQueries({ active: true }); // Trigger re-cache
      navigate("/");
    }, // Data is the data returned from the updateBooking mutation fn
    onError: (err) => {
      console.log(err);
      toast.error("There was an error while checking in");
    }, // Display error message
  });

  return { checkIn, isCheckingIn };
}
