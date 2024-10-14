import { useEffect, useState } from "react";
import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useGetBooking } from "../bookings/useGetBooking";
import { useGetSettings } from "../settings/useGetSettings";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCreateCheckin } from "./useCreateCheckin";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading: isLoadingBooking } = useGetBooking();
  const { settings, isLoading: isLoadingSettings } = useGetSettings();
  const { checkIn, isCheckingIn } = useCreateCheckin();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    // GUARD CLAUSE - DONT PROCESS UNPAID CHECKINS
    if (!confirmPaid) return;

    // CHECK WITH/WITHOUT BREAKFAST OPTION
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* Allow adding breakfast if no breakfast selected */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add); // Toggle add breakfast
              setConfirmPaid(false); // Reset confirm paid check
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that <strong>{guests.fullName}</strong>
          has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button
          variation="secondary"
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
