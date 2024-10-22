import Button from "../../ui/Button";
import { useCreateCheckout } from "./useCreateCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCreateCheckout();

  return (
    <Button
      size="small"
      variation="primary"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
