import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCreateCheckout } from "../check-in-out/useCreateCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import { useDeleteBooking } from "./useDeleteBooking";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import BookingDataBox from "./BookingDataBox";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  let { booking, isLoading: isGettingBooking } = useGetBooking();
  const { checkOut, isCheckingOut } = useCreateCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isGettingBooking) return <Spinner />;

  // GUARD CLAUSE
  if (!booking) return <Empty resourcename="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {/* DETAILS OF THE LOADED BOOKING */}
      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            onClick={() => checkOut(bookingId)}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, {
                  // onSEttled means wheter its a success or error execure it
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

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

export default BookingDetail;
